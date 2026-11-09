# CTF Deep Check — 2026-11-09

Usé un navegador real con JavaScript. Leí los sitios oficiales de **5 de los 8 eventos**, además del sitio de Shellmates y del directorio de BSides. L3m0n falló por conexión y niteCTF quedó en blanco por WebGL. Para este último encontré un anuncio en la versión indexada del sitio oficial.

**8 eventos revisados, 2 con novedades y 6 sin cambios.** Crate ya tiene respaldo oficial para el horario cargado y niteCTF publica que la inscripción abrirá próximamente. No se confirmaron nuevos cierres ni cambios de horario.

**Rotación.** Quedaron **13 eventos fuera de la cola** tras excepciones y relleno. Los próximos retornos son `swampctf-2026` y `pointer-overflow-ctf-2026` el **10/11/2026 a las 12:03:48 ART** (`2026-11-10T12:03:48-03:00`), por fin de pausa.

## Selección

Crucé los tres archivos de datos y dieciséis informes procesados con corte a las 12:24 ART. Hubo 21 candidatos y 7 disponibles después de la rotación. Completé la cola con BSides Algiers por antigüedad de revisión. La única corrección manual corresponde a un evento terminado.

Orden de revisión: `glacierctf-2026`, `crate-ctf-2026`, `l3m0n-ctf-2026-quals`, `x3ctf-2026`, `nitectf-2026`, `tvx-ctf-2026`, `outback-overflow-2026`, `bsides-algiers-2026-ctf`.

## Novedades

