# CTF Deep Check — 2026-11-25

Usé un navegador real con JavaScript y pude leer los sitios oficiales de los 8 eventos seleccionados, además de sus reglas, FAQ y formularios públicos disponibles. Las invitaciones de Discord de L3m0n, RedReaper, N0v4 y TUCTF requieren una cuenta para acceder a los canales; las reglas de RedReaper y la consola de Black Hat India requieren iniciar sesión.

La rotación dejó 8 eventos finalmente fuera de la cola, después de aplicar excepciones y relleno. El próximo en volver es `x3ctf-2026`, el 2026-11-27 a las 12:03:25 ART por fin de pausa; `nitectf-2026` y `pointer-overflow-ctf-2026` retornan al mismo tiempo. Cola fijada el 25/11 a las 12:01:03 ART. Hubo ocho candidatos habilitados, por lo que no hizo falta relleno ni quedaron candidatos habilitados fuera por el límite.

- **Electro Station / Whoami-Labs:** la misma temporada 2026-2 se reprogramó para enero de 2027: del 16/01 a las 10:00 ART al 18/01 a las 01:59 ART. El briefing ahora anuncia 40 retos, aproximadamente 40 horas y 150 plazas, y publica el reglamento completo. Se corrigen ambas fechas con respaldo oficial. [Ficha de temporada y reglas](https://whoami-labs.com/ctf/temporada/2026-2)
- **TUCTF:** el formulario de registro ya carga, a diferencia del 404 observado el 22/11. Se conservan las fechas y reglas ya verificadas; no hay cierre ni costo publicados. [Registro](https://ctfd.tuctf.com/register) · [FAQ](https://tuctf.com/faq/) · [Reglas](https://tuctf.com/rules/)
- **L3m0n e idktheCTF:** se recuperan sus URL oficiales y la verificación oficial frente a los valores actuales de data/events.json, que habían vuelto a apuntar a CTFtime. No se presentan como descubrimientos de eventos nuevos. [L3m0n](https://l3m0nctf.xyz/) · [Reglas](https://l3m0nctf.xyz/rules/) · [Registro](https://play.l3m0nctf.xyz/register) · [idktheCTF](https://ctf.idktheflag.sh/) · [Registro](https://ctf.idktheflag.sh/register)

No confirmé nuevos cierres de inscripción. Los overrides se usaron únicamente para seleccionar y ordenar, sin copiarse al JSON. No se envió ningún formulario ni se acredita inscripción o reserva. No se buscaron eventos nuevos.

## Revisados sin cambios

- `owasp-buenos-aires-6to-encuentro-ctf-2026` — La ficha y el formulario público de Luma mantienen el 26/11 de 18:30 a 22:00 ART, en Dársena Bar, CABA. La agenda conserva introducción al CTF a las 19:30, comienzo a las 19:45 y cierre del scoreboard a las 21:15. El formulario pide nombre y correo; la dirección exacta requiere registro. No publica fecha límite ni tamaño de equipo, y las reglas se explicarán durante la introducción. No hay correcciones nuevas a los datos actuales. [Ficha y registro](https://luma.com/u0qbe9xl)
- `redreaper-ctf-2026` — Portada y registro conservan equipos de dos a cuatro y formato híbrido entre clasificación y finales, sin precisar qué fase exige presencialidad. No publican cierre, costo ni requisitos geográficos; las reglas redirigen al login. Discord solo muestra la invitación y exige una cuenta para leer anuncios. No se confirmó un cambio de fechas ni reglas. [Portada](https://qualification.redx.site/) · [Registro](https://qualification.redx.site/register) · [Reglas](https://qualification.redx.site/rules)
- `n0v4ctf-2026` — Portada, reglas, premios y registro mantienen 27–28/11 de 14:00 a 14:00 ART, acceso mundial gratuito y equipos sin límite. Los vouchers TryHackMe y certificados ya están incorporados; se mantiene la entrega cinco a siete días después del cierre y de verificar los write-ups del top 3. Sin cierre de inscripción publicado. Discord requiere una cuenta para leer los canales. No se confirmó una novedad respecto de la última revisión. [Sitio, reglas y registro](https://n0v4ctf.devs.surf/)
- `black-hat-india-official-ctf-2026` — Portada y FAQ mantienen acceso mundial gratuito con cuenta CTF7, exactamente tres integrantes (sin juego individual ni dúos), y 24 horas desde el 28/11 a las 19:30 IST, equivalentes a 11:00 ART. Se leyeron las respuestas sobre registro, elegibilidad, equipo, fechas, reglas e IA. La consola requiere login y muestra hCaptcha; no se completó. No hay cierre de inscripción publicado ni correcciones nuevas confirmadas. [Portada y FAQ](https://ctf.blackhat-india.com/)

```json
{
  "events": [
    {
      "id": "l3m0n-ctf-2026-quals",
      "name": "L3m0n CTF 2026 Quals",
      "start": "2026-11-28T04:30:00.000Z",
      "url": "https://l3m0nctf.xyz/",
      "verified_by": [
        "ctftime",
        "oficial"
      ],
      "description": "Se recupera el sitio oficial frente a la URL de CTFtime que figura actualmente en data/events.json. Portada, FAQ, reglas y formulario público confirman registro abierto, clasificatorio online el 28/11/2026 de 01:30 a 13:30 ART y equipos de uno a cuatro, abierto a todos. Se conservan las fechas del clasificatorio. La final presencial en Coimbatore sigue anunciada para el 12/12 a las 01:30 ART, durante 24 horas, para los mejores 75–85 equipos. No se publica fecha límite de inscripción ni costo. Discord requiere una cuenta para leer los canales. La afirmación del organizador sobre el rating no se transforma en una actualización de ctftime_rated sin verificar la ficha de CTFtime."
    },
    {
      "id": "tuctf-2026",
      "name": "TUCTF 2026",
      "start": "2026-12-04T18:00:00.000Z",
      "url": "https://tuctf.com/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "description": "El formulario oficial https://ctfd.tuctf.com/register ahora carga y muestra registro de usuario con nombre, correo y contraseña; en la revisión del 22/11 devolvía 404. No se envió el formulario. Portada, FAQ y reglas conservan el 4–6/12/2026 de 15:00 a 15:00 ART, equipos de hasta cinco o juego individual, acceso abierto a cualquiera y ausencia de premios. El reglamento permite chatbots, copilotos y análisis asistido, pero prohíbe agentes que interactúen autónomamente con retos o infraestructura; los tickets deben escribirlos personas. No se publica costo ni fecha límite de inscripción. Discord requiere una cuenta. Se conserva el calendario actual, cuyo fin ya está corregido en data/events.json."
    },
    {
      "id": "whoami-labs-electro-station-ctf-2026",
      "name": "Whoami-Labs Electro Station CTF 2026",
      "start": "2027-01-16T13:00:00Z",
      "url": "https://whoami-labs.com/ctf/temporada/2026-2",
      "verified_by": [
        "oficial"
      ],
      "end": "2027-01-18T04:59:00Z",
      "description": "La ficha oficial específica de Electro Station, identificada como TEMPORADA 2026-2, cambió el calendario del evento existente: ahora abre el sábado 16/01/2027 a las 08:00 y cierra el domingo 17/01/2027 a las 23:59 de Colombia (GMT-5). En Argentina equivale al 16/01 a las 10:00 ART hasta el 18/01 a las 01:59 ART. Se reemplazan el inicio y fin del 5–6/12/2026 que conserva data/events.json; no se crea un evento nuevo ni se cambia su id. El briefing pasó de 80 retos y 24 horas a 40 retos y aproximadamente 40 horas, con 150 plazas, modalidad abierta individual o equipos de uno a tres. La página específica publica ahora el reglamento completo: puntos fijos sin scoring dinámico en esta temporada; desempate por quien alcanzó antes el puntaje; pistas que restan puntos; laboratorios Docker locales y aislados; una cuenta por persona y prohibición de colaborar fuera del equipo. La IA puede aclarar conceptos, pero no resolver el reto ni generar exploits o flags. No se publica cierre específico de inscripción ni costo de esta temporada; el cierre del arena no se interpreta como fecha límite de registro."
    },
    {
      "id": "idkthectf-2026",
      "name": "idktheCTF 2026",
      "start": "2026-12-26T01:00:00.000Z",
      "url": "https://ctf.idktheflag.sh/",
      "verified_by": [
        "ctftime",
        "oficial"
      ],
      "description": "Se recupera la URL oficial HTTPS frente a la ficha de CTFtime que figura actualmente en data/events.json. Portada y formulario público de registro cargan en el navegador; se conservan las fechas actuales, del 25/12/2026 a las 22:00 ART hasta el 28/12 a las 01:59 ART. Las reglas públicas prohíben atacar la infraestructura, hacer fuerza bruta contra el envío de flags y compartir flags entre equipos. El formulario solicita nombre de usuario, correo y contraseña; no se envió. No publica costo, cierre de inscripción ni condiciones de elegibilidad suficientes para completar esos campos. No se actualiza el tamaño de equipo ni ctftime_rated sin una nueva confirmación específica."
    }
  ]
}
```
