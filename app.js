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
const EXTRA_DEFAULTS = { location: "", difficulty: "", format: "", ctftime: "", recommended: false, sort: "date" };

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
  overrides: {},      // { idEvento: { start, end, updated } } — fechas corregidas a mano
  overridesSha: null,
  datesEditing: null, // id del evento cuyas fechas se están editando
  creds: null,        // { idEvento: { username, password, team, notes, updated } } — solo en memoria
  credsSha: null,
  credsError: null,
  credsEditing: null, // id del evento cuyas credenciales se están editando
  // Eventos vistos mientras el filtro de novedades está activo: siguen en la lista hasta
  // que se cambie de filtro, así se pueden recorrer las novedades una por una.
  newsKeep: new Set(),
  navIds: [],         // secuencia que recorren ‹ › en el popup
  source: null,
  config: { branch: "main", ...detectRepo(), ...store.get("ctf.config", {}) },
  view: store.get("ctf.view", innerWidth < 720 ? "list" : "calendar"),
  filters: new Set(store.get("ctf.filters", ["sin-clasificar", "interesado", "inscripto"])),
  showPast: store.get("ctf.showPast", false),
  hideIneligible: store.get("ctf.hideIneligible", false),
  compact: store.get("ctf.compact", false),
  extra: { ...EXTRA_DEFAULTS, ...store.get("ctf.extra", {}) }, // "más filtros" y orden
  moreOpen: false,
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
  if (!ev._deadline) return null;
  const dl = new Date(ev._deadline);
  const left = (dl - Date.now()) / DAY_MS;
  if (left < 0) return { text: `inscripción cerrada (${fmtDate.format(dl)})`, cls: "closed" };
  return { text: `inscripción hasta ${fmtDate.format(dl)} ${fmtTime.format(dl)}`, cls: left < 3 ? "urgent" : "" };
}

const fmtShort = new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "2-digit" });
const addedText = (ev) => ev.added ? `sugerido el ${fmtShort.format(new Date(`${ev.added}T12:00:00`))}` : null;

// "en 3 días", "en 5 h", "hace 20 min": tiempo relativo legible.
function relTime(d) {
  const diff = d - Date.now();
  const abs = Math.abs(diff);
  const mins = Math.round(abs / 60000), hours = Math.round(abs / 3600000), days = Math.round(abs / DAY_MS);
  const amount = mins < 60 ? `${Math.max(mins, 1)} min` : hours < 48 ? `${hours} h` : `${days} días`;
  return diff >= 0 ? `en ${amount}` : `hace ${amount}`;
}

function isLive(ev) {
  const now = Date.now();
  return ev._start <= now && ev._end >= now;
}

// action = { label, fn }: botón opcional dentro del aviso (p. ej. "Deshacer").
function toast(msg, kind = "info", ms = 4000, action = null) {
  const el = h("div", { class: `toast ${kind}` }, msg,
    action ? h("button", { class: "toast-action", onclick: () => { el.remove(); action.fn(); } }, action.label) : null);
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

// overrides.json: fechas corregidas a mano. Vive aparte de events.json para que una
// sugerencia nueva de la IA nunca pise la corrección.
async function fetchOverridesFile() {
  try { return await fetchRepoJson("data/overrides.json"); }
  catch (err) { if (err.status === 404) return { sha: null, data: { overrides: {} } }; throw err; }
}

// Fechas efectivas del evento: la corrección manual, si existe, gana sobre lo que dijo la IA.
// Una corrección puede tocar solo las fechas (start + end), solo el cierre de inscripción, o ambos.
function applyOverride(ev) {
  const o = state.overrides[ev.id];
  ev._start = new Date(o?.start ?? ev.start);
  ev._end = new Date(o?.end ?? o?.start ?? ev.end ?? ev.start);
  ev._deadline = o?.registration_deadline ?? ev.registration_deadline ?? null;
  ev._override = o ?? null;
  ev._manualDates = Boolean(o?.start || o?.end);
  ev._manualDeadline = Boolean(o?.registration_deadline);
  return ev;
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
  let events, statuses, seen = {}, overrides = {}, sha = null, seenSha = null, overridesSha = null, source;
  if (state.config.owner && state.config.repo) {
    try {
      const [evRes, st, sn, ov] = await Promise.all([
        gh(`contents/data/events.json${ref()}`, { headers: { Accept: "application/vnd.github.raw+json" } }),
        fetchStatusFile(),
        fetchSeenFile(),
        fetchOverridesFile(),
      ]);
      events = (await evRes.json()).events;
      statuses = st.data.statuses;
      sha = st.sha;
      seen = sn.data.seen;
      seenSha = sn.sha;
      overrides = ov.data.overrides;
      overridesSha = ov.sha;
      source = "github";
    } catch (err) {
      console.warn("Lectura por API falló, uso la copia local:", err);
    }
  }
  if (!events) {
    const [a, b, c, o] = await Promise.all([
      fetch("data/events.json", { cache: "no-store" }),
      fetch("data/status.json", { cache: "no-store" }),
      fetch("data/seen.json", { cache: "no-store" }).catch(() => null),
      fetch("data/overrides.json", { cache: "no-store" }).catch(() => null),
    ]);
    events = (await a.json()).events;
    statuses = (await b.json()).statuses;
    if (c?.ok) seen = (await c.json()).seen;
    if (o?.ok) overrides = (await o.json()).overrides;
    source = "pages";
  }
  state.overrides = overrides ?? {};
  state.overridesSha = overridesSha;
  state.events = events.map((e) => applyOverride({ ...e }));
  state.statuses = statuses ?? {};
  state.statusSha = sha;
  state.seen = mergeSeen(state.seen, seen);
  state.seenSha = seenSha;
  state.source = source;
  store.set("ctf.seen", state.seen);
}

// ---------- fechas corregidas a mano ----------

// entry = { start, end } en ISO; null restaura las fechas que informó la IA.
async function saveOverride(id, entry) {
  const apply = (map) => {
    if (entry) map[id] = { ...entry, updated: new Date().toISOString() };
    else delete map[id];
  };
  apply(state.overrides);
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await gh("contents/data/overrides.json", {
        method: "PUT",
        body: JSON.stringify({
          message: entry ? `fechas: ${id} corregidas a mano` : `fechas: ${id} restauradas`,
          content: b64encode(JSON.stringify({ overrides: state.overrides }, null, 2) + "\n"),
          sha: state.overridesSha ?? undefined,
          branch: state.config.branch || "main",
        }),
      });
      state.overridesSha = (await res.json()).content.sha;
      return;
    } catch (err) {
      // Cambió desde otro dispositivo: traer lo remoto y reaplicar solo este evento.
      if (attempt === 0 && (err.status === 409 || err.status === 422)) {
        const remote = await fetchOverridesFile();
        state.overridesSha = remote.sha;
        state.overrides = remote.data.overrides ?? {};
        apply(state.overrides);
        continue;
      }
      throw err;
    }
  }
}