- **crate-ctf-2026** — La plataforma oficial publica el 21/11 de 14:00 a 22:00 en Suecia, equivalente a 13:00–21:00 UTC y coincidente con CTFtime. Confirma las reglas de equipos y detalla que la puntuación dinámica se recalcula de forma retroactiva. El formulario es público y sigue sin fecha límite ni precio explícitos. [FOI](https://foi.se/cratectf) · [Plataforma y reglas](https://ctf.crate.foi.se/) · [Formulario](https://ctf.crate.foi.se/register) · [CTFtime](https://ctftime.org/event/3336/)
- **nitectf-2026** — La versión indexada de la página oficial identifica la edición 2026 y anuncia la próxima apertura de inscripciones. La página quedó en blanco en el navegador y la consola confirmó un fallo al crear el contexto WebGL. La lectura directa de texto pidió JavaScript, el sitemap no dio contenido útil y el sitio de Cryptonite y su perfil público de Instagram no aportaron condiciones adicionales verificables. CTFtime mantiene 11–13/12 a las 12:00 UTC. [Portada oficial](https://nitectf.cryptonitemit.in/) · [Cryptonite](https://cryptonitemit.in/) · [Instagram](https://www.instagram.com/cryptonite_mit/) · [CTFtime](https://ctftime.org/event/3367/)

## Revisados sin cambios

- **glacierctf-2026** — La portada mantiene los premios académicos, el requisito de matrícula para todo el equipo y la evaluación mediante writeups. No publica cierre, costo o límite de equipo. El Discord pide cuenta y CTFtime mantiene 20–21/11 a las 18:00 UTC. [Oficial](https://glacierctf.com/) · [Discord](https://discord.com/invite/DFYnRAME23) · [CTFtime](https://ctftime.org/event/3337/)
- **l3m0n-ctf-2026-quals** — La portada y el sitemap fallaron antes de recibir cabeceras. La lectura de texto fue inaccesible. Los anuncios sociales encontrados trataban patrocinio o registro de la edición anterior. CTFtime conserva el 28/11 de 04:30 a 16:30 UTC, equipos de 1–4 y el aviso **“Registration opens soon on l3m0nctf.xyz.”** No hay fecha de apertura o cierre ni costo confirmados. [Oficial](https://l3m0nctf.xyz/) · [CTFtime](https://ctftime.org/event/3485/)
- **x3ctf-2026** — About y reglas mantienen del 4 al 6/12 a las 18:00 UTC y una cuenta por equipo. Los premios y las reglas de LLM siguen pendientes. La página no publica cierre, costo o tope de integrantes. Discord pide cuenta. [Oficial](https://x3c.tf/) · [Discord](https://discord.com/invite/WpFHfD6nqH)
- **tvx-ctf-2026** — About y el formulario mantienen el clasificatorio del 13/11 y las categorías escolar y universitaria. La final sigue sin fecha. No hay nuevas horas oficiales, cierre, costo, tope de equipo ni confirmación internacional. CTFtime sigue indicando 10:00–20:00 UTC y carácter casual. Discord pide cuenta. [About](https://ctf-techvisions.com/about) · [Registro](https://ctf-techvisions.com/register) · [CTFtime](https://ctftime.org/event/3486/)
- **outback-overflow-2026** — El portal mantiene las entradas online agotadas en ese sistema y deriva a CTFd. El formulario público de CTFd sigue visible y conserva los campos de verificación escolar. Se mantiene el entrenamiento opcional de Sídney, el calendario y las reglas de IA. La portada conserva **“Registration opens closer to the event on our CTFd instance.”** No publica fecha de cierre. [Portada](https://outbackoverflow26.hscyber.org/) · [Portal](https://events.hscyber.org/event/1/ouback-overflow-26) · [Formulario](https://ctf.hscyber.org/register)
- **bsides-algiers-2026-ctf** — El sitio de Shellmates enlaza una edición de 2023. El directorio de BSides anuncia una edición a mediados de diciembre de 2026, sin datos específicos del CTF. El Discord pide cuenta. CTFtime mantiene del 17/12 a las 19:00 UTC al 19/12 a las 07:00 UTC y participación presencial solo para equipos argelinos. Sin cierre, costo ni tamaño de equipo publicados. [Shellmates](https://www.shellmates.club/) · [BSides](https://bsides.org/chapters/) · [CTFtime](https://ctftime.org/event/3475/)

**Avisos de apertura sin cierre publicado.** Crate conserva **“Anmälan till Crate-CTF 2026 öppnde 1 september.”** La versión indexada de niteCTF muestra **“Registrations opening soon!”**. [FOI](https://foi.se/cratectf) · [niteCTF](https://nitectf.cryptonitemit.in/)

```json
{
  "events": [
    {
      "id": "crate-ctf-2026",
      "name": "Crate-CTF",
      "start": "2026-11-21T13:00:00.000Z",
      "end": "2026-11-21T21:00:00.000Z",
      "url": "https://foi.se/cratectf",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "description": "FOI confirma el CTF online del 21/11/2026 y la plataforma oficial especifica de 14:00 a 22:00 hora local sueca (13:00–21:00 UTC), en coincidencia con los horarios ya cargados. La inscripción abrió el 1/9 y se hace en ctf.crate.foi.se. Las reglas permiten jugar solo o en equipos sin límite, con una sola afiliación por persona. La puntuación de retos es dinámica y retroactiva. No se publica cierre de inscripción, costo ni una condición explícita de admisión internacional."
    },
    {
      "id": "nitectf-2026",
      "name": "niteCTF 2026",
      "start": "2026-12-11T12:00:00.000Z",
      "end": "2026-12-13T12:00:00.000Z",
      "url": "https://nitectf.cryptonitemit.in/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": null,
      "description": "La versión indexada de la portada oficial de niteCTF 2026 anuncia la próxima apertura de inscripciones sin fecha. Describe un Jeopardy orientado a estudiantes y también a profesionales que quieren practicar. El navegador queda en blanco por un fallo al crear el contexto WebGL y la lectura directa de texto pide JavaScript. CTFtime mantiene del 11 al 13/12/2026 a las 12:00 UTC, con peso futuro pendiente. Cierre, costo, tamaño de equipo y restricciones de acceso siguen sin confirmarse."
    }
  ]
}
```
