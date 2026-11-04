# CTF Deep Check — 2026-11-04

Usé un navegador real con JavaScript. Leí páginas oficiales o fichas del organizador para siete de los ocho eventos revisados. En SwampCTF y H4CKC0N falló un dominio de competición y pude leer otras fuentes oficiales. Mimic quedó limitado a CTFtime. Confirmé dos cierres de inscripción.

La rotación dejó **12 eventos fuera de la cola** al fijarla alrededor de las 11:56 ART. El próximo retorno es `glacierctf-2026` el **4/11 a las 12:12:41 ART** (`2026-11-04T12:12:41-03:00`), al cumplirse tres días desde la última revisión sin cambios. Crate, L3m0n, x3CTF y niteCTF vuelven en el mismo momento.

Apliqué los overrides a la selección y el orden. La única entrada correspondía a un evento terminado. De 24 candidatos quedaron 12 disponibles tras la rotación. Tomé los ocho primeros por prioridad y fecha efectiva de inicio, sin relleno. Los eventos del 6 y 7 de noviembre entraron por proximidad. Para Pointer Overflow revisé únicamente fechas, horarios y reglas. Orden: `csctf-2026`, `spookyctf-2026`, `first-flag-ctf-2026`, `swampctf-2026`, `pointer-overflow-ctf-2026`, `mimic-ctf-2026`, `h4ckc0n-2026`, `whoami-labs-electro-station-ctf-2026`.

## Novedades confirmadas

