# CTF Deep Check — 2026-11-19

Usé un navegador real con JavaScript y pude leer los sitios oficiales de los 8 eventos revisados.

La rotación dejó 14 eventos fuera de la cola tras aplicar excepciones y relleno. Los próximos en volver son `bsides-algiers-2026-ctf` y `undutmaning-2027`, el 2026-11-19 a las 12:08:16 ART, por fin de pausa. La cola se fijó el 19/11 a las 11:57:14 ART; no necesitó relleno.

- **GlacierCTF** ya enlaza una plataforma CTFd y un formulario público. La plataforma detalla tres brackets y la selección de los 20 mejores de cada uno para enviar writeups; pide adjuntar documentación para premios académicos. No publica cierre, costo de participación ni tope de integrantes. [Portada](https://glacierctf.com/) · [Plataforma](https://play.glacierctf.com/) · [Registro](https://play.glacierctf.com/register) · [Reglas](https://play.glacierctf.com/rules)
- **Outback Overflow** extiende el final al **22/11 a las 08:00 ART**: la portada anuncia 36 horas, del 21/11 a las 10:00 AEDT al 22/11 a las 22:00 AEDT. CTFtime aún muestra el final anterior, doce horas antes. Se conserva el inicio y se corrige únicamente el final a partir del sitio oficial. [Horario oficial](https://outbackoverflow26.hscyber.org/) · [FAQ](https://outbackoverflow26.hscyber.org/faq.html) · [Reglas](https://outbackoverflow26.hscyber.org/rules.html) · [Registro](https://ctf.hscyber.org/register) · [CTFtime](https://ctftime.org/event/3425/)

No confirmé fechas nuevas de cierre de inscripción. No trasladé valores de overrides al JSON.

## Revisados sin cambios

- `swampctf-2026` — La portada mantiene literalmente 20–22/11 a las 17:00 EDT; About admite a cualquiera y las instrucciones no limitan el equipo. La plataforma y su sitemap fallaron en este navegador con `net::ERR_HTTP2_PROTOCOL_ERROR`. El Discord oficial muestra creación de cuenta/inicio de sesión y no deja leer los canales sin cuenta; la ficha de respaldo de CTFtime devolvió 404. Costo y cierre sin confirmar. [Portada](https://swampctf.com/) · [About](https://swampctf.com/about.html) · [Instrucciones](https://swampctf.com/instructions.html)
- `crate-ctf-2026` — FOI mantiene «Anmälan till Crate-CTF 2026 öppnde 1 september.». La plataforma conserva el 21/11 de 10:00 a 18:00 ART y equipos sin límite. El formulario sigue público, sin cierre, costo ni condición explícita de admisión internacional. No convertí la apertura en un cierre. [FOI](https://foi.se/cratectf) · [Plataforma](https://ctf.crate.foi.se/) · [Registro](https://ctf.crate.foi.se/register)
- `eyesopenctf-2026` — El briefing conserva del 20 al 22/11 a las 08:00 ART y dos competidores por equipo. La portada y el formulario siguen admitiendo uno o dos; el pase gratuito mantiene «Entry through qualification», sin aclarar requisitos ni publicar cierre. El formulario admite Argentina como país. [Briefing](https://eyesopensecurity.com/ctf-briefing.html) · [Registro](https://eyesopensecurity.com/?modal=ctf)
- `wolvctf-2026` — El formulario y el reglamento siguen públicos. Equipos sin límite, una sola afiliación por jugador y registro UM con correo UM; IA limitada, sin interacción con la infraestructura y sin hacer todo el trabajo. No encontré cierre ni costo publicado, ni una modificación confirmada de los datos cargados. [Portada](https://wolvctf.io/) · [Registro](https://wolvctf.io/register) · [Reglas](https://wolvctf.io/rules)
- `n0v4ctf-2026` — Portada y sitio oficial enlazado mantienen inscripción mundial gratuita, equipos sin límite, 27–28/11 a las 14:00 ART y las reglas públicas ya registradas. No publican un cierre de inscripción. [Sitio y reglas](https://n0v4ctf.devs.surf/) · [Sitio oficial enlazado](https://novactf.netlify.app/)
- `black-hat-india-official-ctf-2026` — La portada y el FAQ mantienen acceso mundial, cuenta CTF7, equipos de exactamente tres, acceso gratuito y comienzo el 28/11 a las 11:00 ART, con 24 horas de duración. No aparece un cierre público. La consola redirige a inicio de sesión de CTF7 y presenta hCaptcha; no accedí a contenido privado ni completé el control. [Portada y FAQ](https://ctf.blackhat-india.com/)

```json
{
  "events": [
    {
      "id": "glacierctf-2026",
      "name": "GlacierCTF",
      "start": "2026-11-20T18:00:00.000Z",
      "url": "https://glacierctf.com/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "eligibility": "Participación abierta; premios académicos solo para equipos cuyos miembros estudien en escuela o universidad. Excluidos de premios los países sancionados por Austria/UE. Deben enviar prueba de ciudadanía o matrícula junto a los writeups; composición y documentación del equipo y alcance de la exclusión sin confirmar · para vos: dudoso",
      "description": "La portada oficial ya enlaza https://play.glacierctf.com/ y el formulario público https://play.glacierctf.com/register está disponible. La plataforma agrega tres brackets (Fully Automized, AI Chatbot + AI Agent, Human): los 20 mejores equipos de cada uno deben enviar los writeups solicitados dentro de los siete días posteriores al CTF; el ranking enviado a CTFtime reúne todos los brackets. Para optar a premios académicos, todos los integrantes deben estudiar en escuela o universidad y enviar documentación junto a los writeups; se mantiene la exclusión de países sancionados por Austria/UE. No se publica cierre de inscripción, costo de participación ni límite de integrantes. Se conservan las fechas cargadas."
    },
    {
      "id": "outback-overflow-2026",
      "name": "Outback Overflow 2026",
      "start": "2026-11-20T23:00:00.000Z",
      "url": "https://outbackoverflow26.hscyber.org/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "end": "2026-11-22T11:00:00Z",
      "ctftime_rated": null,
      "description": "Cambio de duración confirmado en la portada oficial: ahora anuncia 36 horas, desde el sábado 21/11/2026 a las 10:00 AEDT hasta el domingo 22/11 a las 22:00 AEDT. Equivale al 20/11 a las 20:00 ART hasta el 22/11 a las 08:00 ART: el inicio no cambia y el final se extiende doce horas respecto del repositorio y de CTFtime, que todavía publica 21/11 a las 23:00 UTC. Se prioriza el horario oficial. La inscripción online continúa abierta y el formulario público no indica cierre. Se mantienen gratuidad, equipos de hasta cuatro y acceso internacional. Las reglas permiten IA para investigación, aprendizaje, depuración y ayuda de programación, pero descalifican su uso para resolver retos directamente, obtener flags o generar soluciones completas. CTFtime mantiene el peso futuro pendiente."
    }
  ]
}
```
