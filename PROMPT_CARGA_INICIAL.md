# Carga inicial (usar UNA sola vez)

Tus estados al 24/10/2026 ya están cargados en `data/status.json`, cada uno con su `id`.
Falta que la IA genere los **datos de cada evento** (fechas, links, descripción) usando
**exactamente esos mismos `id`**, así la página los une con tu estado.

Pegale este prompt a ChatGPT/Codex una vez. Después seguí con la tarea diaria de
`PROMPT_CHATGPT.md`.

---

```text
Generá UNA sola vez el archivo inbox/carga-inicial.md en el repo Parallels-arg/Personal-CTF-Tracker, con el
mismo formato que la tarea diaria (título, resumen y un bloque ```json con
{ "events": [...] }), con los datos verificados de los eventos de abajo.

Reglas:
- Usá EXACTAMENTE el "id" indicado para cada evento: es lo que lo une con mi estado.
- Poné "added" con la fecha de primera mención indicada (formato AAAA-MM-DD).
- Verificá cada evento en su sitio oficial y en CTFtime. Si no lo podés verificar con
  seguridad, omitilo (no inventes datos) y listalo en el resumen como "no verificado".
- Omití los que ya terminaron (hora ART); listalos en el resumen como "terminados".
- Completá todos los campos posibles: registration_deadline, fee, eligibility, team_size,
  career_value, etc.
- NO modifiques data/status.json ni ningún otro archivo.

Eventos (id — nombre — primera mención):

INSCRIPTO
- cruxipher-2026 — cruXipher — 2026-10-20

ME INTERESA
- sudocrypt-v16 — Sudocrypt v16.0 — 2026-10-20  (nota: requiere equipo de 3; ponelo en team_size)
- hi-cyber-con-ctf-2026 — HI Cyber Con CTF — 2026-10-20
- csctf-2026 — CSCTF 2026 — 2026-10-21  (nota: el sitio oficial y CTFtime tuvieron fechas en conflicto; usá el oficial y aclaralo en description)
- spookyctf-2026 — SpookyCTF — 2026-10-20
- first-flag-ctf-2026 — First Flag CTF — 2026-10-21

DESCARTADO (igual cargalos si no terminaron: sirven para ver superposiciones)
- africa-battlectf-2026-quals — Africa battleCTF 2026 Qualifier — 2026-10-23
- hitcon-ctf-2026 — HITCON CTF — 2026-10-20
- rstcon-ctf-2026 — RSTCON CTF — 2026-10-20
- hack-lu-ctf-2026 — Hack.lu CTF — 2026-10-20
- void-ctf-2026-quals — VOID CTF Qualifiers — 2026-10-23
- qiangwang-2026-quals — Qiangwang Qualifier — 2026-10-22
- russian-ctf-cup-x-quals — Russian CTF Cup X Qualifier — 2026-10-22
- hack-the-unla-2026 — Hack the UNLa — 2026-10-21
- stealthcup-2026 — StealthCup 2026 (remoto excepcional) — 2026-10-23
- hkcert-ctf-2026-quals — HKCERT CTF Quals — 2026-10-22
- bloomberg-wicys-2026 — Bloomberg x WiCyS — 2026-10-21
- ran-tour-2026-bsas — RAN Tour 2026 Buenos Aires (networking) — 2026-10-24
- csaw-ctf-2026-finals — CSAW CTF Final Round 2026 — 2026-10-24

SIN CLASIFICAR
- pointer-overflow-ctf-2026 — Pointer Overflow CTF 2026 — 2026-10-23
- pink-plus-ctf-2026 — PINK+ CTF — 2026-10-21
- mimic-ctf-2026 — Mimic — 2026-10-22
- platypwn-2026 — Platypwn 2026 — 2026-10-22
- wolvctf-2026 — WolvCTF 2026 — 2026-10-22
- init-ctf-2026 — InIt CTF — 2026-10-23
- eyesopenctf-2026 — EyesOpenCTF — 2026-10-22
- glacierctf-2026 — GlacierCTF — 2026-10-22
- crate-ctf-2026 — Crate-CTF — 2026-10-22
- lakectf-2026-quals — LakeCTF Quals — 2026-10-22
- l3m0n-ctf-2026-quals — L3m0n CTF 2026 Quals — 2026-10-23
- x3ctf-2026 — x3CTF 2026 — 2026-10-22
- bi0sctf-2026 — bi0sCTF 2026 — 2026-10-24
- nitectf-2026 — niteCTF 2026 — 2026-10-24
- bsides-algiers-2026-ctf — BSides Algiers 2026 CTF — 2026-10-24
- backdoorctf-2026 — BackdoorCTF 2026 — 2026-10-24
- asis-ctf-finals-2026 — ASIS CTF Finals 2026 — 2026-10-24
```

---

Si no tenés Codex con acceso al repo, pedile a ChatGPT que te devuelva el archivo y subilo
con el botón **Subir sugerencias** de la web.
