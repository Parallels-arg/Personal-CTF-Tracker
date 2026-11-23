# CTF Deep Check — 2026-11-23

Usé un navegador real con JavaScript y pude leer 7 de los 8 sitios oficiales de la cola. BackdoorCTF y su sitemap devolvieron 522; como alternativa leí el sitio institucional de InfoSecIITR. Shellmates y ASIS cargan, pero sus páginas no confirman las condiciones de las respectivas ediciones seleccionadas.

La rotación dejó 7 eventos finalmente fuera de la cola después de aplicar excepciones y relleno. Los próximos en volver son `x3ctf-2026`, `nitectf-2026` y `pointer-overflow-ctf-2026`, el 2026-11-23 a las 12:04:55 ART, por fin de pausa. Cola fijada el 23/11 a las 11:56:03 ART; no hizo falta relleno. Se conservó el máximo de ocho eventos y no se buscaron eventos nuevos.

**idktheCTF:** el sitio oficial volvió a ser legible y redirige a HTTPS. Pude leer el formulario público y las reglas. Se permite crear un equipo de una persona; no deduje gratuidad, admisión internacional ni un cierre por la mera disponibilidad del formulario. Se conservan las fechas base. [Portada y reglas](https://ctf.idktheflag.sh/) · [Registro](https://ctf.idktheflag.sh/register) · [CTFtime](https://ctftime.org/event/3429)

No confirmé nuevos cierres de inscripción ni cambios de fechas. Los overrides se usaron solo para seleccionar y ordenar; no se copiaron al JSON. Esta revisión no acredita inscripción a ningún evento.

## Revisados sin cambios

- `l3m0n-ctf-2026-quals` — Portada, FAQ, reglas y registro mantienen el clasificatorio online del 28/11 de 01:30 a 13:30 ART, abierto a todos y equipos de uno a cuatro. El cierre sigue pendiente: «More to come: the finals dates, the registration deadline and the prizes will be announced on the home page and on CTFtime.». No publica costo; Discord requiere una cuenta. [Portada](https://l3m0nctf.xyz/) · [Reglas](https://l3m0nctf.xyz/rules/) · [Registro](https://play.l3m0nctf.xyz/register)
- `redreaper-ctf-2026` — Registro público sin cierre, costo ni elegibilidad publicados. La portada conserva equipos de dos a cuatro y formato híbrido entre clasificación y finales, sin precisar qué fase exige presencialidad. Las reglas llevan al login y Discord exige una cuenta. CTFtime conserva el 27/11 de 08:00 a 16:00 ART y peso futuro pendiente. [Portada](https://qualification.redx.site/) · [Registro](https://qualification.redx.site/register) · [Reglas](https://qualification.redx.site/rules) · [CTFtime](https://ctftime.org/event/3502)
- `n0v4ctf-2026` — Portada, reglas y formulario mantienen registro gratuito mundial, equipos sin límite y el 27–28/11 de 14:00 a 14:00 ART. Siguen el límite de ocho envíos por minuto y la prohibición de compartir flags, pistas inéditas o soluciones. No hay cierre publicado y Discord requiere una cuenta. [Sitio y reglas](https://n0v4ctf.devs.surf/)
- `black-hat-india-official-ctf-2026` — Portada y FAQ mantienen inscripción gratuita mundial con cuenta CTF7 y exactamente tres integrantes. La portada anuncia 28/11 a las 19:30 IST y 24 horas, coincidente con el 28–29/11 a las 11:00 ART ya registrado. El FAQ conserva una nota genérica de fecha pendiente, sin aportar otra fecha. Las reglas públicas no aportan correcciones. La consola pide login y hCaptcha; cierre no publicado. [Portada y FAQ](https://ctf.blackhat-india.com/)
- `bsides-algiers-2026-ctf` — Shellmates carga y su menú y sección Events no aportan registro ni reglas para 2026; la ficha visible de BSides corresponde a 2023. Discord requiere una cuenta. La búsqueda específica tampoco aportó una fuente oficial con condiciones de registro. CTFtime mantiene 17/12 16:00 ART a 19/12 04:00 ART, modalidad online y presencial reservada a equipos argelinos, sin costo, cierre ni tamaño de equipo confirmados. No se trasladan condiciones de otras ediciones. [Organizador](https://shellmates.club/) · [CTFtime](https://ctftime.org/event/3475/)
- `backdoorctf-2026` — Portal y sitemap devolvieron «Connection timed out Error code 522». InfoSecIITR y About describen la actividad anual, sin reglas o inscripción de esta edición. La invitación Discord de CTFtime mostró «Invite Invalid». CTFtime conserva 19–20/12 de 09:00 a 09:00 ART y peso futuro pendiente. Cierre, costo, elegibilidad y tamaño de equipo siguen sin confirmar. La restricción a alumnos de IITR describe al club, no se aplica al CTF. [Organizador](https://infoseciitr.in/) · [About](https://infoseciitr.in/about) · [CTFtime](https://ctftime.org/event/3472/)
- `asis-ctf-finals-2026` — La portada y las noticias siguen en el clasificatorio de agosto; el FAQ mezcla contenido de Tech Olympics, y su enlace Discord abre el servidor Olympics CTF. El Discord ASIS también pide una cuenta. Las reglas dicen «Registration will be open until the end of the game.», pero no se puede atribuir esa frase a la final de diciembre: no invento un cierre ni traslado el máximo de cuatro del clasificatorio a esta final. CTFtime conserva 27–28/12 de 11:00 a 11:00 ART y peso futuro pendiente. No confirmé costo ni requisitos de clasificación. [Portada](https://asisctf.com/) · [Reglas](https://asisctf.com/rules) · [FAQ](https://asisctf.com/faq) · [Noticias](https://asisctf.com/announcements) · [CTFtime](https://ctftime.org/event/3062/)

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
      "description": "El sitio oficial ya carga con JavaScript y redirige de HTTP a HTTPS. Tiene un formulario público de registro en https://ctf.idktheflag.sh/register, con usuario, correo y contraseña; no se completó ni se creó una cuenta. Confirma la competencia por equipos y permite crear un equipo de una persona para jugar solo. Las reglas públicas prohíben atacar la infraestructura, forzar flags y compartir soluciones, y exigen respetar el alcance de cada reto. El calendario mostrado coincide con el 26–28/12 de data/events.json, que se conserva. No publica cierre de inscripción, costo ni condiciones precisas de elegibilidad. CTFtime mantiene equipos sin límite y peso futuro pendiente; esas condiciones no se deducen del formulario."
    }
  ]
}
```
