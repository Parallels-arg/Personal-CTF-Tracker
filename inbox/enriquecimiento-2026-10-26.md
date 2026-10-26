# CTF Deep Check — 2026-10-26

Navegador real: **sí**. Sitios oficiales de los eventos legibles: **7 de 8**. Además se leyeron cuatro sitios complementarios del organizador o de la plataforma. niteCTF quedó en blanco por un fallo de WebGL; el perfil público de Instagram de su organizador fue visible, pero sus publicaciones pidieron iniciar sesión. Tres invitaciones de Discord cargaron sin permitir leer canales sin cuenta/acceso.

**8 eventos revisados; 3 con datos corregidos y 5 sin novedades.** No se confirmó ningún cierre nuevo de inscripción ni cambio de fechas. No se buscaron eventos nuevos.

## Cola y criterio aplicado

Se leyeron `data/events.json`, `data/status.json`, `data/overrides.json` y `inbox/processed/enriquecimiento-2026-10-25.md`. Las correcciones manuales tuvieron precedencia solo para selección y orden; no se trasladaron al JSON. La única entrada de overrides correspondía a un evento ya terminado al momento de esta revisión.

La cola, en este orden, fue: `csctf-2026`, `spookyctf-2026`, `first-flag-ctf-2026`, `glacierctf-2026`, `crate-ctf-2026`, `l3m0n-ctf-2026-quals`, `x3ctf-2026` y `nitectf-2026`. Los ocho tienen prioridad de interesado sin cierre confirmado. Los revisados ayer siguen siendo elegibles por la excepción para interesado; el límite de ocho dejó las verificaciones de otros grupos para otra pasada.

## Datos corregidos y fuentes

