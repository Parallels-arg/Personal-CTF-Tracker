# CTF Deep Check — 2026-11-05

Usé un navegador real con JavaScript. Pude leer los sitios oficiales de **5 de los 8 eventos**, más las páginas de registro y reglas de Crate y el sitio del organizador de niteCTF. L3m0n y Mimic fallaron por conexión. niteCTF quedó vacío por un error de WebGL. Cuatro invitaciones de Discord exigieron cuenta para acceder a los canales.

**8 eventos revisados, 2 con novedades y 6 sin cambios.** No encontré nuevos cierres de inscripción ni cambios de fechas.

**Rotación.** Quedaron **10 eventos fuera de la cola**. El próximo retorno es `wolvctf-2026` el **6/11 a las 00:16:10 ART** (`2026-11-06T00:16:10-03:00`), por fin de pausa. TVX vuelve el mismo día a las 07:00 ART por la excepción de inicio dentro de siete días.

## Selección

Leí los tres archivos de datos y los once informes de enriquecimiento procesados. Overrides tuvo precedencia para seleccionar y ordenar. Su única corrección corresponde a un evento terminado. La cola se fijó alrededor de las 12:02 ART.

Había 22 candidatos tras los filtros básicos, con diez pausados y doce disponibles. Se tomaron los ocho primeros por prioridad y comienzo. Cuatro quedaron fuera por cupo. No hizo falta relleno. La pausa de Glacier, Crate, L3m0n, x3 y nite había terminado el 4/11 a las 12:12:41 ART.

Orden: `spookyctf-2026`, `first-flag-ctf-2026`, `glacierctf-2026`, `crate-ctf-2026`, `l3m0n-ctf-2026-quals`, `x3ctf-2026`, `nitectf-2026`, `mimic-ctf-2026`.

Las novedades del JSON prevalecieron sobre observaciones parciales sin cambios en las revisiones anteriores. Los eventos con estado `inscripto` se consideraron para verificación de reglas y calendario sin exigir campos faltantes, pero no entraron en el cupo tras la rotación.

## Novedades

