// Integra los archivos de inbox/ en data/events.json.
// Uso: node scripts/merge-inbox.mjs [raíz-del-repo]
// Sin dependencias: corre con el Node que trae ubuntu-latest.

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? ".");
const inboxDir = path.join(root, "inbox");
const processedDir = path.join(inboxDir, "processed");
const failedDir = path.join(inboxDir, "failed");
const eventsPath = path.join(root, "data", "events.json");

const TEXT_FIELDS = [
  "name", "url", "ctftime_url", "format", "location", "difficulty",
  "organizer", "prizes", "description", "why",
  "fee", "eligibility", "team_size", "career_value",
];

// Si cambia alguno de estos campos, el evento se marca como "actualizado".
const KEY_FIELDS = ["start", "end", "url", "registration_deadline", "fee", "eligibility", "location", "team_size"];

const today = new Date().toISOString().slice(0, 10);

function slugify(s) {
  return s
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    .slice(0, 60);
}

function isHttpUrl(s) {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function normalizeUrl(s) {
  return s ? s.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/+$/, "") : "";
}

// Acepta: array de eventos, { events: [...] } o un único evento.
function toEventList(value) {
  if (Array.isArray(value)) return value;
  if (value && Array.isArray(value.events)) return value.events;
  if (value && typeof value === "object" && value.name) return [value];
  throw new Error("JSON sin eventos: se esperaba un array o { \"events\": [...] }");
}

function parseFile(file, text) {
  if (file.endsWith(".json")) return toEventList(JSON.parse(text));
  // Markdown: se toman todos los bloques ```json ... ```
  const blocks = [...text.matchAll(/```json\s*\n([\s\S]*?)```/g)].map((m) => m[1]);
  if (blocks.length === 0) throw new Error("El .md no contiene ningún bloque ```json");
  return blocks.flatMap((b) => toEventList(JSON.parse(b)));
}

function normalizeEvent(raw, file) {
  if (!raw || typeof raw !== "object") throw new Error("evento que no es un objeto");
  const ev = {};
  for (const f of TEXT_FIELDS) {
    if (raw[f] != null && String(raw[f]).trim() !== "") ev[f] = String(raw[f]).trim();
  }
  if (!ev.name) throw new Error("evento sin \"name\"");
  if (!ev.url || !isHttpUrl(ev.url)) throw new Error(`"${ev.name}": "url" falta o no es http(s)`);
  if (ev.ctftime_url && !isHttpUrl(ev.ctftime_url)) delete ev.ctftime_url;

  const start = new Date(raw.start);
  if (isNaN(start)) throw new Error(`"${ev.name}": "start" no es una fecha válida`);
  ev.start = start.toISOString();
  const end = raw.end ? new Date(raw.end) : start;
  ev.end = isNaN(end) || end < start ? ev.start : end.toISOString();

  const weight = Number(raw.weight);
  if (raw.weight != null && !isNaN(weight)) ev.weight = weight;
  if (Array.isArray(raw.tags)) ev.tags = raw.tags.map(String).map((t) => t.trim()).filter(Boolean);
  if (typeof raw.recommended === "boolean") ev.recommended = raw.recommended;
  // true / false, o null = "Future weight: to be determined" (se conserva para no deducirlo del peso).
  if (typeof raw.ctftime_rated === "boolean" || raw.ctftime_rated === null) ev.ctftime_rated = raw.ctftime_rated;
  if (Array.isArray(raw.verified_by)) {
    const vb = raw.verified_by.map((s) => String(s).trim().toLowerCase()).filter((s) => s === "oficial" || s === "ctftime");
    if (vb.length) ev.verified_by = [...new Set(vb)];
  }

  if (raw.registration_deadline) {
    const dl = new Date(raw.registration_deadline);
    if (!isNaN(dl)) ev.registration_deadline = dl.toISOString();
  }
  // "added" solo se respeta para eventos nuevos (p. ej. la carga inicial con fechas de primera mención).
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw.added ?? "") && raw.added <= today) ev.added_hint = raw.added;

  ev.id = raw.id ? slugify(String(raw.id)) : `${slugify(ev.name)}-${ev.start.slice(0, 4)}`;
  ev.sources = [file];
  return ev;
}

