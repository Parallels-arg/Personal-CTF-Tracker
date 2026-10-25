"use strict";

// ---------- constantes ----------

const STATES = [
  { key: "sin-clasificar", label: "Sin clasificar" },
  { key: "interesado", label: "Me interesa" },
  { key: "inscripto", label: "Inscripto" },
  { key: "descartado", label: "Descartado" },
];
const STATE_LABEL = Object.fromEntries(STATES.map((s) => [s.key, s.label]));
const DAY_MS = 86400000;

const fmtDate = new Intl.DateTimeFormat("es-AR", { weekday: "short", day: "numeric", month: "short" });
const fmtTime = new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
const fmtFull = new Intl.DateTimeFormat("es-AR", { dateStyle: "full", timeStyle: "short", hourCycle: "h23" });
const fmtMonth = new Intl.DateTimeFormat("es-AR", { month: "long", year: "numeric" });

// ---------- almacenamiento local (puede fallar en modo privado) ----------

const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* sin persistencia */ }
  },
};

// En <usuario>.github.io/<repo>/ se deduce el repo solo.
function detectRepo() {
  const host = location.hostname;
  if (!host.endsWith(".github.io")) return {};
  const owner = host.split(".")[0];
  const first = location.pathname.split("/").filter(Boolean)[0];
  return { owner, repo: first || host };
}

const state = {
  events: [],
  statuses: {},
  statusSha: null,
  seen: store.get("ctf.seen", {}), // { id: ISO de la última vez que lo abriste }
  seenSha: null,
  onlyNews: false,
  creds: null,        // { idEvento: { username, password, team, notes, updated } } — solo en memoria
  credsSha: null,
  credsError: null,
  credsEditing: null, // id del evento cuyas credenciales se están editando
  // Eventos vistos mientras el filtro de novedades está activo: siguen en la lista hasta
  // que se cambie de filtro, así se pueden recorrer las novedades una por una.
  newsKeep: new Set(),
  source: null,
  config: { branch: "main", ...detectRepo(), ...store.get("ctf.config", {}) },
  view: store.get("ctf.view", innerWidth < 720 ? "list" : "calendar"),
  filters: new Set(store.get("ctf.filters", ["sin-clasificar", "interesado", "inscripto"])),
  showPast: store.get("ctf.showPast", false),
  query: "",
  month: startOfMonth(new Date()),
  saving: 0,
};

// ---------- utilidades ----------

function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "style") el.style.cssText = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c != null && c !== false) el.append(c instanceof Node ? c : String(c));
  }
  return el;
}

// Los datos vienen de una IA: solo se enlazan URLs http(s).
function safeUrl(s) {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:" ? u.href : null;
  } catch { return null; }
}

function link(url, text) {
  const href = safeUrl(url);
  return href ? h("a", { href, target: "_blank", rel: "noopener noreferrer" }, text) : null;
}

function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function statusOf(ev) { return state.statuses[ev.id]?.state ?? "sin-clasificar"; }
function colorVar(st) { return `--c: var(--st-${st})`; }

function b64encode(str) {
  let bin = "";
  for (const b of new TextEncoder().encode(str)) bin += String.fromCharCode(b);
  return btoa(bin);
}
function b64decode(b64) {
  return new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0)));
}

function whenText(ev) {
  const s = ev._start, e = ev._end;
  if (e - s <= 0) return `${fmtDate.format(s)} ${fmtTime.format(s)}`;
  const sameDay = startOfDay(s).getTime() === startOfDay(e).getTime();
  if (sameDay) return `${fmtDate.format(s)} ${fmtTime.format(s)}–${fmtTime.format(e)}`;
  return `${fmtDate.format(s)} ${fmtTime.format(s)} → ${fmtDate.format(e)} ${fmtTime.format(e)}`;
}

function durationText(ev) {
  const hours = Math.round((ev._end - ev._start) / 3600000);
  if (hours <= 0) return null;
  return hours >= 48 ? `${Math.round(hours / 24)} días` : `${hours} h`;
}

// "Nuevo": nunca lo abriste ni lo clasificaste. Un evento con estado ya lo conocés aunque no
// figure como visto (p. ej. los que vinieron de la carga inicial).
function isNew(ev) {
  return !state.seen[ev.id] && statusOf(ev) === "sin-clasificar";
}

// "Actualizado": cambió un dato clave (fechas, URL, inscripción…) después de la última vez que lo viste.
function isChanged(ev) {
  if (!ev.changed || statusOf(ev) === "descartado" || isNew(ev)) return false;
  const seen = state.seen[ev.id];
  return !seen || new Date(ev.changed) > new Date(seen);
}

const hasNews = (ev) => isNew(ev) || isChanged(ev);

// Fecha límite de inscripción todavía abierta; urgente si cierra en menos de 3 días.
function deadlineInfo(ev) {
  if (!ev.registration_deadline) return null;
  const dl = new Date(ev.registration_deadline);
  const left = (dl - Date.now()) / DAY_MS;
  if (left < 0) return { text: `inscripción cerrada (${fmtDate.format(dl)})`, cls: "closed" };
  return { text: `inscripción hasta ${fmtDate.format(dl)} ${fmtTime.format(dl)}`, cls: left < 3 ? "urgent" : "" };
}

const fmtShort = new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "2-digit" });
const addedText = (ev) => ev.added ? `sugerido el ${fmtShort.format(new Date(`${ev.added}T12:00:00`))}` : null;

function isLive(ev) {
  const now = Date.now();
  return ev._start <= now && ev._end >= now;
}

function toast(msg, kind = "info", ms = 4000) {
  const el = h("div", { class: `toast ${kind}` }, msg);
  document.getElementById("toasts").append(el);
  setTimeout(() => el.remove(), ms);
}

