# CTF Deep Check — 2026-10-28

Navegador real: **sí**. Se pudieron leer los sitios oficiales de **7 de los 8 eventos** y tres sitios oficiales complementarios (plataforma Crate, sitio de Chronos y sitio de Cryptonite). niteCTF quedó en blanco por un error de WebGL. Se consultaron también dos invitaciones de Discord y el perfil oficial de Cryptonite en Instagram; los canales y la publicación intentada requirieron acceso/cuenta.

**8 eventos revisados; 2 con novedades y 6 sin cambios.** No se confirmó ningún nuevo cierre de inscripción ni cambio de fechas. No se buscaron eventos nuevos.

## Cola y comparación

Se leyeron `data/events.json`, `data/status.json`, `data/overrides.json` y los informes procesados del 25 y 26/10. Las correcciones manuales tuvieron precedencia para decidir si un evento terminó y para ordenar; no se copiaron al JSON. La única entrada manual correspondía a un evento ya finalizado.

Orden de revisión: `csctf-2026`, `spookyctf-2026`, `first-flag-ctf-2026`, `glacierctf-2026`, `crate-ctf-2026`, `l3m0n-ctf-2026-quals`, `x3ctf-2026`, `nitectf-2026`. Los ocho pertenecen al primer grupo de prioridad: interesado sin cierre confirmado. La exclusión de 14 días no los saltea porque ese estado está exceptuado. Se respetó el máximo de ocho.

## Novedades y fuentes