function uniqueTarget(dir, name) {
  let target = path.join(dir, name);
  for (let i = 2; fs.existsSync(target); i++) {
    const ext = path.extname(name);
    target = path.join(dir, `${path.basename(name, ext)}-${i}${ext}`);
  }
  return target;
}

function main() {
  const db = JSON.parse(fs.readFileSync(eventsPath, "utf8"));
  const byId = new Map(db.events.map((e) => [e.id, e]));
  const byUrl = new Map(db.events.map((e) => [normalizeUrl(e.url), e]));

  const files = fs.existsSync(inboxDir)
    ? fs.readdirSync(inboxDir).filter((f) =>
        /\.(md|json)$/i.test(f) && f.toLowerCase() !== "readme.md" &&
        fs.statSync(path.join(inboxDir, f)).isFile())
    : [];

  const summary = { added: [], updated: [], skipped: [], failed: [] };

  for (const file of files) {
    const src = path.join(inboxDir, file);
    try {
      // Un evento inválido se saltea; el archivo solo falla si no se puede leer o no aporta nada.
      const events = [], skipped = [];
      for (const raw of parseFile(file, fs.readFileSync(src, "utf8"))) {
        try { events.push(normalizeEvent(raw, file)); }
        catch (err) { skipped.push(err.message); }
      }
      if (events.length === 0 && skipped.length > 0) throw new Error(skipped.join("\n"));
      summary.skipped.push(...skipped.map((s) => `${file}: ${s}`));

      for (const ev of events) {
        const existing = byId.get(ev.id) ?? byUrl.get(normalizeUrl(ev.url));
        if (existing) {
          // Se conserva el id y la fecha de alta; los campos nuevos no vacíos pisan los viejos.
          const { id, sources, added_hint, ...fields } = ev;
          const changed = KEY_FIELDS.filter((f) => f in fields && fields[f] !== existing[f]);
          Object.assign(existing, fields);
          existing.sources = [...new Set([...(existing.sources ?? []), ...sources])];
          existing.last_seen = today;
          if (changed.length) {
            // Fecha y hora completas: la web la compara con el momento en que viste el evento.
            existing.changed = new Date().toISOString();
            existing.changed_fields = changed;
          }
          summary.updated.push(changed.length ? `${existing.name} (${changed.join(", ")})` : existing.name);
        } else {
          ev.added = ev.added_hint ?? today;
          delete ev.added_hint;
          ev.last_seen = today;
          db.events.push(ev);
          byId.set(ev.id, ev);
          byUrl.set(normalizeUrl(ev.url), ev);
          summary.added.push(ev.name);
        }
      }
      fs.mkdirSync(processedDir, { recursive: true });
      const target = uniqueTarget(processedDir, file);
      fs.renameSync(src, target);
      if (skipped.length) fs.writeFileSync(`${target}.skipped.txt`, skipped.join("\n") + "\n");
    } catch (err) {
      fs.mkdirSync(failedDir, { recursive: true });
      const target = uniqueTarget(failedDir, file);
      fs.renameSync(src, target);
      fs.writeFileSync(`${target}.error.txt`, `${err.message}\n`);
      summary.failed.push(`${file}: ${err.message}`);
    }
  }

  if (summary.added.length || summary.updated.length) {
    db.events.sort((a, b) => a.start.localeCompare(b.start));
    db.updated = new Date().toISOString();
    fs.writeFileSync(eventsPath, JSON.stringify(db, null, 2) + "\n");
  }

  const report = [
    `Archivos procesados: ${files.length}`,
    `Nuevos (${summary.added.length}): ${summary.added.join(", ") || "-"}`,
    `Actualizados (${summary.updated.length}): ${summary.updated.join(", ") || "-"}`,
    `Eventos salteados (${summary.skipped.length}): ${summary.skipped.join(" | ") || "-"}`,
    `Fallidos (${summary.failed.length}): ${summary.failed.join(" | ") || "-"}`,
  ].join("\n");
  console.log(report);
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, "```\n" + report + "\n```\n");
  }
}

main();