async function setOverride(ev, entry) {
  if (!canWrite()) {
    toast("Modo solo lectura: configurá tu token en ⚙ para editar fechas.", "warn");
    return false;
  }
  const prev = state.overrides[ev.id];
  setSaving(1);
  try {
    await saveOverride(ev.id, entry);
    for (const e of state.events) applyOverride(e); // por si llegaron cambios de otro dispositivo
    toast(entry ? "Fechas actualizadas." : "Se restauraron las fechas originales.", "ok");
    return true;
  } catch (err) {
    if (prev) state.overrides[ev.id] = prev; else delete state.overrides[ev.id];
    applyOverride(ev);
    toast(`No se pudieron guardar las fechas: ${err.message}`, "error", 7000);
    return false;
  } finally {
    setSaving(-1);
  }
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

function setStatus(id, st, { undoable = true } = {}) {
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
  if (undoable) {
    // Deshacer guarda el estado anterior (es otro commit, el cambio ya se envió).
    const name = state.events.find((e) => e.id === id)?.name ?? id;
    toast(`${name} → ${STATE_LABEL[st]}`, "ok", 6000, {
      label: "Deshacer",
      fn: () => setStatus(id, prev?.state ?? "sin-clasificar", { undoable: false }),
    });
  }
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
// ---------- más filtros y orden ----------

const SORT_LABEL = { date: "fecha", recommended: "recomendados primero", weight: "peso CTFtime", deadline: "cierre de inscripción" };
const AR_PLACES = /argentin|buenos aires|caba|lan[uú]s|la plata|c[oó]rdoba|rosario|mendoza|tucum[aá]n|san justo|unlam/i;

const isOnlineOnly = (ev) => /online/i.test(ev.location ?? "") && !/h[ií]brido|presencial/i.test(ev.location ?? "");
const CT_FILTER = { puntua: "rated", "no-puntua": "unrated", "por-definir": "unknown", fuera: "off" };

function matchesExtra(ev) {
  const x = state.extra;
  if (x.location === "online" && !isOnlineOnly(ev)) return false;
  if (x.location === "presencial" && (!ev.location || isOnlineOnly(ev))) return false;
  if (x.location === "argentina" && !AR_PLACES.test(`${ev.location ?? ""} ${ev.organizer ?? ""}`)) return false;
  if (x.difficulty === "sin-dato" ? ev.difficulty : x.difficulty && (ev.difficulty ?? "").toLowerCase() !== x.difficulty) return false;
  if (x.format && (ev.format ?? "").toLowerCase() !== x.format) return false;
  if (x.ctftime && ctftimeInfo(ev).key !== CT_FILTER[x.ctftime]) return false;
  if (x.recommended && !ev.recommended) return false;
  return true;
}

const activeExtraCount = () =>
  ["location", "difficulty", "format", "ctftime"].filter((k) => state.extra[k]).length + (state.extra.recommended ? 1 : 0);

// Orden de la lista y de la navegación ‹ ›; el calendario siempre es cronológico.
function sortEvents(list) {
  const byDate = (a, b) => a._start - b._start;
  const cmp = {
    date: byDate,
    recommended: (a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0) || byDate(a, b),
    weight: (a, b) => (b.weight ?? -1) - (a.weight ?? -1) || byDate(a, b),
    deadline: (a, b) => {
      const da = a._deadline && new Date(a._deadline) > Date.now() ? new Date(a._deadline) : Infinity;
      const db = b._deadline && new Date(b._deadline) > Date.now() ? new Date(b._deadline) : Infinity;
      return da - db || byDate(a, b);
    },
  }[state.extra.sort] ?? byDate;
  return [...list].sort(cmp);
}

function renderMoreFilters() {
  const el = document.getElementById("more-filters");
  el.hidden = !state.moreOpen;
  if (!state.moreOpen) return;
  const set = (k, v) => { state.extra = { ...state.extra, [k]: v }; store.set("ctf.extra", state.extra); render(); };
  const select = (k, label, options) => h("label", {}, label,
    h("select", { onchange: (e) => set(k, e.target.value) },
      options.map(([v, text]) => h("option", { value: v, selected: state.extra[k] === v }, text))));
  el.replaceChildren(
    select("location", "Modalidad", [["", "todas"], ["online", "online"], ["presencial", "presencial o híbrido"], ["argentina", "en Argentina"]]),
    select("difficulty", "Dificultad", [["", "todas"], ["principiante", "principiante"], ["intermedio", "intermedio"], ["avanzado", "avanzado"], ["sin-dato", "sin dato"]]),
    select("format", "Formato", [["", "todos"], ["jeopardy", "jeopardy"], ["attack-defense", "attack-defense"], ["mixed", "mixto"], ["otro", "otro"]]),
    select("ctftime", "CTFtime", [["", "todos"], ["puntua", "puntúa"], ["por-definir", "puntuación por definir"], ["no-puntua", "no puntúa"], ["fuera", "fuera de CTFtime"]]),
    select("sort", "Ordenar la lista por", Object.entries(SORT_LABEL)),
    h("label", { class: "check" },
      h("input", { type: "checkbox", checked: state.extra.recommended, onchange: (e) => set("recommended", e.target.checked) }),
      "solo recomendados"),
    h("button", {
      class: "btn ghost", disabled: !activeExtraCount() && state.extra.sort === "date",
      onclick: () => { state.extra = { ...EXTRA_DEFAULTS }; store.set("ctf.extra", state.extra); render(); },
    }, "Limpiar"));
}

function filtered({ includePast }) {
  const now = Date.now();
  return state.events.filter((ev) =>
    (state.onlyNews ? hasNews(ev) || state.newsKeep.has(ev.id) : state.filters.has(statusOf(ev))) &&
    matchesQuery(ev) && matchesExtra(ev) && (includePast || ev._end >= now) &&
    // "ocultar los que no puedo": nunca oculta algo en lo que ya estás inscripto.
    !(state.hideIneligible && eligibilityFor(ev) === "no" && statusOf(ev) !== "inscripto"));
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

// En celular, el estado de cada tarjeta es un único selector (ocupa un renglón en vez de dos).
function statusSelect(ev) {
  const current = statusOf(ev);
  return h("select", {
    class: "status-select", style: colorVar(current), "aria-label": "Estado",
    onclick: (e) => e.stopPropagation(),
    onchange: (e) => { setStatus(ev.id, e.target.value); if (!canWrite()) render(); },
  }, STATES.map((s) => h("option", { value: s.key, selected: s.key === current }, s.label)));
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
    eligibilityBadge(ev),
    ctftimeBadge(ev),
    officialUnconfirmed(ev)
      ? h("span", { class: "badge warn", title: "Solo se pudo confirmar en CTFtime: el sitio oficial no respondía" }, "⚠ oficial sin confirmar")
      : null,
  ];
}

// Estado en CTFtime. ctftime_rated: true / false / null (peso futuro por definir).
// Solo si la IA no lo informó (datos viejos), un peso > 0 se toma como que puntúa.
function ctftimeInfo(ev) {
  if (!ev.ctftime_url) return { key: "off", mark: "", label: "fuera de CTFtime", title: "No figura en CTFtime" };
  const rated = ev.ctftime_rated === undefined ? (ev.weight > 0 ? true : undefined) : ev.ctftime_rated;
  if (rated) {
    return { key: "rated", mark: "◆", label: `◆ CTFtime · puntúa${ev.weight ? ` · peso ${ev.weight}` : ""}`,
      title: "Figura en CTFtime y suma al rating" };
  }
  if (rated === false) return { key: "unrated", mark: "◇", label: "◇ CTFtime · no puntúa", title: "Figura en CTFtime pero no suma al rating" };
  return { key: "unknown", mark: "◇",
    label: `◇ CTFtime · puntuación por definir${ev.weight ? ` · peso actual ${ev.weight}` : ""}`,
    title: "Figura en CTFtime con peso futuro todavía no definido (Future weight: to be determined)" };
}

function ctftimeBadge(ev) {
  const ct = ctftimeInfo(ev);
  return h("span", { class: `badge ct ct-${ct.key}`, title: ct.title }, ct.label);
}

// Evaluación de la IA contra tu perfil: sufijo "· para vos: sí | no | dudoso" en eligibility.
function eligibilityFor(ev) {
  const m = /para vos:\s*(sí|si|no|dudoso)\s*\.?\s*$/i.exec(ev.eligibility ?? "");
  if (!m) return null;
  const v = m[1].toLowerCase();
  return v === "si" ? "sí" : v;
}

const ELIG_BADGE = {
  "sí": { cls: "elig-yes", text: "✓ podés" },
  "dudoso": { cls: "elig-maybe", text: "❓ dudoso" },
  "no": { cls: "elig-no", text: "⛔ no podés" },
};

function eligibilityBadge(ev) {
  const e = ELIG_BADGE[eligibilityFor(ev)];
  return e ? h("span", { class: `badge ${e.cls}`, title: ev.eligibility }, e.text) : null;
}

const officialUnconfirmed = (ev) => Array.isArray(ev.verified_by) && !ev.verified_by.includes("oficial");

const FIELD_LABEL = {
  start: "fechas", end: "fechas", url: "link", registration_deadline: "inscripción",
  fee: "costo", eligibility: "elegibilidad", location: "modalidad", team_size: "equipo",
};
const changedText = (ev) => [...new Set((ev.changed_fields ?? []).map((f) => FIELD_LABEL[f] ?? f))].join(", ") || "datos";

// Clase para resaltar a simple vista lo que no viste (lista y calendario).
const newsClass = (ev) => (isNew(ev) ? "unseen" : isChanged(ev) ? "updated" : "");

// El cierre de inscripción solo se avisa en los eventos "Me interesa": si ya estás inscripto
// o lo descartaste, no aporta. En el popup el dato se ve igual para todos.
const notifiesDeadline = (ev) => statusOf(ev) === "interesado" && Boolean(ev._deadline);

function deadlineLine(ev) {
  const dl = notifiesDeadline(ev) ? deadlineInfo(ev) : null;
  if (!dl) return null;
  const when = new Date(ev._deadline);
  return h("div", { class: `deadline ${dl.cls}` }, dl.text, when > Date.now() ? ` · cierra ${relTime(when)}` : "");
}

// "empieza en 3 días" / "termina en 5 h" / "terminó hace 2 días".
function relativeLine(ev) {
  const now = Date.now();
  if (ev._start > now) return `empieza ${relTime(ev._start)}`;
  if (ev._end >= now) return `en curso · termina ${relTime(ev._end)}`;
  return `terminó ${relTime(ev._end)}`;
}

// Choques con tus eventos (inscripto / me interesa). Los eventos de más de una semana no
// cuentan: se pisarían con todo y no ayudan a decidir.
function conflictsWithMine(ev) {
  if (statusOf(ev) === "descartado" || isLongEvent(ev) || ev._end < Date.now()) return [];
  const rank = { inscripto: 0, interesado: 1 };
  return state.events
    .filter((o) => o.id !== ev.id && statusOf(o) in rank && !isLongEvent(o)
      && o._start < ev._end && ev._start < o._end)
    .sort((a, b) => rank[statusOf(a)] - rank[statusOf(b)] || a._start - b._start);
}

function conflictLine(ev) {
  const list = conflictsWithMine(ev);
  if (!list.length) return null;
  const names = list.slice(0, 3).map((o) => `${o.name} (${STATE_LABEL[statusOf(o)].toLowerCase()})`);
  return h("div", { class: "conflict" }, `⚠ se pisa con ${names.join(", ")}${list.length > 3 ? ` y ${list.length - 3} más` : ""}`);
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
    const next = new Date(day.getTime() + DAY_MS);
    // Tocar el día (en cualquier parte, útil en celular donde las barras son finitas) abre sus eventos.
    const dayEvents = segs.filter((s) => s.from <= c && s.to >= c).map((s) => s.ev);
    const cls = ["cal-day", day.getMonth() !== month && "other", day.getTime() === today && "today", dayEvents.length && "has-events"];
    week.append(h("div", {
      class: cls.filter(Boolean).join(" "),
      style: `grid-column: ${c + 1}; grid-row: 1 / ${rows + 2}`,
      onclick: dayEvents.length ? () => openDay(day, dayEvents) : null,
    }, h("span", { class: "num" }, day.getDate())));
    // ⏳ el día que cierra la inscripción de un evento "Me interesa" que todavía no cerró.
    const closing = events.filter((ev) => notifiesDeadline(ev)
      && new Date(ev._deadline) >= day && new Date(ev._deadline) < next && new Date(ev._deadline) > Date.now());
    if (closing.length) {
      week.append(h("button", {
        class: "dl-mark", style: `grid-column: ${c + 1}; grid-row: 1`,
        title: `Cierra la inscripción: ${closing.map((ev) => `${ev.name} (${fmtTime.format(new Date(ev._deadline))})`).join(", ")}`,
        onclick: () => openDay(day, closing),
      }, closing.length > 1 ? `⏳${closing.length}` : "⏳"));
    }
    if (hidden[c]) {
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
    eligibilityFor(s.ev) === "no" ? "⛔ " : null,
    s.ev.name));
  }
  return week;
}

