# Carga complementaria (usar UNA sola vez)

La carga inicial omitió 16 eventos porque exigía verificarlos en el sitio oficial **y** en
CTFtime. La regla nueva (ver `PROMPT_CHATGPT.md`) acepta una sola fuente confiable y la página
muestra si cada evento figura en CTFtime y si puntúa. Este prompt recupera los omitidos y
completa los datos de CTFtime de los que ya están cargados.

---

```text
Generá UNA sola vez el archivo inbox/carga-complementaria.md en el repo
Parallels-arg/Personal-CTF-Tracker, con el mismo formato y las mismas reglas que la tarea
diaria (sección "Verificación y CTFtime" incluida). No modifiques ningún otro archivo.

Parte A — eventos omitidos en la carga inicial. Usá EXACTAMENTE estos "id" (los une con mis
estados) y "added" con la fecha indicada. Incluí cada uno si lo confirmás en AL MENOS una
fuente (oficial o CTFtime) y no terminó (hora ART); si no, listalo en el resumen con el motivo.

- first-flag-ctf-2026 — First Flag CTF — added 2026-10-21 — oficial: https://cyberlearner.org/ctf
- hack-the-unla-2026 — Hack the UNLa — added 2026-10-21 — oficial: https://www.unla.edu.ar/novedades/invitamos-al-evento-hack-the-unla
- ran-tour-2026-bsas — RAN Tour 2026 Buenos Aires (networking) — added 2026-10-24 — oficial: https://www.varonis.com/events
- bloomberg-wicys-2026 — Bloomberg x WiCyS — added 2026-10-21 — oficial: https://www.wicys.org/benefits/capture-the-flag/
- africa-battlectf-2026-quals — Africa battleCTF 2026 Qualifier — added 2026-10-23 — https://ctftime.org/event/3462/
- void-ctf-2026-quals — VOID CTF Qualifiers — added 2026-10-23 — oficial: https://ctf.void-society.in/
- qiangwang-2026-quals — Qiangwang Qualifier — added 2026-10-22 — https://ctftime.org/event/3459/
- csaw-ctf-2026-finals — CSAW CTF Final Round 2026 — added 2026-10-24 — https://ctftime.org/event/3410/
- mimic-ctf-2026 — Mimic — added 2026-10-22 — https://ctftime.org/event/3455/
- wolvctf-2026 — WolvCTF 2026 — added 2026-10-22 — https://ctftime.org/event/3049/
- lakectf-2026-quals — LakeCTF Quals — added 2026-10-22 — https://ctftime.org/event/3474/
- bi0sctf-2026 — bi0sCTF 2026 — added 2026-10-24 — https://ctftime.org/event/3480/
- nitectf-2026 — niteCTF 2026 — added 2026-10-24 — https://ctftime.org/event/3367/
- bsides-algiers-2026-ctf — BSides Algiers 2026 CTF — added 2026-10-24 — https://ctftime.org/event/3475/
- backdoorctf-2026 — BackdoorCTF 2026 — added 2026-10-24 — https://ctftime.org/event/3472/
- asis-ctf-finals-2026 — ASIS CTF Finals 2026 — added 2026-10-24 — https://ctftime.org/event/3062/

Parte B — eventos ya cargados (están en data/events.json). Para cada uno que no haya terminado,
incluilo de nuevo con el MISMO "id", todos sus datos actuales y estos campos agregados:
"verified_by", y si figura en CTFtime "ctftime_url", "weight" y "ctftime_rated".
No cambies fechas ni otros datos salvo que hayan cambiado de verdad en la fuente.
```

---

Si no tenés Codex con acceso al repo, pedile a ChatGPT que te devuelva el archivo y subilo
con el botón **Subir sugerencias** de la web.
