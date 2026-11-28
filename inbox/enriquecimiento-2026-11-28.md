# CTF Deep Check — 2026-11-28

Usé un navegador real con JavaScript y pude leer 5 de los 8 sitios oficiales seleccionados: x3CTF, Pointer Overflow, TUCTF, idktheCTF y pothloe. niteCTF falló con ERR_HTTP2_PROTOCOL_ERROR; bi0sCTF y su sitemap devolvieron Error 1016 — Origin DNS error; DMOJ permaneció en verificación de seguridad. Consulté las alternativas disponibles: sitemap o lectura textual, organizadores y redes oficiales, y finalmente CTFtime. También pude leer el sitio institucional de bi0s y publicaciones del perfil oficial de Cryptonite.

La rotación dejó 8 eventos finalmente fuera de la cola después de aplicar excepciones y relleno. El próximo en volver es `bsides-algiers-2026-ctf`, el 2026-11-30 a las 11:59:53 ART por fin de pausa; `backdoorctf-2026` y `asis-ctf-finals-2026` retornan al mismo tiempo. Cola fijada el 28/11 a las 12:03:24 ART. Había doce candidatos habilitados: se revisaron los primeros ocho por prioridad e inicio; otros cuatro quedaron fuera por el máximo, no por rotación. No hizo falta relleno. Pointer Overflow se revisó únicamente por cambios de fechas, horario y reglas según el alcance asignado.