function calendarLegend() {
  return h("p", { class: "legend" },
    "★ recomendado · ● sin abrir · ↻ cambió · ◆ puntúa en CTFtime · ◇ en CTFtime sin puntuar · sin marca: fuera de CTFtime · ⛔ no podés participar · ⏳ cierre de inscripción · ",
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
  const events = sortEvents(filtered({ includePast: state.showPast }));
  if (events.length === 0) {
    return h("div", { class: "empty" },
      state.events.length === 0
        ? "Todavía no hay eventos. Subí un archivo a inbox/ (o usá «Subir sugerencias») y esperá a que corra la Action."
        : state.onlyNews ? "Sin novedades: ya viste todo." : "Ningún evento coincide con los filtros.");
  }
  // Por fecha se agrupa por mes; con otro orden, una sola lista.
  const groups = new Map();
  for (const ev of events) {
    const key = state.extra.sort === "date" ? fmtMonth.format(ev._start) : `ordenado por ${SORT_LABEL[state.extra.sort]}`;
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
            state.creds?.[ev.id] ? h("span", { class: "priv-mark", title: "Tenés credenciales o notas privadas" }, " 🔒") : null,
            badges(ev)),
          h("div", { class: "side" }, statusPicker(ev), statusSelect(ev)),
          h("div", { class: "when" }, whenText(ev), h("span", { class: "rel" }, ` · ${relativeLine(ev)}`)),
          h("div", { class: "meta" }, metaText(ev)),
          deadlineLine(ev),
          conflictLine(ev),
          ev.why ? h("p", { class: "why" }, ev.why) : null);
      }))));
}