// ---------- GitHub API ----------

const canWrite = () => Boolean(state.config.owner && state.config.repo && state.config.token);

// opts.repo ("dueño/nombre") apunta a otro repo, p. ej. el privado de credenciales.
async function gh(path, opts = {}) {
  const { owner, repo, token } = state.config;
  const { repo: target = `${owner}/${repo}`, ...fetchOpts } = opts;
  const headers = { Accept: "application/vnd.github+json", ...opts.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (opts.body) headers["Content-Type"] = "application/json";
  const res = await fetch(`https://api.github.com/repos/${target}${path ? `/${path}` : ""}`, {
    ...fetchOpts, headers, cache: "no-store",
  });
  if (!res.ok) {
    let detail = "";
    try { detail = (await res.json()).message ?? ""; } catch { /* sin cuerpo */ }
    const err = new Error(`GitHub ${res.status}${detail ? `: ${detail}` : ""}`);
    err.status = res.status;
    throw err;
  }
  return res;
}

const ref = () => `?ref=${encodeURIComponent(state.config.branch || "main")}`;

// ---------- credenciales (repo privado aparte) ----------
// Viven en credentials.json de un repo PRIVADO que solo tu token puede leer. Se guardan solo
// en memoria: nunca en localStorage ni en el repo público. Sin token, la sección no existe.

const CREDS_FILE = "credentials.json";
const privateRepo = () => {
  const p = (state.config.privateRepo || "ctf-private").trim();
  return p.includes("/") ? p : `${state.config.owner}/${p}`;
};

async function fetchCredsFile() {
  const meta = await (await gh(`contents/${CREDS_FILE}`, { repo: privateRepo() })).json();
  return { sha: meta.sha, creds: JSON.parse(b64decode(meta.content)).credentials ?? {} };
}

async function loadCreds() {
  state.creds = null;
  state.credsSha = null;
  state.credsError = null;
  if (!canWrite()) return;
  try {
    // Antes de leer o escribir nada, confirmar que el repo es privado.
    const info = await (await gh("", { repo: privateRepo() })).json();
    if (!info.private) {
      state.credsError = `${privateRepo()} es público: no se leen ni guardan credenciales ahí.`;
      return;
    }
    try {
      const file = await fetchCredsFile();
      state.creds = file.creds;
      state.credsSha = file.sha;
    } catch (err) {
      if (err.status !== 404) throw err;
      state.creds = {}; // repo privado sin credenciales todavía: se crea al primer guardado
    }
  } catch (err) {
    state.credsError = err.status === 404
      ? `Sin acceso a ${privateRepo()}: creá ese repo privado y agregalo a los repos de tu token.`
      : `No se pudieron leer las credenciales (${err.message}).`;
  }
}

// entry = null borra las credenciales del evento.
async function saveCreds(id, entry) {
  const apply = (map) => {
    if (entry) map[id] = { ...entry, updated: new Date().toISOString() };
    else delete map[id];
  };
  apply(state.creds);
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await gh(`contents/${CREDS_FILE}`, {
        repo: privateRepo(),
        method: "PUT",
        body: JSON.stringify({
          message: `credenciales: ${id}`,
          content: b64encode(JSON.stringify({ credentials: state.creds }, null, 2) + "\n"),
          sha: state.credsSha ?? undefined,
        }),
      });
      state.credsSha = (await res.json()).content.sha;
      return;
    } catch (err) {
      // Cambió desde otro dispositivo: traer lo remoto y reaplicar solo este evento.
      if (attempt === 0 && (err.status === 409 || err.status === 422)) {
        const file = await fetchCredsFile();
        state.credsSha = file.sha;
        state.creds = file.creds;
        apply(state.creds);
        continue;
      }
      throw err;
    }
  }
}

async function fetchRepoJson(path) {
  const meta = await (await gh(`contents/${path}${ref()}`)).json();
  return { sha: meta.sha, data: JSON.parse(b64decode(meta.content)) };
}
const fetchStatusFile = () => fetchRepoJson("data/status.json");

// seen.json puede no existir todavía en el repo: se arranca vacío y se crea al primer guardado.
async function fetchSeenFile() {
  try { return await fetchRepoJson("data/seen.json"); }
  catch (err) { if (err.status === 404) return { sha: null, data: { seen: {} } }; throw err; }
}

// Une dos registros de vistos quedándose con la visita más reciente de cada evento.
function mergeSeen(a, b) {
  const out = { ...a };
  for (const [id, t] of Object.entries(b ?? {})) if (!out[id] || t > out[id]) out[id] = t;
  return out;
}

// Con repo configurado se lee por la API (siempre fresco); si falla, desde la copia
// servida por Pages, que puede tardar un minuto en reflejar los últimos commits.
async function loadData() {
  let events, statuses, seen = {}, sha = null, seenSha = null, source;
  if (state.config.owner && state.config.repo) {
    try {
      const [evRes, st, sn] = await Promise.all([
        gh(`contents/data/events.json${ref()}`, { headers: { Accept: "application/vnd.github.raw+json" } }),
        fetchStatusFile(),
        fetchSeenFile(),
      ]);
      events = (await evRes.json()).events;
      statuses = st.data.statuses;
      sha = st.sha;
      seen = sn.data.seen;
      seenSha = sn.sha;
      source = "github";
    } catch (err) {
      console.warn("Lectura por API falló, uso la copia local:", err);
    }
  }
  if (!events) {
    const [a, b, c] = await Promise.all([
      fetch("data/events.json", { cache: "no-store" }),
      fetch("data/status.json", { cache: "no-store" }),
      fetch("data/seen.json", { cache: "no-store" }).catch(() => null),
    ]);
    events = (await a.json()).events;
    statuses = (await b.json()).statuses;
    if (c?.ok) seen = (await c.json()).seen;
    source = "pages";
  }
  state.events = events.map((e) => ({ ...e, _start: new Date(e.start), _end: new Date(e.end ?? e.start) }));
  state.statuses = statuses ?? {};
  state.statusSha = sha;
  state.seen = mergeSeen(state.seen, seen);
  state.seenSha = seenSha;
  state.source = source;
  store.set("ctf.seen", state.seen);
}

