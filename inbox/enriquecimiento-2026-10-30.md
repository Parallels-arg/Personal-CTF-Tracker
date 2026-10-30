# CTF Deep Check — 2026-10-30

Navegador real: **sí**. Se pudieron leer páginas oficiales de **6 de los 8 eventos**, incluidas las reglas de Pointer Overflow aunque su portada agotó el tiempo de espera. Mimic y WolvCTF no cargaron. Se leyó también el sitio oficial de WolvSec y se comprobaron cinco invitaciones de Discord: cuatro requieren cuenta/acceso para leer canales y una no es válida.

**Rotación: 8 eventos quedaron fuera de la cola; el próximo que vuelve a entrar es `csctf-2026`, el 30/10/2026 a las 10:00 ART (`2026-10-30T10:00:00-03:00`), por quedar su inicio a siete días.**

**8 eventos revisados; 6 con datos nuevos o precisiones respecto del repositorio y 2 sin cambios.** No se confirmó ningún cierre nuevo de inscripción ni cambio de fechas. Las precisiones de reglas documentan el texto oficial vigente; no se afirma conocer la fecha en que se modificaron las páginas. No se buscaron eventos nuevos.

## Selección y rotación

Se leyeron `data/events.json`, `data/status.json`, `data/overrides.json` y los cuatro informes `inbox/processed/enriquecimiento-*.md` disponibles, del 25, 26, 28 y 29/10. La selección se fijó a las 00:03 ART del 30/10.

Se excluyeron eventos terminados y descartados, y se aplicó el requisito de campos faltantes salvo la verificación limitada de los registros con estado `inscripto`. Overrides tuvo precedencia para fechas, cierre y prioridad; su única entrada corresponde a un evento terminado. No se copia ningún valor manual al JSON.

La revisión más reciente de los ocho interesados revisados el 29/10 fue sin cambios. Ninguno alcanzaba todavía la excepción de próximos siete días al seleccionar: quedaron pausados `csctf-2026`, `spookyctf-2026`, `first-flag-ctf-2026`, `glacierctf-2026`, `crate-ctf-2026`, `l3m0n-ctf-2026-quals`, `x3ctf-2026` y `nitectf-2026`. El primero vuelve por la excepción indicada arriba, antes de completar su pausa de tres días.

Había 21 candidatos por los filtros básicos: ocho pausados y trece disponibles. Se seleccionaron ocho por prioridad y comienzo; cinco quedaron fuera por cupo, no por rotación. No fue necesario rellenar con pausados ni repetir revisiones de las últimas 24 horas. La revisión sin cambios de HI Cyber Con del 25/10 ya superaba tres días y, además, comienza hoy.

Orden: `swampctf-2026`, `pointer-overflow-ctf-2026`, `hi-cyber-con-ctf-2026`, `mimic-ctf-2026`, `tvx-ctf-2026`, `wolvctf-2026`, `eyesopenctf-2026`, `outback-overflow-2026`. Para los dos con estado `inscripto` se revisaron fechas, horarios y reglas, sin buscar nuevos datos de registro ni asumir una inscripción personal.

## Datos nuevos o precisados y fuentes