- **csctf-2026** — Las reglas fijan el cierre de altas nuevas al inicio del CTF, el **6/11 a las 10:00 ART** (15:00 EET). Las cuentas existentes pueden crear o integrar un equipo durante el evento. [Reglas](https://2026.chronos-security.ro/rules) · [Registro](https://2026.chronos-security.ro/register) · [FAQ](https://2026.chronos-security.ro/faq)
- **h4ckc0n-2026** — La ficha de IIIT Delhi en Unstop confirma **gratis**, equipos de **1–6** y cierre el **14/11 a las 15:29 ART** (23:59 IST). Ese cierre es posterior al inicio de las 12:30 ART de CTFtime. Se conserva la ventana previa y se documenta la discrepancia. El dominio listado en CTFtime falló por conexión y su sitemap fue inaccesible. El Discord pide cuenta y el micrositio institucional carga, aunque sus avisos de estado son contradictorios. El premio monetario tiene condiciones específicas distintas de la elegibilidad para jugar. [IIIT Delhi](https://d4rkc0de.iiitd.edu.in/) · [Ficha de inscripción de IIIT Delhi](https://api.unstop.com/competitions/h4ckc0n-global-hacking-ctf-competition-esya26-indraprastha-institute-of-information-technology-iiit-delhi-1767441) · [Discord](https://discord.com/invite/kw8J5r2ZWh) · [CTFtime](https://ctftime.org/event/3464)

## Revisados sin cambios

- **spookyctf-2026** — La FAQ confirma participación individual o grupal y gratuidad. El formulario no publica un máximo ni cierre. Discord pide cuenta. CTFtime conserva el encabezado a las 17:00 UTC y el aviso del organizador que lo desplaza dos horas. El peso futuro sigue pendiente. [FAQ](https://spooky.ctfd.io/) · [Registro](https://spooky.ctfd.io/register) · [Discord](https://discord.com/invite/aH63aNSZ7z) · [CTFtime](https://ctftime.org/event/3339/)
- **first-flag-ctf-2026** — Portada, reglas y formulario confirman formato individual gratuito. El evento sigue el 7/11 de 06:00 a 12:00 ART. El formulario no da cierre. La invitación al Discord se distribuye a las personas registradas antes del evento. [Evento](https://cyberlearner.org/ctf) · [Registro](https://cyberlearner.org/register)
- **swampctf-2026** — La portada mantiene «5PM EDT» y las instrucciones mantienen equipos sin tope. La plataforma de competición falló al conectar con el servidor de origen y su sitemap fue inaccesible. Discord pide cuenta. Siguen pendientes el cierre y el costo. [Portada](https://swampctf.com/) · [About](https://swampctf.com/about.html) · [Instrucciones](https://swampctf.com/instructions.html) · [Discord](https://discord.com/invite/9H6HbcMk7X)
- **pointer-overflow-ctf-2026** — Las oleadas y el cierre del 6/12 a las 16:00 CST (19:00 ART) coinciden con el calendario oficial vigente. Las reglas de pistas, colaboración y aviso de cambios que afecten la equidad coinciden con la revisión anterior. [Calendario](https://pointeroverflowctf.com/) · [Reglas](https://pointeroverflowctf.com/rules.html)
- **mimic-ctf-2026** — El sitio oficial falló antes de recibir cabeceras y el sitemap fue inaccesible. La búsqueda del organizador no devolvió un canal público verificable con condiciones de esta edición. CTFtime mantiene fechas, equipos de uno a cuatro y condición casual. El cierre, el costo y la elegibilidad siguen sin confirmación oficial. [Sitio oficial](https://ctf.rarebytehub.com/events/mimic) · [CTFtime](https://ctftime.org/event/3455/)
- **whoami-labs-electro-station-ctf-2026** — La ficha mantiene 5–6/12 a las 10:00 ART y «Equipos 1-3 / Solo». La sección general conserva «Electro Station: fecha por confirmar». La cuenta de la plataforma es gratuita. La FAQ y el registro no dan cierre ni precio específico de esta temporada, y Discord pide cuenta. [Temporadas](https://whoami-labs.com/ctf#temporadas) · [FAQ](https://whoami-labs.com/faq) · [Registro](https://whoami-labs.com/register) · [Discord](https://discord.com/invite/SPkZKKWepX)

**Aviso de plataforma de H4CKC0N.** En la descripción de Wave 0, la ficha dice «The link will be soon shared». La publicación se refiere al enlace para jugar. El cierre confirmado arriba proviene del campo explícito de plazo de inscripción.

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
      "registration_deadline": "2026-11-06T10:00:00-03:00",
      "description": "El alta de cuentas nuevas cierra al inicio de la competencia, el 6/11 a las 15:00 EET (10:00 ART). Las cuentas existentes pueden crear o unirse a un equipo durante el evento. Las tandas de retos se abren el 6 y 7/11 a las 15:00 EET. El puntaje cierra el 8/11 a esa hora y los retos quedan accesibles para práctica. El top 3 de cada división debe enviar un writeup por equipo antes del 9/11 a las 15:00 EET, con todos sus retos acreditados. Las reglas permiten IA como apoyo de investigación y aprendizaje y hacen responsable al equipo de su uso."
    },
    {
      "id": "h4ckc0n-2026",
      "name": "h4ckc0n 2026",
      "start": "2026-11-14T15:30:00.000Z",
      "end": "2026-11-15T15:30:00.000Z",
      "url": "https://d4rkc0de.iiitd.edu.in/",
      "verified_by": [
        "ctftime",
        "oficial"
      ],
      "registration_deadline": "2026-11-14T15:29:00-03:00",
      "fee": "gratis",
      "team_size": "1–6 integrantes",
      "eligibility": "Abierto a cualquier persona interesada. Admite equipos de distintas instituciones, especialidades y años.",
      "description": "La ficha de inscripción publicada por IIIT Delhi confirma el CTF online internacional de 24 horas a partir del 14/11. El cierre que publica Unstop es el 14/11 a las 23:59 IST (15:29 ART), después de las 12:30 ART de inicio en CTFtime. Las horas del evento se conservan porque las fuentes oficiales consultadas no publican una ventana exacta coherente. El micrositio institucional muestra a la vez la inscripción abierta y un aviso de evento iniciado. No está confirmado que se pueda empezar a jugar tras el inicio con una inscripción tardía. Los premios monetarios tienen una restricción separada para equipos indios según Unstop y CTFtime menciona cuenta bancaria india."
    }
  ]
}
```