// ---------- vistos ----------
// Se guardan siempre en este navegador y, con token, también en data/seen.json para
// que el celular y la PC coincidan. Las escrituras se agrupan para no hacer un commit por clic.

let seenTimer = null;

function markSeen(ids, { keep = true } = {}) {
  const now = new Date().toISOString();
  let dirty = false;
  for (const id of ids) {
    const ev = state.events.find((e) => e.id === id);
    if (ev && hasNews(ev)) {
      state.seen[id] = now;
      dirty = true;
      if (keep && state.onlyNews) state.newsKeep.add(id);
    }
  }
  if (!dirty) return false;
  store.set("ctf.seen", state.seen);
  if (canWrite()) {
    clearTimeout(seenTimer);
    seenTimer = setTimeout(() => {
      setSaving(1);
      saveChain = saveChain.then(() => persistSeen())
        .catch((err) => console.warn("No se pudieron sincronizar los vistos:", err))
        .finally(() => setSaving(-1));
    }, 4000);
  }
  return true;
}

async function persistSeen(retry = true) {
  const body = JSON.stringify({ seen: state.seen }, null, 2) + "\n";
  try {
    const res = await gh("contents/data/seen.json", {
      method: "PUT",
      body: JSON.stringify({
        message: "vistos: actualizar",
        content: b64encode(body),
        sha: state.seenSha ?? undefined,
        branch: state.config.branch || "main",
      }),
    });
    state.seenSha = (await res.json()).content.sha;
  } catch (err) {
    if (retry && (err.status === 409 || err.status === 422)) {
      const remote = await fetchSeenFile();
      state.seenSha = remote.sha;
      state.seen = mergeSeen(state.seen, remote.data.seen);
      store.set("ctf.seen", state.seen);
      return persistSeen(false);
    }
    throw err;
  }
}

function setSaving(delta) {
  state.saving += delta;
  document.getElementById("sync").hidden = state.saving === 0;
}

function applyStatus(id, st) {
  if (st === "sin-clasificar") delete state.statuses[id];
  else state.statuses[id] = { state: st, updated: new Date().toISOString() };
}

async function persistStatus(id, st, retry = true) {
  const body = JSON.stringify({ statuses: state.statuses }, null, 2) + "\n";
  try {
    const res = await gh("contents/data/status.json", {
      method: "PUT",
      body: JSON.stringify({
        message: `estado: ${id} → ${st}`,
        content: b64encode(body),
        sha: state.statusSha ?? undefined,
        branch: state.config.branch || "main",
      }),
    });
    state.statusSha = (await res.json()).content.sha;
  } catch (err) {
    // sha desactualizado (cambio desde otro dispositivo): traer lo remoto y reaplicar.
    if (retry && (err.status === 409 || err.status === 422)) {
      const remote = await fetchStatusFile();
      state.statusSha = remote.sha;
      state.statuses = remote.data.statuses ?? {};
      applyStatus(id, st);
      render();
      return persistStatus(id, st, false);
    }
    throw err;
  }
}

let saveChain = Promise.resolve();

function setStatus(id, st) {
  if (!canWrite()) {
    toast("Modo solo lectura: configurá tu token en ⚙ para guardar cambios.", "warn");
    return;
  }
  if (statusOf({ id }) === st) return;
  markSeen([id]); // clasificarlo cuenta como haberlo visto
  const prev = state.statuses[id];
  applyStatus(id, st);
  render();
  refreshOpenEvent(id);
  setSaving(1);
  saveChain = saveChain
    .then(() => persistStatus(id, st))
    .catch((err) => {
      if (prev) state.statuses[id] = prev; else delete state.statuses[id];
      render();
      refreshOpenEvent(id);
      toast(`No se pudo guardar: ${err.message}`, "error", 7000);
    })
    .finally(() => setSaving(-1));
}

async function uploadSuggestions(file) {
  if (!canWrite()) {
    toast("Para subir archivos necesitás configurar el token en ⚙.", "warn");
    return;
  }
  if (!/\.(md|json)$/i.test(file.name)) {
    toast("Solo se aceptan archivos .md o .json", "error");
    return;
  }
  const content = b64encode(await file.text());
  const base = file.name.replace(/[^\w.-]/g, "_");
  const names = [base, base.replace(/(\.\w+)$/, `-${Date.now()}$1`)];
  setSaving(1);
  try {
    for (const [i, name] of names.entries()) {
      try {
        await gh(`contents/inbox/${encodeURIComponent(name)}`, {
          method: "PUT",
          body: JSON.stringify({ message: `inbox: ${name}`, content, branch: state.config.branch || "main" }),
        });
        toast(`Subido inbox/${name}. La Action lo integra en ~1 min; después tocá ↻.`, "ok", 7000);
        return;
      } catch (err) {
        // 422 = ya existe un archivo con ese nombre: se reintenta con sufijo.
        if (err.status !== 422 || i === names.length - 1) throw err;
      }
    }
  } catch (err) {
    toast(`No se pudo subir: ${err.message}`, "error", 7000);
  } finally {
    setSaving(-1);
  }
}

