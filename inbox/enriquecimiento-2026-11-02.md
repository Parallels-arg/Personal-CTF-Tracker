# CTF Deep Check — 2026-11-02

Navegador real: **sí**. Se pudieron leer sitios oficiales de **6 de los 8 eventos**, incluidas reglas, FAQ y formularios públicos. Mimic falló por conexión y bi0sCTF mostró error DNS 1016. Tres invitaciones oficiales de Discord cargaron, pero sus canales requieren cuenta/acceso.

**Rotación: 8 eventos quedaron finalmente fuera de la cola. El próximo retorno es `swampctf-2026` el 3/11/2026 a las 12:07:16 ART (`2026-11-03T12:07:16-03:00`), empatado con `pointer-overflow-ctf-2026`.** La hora se obtiene del commit del informe del 31/10; ninguna excepción adelanta ese retorno.

**8 eventos revisados: 1 con datos nuevos o corregidos y 7 sin cambios.** EyesOpenCTF publica un horario oficial una hora posterior al repositorio. No se confirmó ningún nuevo cierre de inscripción. No se buscaron eventos nuevos.

## Cola y criterio aplicado

Se leyeron `data/events.json`, `data/status.json`, `data/overrides.json` y los ocho informes procesados de enriquecimiento. Se tomó la revisión más reciente de cada evento; las novedades del JSON prevalecen sobre anotaciones parciales de registro sin cambios. Los dos informes del 30/10 se ordenaron correctamente, con `-2` después del archivo sin sufijo.

Se aplicaron overrides únicamente a selección, prioridad, urgencia y orden. Su única entrada corresponde a un evento terminado; no se trasladan valores manuales al JSON. Se excluyeron finalizados y descartados. Para los estados `inscripto` se consideró la verificación limitada sin exigir campos faltantes, pero ninguno entró en el cupo tras la rotación.

Cola: `csctf-2026`, `spookyctf-2026`, `first-flag-ctf-2026`, `mimic-ctf-2026`, `tvx-ctf-2026`, `eyesopenctf-2026`, `outback-overflow-2026`, `bi0sctf-2026`.

CSCTF, Spooky y First Flag entran por prioridad y por inicio dentro de siete días. Mimic entra por esa excepción a su pausa. Había 21 candidatos: ocho pausados y trece disponibles. Se seleccionaron ocho por prioridad e inicio; cinco quedaron fuera por cupo. No fue necesario relleno.

Pausados: `glacierctf-2026`, `swampctf-2026`, `crate-ctf-2026`, `l3m0n-ctf-2026-quals`, `x3ctf-2026`, `nitectf-2026`, `pointer-overflow-ctf-2026`, `wolvctf-2026`. Los cinco revisados sin cambios ayer vuelven por fin de pausa el 4/11 a las 12:12:41 ART, tomando la hora verificada del commit. WolvCTF vuelve el 6/11 a las 00:16:10 ART, antes de su excepción por inicio.

UNI6CTF ya está en el repositorio y tiene estado interesado, pero cuenta con cierre, costo, elegibilidad y tamaño de equipo confirmados, URL oficial y verificación oficial: no cumple el requisito de datos faltantes y no se agrega a esta cola.

## Novedades y fuentes

