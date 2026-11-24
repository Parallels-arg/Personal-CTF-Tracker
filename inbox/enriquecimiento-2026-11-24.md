# CTF Deep Check — 2026-11-24

Usé un navegador real con JavaScript y pude leer 7 de los 8 sitios oficiales seleccionados. niteCTF quedó en blanco por un error al crear el contexto WebGL; su sitemap tampoco mostró contenido. Como alternativas consulté el organizador, su red oficial, el texto oficial indexado y finalmente CTFtime.

La rotación dejó 6 eventos finalmente fuera de la cola después de aplicar excepciones y relleno. El próximo en volver es `idkthectf-2026`, el 2026-11-24 a las 11:59:53 ART, por fin de pausa. Cola fijada el 24/11 a las 11:59:41 ART; ese retorno ocurrió después de fijarla. No hizo falta relleno. Se revisaron ocho eventos existentes, incluido el encuentro de OWASP que ya estaba incorporado en data/events.json.

- **L3m0n:** anunció la final presencial del 12/12 a las 01:30 ART, 24 horas, para los mejores 75–85 equipos. Se conserva el calendario del clasificatorio. El cierre de inscripción sigue sin fecha publicada. [Portada](https://l3m0nctf.xyz/) · [Reglas](https://l3m0nctf.xyz/rules/) · [Registro](https://play.l3m0nctf.xyz/register)
- **OWASP Buenos Aires:** Luma confirma el encuentro del 26/11 de 18:30 a 22:00 ART; corrijo el fin que estaba igual al inicio. El CTF tiene horario propio dentro del encuentro: inicio competitivo 19:45 y cierre del scoreboard 21:15 ART. El formulario está visible y pide nombre y correo; no se envió. [Ficha y registro](https://luma.com/u0qbe9xl)
- **N0v4:** publicó vouchers TryHackMe Premium, certificados y premio al mejor write-up, con entrega después de verificar los write-ups del top 3. Sin cambios de fechas ni cierre publicado. [Sitio, premios y reglas](https://n0v4ctf.devs.surf/)

No confirmé nuevos cierres de inscripción. Los overrides se usaron únicamente para seleccionar y ordenar, sin copiarse al JSON. No se acredita inscripción ni reserva para ningún evento.

## Revisados sin cambios

- `x3ctf-2026` — Portada y reglas mantienen 4–6/12 de 15:00 a 15:00 ART. Permite jugar individualmente o en equipo usando una única cuenta, sin publicar límite numérico, cierre ni costo. Las reglas sobre LLM siguen pendientes y el organizador advierte que las reglas cambiarán antes del comienzo. Discord requiere una cuenta. [Portada y reglas](https://x3c.tf/)
- `nitectf-2026` — El navegador y el sitemap permanecieron en blanco; la consola mostró «THREE.WebGLRenderer: Error creating WebGL context.». El texto oficial indexado sigue diciendo «Registrations opening soon!», sin fecha. El sitio institucional no aporta condiciones de inscripción y Instagram pidió login. CTFtime conserva 11–13/12 de 09:00 a 09:00 ART, con peso futuro pendiente. No confirmé cierre, costo, tamaño de equipo ni restricciones. [Sitio oficial](https://nitectf.cryptonitemit.in/) · [Organizador](https://cryptonitemit.in/) · [CTFtime](https://ctftime.org/event/3367/)
- `pointer-overflow-ctf-2026` — Revisión limitada a fechas, horario y reglas según el alcance asignado. La portada mantiene el final del 6/12 a las 16:00 CST, equivalente a 19:00 ART. Leí los siete apartados del reglamento: flags y contenido propios por equipo, cierres de retos, brackets, conducta, puntuación congelada entre 50–500 con bonus inicial del 10%, pistas secuenciales y compromisos de anuncio. Conservan lo observado anteriormente; no confirmé un nuevo cambio. Discord requiere una cuenta. [Portada](https://pointeroverflowctf.com/) · [Reglas](https://pointeroverflowctf.com/rules.html)
- `redreaper-ctf-2026` — Portada y formulario mantienen equipos de dos a cuatro; no publican cierre, costo ni requisitos geográficos. Las reglas redirigen al login y la invitación de Discord no mostró contenido legible en este navegador. La portada conserva el formato híbrido entre clasificación y finales sin precisar qué fase exige presencialidad. No confirmé otra fecha oficial ni cambio de reglas. [Portada](https://qualification.redx.site/) · [Registro](https://qualification.redx.site/register) · [Reglas](https://qualification.redx.site/rules)
- `black-hat-india-official-ctf-2026` — Portada y FAQ mantienen acceso mundial gratuito con cuenta CTF7, equipos de exactamente tres y 24 horas desde el 28/11 a las 19:30 IST (11:00 ART). La consola pide login y hCaptcha. No publica cierre de inscripción ni confirma correcciones a los datos existentes. [Portada y FAQ](https://ctf.blackhat-india.com/)

```json
{
  "events": [
    {
      "id": "l3m0n-ctf-2026-quals",
      "name": "L3m0n CTF 2026 Quals",
      "start": "2026-11-28T04:30:00.000Z",
      "url": "https://l3m0nctf.xyz/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "description": "La portada oficial ya anuncia la final presencial en Coimbatore: 12/12/2026 a las 10:00 IST (01:30 ART), durante 24 horas, para los mejores 75–85 equipos del clasificatorio. Se documenta como novedad del evento existente, sin crear una nueva ficha ni cambiar las fechas del clasificatorio online del 28/11 de 01:30 a 13:30 ART. Sigue abierto a todos, con equipos de uno a cuatro. Las reglas agregan que, ante dudas sobre una herramienta, se debe abrir un ticket en Discord antes de usarla. El registro permanece abierto; el aviso anterior de cierre por anunciar fue retirado de las reglas, pero no se publicó una fecha de cierre ni costo. El organizador ahora afirma que cuenta para el rating de CTFtime; no pude verificar la ficha de la edición por un error del navegador, por lo que no actualizo ctftime_rated."
    },
    {
      "id": "owasp-buenos-aires-6to-encuentro-ctf-2026",
      "name": "OWASP Buenos Aires – 6to Encuentro: Charla Proxy & CTF Hands-On",
      "start": "2026-11-26T21:30:00.000Z",
      "url": "https://luma.com/u0qbe9xl",
      "verified_by": [
        "oficial"
      ],
      "end": "2026-11-27T01:00:00Z",
      "description": "La ficha oficial de Luma confirma el encuentro presencial del jueves 26/11 de 18:30 a 22:00 GMT-3 en CABA, en Dársena Bar. Se corrige el fin de data/events.json, que era igual al inicio: el encuentro termina el 27/11 a las 01:00 UTC (26/11 a las 22:00 ART). La agenda distingue el CTF: introducción a las 19:30 ART, comienzo competitivo a las 19:45 y cierre del scoreboard a las 21:15. Llevar notebook con Burp Suite u OWASP ZAP instalado. El botón de registro abre un formulario público con nombre y correo; no se envió ni se confirma una reserva. No publica fecha límite ni tamaño de equipo; las reglas se explicarán en la introducción del encuentro. La dirección exacta se revela tras registrarse."
    },
    {
      "id": "n0v4ctf-2026",
      "name": "N0v4CTF 2026",
      "start": "2026-11-27T17:00:00.000Z",
      "url": "https://n0v4ctf.devs.surf/",
      "verified_by": [
        "ctftime",
        "oficial"
      ],
      "prizes": "1.º: 2 vouchers TryHackMe Premium de 6 meses; 2.º: 2 de 3 meses; 3.º: 2 de 1 mes, más certificados. Mejor write-up: 1 voucher de 1 mes.",
      "description": "El sitio oficial publica ahora premios patrocinados por TryHackMe: dos vouchers Premium de seis, tres y un mes para primero, segundo y tercer puesto respectivamente, más certificados de ganadores; un voucher de un mes para el mejor write-up. La entrega se anuncia para cinco a siete días después del evento y de verificar los write-ups del top 3. Se conservan el 27–28/11 de 14:00 a 14:00 ART, registro mundial gratuito y equipos sin límite. El formulario sigue visible. Las reglas mantienen ocho envíos por minuto por cuenta y prohíben compartir flags, pistas inéditas o soluciones. No se publica cierre de inscripción; Discord requiere una cuenta."
    }
  ]
}
```