- **csctf-2026** — Los [premios de la plataforma](https://2026.chronos-security.ro/prizes) publican beneficios para quienes completen el evento y archivo de writeups con autoría. La [lista oficial de premios](https://www.chronos-security.ro/competitions/csctf-2026/prizes) anuncia EUR 8.000+ combinando aportes de sponsors y apoyo en especie; no se interpreta como efectivo garantizado. Las [reglas de plataforma](https://2026.chronos-security.ro/rules) y [reglas completas](https://www.chronos-security.ro/competitions/csctf-2026/rules) detallan bonus globales 8%/5%/2% y envío de writeups hasta el 9/11 a las 15:00 EET. La [FAQ](https://www.chronos-security.ro/competitions/csctf-2026/faq) reconfirma calendario. Se corrige además `career_value`: el [registro actual](https://2026.chronos-security.ro/register) ya no muestra el consentimiento para oportunidades de sponsors que describía el dato anterior; el archivo público con autoría sí está confirmado. [CTFtime](https://ctftime.org/event/3333/) conserva fechas y peso futuro pendiente.
- **glacierctf-2026** — La [web oficial, secciones Academic Prizes e Information](https://glacierctf.com/) publicó premios y requisitos académicos/documentales. Se registra elegibilidad personal dudosa porque tu matrícula no confirma el resto del equipo ni toda la documentación. [CTFtime](https://ctftime.org/event/3337/) mantiene calendario, peso 73,17 y futuro pendiente.

Los `start` y `end` se conservan exactamente como están en `data/events.json` y fueron reconfirmados en las fuentes indicadas. Solo los dos eventos con novedades aparecen en el JSON. No se completan datos de registro por inferencia.

## Revisados sin cambios

- **spookyctf-2026** — [Sitio/FAQ](https://spooky.ctfd.io/) y [registro](https://spooky.ctfd.io/register) legibles. Siguen sin publicar cierre ni máximo numérico del equipo. Gratuidad y 18+ solo presencial ya estaban cargados. La [invitación oficial de Discord](https://discord.com/invite/aH63aNSZ7z) carga pero pide cuenta/acceso antes de leer canales; no se completó ningún registro.
- **first-flag-ctf-2026** — [Evento, Rules y FAQ](https://cyberlearner.org/ctf) y [registro público](https://cyberlearner.org/register) legibles. No hay cierre ni restricciones adicionales explícitas de edad, país o afiliación. La invitación específica de Discord se comunica a personas registradas; no se interpretó eso como una fecha límite. Fechas, gratuidad y formato individual sin cambios.
- **crate-ctf-2026** — [Página institucional](https://foi.se/cratectf), [plataforma con reglas](https://ctf.crate.foi.se/) y [registro público](https://ctf.crate.foi.se/register) legibles. Costo, cierre y elegibilidad internacional siguen sin quedar explícitos en estas páginas; el tamaño de equipo sin tope ya estaba cargado. Sobre apertura, la página institucional dice exactamente: “Anmälan till Crate-CTF 2026 öppnde 1 september.” No se convirtió apertura en cierre.
- **l3m0n-ctf-2026-quals** — [Web y FAQ interactiva](https://l3m0nctf.xyz/) y [Rules](https://l3m0nctf.xyz/rules/) legibles. La portada dice “Registration opens soon” y la FAQ “Registration is not open yet.” Las reglas dicen sobre lo pendiente: “the registration link and deadline, and the prizes will be announced on the home page and on CTFtime.” No se inventaron fechas. Los nuevos logotipos de sponsors no confirman costo, cierre ni beneficios concretos para participantes.
- **x3ctf-2026** — [Web, About y Rules](https://x3c.tf/) legibles, sin cierre, costo o máximo numérico de integrantes. Sigue permitida participación individual o por equipo con una sola cuenta y continúan pendientes las reglas LLM. La [invitación de Discord](https://discord.com/invite/WpFHfD6nqH) requiere cuenta/acceso para leer canales. Fechas y datos cargados sin cambios.
- **nitectf-2026** — [Sitio oficial](https://nitectf.cryptonitemit.in/) intentado en navegador real: pantalla en blanco y error de consola `THREE.WebGLRenderer: Error creating WebGL context.`. Se aplicaron las alternativas en orden:
  1. La lectura sin JavaScript solo ofrece el aviso de habilitar JavaScript; `https://nitectf.cryptonitemit.in/sitemap.xml` no resultó accesible mediante la herramienta de lectura.
  2. Se leyó [el sitio del organizador Cryptonite](https://cryptonitemit.in/) sin obtener datos nuevos de registro de niteCTF 2026. El [Instagram enlazado oficialmente](https://www.instagram.com/cryptonite_mit/) muestra el perfil, pero abrir una publicación exige iniciar sesión.
  3. Como último respaldo, [CTFtime](https://ctftime.org/event/3367/) conserva fechas, peso 59 y futuro pendiente. Esto ya estaba cargado como `ctftime_rated: null`. No se confirmaron oficialmente cierre, costo, elegibilidad ni tamaño de equipo; no se repite el evento en el JSON.

**Sin cambios en el cierre de CSCTF** (aunque sí hay novedades en sus reglas/premios): la portada oficial mantiene la frase “Opens 1 Jun 2026”; registro, reglas y FAQ no proporcionan un cierre. La apertura se registra aquí y no se transforma en `registration_deadline`.

```json
{
  "events": [
    {
      "id": "csctf-2026",
      "name": "CSCTF 2026",
      "start": "2026-11-06T13:00:00.000Z",
      "end": "2026-11-08T13:00:00.000Z",
      "url": "https://2026.chronos-security.ro/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "prizes": "Bolsa anunciada EUR 8.000+ con aportes en especie; reparto por bracket pendiente. Quienes completen el evento reciben 3 meses de PIECE Elite y certificado tras feedback. Descuento ThunderCipher 66%; beneficios Elastic. Top 3 por track requiere writeups antes del 9/11, 15:00 EET.",
      "description": "El calendario oficial mantiene 6–8/11/2026, 48 horas desde 15:00 EET (13:00 UTC), sin cambios de fechas. Se publicaron bonus para los tres primeros equipos en resolver cada reto: 8%, 5% y 2% del valor inicial, globales y no por división. Los writeups se envían a csctf@chronos-security.ro antes del 9/11 a las 15:00 EET; asunto WRITEUP - division - team name, un correo por equipo.",
      "career_value": "Los writeups enviados pueden publicarse con el nombre del autor en el archivo permanente del evento; sirve para mostrar trabajo técnico. No se verificaron ofertas laborales.",
      "ctftime_url": "https://ctftime.org/event/3333/",
      "weight": 0,
      "ctftime_rated": null
    },
    {
      "id": "glacierctf-2026",
      "name": "GlacierCTF",
      "start": "2026-11-20T18:00:00.000Z",
      "end": "2026-11-21T18:00:00.000Z",
      "url": "https://glacierctf.com/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "eligibility": "Participación abierta; premios estudiantiles: todo el equipo debe estudiar en escuela/universidad. Sin premios para equipos de países sancionados por Austria/UE; top 3 debe acreditar ciudadanía o matrícula. Faltan confirmar composición, documentación del equipo y aplicación de la exclusión · para vos: dudoso",
      "prizes": "Académicos: 1.º swag y 3 licencias IDA Pro Expert-2; 2.º, 2 licencias. Top 3: beca ISEC para Graz Security Week 2027 de hasta EUR 1.500, por reembolso tras asistir. Selección por writeups completos enviados en 7 días.",
      "description": "La web oficial publicó premios académicos y condiciones de elegibilidad; los ganadores se eligen mediante evaluación de writeups, no únicamente por el scoreboard. Se mantienen los horarios de 24 horas de CTFtime. Cierre de inscripción, costo y límite de integrantes no publicados.",
      "ctftime_url": "https://ctftime.org/event/3337/",
      "weight": 73.17,
      "ctftime_rated": null
    }
  ]
}
```
