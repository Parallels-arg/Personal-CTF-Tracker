# Carga complementaria de Daily CTF Scout — 2026-10-24

Revisión única al 24/10/2026, 22:05 ART (2026-10-25T01:05:00Z). **35 eventos:** 16 recuperados de la parte A y 19 eventos vigentes de la parte B con metadatos de verificación. **Parte A: ninguno omitido. Parte B — terminados:** `cruxipher-2026` (cruXipher), cerrado el 24/10 a las 21:30 ART. No se crean tareas recurrentes.

Se conserva cada `id` y `added` solicitado. La parte B reproduce los objetos de `data/events.json` consultados, incluidos sus campos actuales, y agrega únicamente `verified_by` y `ctftime_rated`; no se cambian fechas, descripciones, pesos ni otros datos existentes. Se preservan las diferencias ya documentadas de horarios oficiales frente a CTFtime (Pointer Overflow, StealthCup y SpookyCTF). Este commit crea solamente este archivo: no escribe `data/status.json` ni `data/events.json`. La acción existente del repositorio puede procesar luego el inbox.

## Verificación y CTFtime

- Se acepta al menos una fuente: `verified_by` identifica `oficial` y/o `ctftime`. Los anuncios del organizador en sus redes oficiales cuentan como fuente oficial; RAN Tour se verifica en la cuenta oficial de RAN Security, que publica 19/11/2026 a las 9 ART y el pre-registro sujeto a confirmación.
- First Flag, Hack the UNLa, RAN Tour y Bloomberg x WiCyS no tienen una ficha correspondiente localizada en CTFtime. Se incluyen por fuente oficial y se omiten `ctftime_url`, `weight` y `ctftime_rated`; la ausencia en la búsqueda no prueba que nunca se publiquen allí.
- Los eventos de la parte A respaldados solo por CTFtime lo explican en `description`; cuando el sitio oficial está caído, ilegible o no confirma esa edición, `url` apunta a la ficha de CTFtime. VOID se respalda además en el oficial; su ficha completa devuelve 404, pero los resultados indexados de CTFtime confirman 24/10 18:30–25/10 18:30 UTC, peso 0 y peso futuro 0. El cierre de registro de VOID fue el 23/10, sin hora publicada: se informa en texto, sin inventar `registration_deadline`.
- `weight` reproduce **Rating weight** visible al consultar CTFtime, aunque sea 0. `ctftime_rated: true` se usa donde existe peso positivo; `false`, donde hay exclusión explícita de puntos globales o **Future weight 0.00** fijado. Los pesos positivos de eventos futuros pueden revisarse y no garantizan el peso final.
- **Puntuación pendiente:** una ficha con **Rating weight 0.00** y **Future weight: to be determined** no permite afirmar ni que puntúa ni que sea definitivamente *not rated*. Para preservar esa incertidumbre se agrega `ctftime_rated: null` en: `qiangwang-2026-quals`, `wolvctf-2026`, `hi-cyber-con-ctf-2026`, `pink-plus-ctf-2026`, `csctf-2026`, `spookyctf-2026`, `eyesopenctf-2026`, `l3m0n-ctf-2026-quals`, `x3ctf-2026`. No se transforma el peso provisional cero en una exclusión definitiva. Es una excepción al ejemplo booleano del prompt para evitar inventar un estado aún no publicado.
- Las fuentes oficiales de la parte B se consultaron durante esta sesión; las fichas de CTFtime se volvieron a comprobar para esta carga. No se detectaron cambios confirmados en los datos existentes. En Russian CTF Cup se mantiene solo `ctftime` como fuente del calendario del clasificatorio.
- No se inventan costos, requisitos, cupos ni cierres. `end` se omite en Hack the UNLa y RAN Tour porque solo hay inicio confirmado: no se supone una duración. `career_value` y `why` son valoraciones de utilidad, salvo las oportunidades expresamente anunciadas; no garantizan contratación.