- **eyesopenctf-2026** — El [briefing oficial](https://eyesopensecurity.com/ctf-briefing.html), leído en navegador y reconfirmado tras cargar JavaScript, fija 20/11 11:00 UTC–22/11 11:00 UTC, equivalente a 12:00 de Douala (WAT). Se corrigen `start` y `end` de las 10:00 a las 11:00 UTC, conservando la duración. [CTFtime](https://ctftime.org/event/3419/) todavía mantiene las 10:00 UTC y peso futuro pendiente. El [pase y formulario oficiales](https://eyesopensecurity.com/?modal=ctf) confirman bolsa de premios y conservan la mención de clasificación; no aportan cierre. La portada/formulario siguen admitiendo 1–2 integrantes, frente a dos exactos en el briefing. No se envió el formulario ni se asumió elegibilidad personal resuelta.

El anuncio del organizador en CTFtime detalla efectivo y suscripciones, mientras el pase agrupa la bolsa como 500.000 XAF (800 USD). Se conserva esa atribución sin deducir premios garantizados para cada participante. No se modifican fechas de otros eventos, ni se copian condiciones de otras ediciones.

Se verificó antes de publicar que los tres archivos de datos conservaban sus SHA iniciales. El único archivo creado es este informe.

## Revisados sin cambios

- **csctf-2026** — [Portada](https://2026.chronos-security.ro/), [reglas](https://2026.chronos-security.ro/rules), [registro](https://2026.chronos-security.ro/register) y [premios](https://2026.chronos-security.ro/prizes) legibles. Conservan fechas, equipos 1–5, gratuidad y categorías. La portada muestra exactamente **“REGISTRATION Open”**, sin cierre de inscripción. Los beneficios PIECE Elite, descuento y bolsas Elastic ya estaban incorporados ayer. El 9/11 a las 15:00 EET sigue siendo entrega de writeups, no cierre de registro.

- **spookyctf-2026** — [Sitio y FAQ](https://spooky.ctfd.io/) y [registro público](https://spooky.ctfd.io/register) legibles. Sin cierre ni máximo numérico de equipo. Se conservan gratuidad y requisito 18+ solo presencial. El [anuncio del organizador en CTFtime](https://ctftime.org/event/3339/) mantiene el desplazamiento de dos horas respecto de la cabecera: se conservan 6–7/11 a las 19:00 UTC, premios y política de IA ya cargados. El [Discord](https://discord.com/invite/aH63aNSZ7z) requiere cuenta/acceso.

- **first-flag-ctf-2026** — [Evento, reglas y FAQ](https://cyberlearner.org/ctf) y [registro](https://cyberlearner.org/register) legibles. Se mantienen 7/11, 09:00–15:00 UTC, formato individual y gratuito. Sin cierre ni restricciones adicionales confirmadas. La invitación de Discord se comunica a las personas registradas antes del evento; no se interpreta como fecha límite de inscripción.

- **mimic-ctf-2026** — El [oficial](https://ctf.rarebytehub.com/events/mimic) falló en navegador con error de conexión antes de recibir cabeceras. Se intentaron lectura sin JavaScript y sitemap, ambos inaccesibles. La búsqueda enfocada de redes del organizador y su [ficha](https://ctftime.org/team/445438) no aportaron condiciones verificables de Mimic; las referencias a otro evento no se trasladaron. Finalmente [CTFtime](https://ctftime.org/event/3455/) mantiene fechas, equipos 1–4 y condición casual ya cargados. Sin cierre, costo o elegibilidad oficialmente confirmados.

- **tvx-ctf-2026** — [Portada](https://ctf-techvisions.com/), [About](https://ctf-techvisions.com/about) y [registro](https://ctf-techvisions.com/register) legibles. El 13/11 sigue siendo clasificatorio y la final sigue sin fecha; no se publican nuevas horas, cierre, costo ni máximo de integrantes. Se mantienen las categorías escolar/universitaria y la regla de que un universitario convierte al equipo en universitario. El selector de Argentina no prueba admisión suficiente. El [Discord oficial](https://discord.com/invite/ZmhdyWS7bW) requiere cuenta/acceso.

- **outback-overflow-2026** — [Portada](https://outbackoverflow26.hscyber.org/), [reglas](https://outbackoverflow26.hscyber.org/rules.html) y [FAQ de registro desplegada](https://outbackoverflow26.hscyber.org/faq.html) legibles. La portada dice exactamente **“Registration isn't open yet. Join the Discord to hear when it is.”** La FAQ conserva **“Registration opens closer to the event on our CTFd instance.”** El formulario para recibir avisos no se interpreta como registro CTFd abierto ni se inventa cierre. Se mantienen fechas, gratuidad, hasta cuatro integrantes y política de IA; el [Discord oficial](https://discord.com/invite/HKMHDQCYYz) requiere cuenta/acceso.

- **bi0sctf-2026** — El [oficial](https://ctf.bi0s.in/) devuelve en navegador **Origin DNS error 1016**. Se intentaron luego lectura sin JavaScript y sitemap, inaccesibles; el [Twitter oficial](https://twitter.com/teambi0s) no pudo recuperarse (403). Como último respaldo, [CTFtime](https://ctftime.org/event/3480/) conserva fechas y peso futuro pendiente, ya registrado como null. No se verifican cierre, costo, elegibilidad ni tamaño de equipo en fuente oficial y no se agrega “oficial”.

```json
{
  "events": [
    {
      "id": "eyesopenctf-2026",
      "name": "EyesOpenCTF",
      "start": "2026-11-20T11:00:00.000Z",
      "end": "2026-11-22T11:00:00.000Z",
      "url": "https://eyesopensecurity.com/ctf-briefing.html",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "prizes": "Pase oficial CTF Only: bolsa anunciada de 500.000 XAF (800 USD). El anuncio del organizador en CTFtime detalla premios monetarios y suscripciones; reparto y condiciones difieren en nivel de detalle entre páginas.",
      "description": "Cambio de horario confirmado en el briefing oficial: 20–22/11/2026 a las 11:00 UTC (08:00 ART; 12:00 de Douala, WAT), una hora después del repositorio y de la cabecera de CTFtime, que aún indica 10:00 UTC. Se prioriza el oficial y se mantienen 48 horas online. Sin cierre de inscripción publicado. El pase gratuito conserva acceso mediante clasificación sin precisar sus requisitos. Persiste la discrepancia de equipo: briefing exige dos; portada/formulario admiten uno o dos."
    }
  ]
}
```