- **spookyctf-2026** — La FAQ confirma equipo sin límite y premios calculados para cuatro personas. También prohíbe que la IA lea retos o envíe soluciones directamente en la infraestructura del concurso. La política contempla consultas por accesibilidad mediante ticket. El formulario público sigue sin dar cierre. [FAQ](https://spooky.ctfd.io/) · [Registro](https://spooky.ctfd.io/register)
- **first-flag-ctf-2026** — Los premios ahora son crédito de Audn.AI para seguridad de IA. El apartado de reglas conserva la mención de gift cards, por lo que la descripción documenta el conflicto. Los requisitos de canje adicionales se comunicarán a ganadores y todavía no permiten resolver todos los detalles de elegibilidad del premio desde Argentina. [Evento, premios y reglas](https://cyberlearner.org/ctf) · [Registro](https://cyberlearner.org/register)

Se verificó que los tres archivos de datos conservaban sus SHA iniciales antes de preparar este informe.

## Revisados sin cambios

- **glacierctf-2026** — Página oficial, condiciones académicas de premios y reglas legibles. Las condiciones de matrícula y sanciones, el mecanismo por writeups y los premios ya constan en el repositorio. Siguen sin publicarse costo, límite de equipo ni cierre. Discord requiere cuenta. CTFtime conserva calendario y peso futuro pendiente. [Oficial](https://glacierctf.com/) · [Discord](https://discord.com/invite/DFYnRAME23) · [CTFtime](https://ctftime.org/event/3337/)
- **crate-ctf-2026** — Sitio institucional, plataforma, reglas y registro legibles. La frase de apertura sigue siendo **“Anmälan till Crate-CTF 2026 öppnde 1 september.”** El formulario mantiene preguntas académicas opcionales y envío opcional de stickers dentro de Suecia. Las condiciones de participación internacional, el costo y el cierre siguen sin confirmarse. Equipos sin límite y cada persona en un solo equipo coinciden con lo ya cargado. Discord exige cuenta. [Institución](https://foi.se/cratectf) · [Plataforma y reglas](https://ctf.crate.foi.se/) · [Registro](https://ctf.crate.foi.se/register) · [Discord](https://discord.com/invite/bMUNpzPanH)
- **l3m0n-ctf-2026-quals** — Portada y reglas oficiales fallaron por conexión. La lectura sin JavaScript y sitemap también fallaron. La búsqueda de redes del organizador mostró anuncios de patrocinio 2026 y material de registro de 2025, que no permite confirmar el registro de esta edición. Como último respaldo, CTFtime mantiene 28/11, 04:30–16:30 UTC y equipos 1–4. El anuncio del organizador allí conserva exactamente **“Registration opens soon on l3m0nctf.xyz.”** No se deduce un cierre. [Oficial](https://l3m0nctf.xyz/) · [Reglas](https://l3m0nctf.xyz/rules/) · [CTFtime](https://ctftime.org/event/3485/)
- **x3ctf-2026** — About y Rules legibles. Fechas, cuenta compartida por equipo y premios pendientes coinciden con lo cargado. La política LLM sigue en preparación. Siguen sin publicarse costo, cierre y tope de integrantes. Discord exige cuenta. CTFtime mantiene peso futuro pendiente. [Oficial](https://x3c.tf/) · [Discord](https://discord.com/invite/WpFHfD6nqH) · [CTFtime](https://ctftime.org/event/3450/)
- **nitectf-2026** — La página oficial quedó vacía y la consola confirmó `THREE.WebGLRenderer: Error creating WebGL context.` La lectura sin JavaScript solo pidió habilitarlo y el sitemap fue inaccesible. El sitio de Cryptonite cargó sin condiciones de inscripción de esta edición y su Instagram pidió iniciar sesión para leer publicaciones. CTFtime conserva fechas y peso futuro pendiente. Siguen sin confirmación oficial cierre, costo, equipo y elegibilidad. [Oficial](https://nitectf.cryptonitemit.in/) · [Organizador](https://cryptonitemit.in/) · [Instagram](https://www.instagram.com/cryptonite_mit/) · [CTFtime](https://ctftime.org/event/3367/)
- **mimic-ctf-2026** — El sitio oficial falló antes de recibir cabeceras y el sitemap fue inaccesible. La búsqueda de redes no aportó un canal verificable con las condiciones pendientes de esta edición. CTFtime conserva 7–8/11 a las 12:00 UTC, equipos 1–4 y condición casual. Siguen pendientes cierre, costo y elegibilidad oficial. [Oficial](https://ctf.rarebytehub.com/events/mimic) · [CTFtime](https://ctftime.org/event/3455/)

**Registro de SpookyCTF y First Flag.** Ambos eventos llevan novedades en el JSON y conservan el cierre de inscripción sin confirmar. El Discord de Spooky solicita cuenta. First Flag comunica su invitación a las personas registradas antes del evento. [Spooky Discord](https://discord.com/invite/aH63aNSZ7z) · [First Flag FAQ](https://cyberlearner.org/ctf)

```json
{
  "events": [
    {
      "id": "spookyctf-2026",
      "name": "SpookyCTF",
      "start": "2026-11-06T19:00:00.000Z",
      "end": "2026-11-07T19:00:00.000Z",
      "url": "https://spooky.ctfd.io/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "team_size": "individual o equipo sin límite; premios calculados para grupos de 4",
      "description": "La FAQ oficial confirma que no hay tope de integrantes. Los premios se calculan para cuatro personas y los equipos mayores deben repartirlos entre más integrantes. La IA no puede interactuar directamente con la infraestructura del concurso, leer retos en la plataforma ni enviar soluciones. Los miembros humanos pueden usarla como herramienta externa. Las necesidades de accesibilidad se tramitan mediante ticket. El horario cargado sigue respaldado por el aviso del organizador en CTFtime, que desplaza dos horas su cabecera. El cierre de inscripción sigue sin publicarse."
    },
    {
      "id": "first-flag-ctf-2026",
      "name": "First Flag CTF",
      "start": "2026-11-07T09:00:00.000Z",
      "end": "2026-11-07T15:00:00.000Z",
      "url": "https://cyberlearner.org/ctf",
      "verified_by": [
        "oficial"
      ],
      "prizes": "Crédito de Audn.AI de £100, £50 y £25 para los tres primeros, utilizable en modelos y API de seguridad de IA. Certificado verificable al entregar al menos una flag y certificado de puesto para el top 3. Canje y requisitos adicionales se comunican a ganadores.",
      "description": "Competencia individual gratuita de seis horas y seis retos. La sección de premios ahora anuncia saldo de uso en Audn.AI. Las reglas de pago todavía mencionan gift cards y exigen un writeup breve por cada flag del top 3, por lo que existe una discrepancia editorial. La plataforma anuncia que comunicará los pasos de canje y cualquier requisito de elegibilidad a los ganadores. El cierre de inscripción sigue sin publicarse y las herramientas de IA continúan desaconsejadas para resolver el evento."
    }
  ]
}
```