Fuentes oficiales adicionales: [RAN Security](https://ar.linkedin.com/company/ransecurity), [WiCyS: fechas y aplicaciones](https://www.wicys.org/benefits/capture-the-flag/), [UNLa: jornada e inscripción](https://www.unla.edu.ar/novedades/invitamos-al-evento-hack-the-unla), [CyberLearner: First Flag](https://cyberlearner.org/ctf), [VOID](https://ctf.void-society.in/). Las fichas de CTFtime están enlazadas en cada evento.

```json
{
  "events": [
    {
      "id": "first-flag-ctf-2026",
      "name": "First Flag CTF",
      "added": "2026-10-21",
      "start": "2026-11-07T09:00:00Z",
      "url": "https://cyberlearner.org/ctf",
      "verified_by": [
        "oficial"
      ],
      "format": "jeopardy",
      "location": "online",
      "fee": "gratis (£0)",
      "eligibility": "sin experiencia CTF previa requerida; otras restricciones no verificadas",
      "team_size": "individual (sin opción de equipo)",
      "recommended": true,
      "description": "CTF individual de seis horas y seis desafíos; dos están pensados para principiantes. El oficial confirma fecha, horario y registro gratuito. El top 3 debe entregar writeups para recibir las gift cards; las herramientas de IA no se recomiendan.",
      "why": "Formato breve que permite practicar reversing y binarios sin dedicar todo el fin de semana.",
      "career_value": "Valor estimado: certificado verificable y writeups para respaldar tu práctica técnica.",
      "end": "2026-11-07T15:00:00Z",
      "organizer": "CyberLearner",
      "difficulty": "principiante",
      "prizes": "Gift cards de £100 / £50 / £25 para los tres primeros; certificado verificable para quien entregue al menos una flag correcta.",
      "tags": [
        "web",
        "rev",
        "crypto",
        "forensics",
        "pwn",
        "misc"
      ]
    },
    {
      "id": "hack-the-unla-2026",
      "name": "Hack the UNLa",
      "added": "2026-10-21",
      "start": "2026-10-31T10:00:00-03:00",
      "url": "https://www.unla.edu.ar/novedades/invitamos-al-evento-hack-the-unla",
      "verified_by": [
        "oficial"
      ],
      "format": "otro",
      "location": "Lanús, Buenos Aires, Argentina; sede y modalidad exactas por confirmar",
      "fee": "no verificado",
      "eligibility": "estudiantes, profesionales y personas interesadas en tecnología, redes y ciberseguridad",
      "team_size": "asistencia individual; no se anuncia competencia por equipos",
      "recommended": false,
      "description": "La UNLa anuncia una jornada desde las 10 ART sobre Red Team y Wi-Fi Hacking, priorización de amenazas y cifrado con VeraCrypt. Inscripción por https://forms.gle/T6dFHMPvXkCRvJg17. No se publica hora de finalización ni se confirma un CTF competitivo; se incorpora como jornada técnica local.",
      "why": "Es una oportunidad cercana para conocer la comunidad y explorar tu transición a seguridad ofensiva.",
      "career_value": "Valor estimado: contacto presencial con disertantes y comunidad universitaria local; no se anuncian entrevistas ni contratación.",
      "organizer": "Universidad Nacional de Lanús",
      "tags": [
        "Red Team",
        "Wi-Fi",
        "network",
        "crypto",
        "networking"
      ]
    },
    {
      "id": "ran-tour-2026-bsas",
      "name": "RAN Tour 2026 Buenos Aires (networking)",
      "added": "2026-10-24",
      "start": "2026-11-19T09:00:00-03:00",
      "url": "https://ar.linkedin.com/company/ransecurity",
      "verified_by": [
        "oficial"
      ],
      "format": "otro",
      "location": "CABA, Buenos Aires, Argentina — Monasterio Santa Catalina de Siena",
      "fee": "no verificado",
      "eligibility": "orientado a líderes y referentes de ciberseguridad; pre-registro sujeto a disponibilidad y confirmación",
      "team_size": "no aplica: networking y charlas",
      "recommended": false,
      "description": "El organizador confirma en su cuenta oficial el 19/11/2026 a las 9 ART, en el Monasterio Santa Catalina de Siena, CABA. Exige pre-registro en https://lnkd.in/djq-vUiW y confirmación según disponibilidad. Incluye charlas, debates y networking sobre superficie de ataque, SecOps e IA; no se confirmó un CTF ni hora de cierre.",
      "why": "La ubicación en CABA facilita conocer empresas y profesionales locales del sector.",
      "career_value": "Networking con RAN Security, patrocinadores y referentes de seguridad; contratación o acceso libre no confirmados.",
      "organizer": "RAN Security",
      "tags": [
        "networking",
        "SecOps",
        "IA",
        "career"
      ]
    },
    {
      "id": "bloomberg-wicys-2026",
      "name": "Bloomberg x WiCyS",
      "added": "2026-10-21",
      "start": "2026-12-03T15:00:00Z",
      "url": "https://www.wicys.org/benefits/capture-the-flag/",
      "verified_by": [
        "oficial"
      ],
      "format": "jeopardy",
      "location": "online",
      "fee": "no verificado",
      "eligibility": "miembros WiCyS; estudiantes y niveles early/mid-career con experiencia CTF principiante/intermedia; cupo de 200 y aplicación con selección",
      "team_size": "individual; se permite colaborar",
      "recommended": false,
      "description": "Competencia virtual de 24 horas, individual con colaboración permitida, para 200 miembros de WiCyS. El oficial fija 3–4/12 a las 9 AM CT (CST en diciembre: 15:00 UTC). La aplicación abre el 26/10 a las 8 AM CT y cierra el 13/11 a la 1 PM CT; la aceptación se notifica el 20/11.",
      "why": "Puede aportar práctica técnica y contacto profesional si cumplís los requisitos de membresía y selección.",
      "career_value": "El oficial ofrece contacto con profesionales de seguridad de Bloomberg; no garantiza entrevistas ni contratación.",
      "end": "2026-12-04T15:00:00Z",
      "registration_deadline": "2026-11-13T19:00:00Z",
      "organizer": "Bloomberg y Women in CyberSecurity (WiCyS)",
      "difficulty": "intermedio",
      "tags": [
        "web",
        "network",
        "crypto",
        "steganography",
        "recon",
        "rev",
        "pwn"
      ]
    },
    {
      "id": "africa-battlectf-2026-quals",
      "name": "Africa battleCTF 2026 Qualifier",
      "added": "2026-10-23",
      "start": "2026-10-04T23:00:00Z",
      "end": "2026-11-04T23:00:00Z",
      "url": "https://ctftime.org/event/3462/",
      "ctftime_url": "https://ctftime.org/event/3462/",
      "weight": 0,
      "ctftime_rated": false,
      "verified_by": [
        "ctftime"
      ],
      "format": "jeopardy",
      "location": "online",
      "organizer": "BUG|PWN",
      "fee": "no verificado",
      "eligibility": "no verificado",
      "team_size": "individual",
      "recommended": false,
      "description": "Clasificatorio de 31 días de pwn, web, OT e investigación de vulnerabilidades; los mejores pasan a una final de duelos. Fechas y formato confirmados en CTFtime; el sitio oficial no permitió confirmar esta edición. La ficha indica participación individual y ausencia de puntos globales por duración e individualidad.",
      "why": "Valor estimado: práctica técnica complementaria a tu experiencia de desarrollo y análisis de sistemas.",
      "career_value": "Valor estimado: resultados y writeups para el portfolio; reclutamiento no confirmado.",
      "tags": [
        "pwn",
        "web",
        "OT",
        "vulnerability-research"
      ]
    },
    {
      "id": "void-ctf-2026-quals",
      "name": "VOID CTF Qualifiers",
      "added": "2026-10-23",
      "start": "2026-10-24T18:30:00Z",
      "end": "2026-10-25T18:30:00Z",
      "url": "https://ctf.void-society.in/",
      "ctftime_url": "https://ctftime.org/event/3468/",
      "weight": 0,
      "ctftime_rated": false,
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "format": "jeopardy",
      "location": "online",
      "organizer": "KIET Cyber Security Center of Excellence / Void Society",
      "fee": "no verificado",
      "eligibility": "registro previo; admisión internacional y requisitos académicos no verificados",
      "team_size": "hasta 4",
      "recommended": false,
      "description": "El oficial confirma el clasificatorio online del 24–25/10 y su duración de 24 horas. El horario exacto y peso 0 se recuperan del resultado indexado de CTFtime; abrir la ficha devuelve 404, por lo que esos datos no se reconfirmaron en la página completa. El registro y roster cerraron el 23/10, sin hora publicada; se incluye para seguimiento y superposiciones. Los 15 primeros pasan a finales presenciales de AD/ICS/SCADA el 29–30/11.",
      "why": "Valor estimado: práctica técnica complementaria a tu experiencia de desarrollo y análisis de sistemas.",
      "career_value": "Valor estimado: resultados y writeups para el portfolio; reclutamiento no confirmado.",
      "tags": [
        "web",
        "crypto",
        "rev",
        "pwn",
        "forensics",
        "OSINT"
      ]
    },
    {
      "id": "qiangwang-2026-quals",
      "name": "Qiangwang Qualifier",
      "added": "2026-10-22",
      "start": "2026-10-31T02:00:00Z",
      "end": "2026-11-01T02:00:00Z",
      "url": "https://ctftime.org/event/3459/",
      "ctftime_url": "https://ctftime.org/event/3459/",
      "weight": 0,
      "ctftime_rated": null,
      "verified_by": [
        "ctftime"
      ],
      "format": "jeopardy",
      "location": "online",
      "organizer": "LoveFromMimic / Qiangwang Cyber Mimic Defense",
      "fee": "no verificado",
      "eligibility": "no verificado",
      "team_size": "por equipos; límite no verificado",
      "recommended": false,
      "description": "CTFtime confirma el clasificatorio online de 24 horas de la novena Qiangwang International Elite Challenge on Cyber Mimic Defense. Combina retos CTF y seguridad endógena; las finales se planean presenciales en Nanjing. Oficial sin confirmar: la página de registro no fue legible. Peso actual 0 y peso futuro por determinar; el estado definitivo de puntuación no está confirmado.",
      "why": "Valor estimado: práctica técnica complementaria a tu experiencia de desarrollo y análisis de sistemas.",
      "career_value": "Valor estimado: resultados y writeups para el portfolio; reclutamiento no confirmado.",
      "prizes": "Acceso a finales para equipos elegibles; criterios y premios por anunciar.",
      "tags": [
        "misc",
        "endogenous-security"
      ]
    },
    {
      "id": "csaw-ctf-2026-finals",
      "name": "CSAW CTF Final Round 2026",
      "added": "2026-10-24",
      "start": "2026-11-12T17:00:00Z",
      "end": "2026-11-14T05:00:00Z",
      "url": "https://ctftime.org/event/3410/",
      "ctftime_url": "https://ctftime.org/event/3410/",
      "weight": 1,
      "ctftime_rated": true,
      "verified_by": [
        "ctftime"
      ],
      "format": "jeopardy",
      "location": "online",
      "organizer": "NYUSEC",
      "fee": "no verificado",
      "eligibility": "final; acceso y clasificación previa no verificados",
      "team_size": "no verificado",
      "recommended": false,
      "description": "La ficha de CTFtime confirma esta final Jeopardy y la lista como online. El oficial no pudo contrastarse; no se asume que esté abierta a nuevas inscripciones ni que alcance con registrarse en CTFtime. Requisitos de clasificación, sede/modalidad efectiva de finalistas y tamaño de equipo quedan sin confirmar.",
      "why": "Valor estimado: práctica técnica complementaria a tu experiencia de desarrollo y análisis de sistemas.",
      "career_value": "Valor estimado: reconocimiento competitivo y comunidad de NYUSEC; participación y oportunidades laborales no confirmadas.",
      "tags": [
        "misc"
      ]
    },
    {
      "id": "mimic-ctf-2026",
      "name": "Mimic",
      "added": "2026-10-22",
      "start": "2026-11-07T12:00:00Z",
      "end": "2026-11-08T12:00:00Z",
      "url": "https://ctftime.org/event/3455/",
      "ctftime_url": "https://ctftime.org/event/3455/",
      "weight": 0,
      "ctftime_rated": false,
      "verified_by": [
        "ctftime"
      ],
      "format": "jeopardy",
      "location": "online",
      "organizer": "Rare Byte Hub",
      "fee": "no verificado",
      "eligibility": "no verificado",
      "team_size": "1–4",
      "recommended": false,
      "description": "CTFtime confirma un Jeopardy online de 24 horas con retos para principiantes y participantes experimentados, y equipos de 1–4. El oficial no fue accesible; se incluye con CTFtime como única verificación. La ficha lo marca como casual, sin puntos para el rating global.",
      "why": "Valor estimado: práctica técnica complementaria a tu experiencia de desarrollo y análisis de sistemas.",
      "career_value": "Valor estimado: resultados y writeups para el portfolio; reclutamiento no confirmado."
    },
    {
      "id": "wolvctf-2026",
      "name": "WolvCTF 2026",
      "added": "2026-10-22",
      "start": "2026-11-13T23:00:00Z",
      "end": "2026-11-15T23:00:00Z",
      "url": "https://ctftime.org/event/3049/",
      "ctftime_url": "https://ctftime.org/event/3049/",
      "weight": 0,
      "ctftime_rated": null,
      "verified_by": [
        "ctftime"
      ],
      "format": "jeopardy",
      "location": "online",
      "organizer": "w01verines",
      "fee": "no verificado",
      "eligibility": "división Open; división separada para estudiantes de University of Michigan",
      "team_size": "sin límite",
      "recommended": true,
      "description": "CTFtime confirma el aplazamiento a noviembre: 48 horas del 13 al 15/11. Incluye retos desde principiantes hasta difíciles, división Open y división de estudiantes de University of Michigan, sin tope de equipo. Oficial sin confirmar. Peso actual 0 y futuro por determinar; no se confirma aún el estado definitivo de puntuación.",
      "why": "Retos de dificultad variada y categoría abierta permiten priorizar reversing, binarios y web.",
      "career_value": "Valor estimado: resultados y writeups para el portfolio; reclutamiento no confirmado.",
      "tags": [
        "rev",
        "pwn",
        "web",
        "crypto",
        "forensics",
        "OSINT",
        "misc"
      ],
      "prizes": "Por anunciar."
    },
    {
      "id": "lakectf-2026-quals",
      "name": "LakeCTF Quals",
      "added": "2026-10-22",
      "start": "2026-11-27T18:00:00Z",
      "end": "2026-11-28T18:00:00Z",
      "url": "https://ctftime.org/event/3474/",
      "ctftime_url": "https://ctftime.org/event/3474/",
      "weight": 45.76,
      "ctftime_rated": true,
      "verified_by": [
        "ctftime"
      ],
      "format": "jeopardy",
      "location": "online",
      "organizer": "polygl0ts",
      "fee": "no verificado",
      "eligibility": "brackets académico y profesional; requisitos exactos y límites no verificados",
      "team_size": "no verificado",
      "recommended": false,
      "description": "Clasificatorio de la temporada 26–27, confirmado en CTFtime. El sitio oficial no devuelve un calendario legible; no se confunde con los clasificatorios de noviembre de 2025 de la temporada anterior. La ficha distingue brackets académico y profesional.",
      "why": "Valor estimado: práctica técnica complementaria a tu experiencia de desarrollo y análisis de sistemas.",
      "career_value": "Valor estimado: resultados y writeups para el portfolio; reclutamiento no confirmado.",
      "prizes": "Los diez primeros equipos académicos son invitados a la final con alojamiento cubierto; premios profesionales por definir."
    },
    {
      "id": "bi0sctf-2026",
      "name": "bi0sCTF 2026",
      "added": "2026-10-24",
      "start": "2026-12-05T05:00:00Z",
      "end": "2026-12-06T17:00:00Z",
      "url": "https://ctftime.org/event/3480/",
      "ctftime_url": "https://ctftime.org/event/3480/",
      "weight": 79.51,
      "ctftime_rated": true,
      "verified_by": [
        "ctftime"
      ],
      "format": "jeopardy",
      "location": "online",
      "organizer": "bi0s",
      "fee": "no verificado",
      "eligibility": "no verificado",
      "team_size": "no verificado",
      "recommended": false,
      "description": "CTFtime confirma la edición online de 36 horas organizada por bi0s. El anuncio invita a participantes de distintas generaciones y propone desafíos inspirados en vulnerabilidades recientes. Oficial sin confirmar por problemas de acceso; inscripción y requisitos precisos no verificados.",
      "why": "Valor estimado: práctica técnica complementaria a tu experiencia de desarrollo y análisis de sistemas.",
      "career_value": "Valor estimado: resultados y writeups para el portfolio; reclutamiento no confirmado.",
      "prizes": "Por anunciar."
    },
    {
      "id": "nitectf-2026",
      "name": "niteCTF 2026",
      "added": "2026-10-24",
      "start": "2026-12-11T12:00:00Z",
      "end": "2026-12-13T12:00:00Z",
      "url": "https://ctftime.org/event/3367/",
      "ctftime_url": "https://ctftime.org/event/3367/",
      "weight": 59,
      "ctftime_rated": true,
      "verified_by": [
        "ctftime"
      ],
      "format": "jeopardy",
      "location": "online",
      "organizer": "Cryptonite",
      "fee": "no verificado",
      "eligibility": "no verificado",
      "team_size": "no verificado",
      "recommended": false,
      "description": "CTFtime confirma un evento online de 48 horas para estudiantes y participantes experimentados. Incluye hardware, crypto, web, forensics, pwn y reversing. Oficial sin confirmar: la página requiere JavaScript y no expone un calendario legible.",
      "why": "Valor estimado: práctica técnica complementaria a tu experiencia de desarrollo y análisis de sistemas.",
      "career_value": "Valor estimado: práctica diversa y comunidad de Cryptonite; Hex-Rays figura como patrocinador en CTFtime, sin contratación anunciada.",
      "tags": [
        "hardware",
        "crypto",
        "web",
        "forensics",
        "pwn",
        "rev"
      ],
      "prizes": "Por anunciar."
    },
    {
      "id": "bsides-algiers-2026-ctf",
      "name": "BSides Algiers 2026 CTF",
      "added": "2026-10-24",
      "start": "2026-12-17T19:00:00Z",
      "end": "2026-12-19T07:00:00Z",
      "url": "https://ctftime.org/event/3475/",
      "ctftime_url": "https://ctftime.org/event/3475/",
      "weight": 22.9,
      "ctftime_rated": true,
      "verified_by": [
        "ctftime"
      ],
      "format": "jeopardy",
      "location": "online",
      "organizer": "Shellmates Club",
      "fee": "no verificado",
      "eligibility": "online; presencial limitado a equipos argelinos según CTFtime",
      "team_size": "no verificado",
      "recommended": false,
      "description": "CTFtime confirma retos de nivel intermedio a extremo en reversing, explotación binaria, crypto y web. Se puede jugar online; solo equipos argelinos pueden jugar presencialmente. El sitio de Shellmates no confirma la edición 2026 y se usa CTFtime como respaldo.",
      "why": "Valor estimado: práctica técnica complementaria a tu experiencia de desarrollo y análisis de sistemas.",
      "career_value": "Valor estimado: resultados y writeups para el portfolio; reclutamiento no confirmado.",
      "difficulty": "avanzado",
      "tags": [
        "rev",
        "pwn",
        "crypto",
        "web"
      ],
      "prizes": "Por anunciar."
    },
    {
      "id": "backdoorctf-2026",
      "name": "BackdoorCTF 2026",
      "added": "2026-10-24",
      "start": "2026-12-19T12:00:00Z",
      "end": "2026-12-20T12:00:00Z",
      "url": "https://ctftime.org/event/3472/",
      "ctftime_url": "https://ctftime.org/event/3472/",
      "weight": 77.38,
      "ctftime_rated": true,
      "verified_by": [
        "ctftime"
      ],
      "format": "jeopardy",
      "location": "online",
      "organizer": "InfoSecIITR",
      "fee": "no verificado",
      "eligibility": "no verificado",
      "team_size": "no verificado",
      "recommended": false,
      "description": "CTFtime confirma el Jeopardy online de 24 horas de InfoSecIITR. Incluye pwn, reversing, web, crypto, forensics y misc; la comunidad del evento está en https://discord.gg/chHtsSTQ2. Oficial sin confirmar: no respondió a la consulta.",
      "why": "Valor estimado: práctica técnica complementaria a tu experiencia de desarrollo y análisis de sistemas.",
      "career_value": "Valor estimado: resultados y writeups para el portfolio; reclutamiento no confirmado.",
      "tags": [
        "pwn",
        "rev",
        "web",
        "crypto",
        "forensics",
        "misc"
      ],
      "prizes": "Patrocinadores y premios por anunciar."
    },
    {
      "id": "asis-ctf-finals-2026",
      "name": "ASIS CTF Finals 2026",
      "added": "2026-10-24",
      "start": "2026-12-27T14:00:00Z",
      "end": "2026-12-28T14:00:00Z",
      "url": "https://ctftime.org/event/3062/",
      "ctftime_url": "https://ctftime.org/event/3062/",
      "weight": 99.38,
      "ctftime_rated": true,
      "verified_by": [
        "ctftime"
      ],
      "format": "jeopardy",
      "location": "online",
      "organizer": "ASIS",
      "fee": "no verificado",
      "eligibility": "final; requisitos de acceso o clasificación previa no verificados",
      "team_size": "no verificado",
      "recommended": false,
      "description": "CTFtime confirma la final online de 24 horas del 27–28/12. El sitio oficial todavía muestra el clasificatorio de agosto, por lo que no confirma el calendario de esta final; no se interpreta el aviso de fin del clasificatorio como finalización de este evento. Acceso abierto o clasificación previa no verificados.",
      "why": "Valor estimado: práctica técnica complementaria a tu experiencia de desarrollo y análisis de sistemas.",
      "career_value": "Valor estimado: resultados y writeups para el portfolio; reclutamiento no confirmado.",
      "prizes": "Por anunciar."
    },
    {
      "name": "Pointer Overflow CTF 2026",
      "url": "https://pointeroverflowctf.com/",
      "ctftime_url": "https://ctftime.org/event/3020/",
      "format": "jeopardy",
      "location": "online",
      "difficulty": "principiante",
      "organizer": "UWSP Pointers / University of Wisconsin–Stevens Point",
      "prizes": "Certificado digital individual y Hall of Fame; monedas para ganadores/MVP. Premios monetarios anunciados: Solo 1.º $50; Team y Academic 1.º $100 y 2.º $50; Ghostbuster $50 (moneda no explicitada).",
      "description": "Competencia educativa con retos publicados por oleadas y registro abierto durante el evento. El oficial cierra el 6/12/2026 a las 16:00 CST (22:00 UTC), mientras CTFtime muestra 14:00 UTC: se usa el oficial. Se puede participar individualmente o en los brackets Team y Academic.",
      "why": "El calendario amplio permite practicar junto con el trabajo y la facultad; incluye un recorrido de Game Hacking.",
      "fee": "gratis; no requiere compra según reglas oficiales",
      "eligibility": "participación mundial; Academic requiere representar una institución acreditada y aprobación del organizador",
      "team_size": "Solo: 1; Team estándar: 1–6; Academic: sin tope, requiere validación",
      "career_value": "Valor estimado: certificado y registro de logros para respaldar práctica técnica; no se verificó contratación.",
      "start": "2026-09-27T14:00:00.000Z",
      "end": "2026-12-06T22:00:00.000Z",
      "weight": 0,
      "recommended": true,
      "id": "pointer-overflow-ctf-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-23",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": false
    },
    {
      "name": "HITCON CTF",
      "url": "https://ctf2026.hitcon.org/",
      "ctftime_url": "https://ctftime.org/event/3340/",
      "format": "jeopardy",
      "location": "online",
      "organizer": "HITCON",
      "prizes": "USD 8.000 / 4.000 / 2.000; premio Taiwan Star de USD 1.000. El oficial anuncia preclasificación a la final DEF CON 35 para el primer puesto.",
      "description": "CTF Jeopardy online de 48 horas; las fechas coinciden entre el oficial y CTFtime. Se mantiene en esta carga para mostrar superposiciones, aunque fue descartado por el usuario.",
      "why": "Valor estimado: desafíos competitivos para profundizar explotación y análisis técnico.",
      "fee": "no verificado",
      "eligibility": "no verificado",
      "team_size": "no verificado",
      "career_value": "Valor estimado: reconocimiento competitivo; el oficial anuncia una plaza de preclasificación a DEF CON 35 para el ganador.",
      "start": "2026-10-23T14:00:00.000Z",
      "end": "2026-10-25T14:00:00.000Z",
      "weight": 91.16,
      "recommended": false,
      "id": "hitcon-ctf-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-20",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": true
    },
    {
      "name": "RSTCON CTF",
      "url": "https://ctf.rstcon.org/",
      "ctftime_url": "https://ctftime.org/event/3377/",
      "format": "jeopardy",
      "location": "híbrido (Charlotte, Estados Unidos; acceso online)",
      "organizer": "RSTCON",
      "description": "El oficial fija 23/10 13:00 EDT a 25/10 13:00 EDT, coincidente con CTFtime. Hay acceso online, con algunos retos exclusivos de la conferencia presencial en Charlotte.",
      "why": "Valor estimado: práctica en seguridad de software y hardware vinculada con sectores industriales.",
      "fee": "no verificado",
      "eligibility": "no verificado",
      "team_size": "no verificado",
      "career_value": "Valor estimado: contacto con una comunidad enfocada en investigación y explotación industrial; acceso remoto a networking no verificado.",
      "start": "2026-10-23T17:00:00.000Z",
      "end": "2026-10-25T17:00:00.000Z",
      "weight": 25,
      "recommended": false,
      "id": "rstcon-ctf-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-20",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": true
    },
    {
      "name": "Hack.lu CTF",
      "url": "https://flu.xxx/",
      "ctftime_url": "https://ctftime.org/event/3207/",
      "format": "jeopardy",
      "location": "online",
      "organizer": "FluxFingers",
      "description": "CTF online de 48 horas con retos desde accesibles hasta muy difíciles. Oficial y CTFtime coinciden en las fechas; la web permite registrarse y jugar solo o con un equipo de cualquier tamaño.",
      "why": "Valor estimado: permite seleccionar desafíos de reversing y explotación acordes a tu experiencia.",
      "fee": "no verificado",
      "eligibility": "abierto a todos",
      "team_size": "individual o equipo de cualquier tamaño",
      "career_value": "Valor estimado: práctica técnica y posibles writeups para tu portfolio; reclutamiento y contactos laborales no verificados.",
      "start": "2026-10-23T18:00:00.000Z",
      "end": "2026-10-25T18:00:00.000Z",
      "weight": 94.74,
      "recommended": false,
      "id": "hack-lu-ctf-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-20",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": true
    },
    {
      "name": "Sudocrypt v16.0",
      "url": "https://sudocrypt.com/",
      "ctftime_url": "https://ctftime.org/event/3443/",
      "format": "otro",
      "location": "online",
      "organizer": "Exun Clan",
      "prizes": "El oficial anuncia INR 90.000; además menciona USD 900 y obsequios para los 50 mejores equipos. Las cifras no son equivalencias verificadas.",
      "description": "Competencia internacional que combina CTF y cryptic hunt durante 36 horas. El oficial confirma el nuevo formato obligatorio de equipos de 3 y ofrece registro; no se verificó un cierre de inscripción.",
      "why": "Complementa tu práctica técnica con criptografía y resolución de pistas.",
      "fee": "no verificado",
      "eligibility": "abierto a todos",
      "team_size": "exactamente 3",
      "career_value": "Valor estimado: práctica en equipo y contacto con la comunidad; Intel y Jane Street figuran como socios, sin reclutamiento confirmado.",
      "start": "2026-10-27T03:30:00.000Z",
      "end": "2026-10-28T15:30:00.000Z",
      "weight": 0,
      "tags": [
        "crypto",
        "misc"
      ],
      "recommended": false,
      "id": "sudocrypt-v16",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-20",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": false
    },
    {
      "name": "HI Cyber Con CTF",
      "url": "https://ctf.hiddeninvestigations.net/",
      "ctftime_url": "https://ctftime.org/event/3460/",
      "format": "jeopardy",
      "location": "online",
      "organizer": "Hidden Investigations",
      "prizes": "USD 2.500: 1.000 / 700 / 500 / 200 / 100 para los cinco primeros, más formación, licencias y suscripciones sujetas a condiciones.",
      "description": "CTF internacional de 48 horas asociado a una conferencia virtual. Tiene divisiones Human-Led (IA solo como referencia) y Agentic AI; la inscripción se realiza en la plataforma oficial.",
      "why": "Web, reversing, pwn y redes permiten conectar tu experiencia en aplicaciones con seguridad ofensiva.",
      "fee": "gratis",
      "eligibility": "abierto a todos, internacional",
      "team_size": "1–5",
      "career_value": "Valor estimado: conferencia y comunidad internacional para networking; patrocinan empresas de seguridad, sin contratación confirmada.",
      "start": "2026-10-30T14:00:00.000Z",
      "end": "2026-11-01T14:00:00.000Z",
      "weight": 0,
      "tags": [
        "web",
        "pwn",
        "rev",
        "crypto",
        "forensics",
        "OSINT",
        "network",
        "AI",
        "hardware",
        "blockchain",
        "misc"
      ],
      "recommended": true,
      "id": "hi-cyber-con-ctf-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-20",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": null
    },
    {
      "name": "Russian CTF Cup X Qualifier",
      "url": "https://ctfcup.ru/",
      "ctftime_url": "https://ctftime.org/event/3469/",
      "format": "jeopardy",
      "location": "online",
      "organizer": "CTF Cup Russia",
      "description": "El sitio oficial confirma la décima temporada de 2026 y remite al reglamento y registro. CTFtime fija el clasificatorio online de 24 horas, del 31/10 12:00 al 1/11 12:00 de Moscú (09:00 UTC). Según esa ficha, los diez mejores de cada categoría pasan a la final de diciembre; no se pudo verificar el reglamento completo.",
      "why": "Valor estimado: práctica competitiva; la admisión desde Argentina queda pendiente de confirmación.",
      "fee": "no verificado",
      "eligibility": "CTFtime indica categorías academic, mixed, school y secondary vocational; admisión de equipos desde Argentina no verificada.",
      "team_size": "no verificado",
      "career_value": "Valor estimado: experiencia competitiva; networking y contratación accesibles desde Argentina no verificados.",
      "start": "2026-10-31T09:00:00.000Z",
      "end": "2026-11-01T09:00:00.000Z",
      "weight": 0,
      "recommended": false,
      "id": "russian-ctf-cup-x-quals",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-22",
      "last_seen": "2026-10-25",
      "verified_by": [
        "ctftime"
      ],
      "ctftime_rated": false
    },
    {
      "name": "StealthCup 2026 (remoto excepcional)",
      "url": "https://stealth.ait.ac.at/",
      "ctftime_url": "https://ctftime.org/event/3482/",
      "format": "otro",
      "location": "híbrido (Québec, Canadá; remoto por VPN con cupo)",
      "organizer": "AIT",
      "prizes": "Moneda, hardware como YubiKeys y tickets de Hackfest, solo para participantes presenciales.",
      "description": "CTF de evasión con partes IT y OT. El oficial fija inicio 13:30 UTC, frente a 13:00 UTC en CTFtime: se usa el oficial. El acceso remoto por VPN se limita a 6 equipos y requiere confirmación de plaza; no exige ticket de Hackfest. Registro mientras queden lugares; premios solo presenciales.",
      "why": "Tiene relación directa con tu objetivo de Red Team, especialmente evasión, Windows y redes IT/OT.",
      "fee": "no verificado",
      "eligibility": "abierto; plaza remota sujeta a confirmación y cupo de 6 equipos",
      "team_size": "sin límite obligatorio; recomendado 4–8, repartidos entre IT y OT",
      "career_value": "Valor estimado: práctica de evasión y colaboración en investigación de detección; no se verificó reclutamiento.",
      "start": "2026-10-31T13:30:00.000Z",
      "end": "2026-10-31T21:00:00.000Z",
      "weight": 0,
      "tags": [
        "network",
        "Windows",
        "OT",
        "evasion"
      ],
      "recommended": false,
      "id": "stealthcup-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-23",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": false
    },
    {
      "name": "HKCERT CTF Quals",
      "url": "https://ctf.hkcert.org/",
      "ctftime_url": "https://ctftime.org/event/3418/",
      "format": "jeopardy",
      "location": "online",
      "organizer": "HKCERT, HKPC y Digital Policy Office de Hong Kong",
      "description": "Clasificatorio online de 24 horas, con desafíos en inglés y chino. Las fechas coinciden entre oficial y CTFtime. El registro se hace por formulario y el organizador envía las credenciales; los cinco mejores equipos internacionales pasan a la final tras revisión.",
      "why": "Valor estimado: retos de web, reversing y pwn para ampliar tu práctica competitiva.",
      "fee": "no verificado",
      "eligibility": "categoría International: todos los integrantes deben tener 18 años al cierre; corresponde a equipos con algún integrante sin residencia ni visa laboral/estudiantil de Hong Kong",
      "team_size": "1–4",
      "career_value": "Valor estimado: práctica técnica y posibles writeups para tu portfolio; reclutamiento y contactos laborales no verificados.",
      "start": "2026-11-06T10:00:00.000Z",
      "end": "2026-11-07T10:00:00.000Z",
      "weight": 10.31,
      "tags": [
        "pwn",
        "crypto",
        "forensics",
        "rev",
        "web",
        "misc"
      ],
      "recommended": false,
      "registration_deadline": "2026-11-04T04:00:00.000Z",
      "id": "hkcert-ctf-2026-quals",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-22",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": true
    },
    {
      "name": "PINK+ CTF",
      "url": "https://ctf.pink.bayern/",
      "ctftime_url": "https://ctftime.org/event/3331/",
      "format": "jeopardy",
      "location": "online",
      "organizer": "PINK+",
      "prizes": "CTFtime estima premios por USD 1.100, incluidas licencias; aún por definir.",
      "description": "Primera edición de PINK+ CTF, con énfasis en esteganografía según CTFtime. La plataforma oficial confirma categorías y acceso a desafíos; el horario procede de la ficha de CTFtime porque no aparece en el texto visible del oficial.",
      "why": "Valor estimado: permite ampliar esteganografía y OSINT y seguir practicando reversing.",
      "fee": "no verificado",
      "eligibility": "no verificado",
      "team_size": "no verificado",
      "career_value": "Valor estimado: práctica técnica y posibles writeups para tu portfolio; reclutamiento y contactos laborales no verificados.",
      "start": "2026-11-06T12:00:00.000Z",
      "end": "2026-11-09T12:00:00.000Z",
      "weight": 0,
      "tags": [
        "crypto",
        "steganography",
        "Minecraft",
        "OSINT",
        "rev",
        "misc"
      ],
      "recommended": false,
      "id": "pink-plus-ctf-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-21",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": null
    },
    {
      "name": "CSCTF 2026",
      "url": "https://2026.chronos-security.ro/",
      "ctftime_url": "https://ctftime.org/event/3333/",
      "format": "jeopardy",
      "location": "online",
      "organizer": "Chronos Security",
      "prizes": "Los tres primeros de cada track deben entregar writeups dentro de las 24 horas posteriores al cierre; detalle de premios no verificado.",
      "description": "El calendario oficial publica 6–8/11/2026, inicio 15:00 EET (13:00 UTC), durante 48 horas. El conflicto de fechas reportado previamente no aparece en las fechas consultadas: ahora coinciden con CTFtime. El HTML oficial también contiene un aviso de operación concluida, contradictorio con ese calendario futuro; se preserva el horario explícito y conviene reconfirmarlo antes de competir. Cada integrante debe registrarse; el equipo se bloquea al inicio.",
      "why": "Los escenarios de aplicaciones, Windows y sectores como salud y finanzas conectan con tu trabajo en sistemas empresariales.",
      "fee": "gratis",
      "eligibility": "abierto mundialmente; tracks Juniors (<18), Seniors (18+) y Fighters (sin restricción de edad)",
      "team_size": "1–5",
      "career_value": "Valor estimado: práctica técnica y posibles writeups para tu portfolio; reclutamiento y contactos laborales no verificados.",
      "start": "2026-11-06T13:00:00.000Z",
      "end": "2026-11-08T13:00:00.000Z",
      "weight": 0,
      "tags": [
        "web",
        "pwn",
        "rev",
        "crypto",
        "forensics",
        "OSINT",
        "Windows",
        "Linux",
        "misc"
      ],
      "recommended": false,
      "id": "csctf-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-21",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": null
    },
    {
      "name": "SpookyCTF",
      "url": "https://spooky.ctfd.io/",
      "ctftime_url": "https://ctftime.org/event/3339/",
      "format": "jeopardy",
      "location": "online",
      "difficulty": "principiante",
      "organizer": "NJIT Cyber Security Network (antes NICC)",
      "prizes": "El oficial anuncia premios en efectivo presenciales; elegibilidad y premios remotos no verificados.",
      "description": "CTF de 24 horas, apto para principiantes y participantes con experiencia, con modalidad virtual y presencial en NJIT. CTFtime muestra 17:00 UTC en la cabecera pero el anuncio del organizador en esa misma ficha desplaza inicio y cierre cuatro horas: se usan 21:00 UTC. El oficial confirma los días 6–7/11, sin hora visible; reconfirmar el horario en Discord. Los agentes automáticos para resolver desafíos están prohibidos.",
      "why": "Es una opción accesible para practicar reversing, binarios y web y buscar equipo en Discord.",
      "fee": "gratis",
      "eligibility": "estudiantes, principiantes y profesionales; 18+ solo para asistir presencialmente",
      "team_size": "individual o equipo; límite no verificado",
      "career_value": "Valor estimado: práctica técnica y posibles writeups para tu portfolio; reclutamiento y contactos laborales no verificados.",
      "start": "2026-11-06T21:00:00.000Z",
      "end": "2026-11-07T21:00:00.000Z",
      "weight": 0,
      "tags": [
        "rev",
        "pwn",
        "crypto",
        "forensics",
        "OSINT",
        "web",
        "misc"
      ],
      "recommended": true,
      "id": "spookyctf-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-20",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": null
    },
    {
      "name": "Platypwn 2026",
      "url": "https://platypwnies.de/events/platypwn/",
      "ctftime_url": "https://ctftime.org/event/3082/",
      "format": "jeopardy",
      "location": "online",
      "difficulty": "intermedio",
      "organizer": "Platypwnies",
      "prizes": "Premios para los tres primeros equipos presenciales; detalle no verificado.",
      "description": "CTF híbrido de 18 horas con retos de varios niveles; fechas coincidentes entre ambas fuentes. El registro abrirá poco antes de la competencia y cada integrante debe registrarse. Los premios anunciados son para los tres primeros equipos presenciales.",
      "why": "El nivel intermedio y las categorías de reversing y web encajan con tu experiencia.",
      "fee": "no verificado",
      "eligibility": "abierto a todos, sin requisito de estudiante",
      "team_size": "online sin límite; presencial 4",
      "career_value": "Valor estimado: práctica técnica y posibles writeups para tu portfolio; reclutamiento y contactos laborales no verificados.",
      "start": "2026-11-13T17:00:00.000Z",
      "end": "2026-11-14T11:00:00.000Z",
      "weight": 37,
      "tags": [
        "rev",
        "web",
        "crypto",
        "OSINT"
      ],
      "recommended": true,
      "id": "platypwn-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-22",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": true
    },
    {
      "name": "InIt CTF",
      "url": "https://hackersinindia.com/init-ctf",
      "ctftime_url": "https://ctftime.org/event/3467/",
      "format": "jeopardy",
      "location": "online",
      "difficulty": "principiante",
      "organizer": "Hackers in India",
      "prizes": "TryHackMe por integrante: 6/3/1 meses para los tres primeros equipos; dominios .xyz para top 10 y certificado de participación.",
      "description": "CTF online de ocho horas dirigido a principiantes, con retos mayormente fáciles y medios. El oficial confirma fecha y duración; las horas proceden de CTFtime. Acepta participantes internacionales; registrarse en Unstop no basta: hay que completar el registro directo en hackersinindia.com/register.",
      "why": "Ofrece una sesión corta y accesible para reforzar web, criptografía y análisis forense.",
      "fee": "gratis",
      "eligibility": "abierto; participantes internacionales bienvenidos, sin experiencia previa requerida",
      "team_size": "1–4",
      "career_value": "Valor estimado: práctica y certificado; hay paquetes de patrocinio con acceso a CV, pero ningún empleador participante ni contratación están confirmados.",
      "start": "2026-11-14T15:30:00.000Z",
      "end": "2026-11-14T23:30:00.000Z",
      "weight": 0,
      "tags": [
        "web",
        "crypto",
        "forensics",
        "OSINT",
        "misc"
      ],
      "recommended": true,
      "id": "init-ctf-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-23",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": false
    },
    {
      "name": "EyesOpenCTF",
      "url": "https://eyesopensecurity.com/ctf-briefing.html",
      "ctftime_url": "https://ctftime.org/event/3419/",
      "format": "jeopardy",
      "location": "online",
      "organizer": "EyesOpen Security",
      "description": "The Convergence es la competencia narrativa de la séptima edición de EOCON. El briefing oficial confirma modalidad online internacional y equipos de dos; las horas proceden de CTFtime, ya que la ventana temporal del briefing no se renderiza en el texto consultado.",
      "why": "Valor estimado: investigación técnica y trabajo coordinado sobre una narrativa de incidentes.",
      "fee": "gratis según anuncio del organizador en CTFtime",
      "eligibility": "online internacional; otras restricciones no verificadas",
      "team_size": "exactamente 2",
      "career_value": "Valor estimado: práctica técnica y posibles writeups para tu portfolio; reclutamiento y contactos laborales no verificados.",
      "start": "2026-11-20T10:00:00.000Z",
      "end": "2026-11-22T10:00:00.000Z",
      "weight": 0,
      "recommended": false,
      "id": "eyesopenctf-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-22",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": null
    },
    {
      "name": "GlacierCTF",
      "url": "https://glacierctf.com/",
      "ctftime_url": "https://ctftime.org/event/3337/",
      "format": "jeopardy",
      "location": "online",
      "organizer": "LosFuzzys",
      "prizes": "Por anunciar.",
      "description": "Quinta edición de GlacierCTF, con desafíos de pwn, reversing, web, crypto y misc. El sitio oficial confirma la edición y bienvenida a todos los niveles; el horario de 24 horas procede de CTFtime.",
      "why": "Valor estimado: práctica de reversing y explotación que complementa tu base de desarrollo.",
      "fee": "no verificado",
      "eligibility": "se reciben participantes de todos los niveles; otras restricciones no verificadas",
      "team_size": "no verificado",
      "career_value": "Valor estimado: práctica técnica y posibles writeups para tu portfolio; reclutamiento y contactos laborales no verificados.",
      "start": "2026-11-20T18:00:00.000Z",
      "end": "2026-11-21T18:00:00.000Z",
      "weight": 73.17,
      "tags": [
        "pwn",
        "rev",
        "web",
        "crypto",
        "misc"
      ],
      "recommended": false,
      "id": "glacierctf-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-22",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": true
    },
    {
      "name": "Crate-CTF",
      "url": "https://foi.se/cratectf",
      "ctftime_url": "https://ctftime.org/event/3336/",
      "format": "jeopardy",
      "location": "online",
      "organizer": "FOI y Fuerzas Armadas de Suecia",
      "description": "El oficial confirma la competencia del 21/11/2026, online, individual o grupal y apta para principiantes y avanzados. La inscripción abrió el 1/9 y se realiza en ctf.crate.foi.se; las horas proceden de CTFtime.",
      "why": "Valor estimado: una jornada de ocho horas permite practicar distintos problemas sin comprometer todo el fin de semana.",
      "fee": "no verificado",
      "eligibility": "no verificado",
      "team_size": "individual o en grupo; límite no verificado",
      "career_value": "Valor estimado: práctica en una competencia organizada por una institución de investigación en defensa; no se verificaron oportunidades laborales.",
      "start": "2026-11-21T13:00:00.000Z",
      "end": "2026-11-21T21:00:00.000Z",
      "weight": 37,
      "recommended": false,
      "id": "crate-ctf-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-22",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": true
    },
    {
      "name": "L3m0n CTF 2026 Quals",
      "url": "https://l3m0nctf.xyz/",
      "ctftime_url": "https://ctftime.org/event/3485/",
      "format": "jeopardy",
      "location": "online",
      "organizer": "TIFAC-CORE in Cyber Security, Amrita Vishwa Vidyapeetham, Coimbatore",
      "prizes": "Por anunciar.",
      "description": "Clasificatorio online de 12 horas, de 10:00 a 22:00 IST, con categoría para principiantes; fechas coincidentes en oficial y CTFtime. El sitio indica que la inscripción abrirá próximamente. Los mejores equipos serán invitados a finales presenciales en Coimbatore.",
      "why": "Combina reversing, pwn y web con áreas de IoT y hardware que te interesan.",
      "fee": "no verificado",
      "eligibility": "abierto a todos",
      "team_size": "1–4",
      "career_value": "Valor estimado: práctica técnica y posibles writeups para tu portfolio; reclutamiento y contactos laborales no verificados.",
      "start": "2026-11-28T04:30:00.000Z",
      "end": "2026-11-28T16:30:00.000Z",
      "weight": 0,
      "tags": [
        "web",
        "pwn",
        "rev",
        "crypto",
        "forensics",
        "OSINT",
        "misc",
        "AI",
        "Web3",
        "hardware",
        "IoT",
        "RF"
      ],
      "recommended": true,
      "id": "l3m0n-ctf-2026-quals",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-23",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": null
    },
    {
      "name": "x3CTF 2026",
      "url": "https://x3c.tf/",
      "ctftime_url": "https://ctftime.org/event/3450/",
      "format": "jeopardy",
      "location": "online",
      "organizer": "x3CTF",
      "prizes": "Por anunciar; el envío de premios físicos puede limitarse por costo o dificultad logística.",
      "description": "CTF online de 48 horas con web, pwn, reversing, crypto y misc; fechas coincidentes en ambas fuentes. Se permite jugar individualmente o con equipo usando una única cuenta. Las reglas sobre LLM aún están en preparación.",
      "why": "Valor estimado: práctica de explotación y reversing y material para futuros writeups.",
      "fee": "no verificado",
      "eligibility": "no verificado",
      "team_size": "individual o en equipo; límite numérico no verificado",
      "career_value": "Valor estimado: práctica técnica y posibles writeups para tu portfolio; reclutamiento y contactos laborales no verificados.",
      "start": "2026-12-04T18:00:00.000Z",
      "end": "2026-12-06T18:00:00.000Z",
      "weight": 0,
      "tags": [
        "web",
        "pwn",
        "rev",
        "crypto",
        "misc"
      ],
      "recommended": false,
      "id": "x3ctf-2026",
      "sources": [
        "carga-inicial.md"
      ],
      "added": "2026-10-22",
      "last_seen": "2026-10-25",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "ctftime_rated": null
    }
  ]
}
```
