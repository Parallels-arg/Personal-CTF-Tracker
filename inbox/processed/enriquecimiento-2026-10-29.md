# CTF Deep Check — 2026-10-29

Navegador real: **sí**. Se pudieron leer los sitios oficiales de **7 de los 8 eventos**, además de tres sitios oficiales complementarios: Chronos, la plataforma de Crate y Cryptonite. niteCTF quedó en blanco por un error de WebGL. Se comprobaron cinco invitaciones de Discord; leer sus canales requiere cuenta/acceso. El perfil oficial de Cryptonite en Instagram carga, pero la publicación intentada exige iniciar sesión.

**8 eventos revisados; 0 con novedades confirmadas y 8 sin cambios.** No se encontró ningún nuevo cierre de inscripción ni se confirmó una corrección de fechas. No se buscaron eventos nuevos.

## Cola y comparación

Se leyeron `data/events.json`, `data/status.json`, `data/overrides.json` y los informes procesados del 25, 26 y 28/10. Se aplicaron las fechas y cierres manuales con precedencia para selección, disponibilidad de cierre y orden. La única entrada en overrides corresponde a un evento ya terminado; no afecta esta cola.

Los ocho seleccionados pertenecen al grupo de prioridad «interesado sin registration_deadline». Por eso no se aplica la exclusión de revisados sin cambios durante los últimos 14 días. Se ordenaron por comienzo efectivo y se respetó el máximo de ocho. Los datos se compararon con el contenido actual del repositorio; las novedades incorporadas el 28/10 no se vuelven a presentar como nuevas. Antes de publicar se reconfirmó que los tres archivos de datos no habían cambiado.

No se completan campos por inferencia. El JSON queda vacío y no copia valores de overrides.

## Revisados sin cambios

- **csctf-2026** — [Portada](https://2026.chronos-security.ro/), [registro](https://2026.chronos-security.ro/register), [reglas de plataforma](https://2026.chronos-security.ro/rules), [reglas completas](https://www.chronos-security.ro/competitions/csctf-2026/rules), [FAQ](https://www.chronos-security.ro/competitions/csctf-2026/faq) y [beneficios](https://2026.chronos-security.ro/prizes) legibles. La portada mantiene exactamente **“Opens 1 Jun 2026”**: es apertura, no cierre. El registro explica creación de cuenta, verificación por correo y equipo, sin publicar fecha límite. Continúan 6–8/11, 48 horas desde 15:00 EET, equipos de 1–5 y entrada gratuita mundial. Los bonus y beneficios ya estaban cargados. El límite del 9/11 a las 15:00 EET es para writeups; no se usa como cierre de inscripción. La [invitación de Discord](https://discord.com/invite/GucSYEKvHP) requiere cuenta/acceso para leer anuncios.

- **spookyctf-2026** — [Sitio con FAQ](https://spooky.ctfd.io/) y [registro](https://spooky.ctfd.io/register) legibles. Siguen sin cierre ni límite numérico de equipo publicados. La gratuidad, participación individual o grupal y edad mínima de 18 solo para asistencia presencial ya estaban registradas. El oficial muestra 6–7/11 sin hora visible: no permite resolver la discrepancia horaria documentada en el repo y se conserva el horario existente. La [invitación de Discord](https://discord.com/invite/aH63aNSZ7z) muestra el servidor, pero exige cuenta/acceso para leer canales.

- **first-flag-ctf-2026** — [Evento, Rules y FAQ](https://cyberlearner.org/ctf) y [registro](https://cyberlearner.org/register) legibles. Se mantienen 7/11 de 09:00 a 15:00 UTC, formato individual y costo £0. No se publica cierre ni se aclaran otras restricciones de país, edad o afiliación. La FAQ indica que se compartirá la invitación de Discord con personas registradas antes del comienzo; no se interpreta como fecha límite ni como confirmación de ninguna inscripción personal.

- **glacierctf-2026** — [Web oficial con Academic Prizes, Information y Rules](https://glacierctf.com/) legible. Cierre, costo y máximo numérico de integrantes siguen sin quedar explícitos. Los premios académicos y sus condiciones, incluidos requisitos de matrícula, documentación y exclusiones, ya fueron incorporados el 28/10. No se sustituyen por una afirmación nueva de elegibilidad personal. La [invitación de Discord del evento](https://discord.com/invite/DFYnRAME23) requiere cuenta/acceso para leer canales.

- **crate-ctf-2026** — [Página institucional](https://foi.se/cratectf), [plataforma con información y reglas](https://ctf.crate.foi.se/) y [registro](https://ctf.crate.foi.se/register) legibles. La página institucional dice exactamente **“Anmälan till Crate-CTF 2026 öppnde 1 september.”** No se convierte apertura en cierre. La plataforma mantiene el 21/11, 14:00–22:00 locales, y equipos sin límite de integrantes, ya cargados. No se confirma costo, cierre ni elegibilidad internacional. Las categorías académicas opcionales del formulario y el envío de stickers dentro de Suecia no prueban restricciones de participación. La [invitación de Discord](https://discord.com/invite/bMUNpzPanH) requiere cuenta/acceso para leer canales.

- **l3m0n-ctf-2026-quals** — [Web y FAQ interactiva](https://l3m0nctf.xyz/) y [Rules](https://l3m0nctf.xyz/rules/) legibles. La portada conserva **“Registration opens soon”** y el FAQ desplegado dice **“Registration is not open yet.”** Las reglas mantienen esta frase sobre lo pendiente: **“the registration link and deadline, and the prizes will be announced on the home page and on CTFtime.”** No se inventa una fecha de apertura o cierre. Continúan el clasificatorio del 28/11, 10:00–22:00 IST, participación abierta y equipos de 1–4. Los sponsors listados no confirman tarifa ni premios concretos.

- **x3ctf-2026** — [Sitio con About y Rules](https://x3c.tf/) legible. Se mantienen 4/12 a las 18:00 UTC hasta 6/12 a las 18:00 UTC y participación individual o por equipo con una sola cuenta. No aparecen cierre, costo ni máximo numérico de integrantes. Las reglas LLM continúan pendientes; no se presenta esa futura publicación como un cambio ya definido. La [invitación de Discord](https://discord.com/invite/WpFHfD6nqH) exige cuenta/acceso para leer canales.

- **nitectf-2026** — [Sitio oficial](https://nitectf.cryptonitemit.in/) abierto en navegador real, pero la página queda en blanco. La consola confirma `THREE.WebGLRenderer: Error creating WebGL context.` Se probaron las alternativas en orden:
  1. Lectura sin JavaScript: solo el aviso de habilitar JavaScript, sin datos del evento. El sitemap `https://nitectf.cryptonitemit.in/sitemap.xml` no fue accesible mediante la herramienta de lectura.
  2. [Sitio oficial del organizador Cryptonite](https://cryptonitemit.in/) legible, sin datos nuevos de registro de esta edición. El [Instagram enlazado por el organizador](https://www.instagram.com/cryptonite_mit/) carga el perfil, pero al abrir una publicación pide iniciar sesión.
  3. Como último respaldo, [CTFtime](https://ctftime.org/event/3367/) mantiene 11–13/12 a las 12:00 UTC, online, peso 59 y peso futuro pendiente. Son datos ya cargados; no se cambia `ctftime_rated: null`. No se confirmaron oficialmente cierre, costo, elegibilidad ni tamaño de equipo. No se reutilizan condiciones de ediciones anteriores.

```json
{
  "events": []
}
```