// ---------- render: diálogos ----------

const dlgEvent = document.getElementById("dlg-event");

// ---------- link al evento en la URL (#e=<id>) ----------
// Abrir un evento agrega una entrada al historial: "atrás" cierra el popup y el link se
// puede guardar o compartir. Moverse con ‹ › o abrir desde un link reemplaza la entrada.
// Cerrar el popup solo saca el #e= de la entrada actual (sin navegar), para no depender
// de un "atrás" asincrónico que podría cruzarse con lo siguiente que hagas.

const HASH_PREFIX = "#e=";
const hashEventId = () =>
  location.hash.startsWith(HASH_PREFIX) ? decodeURIComponent(location.hash.slice(HASH_PREFIX.length)) : null;

function syncHash(id, replace) {
  const url = `${location.pathname}${location.search}${HASH_PREFIX}${encodeURIComponent(id)}`;
  if (replace) history.replaceState({ ev: id }, "", url);
  else history.pushState({ ev: id }, "", url);
}

function clearHash() {
  if (hashEventId()) history.replaceState(null, "", `${location.pathname}${location.search}`);
}

addEventListener("popstate", () => {
  const id = hashEventId();
  if (id && state.events.some((e) => e.id === id)) {
    if (!dlgEvent.open || dlgEvent.dataset.id !== id) openEvent(id, { fromHash: true });
  } else if (dlgEvent.open) {
    closeEventDialog();
  }
});