// ---------- filtros ----------

function matchesQuery(ev) {
  const q = state.query.trim().toLowerCase();
  if (!q) return true;
  return [ev.name, ev.organizer, ev.format, ev.location, ev.description, ev.eligibility, ...(ev.tags ?? [])]
    .some((f) => f && f.toLowerCase().includes(q));
}

// Cambiar de filtro descarta los eventos que se mantenían visibles en modo novedades.
function setOnlyNews(on) {
  state.onlyNews = on;
  state.newsKeep.clear();
}

// En modo "novedades" se ignoran los filtros de estado: se quiere ver todo lo nuevo de un vistazo.
function filtered({ includePast }) {
  const now = Date.now();
  return state.events.filter((ev) =>
    (state.onlyNews ? hasNews(ev) || state.newsKeep.has(ev.id) : state.filters.has(statusOf(ev))) &&
    matchesQuery(ev) && (includePast || ev._end >= now));
}

// ---------- render: componentes ----------

function statusPicker(ev) {
  const current = statusOf(ev);
  return h("div", { class: "status-picker" },
    STATES.map((s) => h("button", {
      class: s.key === current ? "active" : "",
      style: colorVar(s.key),
      title: canWrite() ? `Marcar como "${s.label}"` : "Solo lectura",
      onclick: (e) => { e.stopPropagation(); setStatus(ev.id, s.key); },
    }, s.label)));
}

function metaText(ev) {
  return [
    ev.format,
    ev.location,
    ev.difficulty,
    ev.fee ? `costo: ${ev.fee}` : null,
    durationText(ev),
    addedText(ev),
  ].filter(Boolean).join(" · ");
}

function badges(ev) {
  return [
    ev.recommended ? h("span", { class: "badge rec", title: "Recomendación fuerte de la IA" }, "★ recomendado") : null,
    isLive(ev) ? h("span", { class: "badge live" }, "en curso") : null,
    isNew(ev) ? h("span", { class: "badge new", title: "Todavía no lo abriste" }, "● nuevo") : null,
    isChanged(ev) ? h("span", { class: "badge changed", title: "Cambió desde la última vez que lo viste" },
      `↻ cambió: ${changedText(ev)}`) : null,
    ctftimeBadge(ev),
    officialUnconfirmed(ev)
      ? h("span", { class: "badge warn", title: "Solo se pudo confirmar en CTFtime: el sitio oficial no respondía" }, "⚠ oficial sin confirmar")
      : null,
  ];
}

// Estado en CTFtime. Si la IA no informó "ctftime_rated" (datos viejos), un peso > 0 implica que puntúa.
function ctftimeInfo(ev) {
  if (!ev.ctftime_url) return { key: "off", mark: "", label: "fuera de CTFtime", title: "No figura en CTFtime" };
  const rated = ev.ctftime_rated ?? (ev.weight > 0 ? true : undefined);
  if (rated) {
    return { key: "rated", mark: "◆", label: `◆ CTFtime · puntúa${ev.weight ? ` · peso ${ev.weight}` : ""}`,
      title: "Figura en CTFtime y suma al rating" };
  }
  if (rated === false) return { key: "unrated", mark: "◇", label: "◇ CTFtime · no puntúa", title: "Figura en CTFtime pero no suma al rating" };
  return { key: "unknown", mark: "◇", label: "◇ CTFtime · puntuación por definir",
    title: "Figura en CTFtime con peso todavía no definido (Future weight: to be determined)" };
}

function ctftimeBadge(ev) {
  const ct = ctftimeInfo(ev);
  return h("span", { class: `badge ct ct-${ct.key}`, title: ct.title }, ct.label);
}

const officialUnconfirmed = (ev) => Array.isArray(ev.verified_by) && !ev.verified_by.includes("oficial");

const FIELD_LABEL = {
  start: "fechas", end: "fechas", url: "link", registration_deadline: "inscripción",
  fee: "costo", eligibility: "elegibilidad", location: "modalidad", team_size: "equipo",
};
const changedText = (ev) => [...new Set((ev.changed_fields ?? []).map((f) => FIELD_LABEL[f] ?? f))].join(", ") || "datos";

// Clase para resaltar a simple vista lo que no viste (lista y calendario).
const newsClass = (ev) => (isNew(ev) ? "unseen" : isChanged(ev) ? "updated" : "");

function deadlineLine(ev) {
  const dl = deadlineInfo(ev);
  return dl ? h("div", { class: `deadline ${dl.cls}` }, dl.text) : null;
}

// ---------- render: calendario ----------

// Último día (local) que ocupa el evento; si termina justo a las 00:00 no cuenta ese día.
function lastDay(ev) {
  const d = startOfDay(ev._end);
  return d.getTime() === ev._end.getTime() && ev._end > ev._start ? new Date(d.getTime() - 1) : ev._end;
}

const dayIndex = (weekStart, d) => Math.round((startOfDay(d) - weekStart) / DAY_MS);

// Eventos de más de una semana (p. ej. CTFs de dos meses): van en carriles finitos aparte,
// debajo de los normales, para no ocupar la primera fila de todas las semanas.
const LONG_DAYS = 7;
const isLongEvent = (ev) => ev._end - ev._start > LONG_DAYS * DAY_MS;

// Asignación greedy de carriles: cada barra va al primer carril libre desde su columna.
function assignLanes(segs) {
  const laneEnds = [];
  for (const s of segs) {
    s.lane = laneEnds.findIndex((end) => end < s.from);
    if (s.lane === -1) s.lane = laneEnds.length;
    laneEnds[s.lane] = s.to;
  }
  return laneEnds.length;
}