- **swampctf-2026** — [About](https://swampctf.com/about.html) confirma participación abierta y las [instrucciones](https://swampctf.com/instructions.html) no limitan integrantes. La [portada](https://swampctf.com/) mantiene 20–22/11, 48 horas, 17:00 EDT literal; se conserva el calendario y la advertencia del repo. La [plataforma](https://ctf.swampctf.com/) devolvió error de conexión y la lectura alternativa devolvió 502. El [Discord oficial](https://discord.com/invite/9H6HbcMk7X) exige cuenta/acceso para leer anuncios. Costo y cierre siguen sin confirmar.

- **pointer-overflow-ctf-2026** — Las [reglas oficiales](https://pointeroverflowctf.com/rules.html) sí cargaron en navegador, con sus paneles desplegados. Se documentan flags/contenido específicos por equipo, posibles cierres anticipados de retos y la economía de pistas; esos detalles no figuraban en la descripción. La portada agotó el tiempo de espera en navegador y lector; el sitemap no fue accesible. [CTFtime](https://ctftime.org/event/3020/) mantiene la discrepancia de cierre conocida y no sustituye la hora oficial previamente registrada. No se investigan premios ni registro para este estado.

- **hi-cyber-con-ctf-2026** — La [portada](https://ctf.hiddeninvestigations.net/) reconfirma 30/10 14:00 UTC–1/11 14:00 UTC. Las [reglas](https://ctf.hiddeninvestigations.net/rules) precisan el límite entre referencia general y resolución con IA, la reclasificación entre divisiones, la prohibición de livestreams de resolución y el alcance de instancias dedicadas. Se amplía la descripción con esas reglas verificadas; no se cambia el calendario ni se buscan condiciones de registro.

- **tvx-ctf-2026** — [About](https://ctf-techvisions.com/about) y [registro](https://ctf-techvisions.com/register) ahora resultan legibles en navegador. Se reemplaza la URL de CTFtime por el sitio oficial y se agrega `oficial`. El 13/11 es clasificatorio; la final sigue sin fecha. Se confirman participación individual o grupal y categorías escolar/universitaria. No se convierte el selector de países en evidencia suficiente de elegibilidad personal: queda dudosa. [CTFtime](https://ctftime.org/event/3486/) conserva horas y condición casual, sin puntos globales; ese estado ya estaba cargado. El [Discord enlazado oficialmente](https://discord.com/invite/ZmhdyWS7bW) requiere cuenta/acceso.

- **eyesopenctf-2026** — El [acceso oficial al registro](https://eyesopensecurity.com/?modal=ctf), tras desplegar el pase y el formulario sin enviarlo, confirma gratuidad del pase CTF Only y máximo de dos, con equipo opcional. La portada también dice 1–2; el [briefing](https://eyesopensecurity.com/ctf-briefing.html) todavía indica dos exactos. Se registra la discrepancia. El pase dice **“Entry through qualification”**: no publica requisitos ni alcance, de modo que se conserva esa condición con evaluación personal dudosa. No se confunde el plazo de propuestas de charlas con inscripción al CTF. La ventana horaria del briefing mostró guiones; [CTFtime](https://ctftime.org/event/3419/) respalda el calendario existente.

- **outback-overflow-2026** — Se usa la [página específica oficial](https://outbackoverflow26.hscyber.org/) como URL y se documenta la [política de IA](https://outbackoverflow26.hscyber.org/rules.html), que permite asistencia limitada pero sanciona la resolución directa o completa de retos. La portada reconfirma el máximo de cuatro y la [FAQ](https://outbackoverflow26.hscyber.org/faq.html) la participación abierta. No se añaden condiciones nuevas de elegibilidad ni se evalúan premios con información incompleta. El [Discord enlazado por HSCC](https://discord.com/invite/HKMHDQCYYz) requiere cuenta/acceso.

Todos los `start` y `end` se conservan exactamente como en `data/events.json`. Solo se incluyen en el JSON los seis eventos con información nueva o precisada, con los campos confirmados. No se reemplazan fechas con inferencias ni con overrides.

## Revisados sin cambios

- **mimic-ctf-2026** — El [sitio oficial indicado](https://ctf.rarebytehub.com/events/mimic) devolvió un error de conexión en el navegador. La lectura sin JavaScript y `https://ctf.rarebytehub.com/sitemap.xml` no fueron accesibles. La búsqueda de redes oficiales y la [ficha del organizador](https://ctftime.org/team/445438) no aportaron un canal público verificable con los datos pendientes. Finalmente se releyó [CTFtime](https://ctftime.org/event/3455/): mismas fechas, equipos 1–4 y casual. No hay cierre, costo ni elegibilidad confirmados en fuente oficial; no se repite el evento en el JSON.

- **wolvctf-2026** — [Web del evento](https://wolvctf.io/) con error de conexión en navegador. Lectura sin JavaScript y sitemap inaccesibles. El [sitio del organizador](https://wolvsec.org/) sí carga, sin condiciones de registro de esta edición. Su [primera invitación de Discord](https://discord.com/invite/JND8QNRbSY) aparece inválida; la [otra invitación oficial](https://discord.com/invite/333DvQVeks) requiere cuenta/acceso. El Twitter enlazado por el organizador no pudo recuperarse (403). Como último respaldo se releyó [CTFtime](https://ctftime.org/event/3049/): mismas fechas, divisiones y equipo sin tope; peso futuro por determinar ya cargado como null. No se agregan datos de otras ediciones ni se marca verificación oficial de las condiciones de 2026.

**Sin cambios en el registro de Outback Overflow** — El evento aparece en el JSON por su URL y reglas, no por un cierre nuevo. La portada mantiene **“Registration isn't open yet. Join the Discord to hear when it is.”** y la FAQ dice **“Registration opens closer to the event on our CTFd instance.”** Otra sección de la misma portada anuncia registro abierto para recibir avisos. No se interpreta ese formulario de avisos como apertura confirmada del CTFd ni se inventa fecha límite. Esta observación parcial no convierte en «sin cambios» toda la revisión del evento.

```json
{
  "events": [
    {
      "id": "swampctf-2026",
      "name": "SwampCTF 2026",
      "start": "2026-11-20T21:00:00.000Z",
      "end": "2026-11-22T21:00:00.000Z",
      "url": "https://swampctf.com/",
      "verified_by": [
        "oficial"
      ],
      "eligibility": "abierto a todos",
      "team_size": "sin límite de integrantes",
      "description": "El oficial anuncia 48 horas del 20 al 22/11/2026, desde las 17:00 EDT indicadas literalmente; se conserva el instante ya registrado y la advertencia sobre esa denominación inusual para noviembre. About confirma acceso para cualquiera y las instrucciones no restringen el tamaño de equipo. La plataforma de competición no cargó; costo y cierre de inscripción no confirmados."
    },
    {
      "id": "pointer-overflow-ctf-2026",
      "name": "Pointer Overflow CTF 2026",
      "start": "2026-09-27T14:00:00.000Z",
      "end": "2026-12-06T22:00:00.000Z",
      "url": "https://pointeroverflowctf.com/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "description": "Competencia educativa con retos por oleadas. Se conserva el calendario del repositorio, incluido el cierre previamente verificado en el oficial; CTFtime sigue mostrando otro horario. Las reglas actuales especifican flags y contenido propios de cada equipo, posibles cierres anticipados de retos y pistas secuenciales por defecto de 10 puntos finalizados. En Team/Academic solo el capitán puede comprar pistas; no hay reembolsos. Los cambios que afecten al juego deben anunciarse. No se confirma una nueva modificación del calendario."
    },
    {
      "id": "hi-cyber-con-ctf-2026",
      "name": "HI Cyber Con CTF",
      "start": "2026-10-30T14:00:00.000Z",
      "end": "2026-11-01T14:00:00.000Z",
      "url": "https://ctf.hiddeninvestigations.net/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "description": "CTF internacional de 48 horas, del 30/10 a las 14:00 UTC al 1/11 a las 14:00 UTC, sin cambio de calendario. Las reglas precisan que Human-Led permite IA solo como referencia general y prohíbe entregar material del reto, pedir su análisis o generar código específico. El uso de IA para resolver exige Agentic AI; infringir la división puede causar reclasificación o sanción. También se prohíben livestreams de resolución y compartir exploits o pistas sustanciales durante el evento. Las instancias dedicadas ajenas quedan fuera de alcance."
    },
    {
      "id": "tvx-ctf-2026",
      "name": "TVX CTF 2026",
      "start": "2026-11-13T10:00:00.000Z",
      "end": "2026-11-13T20:00:00.000Z",
      "url": "https://ctf-techvisions.com/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "team_size": "individual o equipo; límite numérico no publicado",
      "eligibility": "Registro con categorías escolar y universitaria; admisión internacional sin confirmar · para vos: dudoso",
      "description": "El sitio oficial ya es legible con JavaScript y confirma el 13/11/2026 como ronda clasificatoria; la final tiene fecha por anunciar. Se conservan las horas del repositorio, confirmadas en CTFtime, porque About no publica horas. Se permite participar individualmente o en equipo. El registro clasifica al equipo como universitario si algún integrante estudia en una universidad; el selector de países no se toma como prueba suficiente de admisión desde Argentina. No se confirmó costo, cierre ni máximo de equipo."
    },
    {
      "id": "eyesopenctf-2026",
      "name": "EyesOpenCTF",
      "start": "2026-11-20T10:00:00.000Z",
      "end": "2026-11-22T10:00:00.000Z",
      "url": "https://eyesopensecurity.com/ctf-briefing.html",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "fee": "gratis (pase CTF Only)",
      "team_size": "máximo 2 según portada/formulario; briefing indica 2 exactos",
      "eligibility": "Internacional, todos los niveles; el pase indica acceso mediante clasificación, sin aclarar requisitos ni alcance · para vos: dudoso",
      "description": "El pase oficial CTF Only es gratuito y anuncia Entry through qualification, sin explicar requisitos ni alcance de esa clasificación. La portada y el formulario admiten hasta dos integrantes y nombre de equipo opcional; el briefing exige dos, por lo que subsiste una discrepancia. Las fechas del repositorio se conservan según CTFtime: la ventana operativa del briefing no mostró valores. No se confirmó cierre de inscripción."
    },
    {
      "id": "outback-overflow-2026",
      "name": "Outback Overflow 2026",
      "start": "2026-11-20T23:00:00.000Z",
      "end": "2026-11-21T23:00:00.000Z",
      "url": "https://outbackoverflow26.hscyber.org/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "description": "Se conservan 21–22/11/2026, 10:00 AEDT (20–21/11, 23:00 UTC), 24 horas online. Las reglas permiten IA para investigar, aprender, depurar y asistir con lenguajes o herramientas desconocidos; usarla para resolver directamente un reto, obtener una flag o generar la solución completa causa descalificación. El registro CTFd sigue anunciado como no abierto; otra sección ofrece registro para avisos, sin cierre confirmado. No se confunden esas modalidades ni se inventa una fecha límite."
    }
  ]
}
```