// Orden en que se recorren los eventos con ‹ › en el popup: el de la vista actual.
function currentOrder() {
  return sortEvents(filtered({ includePast: state.showPast })).map((e) => e.id);
}

// opts.list fija la secuencia a recorrer (p. ej. los eventos de un día). Si el popup ya
// está abierto se conserva la secuencia actual; si se abre de cero, se toma la de la vista.
function openEvent(id, opts = {}) {
  const ev = state.events.find((e) => e.id === id);
  if (!ev) return;
  const wasOpen = dlgEvent.open;
  if (opts.list) state.navIds = opts.list;
  else if (!wasOpen) state.navIds = currentOrder();
  if (!state.navIds.includes(id)) state.navIds = [id];
  syncHash(id, wasOpen || opts.fromHash);
  dlgEvent.dataset.id = id;
  // El detalle se arma antes de marcarlo como visto, para que todavía muestre qué cambió.
  dlgEvent.replaceChildren(eventDetail(ev));
  if (!dlgEvent.open) dlgEvent.showModal();
  if (markSeen([id])) render();
}

function refreshOpenEvent(id) {
  if (dlgEvent.open && dlgEvent.dataset.id === id) openEvent(id);
}

// "‹ 3 / 12 ›" en la cabecera del popup.
function navControls(ev) {
  const ids = state.navIds;
  const i = ids.indexOf(ev.id);
  if (ids.length < 2 || i < 0) return null;
  const go = (j) => { state.credsEditing = null; state.datesEditing = null; openEvent(ids[j]); dlgEvent.scrollTop = 0; };
  return h("div", { class: "dlg-nav" },
    h("button", { class: "btn ghost icon", title: "Anterior", disabled: i === 0, onclick: () => go(i - 1) }, "‹"),
    h("span", { class: "dlg-nav-pos" }, `${i + 1} / ${ids.length}`),
    h("button", { class: "btn ghost icon", title: "Siguiente", disabled: i === ids.length - 1, onclick: () => go(i + 1) }, "›"));
}

// Popup con todos los datos del evento, agrupados en tarjetas de propiedades.
function eventDetail(ev) {
  const stamp = (iso) => `${fmtDate.format(new Date(iso))} ${fmtTime.format(new Date(iso))}`;
  const groups = [
    ["dates", "Fechas", [
      ["Inicio", fmtFull.format(ev._start)],
      ["Fin", ev._end > ev._start ? fmtFull.format(ev._end) : null],
      ["Duración", durationText(ev)],
      // Siempre visible: si no hay dato se dice, para saber que falta.
      ["Inscripción", (deadlineInfo(ev)?.text.replace(/^inscripción /, "") ?? "sin fecha confirmada")
        + (ev._manualDeadline ? " · ✎ manual" : "")],
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
      h("button", { class: "btn icon dlg-close", onclick: closeEventDialog, title: "Cerrar" }, "✕"),
      navControls(ev),
      h("h2", {}, ev.name),
      h("div", { class: "dlg-badges" }, badges(ev)),
      h("div", { class: "dlg-when" }, whenText(ev),
        ev._manualDates ? h("span", { class: "manual-tag", title: "Fechas corregidas a mano" }, "✎ manual") : null,
        canWrite() && state.datesEditing !== ev.id
          ? h("button", {
            class: "linkish-btn",
            onclick: () => { state.datesEditing = ev.id; openEvent(ev.id); dlgEvent.scrollTop = 0; },
          }, "✎ editar fechas / inscripción")
          : null),
      h("div", { class: "dlg-status" }, h("span", { class: "dlg-label" }, "Estado"), statusPicker(ev))),
    datesEditor(ev),
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
      link(ev.ctftime_url, "CTFtime ↗"),
      h("span", { class: "spacer" }),
      link(googleCalUrl(ev), "📅 Google Calendar"),
      h("button", { class: "btn ghost", onclick: () => downloadIcs([ev], `${ev.id}.ics`) }, "⬇ .ics")));
}