// Una semana es una grilla de 7 columnas: fila 1 para los números de día, los carriles de
// barras normales, los carriles finitos de eventos largos y una fila final para los "+N más".
function renderWeek(weekStart, month, events) {
  const MAX_LANES = 3, MAX_LONG_LANES = 2;
  const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7);
  const today = startOfDay(new Date()).getTime();

  const segs = events
    .filter((ev) => ev._start < weekEnd && lastDay(ev) >= weekStart)
    .map((ev) => {
      const a = dayIndex(weekStart, ev._start), b = dayIndex(weekStart, lastDay(ev));
      return { ev, from: Math.max(a, 0), to: Math.min(b, 6), clipL: a < 0, clipR: b > 6, long: isLongEvent(ev) };
    })
    .sort((p, q) => p.from - q.from || (q.to - q.from) - (p.to - p.from) || p.ev._start - q.ev._start);
  const short = segs.filter((s) => !s.long), long = segs.filter((s) => s.long);

  const lanes = Math.min(assignLanes(short), MAX_LANES);
  const longLanes = Math.min(assignLanes(long), MAX_LONG_LANES);
  const isHidden = (s) => s.lane >= (s.long ? MAX_LONG_LANES : MAX_LANES);
  const hidden = Array(7).fill(0);
  for (const s of segs) if (isHidden(s)) for (let c = s.from; c <= s.to; c++) hidden[c]++;

  const rows = lanes + longLanes + 2;
  const week = h("div", {
    class: "cal-week",
    style: `grid-template-rows: var(--num-h) repeat(${lanes}, var(--lane-h)) repeat(${longLanes}, var(--long-h)) auto 1fr`,
  });

  for (let c = 0; c < 7; c++) {
    const day = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + c);
    const cls = ["cal-day", day.getMonth() !== month && "other", day.getTime() === today && "today"];
    week.append(h("div", {
      class: cls.filter(Boolean).join(" "),
      style: `grid-column: ${c + 1}; grid-row: 1 / ${rows + 2}`,
    }, h("span", { class: "num" }, day.getDate())));
    if (hidden[c]) {
      const next = new Date(day.getTime() + DAY_MS);
      const onDay = segs.filter((s) => s.from <= c && s.to >= c).map((s) => s.ev);
      const hiddenNews = segs.some((s) => isHidden(s) && s.from <= c && s.to >= c && hasNews(s.ev));
      week.append(h("button", {
        class: `more ${hiddenNews ? "has-news" : ""}`, style: `grid-column: ${c + 1}; grid-row: ${rows}`,
        title: hiddenNews ? "Hay novedades entre los ocultos" : null,
        onclick: () => openDay(day, onDay.filter((ev) => ev._start < next)),
      }, hiddenNews ? `● +${hidden[c]} más` : `+${hidden[c]} más`));
    }
  }

  for (const s of segs.filter((s) => !isHidden(s))) {
    const st = statusOf(s.ev);
    const ct = ctftimeInfo(s.ev);
    const row = s.long ? lanes + s.lane + 2 : s.lane + 2;
    week.append(h("button", {
      class: ["ev-bar", st, newsClass(s.ev), s.long && "ev-long", s.clipL && "clip-l", s.clipR && "clip-r"].filter(Boolean).join(" "),
      style: `${colorVar(st)}; grid-column: ${s.from + 1} / ${s.to + 2}; grid-row: ${row}`,
      title: [s.ev.name, whenText(s.ev), STATE_LABEL[st], ct.label.replace(/^[◆◇] /, ""),
        isNew(s.ev) && "nuevo (sin abrir)", isChanged(s.ev) && `cambió: ${changedText(s.ev)}`].filter(Boolean).join(" — "),
      onclick: () => openEvent(s.ev.id),
    },
    isNew(s.ev) ? h("span", { class: "news-mark" }, "● ") : isChanged(s.ev) ? h("span", { class: "news-mark" }, "↻ ") : null,
    // Un evento largo muestra la hora solo donde arranca; en las semanas siguientes, hasta cuándo dura.
    s.long
      ? (s.clipL ? `↳ hasta ${fmtShort.format(s.ev._end)} · ` : `${fmtTime.format(s.ev._start)} `)
      : (s.clipL ? "↳ " : `${fmtTime.format(s.ev._start)} `),
    s.ev.recommended ? "★ " : "",
    ct.mark ? h("span", { class: `ct-mark ct-${ct.key}` }, `${ct.mark} `) : null,
    s.ev.name));
  }
  return week;
}

function calendarLegend() {
  return h("p", { class: "legend" },
    "★ recomendado · ● sin abrir · ↻ cambió · ◆ puntúa en CTFtime · ◇ en CTFtime sin puntuar · sin marca: fuera de CTFtime · ",
    h("span", { class: "legend-long" }, "línea fina"), ` = dura más de ${LONG_DAYS} días`);
}

