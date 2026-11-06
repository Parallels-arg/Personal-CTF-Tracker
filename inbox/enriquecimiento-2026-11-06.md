# CTF Deep Check — 2026-11-06

Usé un navegador real con JavaScript. Pude leer los sitios de **7 de los 8 eventos**: cinco muestran la edición correspondiente y dos todavía muestran ediciones anteriores (ASIS y JerseyCTF). También leí el sitio del organizador WolvSec. Mimic falló por conexión. Las cinco invitaciones de Discord revisadas exigieron cuenta para acceder a los canales.

**8 eventos revisados, 1 con novedades y 7 sin cambios.** WolvCTF ya tiene verificación oficial. No encontré nuevos cierres de inscripción ni cambios confirmados de fechas.

**Rotación.** Quedaron finalmente **13 eventos fuera de la cola por la rotación**, después de excepciones y relleno. Los próximos retornos son `swampctf-2026` y `pointer-overflow-ctf-2026`, empatados el **7/11/2026 a las 11:59:37 ART** (`2026-11-07T11:59:37-03:00`), por fin de pausa.

## Selección

Leí events, status, overrides y los trece informes de enriquecimiento procesados. Tomé la revisión más reciente de cada evento, haciendo prevalecer sus novedades sobre observaciones anteriores sin cambios. La cola se fijó el 6/11 alrededor de las 12:00 ART.

Había 22 candidatos después de los filtros básicos: 13 pausados y 9 disponibles. Mimic y TVX entraron por la excepción de inicio dentro de siete días; WolvCTF ya había cumplido su pausa. Seleccioné los ocho primeros por prioridad y comienzo. Undutmaning quedó fuera por cupo. No hizo falta relleno.

Orden: `spookyctf-2026`, `first-flag-ctf-2026`, `mimic-ctf-2026`, `tvx-ctf-2026`, `wolvctf-2026`, `asis-ctf-finals-2026`, `gaian-space-perihelion-ctf-2027`, `jerseyctf-vii-2027`.

Overrides tuvo precedencia para selección, orden y excepciones; su única corrección corresponde a un evento terminado. No se trasladó al JSON. Los eventos con estado `inscripto` se consideraron sin exigir campos faltantes, pero quedaron en pausa. Verifiqué que los SHA de los tres archivos de datos seguían iguales antes de publicar.

## Novedades