// "YYYY-MM-DDTHH:mm" en hora local, el formato de <input type="datetime-local">.
function toLocalInput(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

// Editor de fechas e inscripción (si se está editando) o aviso de lo corregido a mano.
function datesEditor(ev) {
  const original = `${fmtFull.format(new Date(ev.start))} → ${fmtFull.format(new Date(ev.end ?? ev.start))}`;
  const originalDeadline = ev.registration_deadline ? fmtFull.format(new Date(ev.registration_deadline)) : "sin dato";
  const reopen = () => openEvent(ev.id);

  if (state.datesEditing === ev.id) {
    const input = (name, label, d, required) => h("label", {}, label,
      h("input", { name, type: "datetime-local", value: d ? toLocalInput(d) : "", required }));
    const form = h("form", {
      class: "dates-form",
      onsubmit: async (e) => {
        e.preventDefault();
        const start = new Date(form.elements.start.value);
        const end = form.elements.end.value ? new Date(form.elements.end.value) : start;
        const dl = form.elements.deadline.value ? new Date(form.elements.deadline.value) : null;
        if (isNaN(start) || isNaN(end) || (dl && isNaN(dl))) return toast("Fecha inválida.", "error");
        if (end < start) return toast("El fin no puede ser anterior al inicio.", "error");

        // Se guarda solo lo que difiere de la IA; las fechas van siempre juntas (inicio + fin).
        const entry = {};
        const same = (a, b) => b != null && Math.abs(a - new Date(b)) < 60000; // el input no tiene segundos
        if (!same(start, ev.start) || !same(end, ev.end ?? ev.start)) {
          entry.start = start.toISOString();
          entry.end = end.toISOString();
        }
        if (dl && !same(dl, ev.registration_deadline)) entry.registration_deadline = dl.toISOString();

        const btn = form.querySelector("button[type=submit]");
        btn.disabled = true;
        const ok = await setOverride(ev, Object.keys(entry).length ? entry : null);
        btn.disabled = false;
        if (ok) { state.datesEditing = null; render(); reopen(); }
      },
    },
    h("div", { class: "prop-title wide" }, "✎ Editar fechas e inscripción · hora local de este dispositivo"),
    input("start", "Inicio", ev._start, true),
    input("end", "Fin", ev._end),
    input("deadline", "Cierre de inscripción (opcional)", ev._deadline ? new Date(ev._deadline) : null),
    h("p", { class: "dates-orig wide" }, `Según la IA: ${original} · inscripción: ${originalDeadline}`),
    h("div", { class: "creds-actions wide" },
      ev._override ? h("button", {
        type: "button", class: "btn", title: "Volver a las fechas e inscripción que informó la IA",
        onclick: async () => {
          if (await setOverride(ev, null)) { state.datesEditing = null; render(); reopen(); }
        },
      }, "Restaurar originales") : null,
      h("span", { class: "spacer" }),
      h("button", { type: "button", class: "btn", onclick: () => { state.datesEditing = null; reopen(); } }, "Cancelar"),
      h("button", { type: "submit", class: "btn primary" }, "Guardar")));
    return h("section", { class: "dates-edit" }, form);
  }

  if (!ev._override) return null;
  // La IA cambió fechas o inscripción después de la corrección manual: avisar para revisar.
  const watched = [ev._manualDates && "start", ev._manualDates && "end", ev._manualDeadline && "registration_deadline"];
  const aiNewer = ev.changed && (ev.changed_fields ?? []).some((f) => watched.includes(f))
    && new Date(ev.changed) > new Date(ev._override.updated);
  const what = [
    ev._manualDates && `fechas (según la IA: ${original})`,
    ev._manualDeadline && `cierre de inscripción (según la IA: ${originalDeadline})`,
  ].filter(Boolean).join(" y ");
  return h("section", { class: `dates-note ${aiNewer ? "warn" : ""}` },
    h("span", {}, aiNewer
      ? `⚠ La IA informó datos nuevos después de tu corrección de ${what}.`
      : `Corregido a mano: ${what}.`),
    canWrite() ? h("button", {
      class: "linkish-btn",
      onclick: async () => { if (await setOverride(ev, null)) { render(); reopen(); } },
    }, "Restaurar originales") : null);
}

// Tarjeta "🔒 Privado" (credenciales y notas): solo existe con token. Se redibuja en el lugar
// (sin rehacer el popup) para no perder el scroll al editar.
function credsSection(ev) {
  if (!canWrite()) return null;
  const box = h("section", { class: "creds" },
    h("div", { class: "prop-title" }, "🔒 Privado: credenciales y notas", h("span", { class: "creds-where" }, ` · privadas en ${privateRepo()}`)));
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
    }, "+ Agregar credenciales o notas"));
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
          if (!confirm(`¿Borrar las credenciales y notas de ${ev.name}?`)) return;
          await runCredsSave(ev.id, null, "Datos privados borrados.");
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
      const ok = await runCredsSave(ev.id, Object.keys(entry).length ? entry : null, "Guardado en el repo privado.");
      btn.disabled = false;
      if (ok) { state.credsEditing = null; redraw(); }
    },
  },
  field("username", "Usuario o email"),
  field("password", "Contraseña", "password"),
  field("team", "Equipo"),
  h("label", { class: "wide" }, "Notas privadas (equipo, ideas, recordatorios)", h("textarea", { name: "notes", rows: 3, spellcheck: "false" }, c.notes ?? "")),
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
    toast(`No se pudieron guardar los datos privados: ${err.message}`, "error", 7000);
    return false;
  } finally {
    setSaving(-1);
  }
}