function renderCalendar() {
  const y = state.month.getFullYear(), m = state.month.getMonth();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7; // semana arranca en lunes
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const weeks = Math.ceil((offset + daysInMonth) / 7);
  const events = filtered({ includePast: state.showPast });

  const grid = h("div", { class: "cal" },
    h("div", { class: "cal-dows" },
      ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"].map((d) => h("div", { class: "cal-dow" }, d))));
  for (let w = 0; w < weeks; w++) grid.append(renderWeek(new Date(y, m, 1 - offset + w * 7), m, events));

  const shift = (n) => { state.month = new Date(y, m + n, 1); render(); };
  return h("div", {},
    h("div", { class: "cal-head" },
      h("button", { class: "btn icon", onclick: () => shift(-1), title: "Mes anterior" }, "‹"),
      h("h2", {}, fmtMonth.format(state.month).replace(/^./, (c) => c.toUpperCase())),
      h("button", { class: "btn icon", onclick: () => shift(1), title: "Mes siguiente" }, "›"),
      h("button", { class: "btn", onclick: () => { state.month = startOfMonth(new Date()); render(); } }, "Hoy")),
    grid,
    calendarLegend());
}

// ---------- render: lista ----------

function renderList() {
  const events = filtered({ includePast: state.showPast });
  if (events.length === 0) {
    return h("div", { class: "empty" },
      state.events.length === 0
        ? "Todavía no hay eventos. Subí un archivo a inbox/ (o usá «Subir sugerencias») y esperá a que corra la Action."
        : state.onlyNews ? "Sin novedades: ya viste todo." : "Ningún evento coincide con los filtros.");
  }
  const groups = new Map();
  for (const ev of events) {
    const key = fmtMonth.format(ev._start);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(ev);
  }
  return h("div", {}, [...groups].map(([month, evs]) =>
    h("section", { class: "month-group" },
      h("h3", {}, month.replace(/^./, (c) => c.toUpperCase())),
      evs.map((ev) => {
        const st = statusOf(ev);
        return h("article", { class: `card ${st} ${newsClass(ev)}`, style: colorVar(st) },
          h("div", {},
            h("button", { class: "title", onclick: () => openEvent(ev.id) }, ev.name),
            badges(ev)),
          h("div", { class: "side" }, statusPicker(ev)),
          h("div", { class: "when" }, whenText(ev)),
          h("div", { class: "meta" }, metaText(ev)),
          deadlineLine(ev),
          ev.why ? h("p", { class: "why" }, ev.why) : null);
      }))));
}

// ---------- render: diálogos ----------

const dlgEvent = document.getElementById("dlg-event");

function openEvent(id) {
  const ev = state.events.find((e) => e.id === id);
  if (!ev) return;
  dlgEvent.dataset.id = id;
  // El detalle se arma antes de marcarlo como visto, para que todavía muestre qué cambió.
  dlgEvent.replaceChildren(eventDetail(ev));
  if (!dlgEvent.open) dlgEvent.showModal();
  if (markSeen([id])) render();
}

function refreshOpenEvent(id) {
  if (dlgEvent.open && dlgEvent.dataset.id === id) openEvent(id);
}

// Popup con todos los datos del evento, agrupados en tarjetas de propiedades.
function eventDetail(ev) {
  const stamp = (iso) => `${fmtDate.format(new Date(iso))} ${fmtTime.format(new Date(iso))}`;
  const groups = [
    ["dates", "Fechas", [
      ["Inicio", fmtFull.format(ev._start)],
      ["Fin", ev._end > ev._start ? fmtFull.format(ev._end) : null],
      ["Duración", durationText(ev)],
      ["Inscripción", deadlineInfo(ev)?.text],
    ]],
    ["comp", "Competencia", [
      ["Formato", ev.format],
      ["Modalidad", ev.location],
      ["Dificultad", ev.difficulty],
      ["Equipo", ev.team_size],
      ["Costo", ev.fee],
      ["Elegibilidad", ev.eligibility],
      ["Organiza", ev.organizer],
      ["Premios", ev.prizes],
    ]],
    ["sources", "Fuentes y seguimiento", [
      ["CTFtime", ctftimeInfo(ev).label.replace(/^[◆◇] /, "")],
      ["Verificado en", ev.verified_by?.map((s) => (s === "oficial" ? "sitio oficial" : "CTFtime")).join(" + ")],
      ["Sugerido el", ev.added],
      ["Último cambio", ev.changed ? `${stamp(ev.changed)} (${changedText(ev)})` : null],
      ["Visto por última vez", state.seen[ev.id] ? stamp(state.seen[ev.id]) : "nunca"],
    ]],
  ].map(([key, title, rows]) => [key, title, rows.filter(([, v]) => v != null && v !== "")]);

  const section = (title, text) => text ? h("section", { class: "dlg-section" },
    h("div", { class: "section-title" }, title), h("p", { class: "desc" }, text)) : null;
  const st = statusOf(ev);

  return h("div", { class: "dlg-body" },
    h("header", { class: "dlg-head", style: colorVar(st) },
      h("button", { class: "btn icon dlg-close", onclick: () => dlgEvent.close(), title: "Cerrar" }, "✕"),
      h("h2", {}, ev.name),
      h("div", { class: "dlg-badges" }, badges(ev)),
      h("div", { class: "dlg-when" }, whenText(ev)),
      h("div", { class: "dlg-status" }, h("span", { class: "dlg-label" }, "Estado"), statusPicker(ev))),
    credsSection(ev),
    h("div", { class: "prop-groups" }, groups.filter(([, , rows]) => rows.length).map(([key, title, rows]) =>
      h("section", { class: `prop-group pg-${key}` },
        h("div", { class: "prop-title" }, title),
        h("dl", { class: "kv" }, rows.flatMap(([k, v]) => [h("dt", {}, k), h("dd", {}, String(v))]))))),
    ev.tags?.length ? h("div", { class: "tags" }, ev.tags.map((t) => h("span", { class: "tag" }, t))) : null,
    section("Descripción", ev.description),
    section("Por qué te puede servir", ev.why),
    section("Valor profesional", ev.career_value),
    h("footer", { class: "links" },
      link(ev.url, "Sitio oficial ↗"),
      link(ev.ctftime_url, "CTFtime ↗")));
}

// Tarjeta "🔒 Mis credenciales": solo existe con token. Se redibuja en el lugar
// (sin rehacer el popup) para no perder el scroll al editar.
function credsSection(ev) {
  if (!canWrite()) return null;
  const box = h("section", { class: "creds" },
    h("div", { class: "prop-title" }, "🔒 Mis credenciales", h("span", { class: "creds-where" }, ` · privadas en ${privateRepo()}`)));
  const redraw = () => box.replaceWith(credsSection(ev));

  if (state.credsError) {
    box.append(h("p", { class: "creds-msg" }, state.credsError));
    return box;
  }
  if (!state.creds) {
    box.append(h("p", { class: "creds-msg" }, "Cargando…"));
    return box;
  }

  const c = state.creds[ev.id];
  if (state.credsEditing === ev.id) {
    box.append(credsForm(ev, c, redraw));
  } else if (c) {
    box.append(credsView(ev, c, redraw));
  } else {
    box.append(h("button", {
      class: "btn", onclick: () => { state.credsEditing = ev.id; redraw(); },
    }, "+ Agregar credenciales"));
  }
  return box;
}

function copyButton(text, what) {
  return h("button", {
    class: "btn ghost icon creds-copy", title: `Copiar ${what}`,
    onclick: async () => {
      try { await navigator.clipboard.writeText(text); toast(`${what[0].toUpperCase()}${what.slice(1)} copiado.`, "ok", 2000); }
      catch { toast("No se pudo copiar al portapapeles.", "error"); }
    },
  }, "⧉");
}

function credsView(ev, c, redraw) {
  const pwd = h("span", { class: "creds-secret" }, "••••••••");
  let shown = false;
  const rows = [
    c.username ? ["Usuario", h("span", {}, c.username), copyButton(c.username, "usuario")] : null,
    c.password ? ["Contraseña", pwd,
      h("button", {
        class: "btn ghost icon creds-copy", title: "Mostrar u ocultar",
        onclick: () => { shown = !shown; pwd.textContent = shown ? c.password : "••••••••"; },
      }, "👁"),
      copyButton(c.password, "contraseña")] : null,
    c.team ? ["Equipo", h("span", {}, c.team)] : null,
    c.notes ? ["Notas", h("span", { class: "creds-notes" }, c.notes)] : null,
  ].filter(Boolean);

  return h("div", {},
    h("dl", { class: "kv creds-kv" }, rows.flatMap(([k, ...v]) => [h("dt", {}, k), h("dd", {}, v)])),
    h("div", { class: "creds-actions" },
      h("button", { class: "btn", onclick: () => { state.credsEditing = ev.id; redraw(); } }, "Editar"),
      h("button", {
        class: "btn danger",
        onclick: async () => {
          if (!confirm(`¿Borrar las credenciales de ${ev.name}?`)) return;
          await runCredsSave(ev.id, null, "Credenciales borradas.");
          redraw();
        },
      }, "Borrar")));
}

function credsForm(ev, c = {}, redraw) {
  const field = (name, label, type = "text") => h("label", {},
    label, h("input", { name, type, value: c[name] ?? "", autocomplete: type === "password" ? "new-password" : "off", spellcheck: "false" }));
  const form = h("form", {
    class: "creds-form",
    onsubmit: async (e) => {
      e.preventDefault();
      const entry = {};
      for (const k of ["username", "password", "team", "notes"]) {
        const v = form.elements[k].value.trim();
        if (v) entry[k] = v;
      }
      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      const ok = await runCredsSave(ev.id, Object.keys(entry).length ? entry : null, "Credenciales guardadas en el repo privado.");
      btn.disabled = false;
      if (ok) { state.credsEditing = null; redraw(); }
    },
  },
  field("username", "Usuario o email"),
  field("password", "Contraseña", "password"),
  field("team", "Equipo"),
  h("label", { class: "wide" }, "Notas", h("textarea", { name: "notes", rows: 2, spellcheck: "false" }, c.notes ?? "")),
  h("div", { class: "creds-actions wide" },
    h("button", { type: "button", class: "btn", onclick: () => { state.credsEditing = null; redraw(); } }, "Cancelar"),
    h("button", { type: "submit", class: "btn primary" }, "Guardar")));
  return form;
}

async function runCredsSave(id, entry, okMsg) {
  const prev = state.creds[id];
  setSaving(1);
  try {
    await saveCreds(id, entry);
    toast(okMsg, "ok");
    return true;
  } catch (err) {
    if (prev) state.creds[id] = prev; else delete state.creds[id];
    toast(`No se pudieron guardar las credenciales: ${err.message}`, "error", 7000);
    return false;
  } finally {
    setSaving(-1);
  }
}

function openDay(day, events) {
  dlgEvent.dataset.id = "";
  dlgEvent.replaceChildren(h("div", { class: "dlg-body" },
    h("header", { class: "dlg-head" },
      h("button", { class: "btn icon dlg-close", onclick: () => dlgEvent.close(), title: "Cerrar" }, "✕"),
      h("h2", {}, fmtDate.format(day).replace(/^./, (c) => c.toUpperCase()))),
    h("ul", { class: "day-list" }, events.map((ev) => {
      const st = statusOf(ev);
      return h("li", {}, h("button", {
        class: `ev-chip ${st} ${newsClass(ev)}`, style: colorVar(st), onclick: () => openEvent(ev.id),
      }, isNew(ev) ? "● " : isChanged(ev) ? "↻ " : "", `${ev.name} — ${STATE_LABEL[st]}`));
    }))));
  if (!dlgEvent.open) dlgEvent.showModal();
}

dlgEvent.addEventListener("click", (e) => { if (e.target === dlgEvent) dlgEvent.close(); });
dlgEvent.addEventListener("close", () => { state.credsEditing = null; });

// ---------- render: principal ----------

function renderFilters() {
  const now = Date.now();
  const counts = Object.fromEntries(STATES.map((s) => [s.key, 0]));
  const visible = state.events.filter((ev) => state.showPast || ev._end >= now);
  for (const ev of visible) counts[statusOf(ev)]++;
  const news = visible.filter(hasNews);

  const newsChip = h("button", {
    class: `chip-filter news ${state.onlyNews ? "on" : ""}`,
    title: "Ver solo lo que no abriste o cambió desde la última vez",
    disabled: news.length === 0 && !state.onlyNews,
    onclick: () => { setOnlyNews(!state.onlyNews); render(); },
  }, "✦ Novedades", h("span", { class: "n" }, news.length));

  // "Marcar vistas" es explícito: esas sí salen de la lista en el momento.
  const markAll = news.length ? h("button", {
    class: "chip-filter", title: "Marcar todas las novedades como vistas",
    onclick: () => {
      if (!confirm(`¿Marcar ${news.length} novedades como vistas?`)) return;
      markSeen(news.map((e) => e.id), { keep: false });
      render();
    },
  }, "✓ marcar vistas") : null;

  const statusChips = STATES.map((s) => h("button", {
    class: `chip-filter ${state.filters.has(s.key) && !state.onlyNews ? "on" : ""}`,
    style: colorVar(s.key),
    onclick: () => {
      setOnlyNews(false);
      state.filters.has(s.key) ? state.filters.delete(s.key) : state.filters.add(s.key);
      store.set("ctf.filters", [...state.filters]);
      render();
    },
  }, h("span", { class: "dot" }), s.label, h("span", { class: "n" }, counts[s.key])));

  document.getElementById("filters").replaceChildren(newsChip, markAll ?? "", ...statusChips);
}

function renderStats() {
  const now = Date.now();
  const upcoming = state.events.filter((e) => e._end >= now);
  const pending = upcoming.filter((e) => statusOf(e) === "sin-clasificar").length;
  const fresh = upcoming.filter(isNew).length;
  const changed = upcoming.filter(isChanged).length;
  const next = upcoming.filter((e) => statusOf(e) === "inscripto").sort((a, b) => a._start - b._start)[0];
  document.getElementById("stats").textContent = [
    `${upcoming.length} próximos`,
    `${pending} sin clasificar`,
    fresh ? `${fresh} sin abrir` : null,
    changed ? `${changed} con cambios` : null,
    next ? `siguiente inscripto: ${next.name} (${fmtDate.format(next._start)})` : null,
  ].filter(Boolean).join(" · ");
}

function renderMode() {
  const el = document.getElementById("mode");
  const { owner, repo } = state.config;
  el.textContent = canWrite() ? `edición · ${owner}/${repo}` : "solo lectura";
  el.className = `mode ${canWrite() ? "rw" : ""}`;
  el.title = canWrite()
    ? "Los cambios se guardan como commits en el repo"
    : "Configurá tu token en ⚙ para poder cambiar estados";
}

function render() {
  for (const b of document.querySelectorAll(".seg-btn")) b.classList.toggle("active", b.dataset.view === state.view);
  renderMode();
  renderFilters();
  renderStats();
  document.getElementById("main").replaceChildren(state.view === "calendar" ? renderCalendar() : renderList());
}

// ---------- configuración ----------

const CONFIG_KEYS = ["owner", "repo", "branch", "token", "privateRepo"];
const dlgSettings = document.getElementById("dlg-settings");
const settingsForm = document.getElementById("settings-form");

function openSettings() {
  for (const k of CONFIG_KEYS) settingsForm.elements[k].value = state.config[k] ?? "";
  dlgSettings.showModal();
}

dlgSettings.addEventListener("close", async () => {
  if (dlgSettings.returnValue !== "save") return;
  const cfg = {};
  for (const k of CONFIG_KEYS) {
    const v = settingsForm.elements[k].value.trim();
    if (v) cfg[k] = v;
  }
  state.config = { branch: "main", ...cfg };
  store.set("ctf.config", state.config);
  await reload();
  toast(canWrite() ? "Configuración guardada. Modo edición activo." : "Configuración guardada (solo lectura).", "ok");
});

document.getElementById("btn-forget").addEventListener("click", () => {
  settingsForm.elements.token.value = "";
  delete state.config.token;
  state.creds = null; // sin token, las credenciales salen de memoria
  state.credsError = null;
  store.set("ctf.config", state.config);
  dlgSettings.close();
  render();
  toast("Token borrado de este navegador.", "ok");
});

// ---------- arranque ----------

async function reload() {
  try {
    await Promise.all([loadData(), loadCreds()]);
    if (state.source === "pages" && canWrite()) {
      toast("No se pudo leer el repo por la API; mostrando la copia publicada.", "warn");
    }
  } catch (err) {
    toast(`Error cargando datos: ${err.message}`, "error", 8000);
  }
  render();
}

for (const b of document.querySelectorAll(".seg-btn")) {
  b.addEventListener("click", () => { state.view = b.dataset.view; store.set("ctf.view", state.view); render(); });
}
document.getElementById("search").addEventListener("input", (e) => { state.query = e.target.value; render(); });
const pastBox = document.getElementById("show-past");
pastBox.checked = state.showPast;
pastBox.addEventListener("change", () => { state.showPast = pastBox.checked; store.set("ctf.showPast", state.showPast); render(); });
document.getElementById("btn-settings").addEventListener("click", openSettings);
document.getElementById("btn-refresh").addEventListener("click", reload);
const fileInput = document.getElementById("file-upload");
document.getElementById("btn-upload").addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  fileInput.value = "";
  if (file) uploadSuggestions(file);
});

reload();