- **csctf-2026** — El [sitio del evento](https://2026.chronos-security.ro/), las [reglas de la plataforma](https://2026.chronos-security.ro/rules), las [reglas completas](https://www.chronos-security.ro/competitions/csctf-2026/rules) y la [FAQ oficial](https://www.chronos-security.ro/competitions/csctf-2026/faq) presentan un evento futuro del 6–8/11, de 48 horas desde las 15:00 EET. Se corrige la descripción antigua que advertía sobre una operación concluida. El [registro público](https://2026.chronos-security.ro/register) conserva las categorías: todos menores de 18 en Juniors, todos de 18 o más en Seniors y sin límite de edad en Fighters. La evaluación personal positiva se refiere a la posibilidad de participar por Fighters, abierta mundialmente; no presupone tu edad ni la composición de tu equipo. [CTFtime](https://ctftime.org/event/3333/) coincide en fechas y mantiene peso futuro por definir.
- **glacierctf-2026** — [CTFtime](https://ctftime.org/event/3337/) publica peso actual 73,17 pero “Future weight: to be determined”. Se corrige `ctftime_rated` de `true` a `null`; no se altera el peso numérico ni el calendario. La [web oficial](https://glacierctf.com/) confirma edición y categorías, pero no publica cierre, costo, tamaño de equipo o requisitos adicionales. El [organizador](https://losfuzzys.net/) tampoco aportó esos campos. La [invitación del Discord de GlacierCTF](https://discord.com/invite/DFYnRAME23) requiere cuenta/acceso para leer canales.
- **nitectf-2026** — Se corrige `ctftime_rated` de `true` a `null`: [CTFtime](https://ctftime.org/event/3367/) muestra peso actual 59 y futuro por definir, con las mismas fechas del repo. Se precisa el motivo de oficial sin confirmar en `description`. Secuencia alternativa aplicada tras intentar [la web oficial](https://nitectf.cryptonitemit.in/) con JavaScript:
  1. El navegador mostró la página vacía y la consola registró `THREE.WebGLRenderer: Error creating WebGL context.`.
  2. La lectura sin JavaScript solo devolvió un aviso para habilitarlo; `https://nitectf.cryptonitemit.in/sitemap.xml` no fue accesible mediante la herramienta de lectura.
  3. Se leyó [el sitio de Cryptonite](https://cryptonitemit.in/), que confirma que organiza niteCTF, sin datos de registro de esta edición. El [Instagram oficial](https://www.instagram.com/cryptonite_mit/) mostró el perfil, pero al abrir una publicación pidió iniciar sesión; LinkedIn no pudo recuperarse con la herramienta de lectura. No se atribuyeron datos de otras ediciones a 2026.
  4. Se utilizó CTFtime como respaldo. No se confirmaron oficialmente cierre de inscripción, costo, elegibilidad ni tamaño de equipo; esos campos se omiten.

Los `start` y `end` del JSON conservan los valores de `data/events.json`, reconfirmados en las fuentes indicadas. El JSON solo contiene los tres eventos con correcciones.

## Revisados sin cambios

- **spookyctf-2026** — [Web y FAQ](https://spooky.ctfd.io/) y [registro público](https://spooky.ctfd.io/register) legibles. Confirman gratuidad, participación individual o grupal y requisito de 18+ solo presencial. No publican cierre ni límite numérico del equipo. El registro enumera Argentina entre los países, pero no se utilizó ese selector como prueba de condiciones adicionales. La [invitación de Discord](https://discord.com/invite/aH63aNSZ7z) requiere cuenta/acceso para leer los canales. No se completó ningún registro.
- **first-flag-ctf-2026** — [Evento, Rules y FAQ](https://cyberlearner.org/ctf) y [registro](https://cyberlearner.org/register) legibles. Sin cierre de inscripción ni restricciones adicionales explícitas de país, edad o afiliación. La FAQ indica que la invitación de Discord se envía a participantes registrados; no se dedujo de ello una fecha límite.
- **crate-ctf-2026** — [Página institucional](https://foi.se/cratectf), [plataforma con reglas](https://ctf.crate.foi.se/) y [registro](https://ctf.crate.foi.se/register) legibles. Sin costo ni cierre explícitos, ni nueva confirmación de elegibilidad internacional en estas páginas. Se conserva la regla de equipos sin límite ya incorporada ayer. Sobre apertura, el texto institucional dice exactamente: “Anmälan till Crate-CTF 2026 öppnde 1 september.” Se registra esa frase sin convertirla en cierre de inscripción.
- **l3m0n-ctf-2026-quals** — [Web y FAQ interactiva](https://l3m0nctf.xyz/) y [Rules](https://l3m0nctf.xyz/rules/) legibles. La portada dice exactamente “Registration opens soon”. Las reglas añaden: “the registration link and deadline, and the prizes will be announced on the home page and on CTFtime.” No se inventó una fecha de apertura o de cierre; costo sin publicar. Equipos de 1–4, acceso abierto y fechas coinciden con lo ya cargado.
- **x3ctf-2026** — [Web con About y Rules](https://x3c.tf/) legible. Conserva 4–6/12, 18:00 UTC, 48 horas y participación individual o en equipo con una cuenta compartida por equipo. No indica costo, límite numérico, elegibilidad precisa ni cierre de inscripción. Las reglas sobre LLM siguen anunciadas como pendientes; no se confundió ese aviso con un anuncio de inscripción. La [invitación de Discord](https://discord.com/invite/WpFHfD6nqH) requiere cuenta/acceso para leer canales.

**Sin cambios en el cierre de inscripción de CSCTF** (el evento sí lleva las correcciones indicadas arriba): la portada dice exactamente “Opens 1 Jun 2026”. Rules, registro y FAQ no especifican el cierre. Esa apertura no se transforma en `registration_deadline`.

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
      "eligibility": "mundial; Juniors: todos menores de 18; Seniors: todos de 18+; Fighters: sin restricción de edad, permite participar desde Argentina · para vos: sí",
      "description": "Las reglas, FAQ y calendario oficiales confirman 6–8/11/2026, inicio 15:00 EET (13:00 UTC), durante 48 horas. En la revisión actual las páginas legibles presentan el evento como futuro; se retira la advertencia anterior de operación concluida. Cada integrante debe registrarse y el equipo de 1–5 se bloquea al inicio.",
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
      "ctftime_url": "https://ctftime.org/event/3337/",
      "weight": 73.17,
      "ctftime_rated": null
    },
    {
      "id": "nitectf-2026",
      "name": "niteCTF 2026",
      "start": "2026-12-11T12:00:00.000Z",
      "end": "2026-12-13T12:00:00.000Z",
      "url": "https://ctftime.org/event/3367/",
      "verified_by": [
        "ctftime"
      ],
      "description": "CTF online de 48 horas para estudiantes y participantes experimentados, con hardware, crypto, web, forensics, pwn y reversing; fechas confirmadas en CTFtime. Oficial sin confirmar: la web queda en blanco por un error al crear el contexto WebGL; la versión sin JavaScript no aporta contenido y las redes consultadas no permitieron confirmar los datos de inscripción de esta edición.",
      "ctftime_url": "https://ctftime.org/event/3367/",
      "weight": 59,
      "ctftime_rated": null
    }
  ]
}
```