// ---------- exportar a calendarios ----------

const icsStamp = (d) => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const icsText = (s) => String(s ?? "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
const eventDetails = (ev) => [ev.url, ev.ctftime_url, ev.why].filter(Boolean).join("\n");

function googleCalUrl(ev) {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.name,
    dates: `${icsStamp(ev._start)}/${icsStamp(ev._end > ev._start ? ev._end : new Date(+ev._start + 3600000))}`,
    details: eventDetails(ev),
    location: ev.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}

// Un .ics con cada evento (recordatorio 2 h antes) y, para los "Me interesa", el cierre de
// inscripción como evento aparte (recordatorio 1 día antes).
function buildIcs(events) {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//CTF Tracker//ES", "CALSCALE:GREGORIAN"];
  const vevent = (uid, start, end, summary, desc, location, alarm) => lines.push(
    "BEGIN:VEVENT", `UID:${uid}@ctf-tracker`, `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(start)}`, `DTEND:${icsStamp(end)}`, `SUMMARY:${icsText(summary)}`,
    `DESCRIPTION:${icsText(desc)}`, location ? `LOCATION:${icsText(location)}` : null,
    "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${icsText(summary)}`, `TRIGGER:${alarm}`, "END:VALARM",
    "END:VEVENT");
  for (const ev of events) {
    const end = ev._end > ev._start ? ev._end : new Date(+ev._start + 3600000);
    vevent(ev.id, ev._start, end, ev.name, eventDetails(ev), ev.location, "-PT2H");
    if (notifiesDeadline(ev)) {
      const dl = new Date(ev._deadline);
      vevent(`${ev.id}-inscripcion`, new Date(+dl - 1800000), dl, `Cierra inscripción: ${ev.name}`, eventDetails(ev), null, "-P1D");
    }
  }
  lines.push("END:VCALENDAR");
  // Líneas de más de 75 caracteres se pliegan, como pide el formato.
  return lines.filter(Boolean).map((l) => l.match(/.{1,73}/g).join("\r\n ")).join("\r\n") + "\r\n";
}

function downloadIcs(events, filename) {
  const url = URL.createObjectURL(new Blob([buildIcs(events)], { type: "text/calendar;charset=utf-8" }));
  const a = h("a", { href: url, download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportMyEvents() {
  const now = Date.now();
  const mine = state.events.filter((e) => ["interesado", "inscripto"].includes(statusOf(e)) && e._end >= now);
  if (!mine.length) return toast("No tenés eventos próximos marcados como me interesa o inscripto.", "warn");
  downloadIcs(mine, "mis-ctfs.ics");
  toast(`Descargado mis-ctfs.ics con ${mine.length} eventos. Abrilo para importarlo en tu calendario.`, "ok", 6000);
}

function openDay(day, events) {
  dlgEvent.dataset.id = "";
  state.navIds = events.map((ev) => ev.id); // ‹ › recorre los eventos de ese día
  dlgEvent.replaceChildren(h("div", { class: "dlg-body" },
    h("header", { class: "dlg-head" },
      h("button", { class: "btn icon dlg-close", onclick: closeEventDialog, title: "Cerrar" }, "✕"),
      h("h2", {}, fmtDate.format(day).replace(/^./, (c) => c.toUpperCase()))),
    h("ul", { class: "day-list" }, events.map((ev) => {
      const st = statusOf(ev);
      return h("li", {}, h("button", {
        class: `ev-chip ${st} ${newsClass(ev)}`, style: colorVar(st), onclick: () => openEvent(ev.id),
      }, isNew(ev) ? "● " : isChanged(ev) ? "↻ " : "", `${ev.name} — ${STATE_LABEL[st]}`));
    }))));
  if (!dlgEvent.open) dlgEvent.showModal();
}

dlgEvent.addEventListener("click", (e) => { if (e.target === dlgEvent) closeEventDialog(); });
// Todo cierre del popup pasa por acá. El evento "close" queda como respaldo (p. ej. Esc),
// porque no todos los navegadores lo disparan de forma confiable.
function onEventDialogClosed() {
  state.credsEditing = null;
  state.datesEditing = null;
  clearHash();
}
function closeEventDialog() {
  if (dlgEvent.open) dlgEvent.close();
  onEventDialogClosed();
}
dlgEvent.addEventListener("close", onEventDialogClosed);

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

  const n = activeExtraCount();
  const moreBtn = h("button", {
    class: `chip-filter more-btn ${state.moreOpen || n ? "on" : ""}`,
    title: "Filtrar por modalidad, dificultad, formato y CTFtime, y elegir el orden",
    onclick: () => { state.moreOpen = !state.moreOpen; render(); },
  }, `⚲ Más filtros${n ? ` (${n})` : ""}`, state.extra.sort !== "date" ? ` · ${SORT_LABEL[state.extra.sort]}` : "");

  document.getElementById("filters").replaceChildren(newsChip, markAll ?? "", ...statusChips, moreBtn);
}

function renderStats() {
  const now = Date.now();
  const upcoming = state.events.filter((e) => e._end >= now);
  const pending = upcoming.filter((e) => statusOf(e) === "sin-clasificar").length;
  const fresh = upcoming.filter(isNew).length;
  const changed = upcoming.filter(isChanged).length;
  const next = upcoming.filter((e) => statusOf(e) === "inscripto").sort((a, b) => a._start - b._start)[0];
  // Próximo cierre de inscripción entre los "Me interesa".
  const closing = state.events
    .filter((e) => notifiesDeadline(e) && new Date(e._deadline) > now)
    .sort((a, b) => new Date(a._deadline) - new Date(b._deadline))[0];
  document.getElementById("stats").textContent = [
    closing ? `⏳ inscripción de ${closing.name} cierra ${fmtDate.format(new Date(closing._deadline))}` : null,
    `${upcoming.length} próximos`,
    `${pending} sin clasificar`,
    fresh ? `${fresh} sin abrir` : null,
    changed ? `${changed} con cambios` : null,
    next ? `siguiente inscripto: ${next.name} (${fmtDate.format(next._start)})` : null,
  ].filter(Boolean).join(" · ");
}

// Franja "Ahora": lo que importa de tus eventos (me interesa e inscripto) sin recorrer el calendario.
function renderNow() {
  const el = document.getElementById("now");
  const now = Date.now();
  const mine = state.events.filter((e) => ["interesado", "inscripto"].includes(statusOf(e)));
  const live = mine.filter((e) => e._start <= now && e._end >= now).sort((a, b) => a._end - b._end);
  const week = mine.filter((e) => e._start > now && e._start - now <= 7 * DAY_MS).sort((a, b) => a._start - b._start);
  const closing = state.events
    .filter((e) => notifiesDeadline(e) && new Date(e._deadline) > now && new Date(e._deadline) - now <= 14 * DAY_MS)
    .sort((a, b) => new Date(a._deadline) - new Date(b._deadline));

  const item = (ev, text, list) => h("button", {
    class: "now-item", style: colorVar(statusOf(ev)),
    onclick: () => openEvent(ev.id, { list: list.map((e) => e.id) }),
  }, h("span", { class: "now-name" }, ev.name), h("span", { class: "now-when" }, text));
  const block = (title, list, textFn, empty) => h("div", { class: `now-block ${list.length ? "" : "is-empty"}` },
    h("div", { class: "now-title" }, title, h("span", { class: "n" }, list.length)),
    list.length ? list.map((ev) => item(ev, textFn(ev), list)) : h("div", { class: "now-empty" }, empty));

  el.replaceChildren(
    h("div", { class: "now-head" },
      h("span", { class: "now-label" }, "Ahora"),
      h("span", { class: "muted small" }, "tus eventos: me interesa e inscripto"),
      h("span", { class: "spacer" }),
      h("button", {
        class: "btn ghost now-export", onclick: exportMyEvents,
        title: "Descargar un .ics con tus eventos próximos y los cierres de inscripción, para importar en tu calendario",
      }, "⬇ exportar a mi calendario")),
    h("div", { class: "now-grid" },
      block("En curso", live, (ev) => `termina ${relTime(ev._end)}`, "Nada en curso."),
      block("Esta semana", week, (ev) => `empieza ${relTime(ev._start)}`, "Nada en los próximos 7 días."),
      block("Cierres de inscripción", closing, (ev) => `cierra ${relTime(new Date(ev._deadline))}`, "Sin cierres en 14 días.")));
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
  document.getElementById("compact-toggle").hidden = state.view !== "list";
  document.getElementById("main").classList.toggle("compact", state.compact && state.view === "list");
  renderMode();
  renderNow();
  renderFilters();
  renderMoreFilters();
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
  // La primera carga abre el evento del link (#e=<id>), si lo hay.
  if (!booted) {
    booted = true;
    const id = hashEventId();
    if (id && state.events.some((e) => e.id === id)) openEvent(id, { fromHash: true });
  }
}
let booted = false;

for (const b of document.querySelectorAll(".seg-btn")) {
  b.addEventListener("click", () => { state.view = b.dataset.view; store.set("ctf.view", state.view); render(); });
}
document.getElementById("search").addEventListener("input", (e) => { state.query = e.target.value; render(); });
const pastBox = document.getElementById("show-past");
pastBox.checked = state.showPast;
pastBox.addEventListener("change", () => { state.showPast = pastBox.checked; store.set("ctf.showPast", state.showPast); render(); });
const compactBox = document.getElementById("compact");
compactBox.checked = state.compact;
compactBox.addEventListener("change", () => { state.compact = compactBox.checked; store.set("ctf.compact", state.compact); render(); });
const ineligibleBox = document.getElementById("hide-ineligible");
ineligibleBox.checked = state.hideIneligible;
ineligibleBox.addEventListener("change", () => {
  state.hideIneligible = ineligibleBox.checked;
  store.set("ctf.hideIneligible", state.hideIneligible);
  render();
});
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