- **idktheCTF y pothloe:** se restituyen sus URL y verificación oficiales frente a los valores de la carga actual que volvieron a CTFtime. No son descubrimientos nuevos. [idktheCTF](https://ctf.idktheflag.sh/) · [Registro](https://ctf.idktheflag.sh/register) · [pothloe](https://pothloe.cc/)
- No se confirmaron nuevos cierres de inscripción ni cambios de fechas. idktheCTF no terminó de mostrar su calendario en esta revisión; se conservan los valores existentes.
- Los overrides se usaron solo para seleccionar y ordenar, sin copiarse al JSON. Solo se revisaron eventos existentes; no se enviaron formularios ni se acredita inscripción a ningún evento.

## Revisados sin cambios

- `x3ctf-2026` — Portada y reglas mantienen 4–6/12 de 15:00 a 15:00 ART, juego individual o por equipos usando una única cuenta. Sin cierre, costo ni límite numérico de equipo publicados. La política de LLM sigue pendiente y advierte que las reglas cambiarán antes del comienzo. Discord requiere cuenta para acceder a los canales. [Portada y reglas](https://x3c.tf/)
- `nitectf-2026` — El navegador falló con «net::ERR_HTTP2_PROTOCOL_ERROR»; la lectura directa devolvió 502 y el sitemap no fue accesible con la herramienta de lectura textual. El texto oficial indexado sigue diciendo literalmente «Registrations opening soon!», sin fecha. El sitio institucional y las publicaciones visibles de Instagram sobre el equipo no aportaron condiciones de registro de esta edición; Instagram también mostró un aviso para iniciar sesión. CTFtime conserva 11–13/12 de 09:00 a 09:00 ART y peso futuro pendiente. No se confirmó costo, cierre, tamaño de equipo ni restricciones precisas. [Sitio oficial](https://nitectf.cryptonitemit.in/) · [Organizador](https://cryptonitemit.in/) · [Red oficial](https://instagram.com/cryptonite_mit/) · [CTFtime](https://ctftime.org/event/3367/)
- `pointer-overflow-ctf-2026` — Portada y siete apartados del reglamento mantienen final el 6/12 a las 16:00 CST, equivalente a 19:00 ART. Se revisaron flags y contenido propios de cada equipo, cierres de desafíos, brackets, conducta, puntuación congelada entre 50–500 con bonus de primera resolución del 10%, pistas secuenciales y anuncios de cambios. No se confirmó una modificación respecto de la revisión anterior. No se buscaron datos adicionales de inscripción. [Portada](https://pointeroverflowctf.com/) · [Reglas](https://pointeroverflowctf.com/rules.html)
- `tuctf-2026` — Portada, FAQ, reglas y formulario conservan 4–6/12 de 15:00 a 15:00 ART, hasta cinco integrantes o juego individual, acceso abierto a cualquiera y ausencia de premios. La IA puede asistir, pero no resolver ni interactuar autónomamente con retos o infraestructura; los tickets deben escribirlos personas. Sin costo ni cierre publicados; Discord requiere cuenta. El final ya está corregido en data/events.json y no se repite como novedad. [Portada](https://tuctf.com/) · [FAQ](https://tuctf.com/faq/) · [Reglas](https://tuctf.com/rules/) · [Registro](https://ctfd.tuctf.com/register)
- `bi0sctf-2026` — Portal y sitemap devolvieron «Error 1016 — Origin DNS error». El sitio institucional solo enlaza un CTF de reclutamiento diferente, que no se incorpora. La red oficial no pudo leerse con la herramienta textual (403) y la búsqueda del organizador no aportó condiciones nuevas. CTFtime conserva 5/12 a las 02:00 ART hasta 6/12 a las 14:00 ART y peso futuro pendiente. No se confirmó costo, cierre, elegibilidad ni tamaño de equipo. [Portal](https://ctf.bi0s.in/) · [Organizador](https://bi0s.in/) · [Red oficial](https://twitter.com/teambi0s) · [CTFtime](https://ctftime.org/event/3480/)
- `leos-20th-birthday-bash-2026` — DMOJ permaneció en «Performing security verification»; no se completó la verificación. El anuncio firmado por SanguineChameleon en Codeforces conserva 11/12 a las 22:00 ART hasta 12/12 a las 22:00 ART, equipos de uno a diez y prohibición de IA generativa interactiva. CTFtime mantiene una cuenta DMOJ compartida por equipo, premios USD 512/256/128, bounty USD 64 por resolver por completo el problema T primero y clasificación casual sin puntos globales. Son datos ya registrados; no se confirmó costo ni cierre de inscripción. [Página del concurso](https://dmoj.ca/contest/leo20) · [Anuncio del organizador](https://codeforces.com/blog/entry/158417) · [CTFtime](https://ctftime.org/event/3498/)

```json
{
  "events": [
    {
      "id": "idkthectf-2026",
      "name": "idktheCTF 2026",
      "start": "2026-12-26T01:00:00.000Z",
      "url": "https://ctf.idktheflag.sh/",
      "verified_by": [
        "ctftime",
        "oficial"
      ],
      "description": "Se recuperan la URL oficial HTTPS y la verificación oficial frente a la ficha de CTFtime que dejó la carga actual. La portada y el formulario público cargan; permiten crear un equipo de uno para jugar solo y mantienen las reglas de no atacar infraestructura, no hacer fuerza bruta ni compartir soluciones. En esta revisión la portada permaneció en Starts: Not set / Ends: Not set incluso después de otras lecturas; la etiqueta live no se toma como confirmación de un cambio de calendario. Se conservan las fechas de data/events.json, sin reemplazarlas por una suposición. No se publican costo, cierre de inscripción, límite numérico de equipo ni condiciones suficientes de elegibilidad para completar esos campos."
    },
    {
      "id": "pothloe-ctf-2026",
      "name": "pothloe CTF 2026",
      "start": "2026-12-27T20:00:00.000Z",
      "url": "https://pothloe.cc/",
      "verified_by": [
        "ctftime",
        "oficial"
      ],
      "description": "Se recuperan la URL y la verificación oficial frente al enlace de CTFtime que dejó la carga actual. La portada confirma participación online abierta a todos, equipos de cualquier tamaño y prohibición de IA, sin cambios respecto de la revisión anterior. Se conservan las fechas del 27 al 29/12/2026 de 17:00 a 17:00 ART. Los premios siguen por anunciar y reservados a equipos presenciales en 40C3, Hamburgo; la ubicación de la assembly sigue pendiente. No se publica costo, formulario ni cierre de inscripción. La invitación de Discord requiere una cuenta para leer los canales."
    }
  ]
}
```
