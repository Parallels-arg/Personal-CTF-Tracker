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

function overlapping(ev) {
  return state.events
    .filter((o) => o.id !== ev.id && o._start < ev._end && ev._start < o._end)
    .sort((a, b) => a._start - b._start);
}

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

async function gh(path, opts = {}) {
  const { owner, repo, token } = state.config;
  const headers = { Accept: "application/vnd.github+json", ...opts.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (opts.body) headers["Content-Type"] = "application/json";
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/${path}`, {
    ...opts, headers, cache: "no-store",
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

function markSeen(ids) {
  const now = new Date().toISOString();
  let dirty = false;
  for (const id of ids) {
    const ev = state.events.find((e) => e.id === id);
    if (ev && hasNews(ev)) { state.seen[id] = now; dirty = true; }
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

// En modo "novedades" se ignoran los filtros de estado: se quiere ver todo lo nuevo de un vistazo.
function filtered({ includePast }) {
  const now = Date.now();
  return state.events.filter((ev) =>
    (state.onlyNews ? hasNews(ev) : state.filters.has(statusOf(ev))) &&
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
    ev.weight != null ? `peso ${ev.weight}` : null,
    ev.fee,
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
  ];
}

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

// Una semana es una grilla de 7 columnas: fila 1 para los números de día, una fila por
// carril de barras y una final para los "+N más". Las barras multi-día abarcan varias columnas.
function renderWeek(weekStart, month, events) {
  const MAX_LANES = 3;
  const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7);
  const today = startOfDay(new Date()).getTime();

  const segs = events
    .filter((ev) => ev._start < weekEnd && lastDay(ev) >= weekStart)
    .map((ev) => {
      const a = dayIndex(weekStart, ev._start), b = dayIndex(weekStart, lastDay(ev));
      return { ev, from: Math.max(a, 0), to: Math.min(b, 6), clipL: a < 0, clipR: b > 6 };
    })
    .sort((p, q) => p.from - q.from || (q.to - q.from) - (p.to - p.from) || p.ev._start - q.ev._start);

  // Asignación greedy de carriles: cada barra va al primer carril libre desde su columna.
  const laneEnds = [];
  for (const s of segs) {
    s.lane = laneEnds.findIndex((end) => end < s.from);
    if (s.lane === -1) s.lane = laneEnds.length;
    laneEnds[s.lane] = s.to;
  }
  const lanes = Math.min(laneEnds.length, MAX_LANES);
  const hidden = Array(7).fill(0);
  for (const s of segs) if (s.lane >= MAX_LANES) for (let c = s.from; c <= s.to; c++) hidden[c]++;

  const rows = lanes + 2;
  const week = h("div", {
    class: "cal-week",
    style: `grid-template-rows: var(--num-h) repeat(${lanes}, var(--lane-h)) auto 1fr`,
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
      const hiddenNews = segs.some((s) => s.lane >= MAX_LANES && s.from <= c && s.to >= c && hasNews(s.ev));
      week.append(h("button", {
        class: `more ${hiddenNews ? "has-news" : ""}`, style: `grid-column: ${c + 1}; grid-row: ${rows}`,
        title: hiddenNews ? "Hay novedades entre los ocultos" : null,
        onclick: () => openDay(day, onDay.filter((ev) => ev._start < next)),
      }, hiddenNews ? `● +${hidden[c]} más` : `+${hidden[c]} más`));
    }
  }

  for (const s of segs.filter((s) => s.lane < MAX_LANES)) {
    const st = statusOf(s.ev);
    week.append(h("button", {
      class: ["ev-bar", st, newsClass(s.ev), s.clipL && "clip-l", s.clipR && "clip-r"].filter(Boolean).join(" "),
      style: `${colorVar(st)}; grid-column: ${s.from + 1} / ${s.to + 2}; grid-row: ${s.lane + 2}`,
      title: [s.ev.name, whenText(s.ev), STATE_LABEL[st],
        isNew(s.ev) && "nuevo (sin abrir)", isChanged(s.ev) && `cambió: ${changedText(s.ev)}`].filter(Boolean).join(" — "),
      onclick: () => openEvent(s.ev.id),
    },
    isNew(s.ev) ? h("span", { class: "news-mark" }, "● ") : isChanged(s.ev) ? h("span", { class: "news-mark" }, "↻ ") : null,
    s.clipL ? "↳ " : `${fmtTime.format(s.ev._start)} `, s.ev.recommended ? "★ " : "", s.ev.name));
  }
  return week;
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
    grid);
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
      h("h3", {}, month),
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

function eventDetail(ev) {
  const rows = [
    ["Inicio", fmtFull.format(ev._start)],
    ["Fin", fmtFull.format(ev._end)],
    ["Duración", durationText(ev)],
    ["Formato", ev.format],
    ["Modalidad", ev.location],
    ["Dificultad", ev.difficulty],
    ["Inscripción", deadlineInfo(ev)?.text],
    ["Costo", ev.fee],
    ["Equipo", ev.team_size],
    ["Elegibilidad", ev.eligibility],
    ["Peso CTFtime", ev.weight],
    ["Organiza", ev.organizer],
    ["Premios", ev.prizes],
    ["Sugerido el", ev.added],
    ["Último cambio", ev.changed
      ? `${fmtDate.format(new Date(ev.changed))} ${fmtTime.format(new Date(ev.changed))} (${changedText(ev)})` : null],
    ["Visto por última vez", state.seen[ev.id]
      ? `${fmtDate.format(new Date(state.seen[ev.id]))} ${fmtTime.format(new Date(state.seen[ev.id]))}` : "nunca"],
  ].filter(([, v]) => v != null && v !== "");

  const section = (title, text) => text ? [h("div", { class: "section-title" }, title), h("p", { class: "desc" }, text)] : null;

  return h("div", { class: "dlg-body" },
    h("button", { class: "btn icon dlg-close", onclick: () => dlgEvent.close(), title: "Cerrar" }, "✕"),
    h("h2", {}, ev.name, badges(ev)),
    h("div", { class: "when" }, whenText(ev)),
    h("dl", { class: "kv" }, rows.flatMap(([k, v]) => [h("dt", {}, k), h("dd", {}, String(v))])),
    ev.tags?.length ? h("div", { class: "tags" }, ev.tags.map((t) => h("span", { class: "tag" }, t))) : null,
    section("Descripción", ev.description),
    section("Por qué te puede servir", ev.why),
    section("Valor profesional", ev.career_value),
    h("div", { class: "section-title" }, "Estado"),
    statusPicker(ev),
    overlapTable(ev),
    h("div", { class: "links" },
      link(ev.url, "Sitio oficial ↗"),
      link(ev.ctftime_url, "CTFtime ↗")));
}

// Comparación lado a lado con todo lo que se pisa en fechas, incluidos descartados (en gris).
function overlapTable(ev) {
  const others = overlapping(ev);
  if (others.length === 0) return null;
  const row = (e, self) => {
    const st = statusOf(e);
    return h("tr", { class: `${st} ${self ? "self" : ""}`, style: colorVar(st) },
      h("td", {}, self ? h("strong", {}, e.name) : h("button", { class: "linkish", onclick: () => openEvent(e.id) }, e.name),
        e.recommended ? " ★" : ""),
      h("td", { class: "mono" }, whenText(e)),
      h("td", {}, [e.format, e.location, e.difficulty].filter(Boolean).join(" · ")),
      h("td", {}, h("span", { class: "st-pill" }, STATE_LABEL[st])));
  };
  return [
    h("div", { class: "section-title" }, `Se superpone con (${others.length})`),
    h("div", { class: "table-wrap" },
      h("table", { class: "overlap" },
        h("thead", {}, h("tr", {}, ["Evento", "Cuándo", "Tipo", "Estado"].map((t) => h("th", {}, t)))),
        h("tbody", {}, row(ev, true), others.map((e) => row(e, false))))),
  ];
}

function openDay(day, events) {
  dlgEvent.dataset.id = "";
  dlgEvent.replaceChildren(h("div", { class: "dlg-body" },
    h("button", { class: "btn icon dlg-close", onclick: () => dlgEvent.close() }, "✕"),
    h("h2", {}, fmtDate.format(day)),
    h("ul", { class: "day-list" }, events.map((ev) => {
      const st = statusOf(ev);
      return h("li", {}, h("button", {
        class: `ev-chip ${st} ${newsClass(ev)}`, style: colorVar(st), onclick: () => openEvent(ev.id),
      }, isNew(ev) ? "● " : isChanged(ev) ? "↻ " : "", `${ev.name} — ${STATE_LABEL[st]}`));
    }))));
  if (!dlgEvent.open) dlgEvent.showModal();
}

dlgEvent.addEventListener("click", (e) => { if (e.target === dlgEvent) dlgEvent.close(); });

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
    onclick: () => { state.onlyNews = !state.onlyNews; render(); },
  }, "✦ Novedades", h("span", { class: "n" }, news.length));

  const markAll = news.length ? h("button", {
    class: "chip-filter", title: "Marcar todas las novedades como vistas",
    onclick: () => {
      if (!confirm(`¿Marcar ${news.length} novedades como vistas?`)) return;
      markSeen(news.map((e) => e.id));
      render();
    },
  }, "✓ marcar vistas") : null;

  const statusChips = STATES.map((s) => h("button", {
    class: `chip-filter ${state.filters.has(s.key) && !state.onlyNews ? "on" : ""}`,
    style: colorVar(s.key),
    onclick: () => {
      state.onlyNews = false;
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

const dlgSettings = document.getElementById("dlg-settings");
const settingsForm = document.getElementById("settings-form");

function openSettings() {
  for (const k of ["owner", "repo", "branch", "token"]) settingsForm.elements[k].value = state.config[k] ?? "";
  dlgSettings.showModal();
}

dlgSettings.addEventListener("close", async () => {
  if (dlgSettings.returnValue !== "save") return;
  const cfg = {};
  for (const k of ["owner", "repo", "branch", "token"]) {
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
  store.set("ctf.config", state.config);
  dlgSettings.close();
  render();
  toast("Token borrado de este navegador.", "ok");
});

// ---------- arranque ----------

async function reload() {
  try {
    await loadData();
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