- **wolvctf-2026** — El sitio oficial ahora carga y confirma noviembre de 2026, las 48 horas online, las divisiones Open y UMich y los equipos sin límite. Se reemplaza la URL de CTFtime por la oficial y se agrega verificación oficial. Las fechas se conservan. No hay cierre ni costo publicados y los premios siguen pendientes. CTFtime mantiene el peso futuro por determinar. [Oficial](https://wolvctf.io/) · [Organizador](https://wolvsec.org/) · [Discord](https://discord.com/invite/rvPY5aUNR) · [CTFtime](https://ctftime.org/event/3049/)

## Revisados sin cambios

- **spookyctf-2026** — Portada, FAQ y formulario legibles. Continúan las condiciones ya cargadas: participación gratuita, sin tope de equipo, premios calculados para cuatro y política de IA. El formulario no publica cierre. Discord exige cuenta. CTFtime mantiene el aviso del organizador de desplazar dos horas la cabecera; coincide con las 19:00 UTC ya cargadas y no se modifican fechas. [Oficial y FAQ](https://spooky.ctfd.io/) · [Registro](https://spooky.ctfd.io/register) · [Discord](https://discord.com/invite/aH63aNSZ7z) · [CTFtime](https://ctftime.org/event/3339/)
- **first-flag-ctf-2026** — Evento, reglas, FAQ y registro legibles. Siguen las seis horas del 7/11, participación individual gratuita y premios de Audn.AI ya cargados. Las reglas todavía mencionan gift cards; la discrepancia ya está documentada. No se publica cierre. La FAQ dice que compartirán Discord con quienes se registren antes del inicio, sin fijar fecha límite de registro. [Evento, reglas y FAQ](https://cyberlearner.org/ctf) · [Registro](https://cyberlearner.org/register)
- **mimic-ctf-2026** — El oficial falló con `upstream connect error or disconnect/reset before headers`. La lectura sin JavaScript y el sitemap también fallaron. La búsqueda de Discord y redes del organizador no aportó un canal oficial verificable con las condiciones pendientes. Como último respaldo, CTFtime conserva 7–8/11 a las 12:00 UTC, equipos 1–4 y condición casual. No se confirmaron cierre, costo ni elegibilidad oficial. [Oficial inaccesible](https://ctf.rarebytehub.com/events/mimic) · [Sitemap inaccesible](https://ctf.rarebytehub.com/sitemap.xml) · [CTFtime](https://ctftime.org/event/3455/)
- **tvx-ctf-2026** — Portada con JavaScript, About y registro legibles. Clasificatorio el 13/11; fecha de final pendiente. Se mantienen las horas de CTFtime porque el oficial no publica horario. El formulario conserva categorías escolar y universitaria y clasifica al equipo como universitario si algún integrante lo es. No confirma admisión internacional, costo, cierre ni máximo numérico de integrantes. Discord requiere cuenta; CTFtime sigue casual. [Oficial](https://ctf-techvisions.com/#/menu) · [About](https://ctf-techvisions.com/about) · [Registro](https://ctf-techvisions.com/register) · [Discord](https://discord.com/invite/ZmhdyWS7bW) · [CTFtime](https://ctftime.org/event/3486/)
- **asis-ctf-finals-2026** — Portada, reglas, FAQ y anuncios legibles, pero la portada sigue mostrando Quals de agosto y la FAQ habla de Tech Olympics. No se trasladan el cierre al final del juego ni las condiciones de esos otros concursos a la final de diciembre. Los anuncios siguen siendo del clasificatorio. Discord exige cuenta. CTFtime conserva 27–28/12 a las 14:00 UTC y peso futuro pendiente. No hay nuevas condiciones oficiales de la final. [Portada](https://asisctf.com/) · [Reglas](https://asisctf.com/rules) · [FAQ](https://asisctf.com/faq) · [Anuncios](https://asisctf.com/announcements) · [Discord](https://discord.com/invite/Dk5jB8v38M) · [CTFtime](https://ctftime.org/event/3062/)
- **gaian-space-perihelion-ctf-2027** — Portada, registro, reglas y términos legibles. Se reconfirman 2–3/1/2027 a las 18:00 UTC, cierre 30/12/2026 a las 18:00 UTC, equipos 1–3 y participación mundial con edad/consentimiento y normativa local, ya cargados. Se mantienen los premios y requisitos de writeup del oficial, que prevalecen sobre el premio distinto de CTFtime. No se publica costo; no hay novedad confirmada. [Oficial](https://gaian.space/ctf/) · [Registro](https://gaian.space/ctf/signup/) · [Reglas](https://gaian.space/ctf/rules/) · [Términos](https://gaian.space/ctf/terms/) · [CTFtime](https://ctftime.org/event/3492)
- **jerseyctf-vii-2027** — Portada, reglas y registro legibles, pero corresponden expresamente a JerseyCTF VI de abril de 2026. No se trasladan sus límites, elegibilidad, premios ni registro a VII. Discord requiere cuenta. CTFtime conserva la edición VII híbrida del 13/3/2027 a las 17:00 UTC al 14/3 a las 16:00 UTC y peso futuro pendiente. No encontré condiciones oficiales nuevas de VII. [Plataforma](https://ctf.jerseyctf.com/) · [Reglas](https://ctf.jerseyctf.com/rules) · [Registro](https://ctf.jerseyctf.com/register) · [Discord](https://discord.com/invite/rfeqJrcd6c) · [CTFtime](https://ctftime.org/event/3458)

```json
{
  "events": [
    {
      "id": "wolvctf-2026",
      "name": "WolvCTF 2026",
      "start": "2026-11-13T23:00:00.000Z",
      "end": "2026-11-15T23:00:00.000Z",
      "url": "https://wolvctf.io/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "team_size": "sin límite",
      "ctftime_rated": null,
      "description": "El sitio oficial de WolvCTF 2026 ya es legible y confirma el calendario cargado: del 13/11 a las 23:00 UTC al 15/11 a las 23:00 UTC, 48 horas online. Confirma las divisiones Open y separada para estudiantes de University of Michigan, y equipos sin límite. Los premios se anunciarán en Discord. No publica cierre de inscripción ni costo. La invitación oficial de Discord requiere cuenta para leer los canales. CTFtime mantiene el peso futuro por determinar; no se confirma el estado definitivo de puntuación."
    }
  ]
}
```
