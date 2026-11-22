# CTF Deep Check — 2026-11-22

Usé un navegador real con JavaScript y pude leer los sitios oficiales de 7 de los 8 eventos seleccionados. El portal de bi0sCTF y su sitemap devolvieron error 1016 de DNS de origen; sí pude leer el sitio institucional del organizador. Los Discord consultados requieren una cuenta y algunos formularios no son accesibles públicamente.

La rotación dejó 7 eventos finalmente fuera de la cola después de aplicar excepciones y relleno. El próximo en volver es `the-final-exploit-ctf-2026-quals`, el 2026-11-22 a las 12:06:58 ART, por fin de pausa. Cola fijada el 22/11 a las 12:05:52 ART; ese retorno ocurrió después de fijarla. No hizo falta relleno. Otros 7 candidatos habilitados quedaron pendientes por el máximo de ocho, no por rotación.

- **TUCTF:** el FAQ actual permite jugar a cualquiera; se reemplaza la antigua elegibilidad de premios estadounidenses. Las reglas actuales permiten IA como asistente y prohíben resolución autónoma. Se conserva el horario que la tarea diaria ya corrigió hoy; no se duplica esa novedad. CTFd ahora carga, aunque su registro y sitemap devuelven 404. [Portada](https://tuctf.com/) · [FAQ](https://tuctf.com/faq/) · [Reglas](https://tuctf.com/rules/)
- **Electro Station / Whoami-Labs:** con tus 28 años confirmados, cumplís el requisito de mayoría de edad. Corrijo además el fin al 6/12 a las 10:00 ART: la ficha específica anuncia 24 horas desde el 5/12 a las 10:00 ART, mientras el JSON base tenía inicio y fin iguales. [Temporadas](https://whoami-labs.com/ctf) · [Registro](https://whoami-labs.com/register) · [Condiciones](https://whoami-labs.com/condiciones-uso)
- **CyberZerk:** retiro la incertidumbre anterior sobre tu mayoría de edad. La admisión desde Argentina sigue sin confirmarse expresamente; se conserva «dudoso» por ese motivo. Final previsto hoy a las 14:00 ART. [Reglamento](https://ctf.cyberzerk.fr/reglement)

No confirmé cierres nuevos de inscripción. Los overrides se usaron solo para seleccionar y ordenar; no se copiaron al resultado. La revisión no acredita inscripción a ningún evento.

## Revisados sin cambios

- `l3m0n-ctf-2026-quals` — Portada, FAQ y formulario mantienen registro abierto, clasificatorio online del 28/11 de 01:30 a 13:30 ART y equipos de uno a cuatro, abierto a todos. Las reglas dicen literalmente «More to come: the finals dates, the registration deadline and the prizes will be announced on the home page and on CTFtime.». Cierre y costo no publicados; Discord pide una cuenta. [Portada](https://l3m0nctf.xyz/) · [Reglas](https://l3m0nctf.xyz/rules/) · [Registro](https://play.l3m0nctf.xyz/register)
- `redreaper-ctf-2026` — Portada y registro mantienen equipos de dos a cuatro, sin costo, cierre ni requisitos geográficos publicados. Las reglas redirigen al login; Discord pide crear cuenta o iniciar sesión. La modalidad híbrida no especifica qué fase exige presencialidad. CTFtime conserva el 27/11 de 08:00 a 16:00 ART y peso futuro pendiente. [Portada](https://qualification.redx.site/) · [Registro](https://qualification.redx.site/register) · [CTFtime](https://ctftime.org/event/3502)
- `n0v4ctf-2026` — Portada, reglas y formulario mantienen registro mundial gratuito, equipos sin límite y el 27–28/11 de 14:00 a 14:00 ART. Conserva ocho envíos por minuto por cuenta y la prohibición de compartir flags o soluciones. Sin cierre publicado; Discord requiere una cuenta. [Sitio y reglas](https://n0v4ctf.devs.surf/)
- `black-hat-india-official-ctf-2026` — El sitio volvió a cargar en este navegador. El FAQ confirma acceso mundial, cuenta CTF7 y exactamente tres integrantes: no admite juego individual ni dúos. Mantiene gratuidad y 24 horas desde el 28/11 a las 11:00 ART. La consola pide login y hCaptcha; no publica cierre. Reglas de IA: no compartir credenciales con sistemas de IA ni usarla para obtener ventajas contrarias a las reglas. Sin correcciones confirmadas a los datos existentes. [Portada y FAQ](https://ctf.blackhat-india.com/)
- `bi0sctf-2026` — Portal y sitemap devolvieron «Error 1016 — Origin DNS error». La apertura de la red oficial X falló con ERR_HTTP_RESPONSE_CODE_FAILURE. El sitio institucional solo muestra una actividad de reclutamiento diferente, que no se incorpora a esta revisión; la búsqueda en fuentes del organizador no aportó datos de registro para esta edición. CTFtime conserva 5/12 02:00 ART a 6/12 14:00 ART y peso futuro pendiente. No confirmé costo, cierre, elegibilidad ni tamaño de equipo. [Portal con error](https://ctf.bi0s.in/) · [Organizador](https://bi0s.in/) · [CTFtime](https://ctftime.org/event/3480/)

```json
{
  "events": [
    {
      "id": "cyberzerk-ctf-2026",
      "name": "CyberZerk CTF 2026",
      "start": "2026-11-09T13:00:00.000Z",
      "url": "https://ctf.cyberzerk.fr/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "eligibility": "Mayores de edad o menores desde 15 años con consentimiento legal; mayoría de edad cumplida, admisión desde Argentina sin confirmar · para vos: dudoso",
      "description": "El reglamento oficial conserva la participación abierta a mayores de edad y a menores desde 15 años con autorización de un representante legal. Tu mayoría de edad está confirmada; corrijo la incertidumbre anterior sobre la edad, sin inferir fecha de nacimiento. No pude confirmar expresamente la participación desde Argentina, por lo que se mantiene la duda geográfica. Los profesionales deben participar a título personal y con recursos propios. Se mantienen la modalidad online individual, la gratuidad y el final del 22/11 a las 14:00 ART. El formulario quedó en verificación de seguridad y Discord requiere una cuenta; no se confirmó un cierre de inscripción."
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
      "eligibility": "Abierto a cualquiera: estudiantes secundarios, universitarios y profesionales",
      "description": "El FAQ actual confirma que cualquiera puede jugar y el reglamento ya no contiene la antigua limitación de premios a equipos estadounidenses con afiliación escolar. Portada, FAQ y reglas coinciden en que esta edición no tiene premios; se reemplaza la elegibilidad anterior, que describía premios y no admisión. Equipos de hasta cinco o juego individual. La política de IA permite chatbots, copilotos y análisis asistido, pero prohíbe agentes o herramientas que interactúen autónomamente con retos o infraestructura; los tickets deben escribirlos personas. No compartir soluciones durante el evento, colaborar entre equipos ni retener flags para enviarlas estratégicamente. Se conservan las fechas ya corregidas en data/events.json: 4–6/12 de 15:00 a 15:00 ART. La portada CTFd ahora carga; /register y el sitemap devuelven 404. No confirmé costo ni cierre."
    },
    {
      "id": "whoami-labs-electro-station-ctf-2026",
      "name": "Whoami-Labs Electro Station CTF 2026",
      "start": "2026-12-05T13:00:00.000Z",
      "url": "https://whoami-labs.com/ctf",
      "verified_by": [
        "oficial"
      ],
      "end": "2026-12-06T13:00:00.000Z",
      "eligibility": "Plataforma abierta a Latinoamérica, incluida Argentina; cuenta para mayores de 18 años · para vos: sí",
      "description": "El formulario y las Condiciones de Uso mantienen el requisito de ser mayor de 18 años. Con tu edad de 28 años confirmada el 21/11/2026, se corrige la elegibilidad personal de dudosa a afirmativa, sin inferir fecha de nacimiento. La ficha oficial T2026-2 de Electro Station indica 5–6/12/2026, sábado 08:00 a domingo 08:00 GMT-5, equivalentes a 10:00 ART ambos días, 80 retos y 24 horas, individual o equipos de uno a tres. Se corrige únicamente el fin: data/events.json tenía el 5/12 a las 13:00 UTC, igual al inicio; la fuente oficial confirma el 6/12 a las 13:00 UTC. La sección genérica todavía dice fecha por confirmar; se prioriza la ficha específica de la temporada. No publica cierre específico ni confirma condiciones de costo de esta temporada."
    }
  ]
}
```
