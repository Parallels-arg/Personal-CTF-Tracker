# CTF Deep Check — 2026-10-31

Navegador real: **sí**. Se pudieron leer sitios oficiales de **7 de los 8 eventos**; Mimic devolvió un error de conexión. Se leyeron visualmente las ocho páginas del PDF de bases de Llaitún en el visor del navegador, aunque el lector web no pudo recuperarlo. Dos invitaciones de Discord cargaron, pero sus canales requieren cuenta/acceso.

**Rotación: 6 eventos quedaron fuera de la cola. El próximo que vuelve es `glacierctf-2026` el 1/11/2026 a las 12:05:03 ART (`2026-11-01T12:05:03-03:00`), junto con otros cuatro eventos cuya última revisión sin cambios fue la misma.** Se usa conservadoramente la hora de publicación del informe del 29/10 como referencia del fin de los tres días.

**8 eventos revisados; 3 con datos nuevos o corregidos y 5 sin cambios.** Se encontró un cierre ya vencido en las bases de Llaitún, publicado solo como fecha de calendario; no se inventa hora ni se confirma una extensión. No se cambian fechas de los eventos ni se buscan eventos nuevos.

## Cola y rotación

Se leyeron `data/events.json`, `data/status.json`, `data/overrides.json` y los seis informes procesados de enriquecimiento disponibles. Para los dos del 30/10 se respetó el orden real: `enriquecimiento-2026-10-30.md` es la revisión anterior y `enriquecimiento-2026-10-30-2.md` la posterior de las 12:00. El sufijo no se interpretó como otro día. Las novedades del JSON prevalecen sobre observaciones parciales de inscripción sin cambios.

Se aplicaron los valores de overrides para decidir finalización, disponibilidad de cierre y orden; su única corrección corresponde a un evento terminado. No se copian valores manuales al JSON. Se excluyeron terminados y descartados. Para los estados `inscripto` no se exigieron campos faltantes y se limitaron las consultas a fechas, horario y reglas.

La cola, fijada a las 11:59 ART, fue: `csctf-2026`, `spookyctf-2026`, `first-flag-ctf-2026`, `swampctf-2026`, `pointer-overflow-ctf-2026`, `hi-cyber-con-ctf-2026`, `ctf-llaitun-smart-city-2026`, `mimic-ctf-2026`.

CSCTF, SpookyCTF, First Flag y Mimic entran por inicio dentro de siete días, aunque tuvieran pausa. Los eventos con novedades el 30/10 pueden volver hoy. No hubo necesidad de rellenar: había dieciséis candidatos disponibles tras la rotación y se tomaron ocho por prioridad y comienzo; otros ocho quedaron fuera por cupo.

Quedaron pausados por rotación: `wolvctf-2026`, `glacierctf-2026`, `crate-ctf-2026`, `l3m0n-ctf-2026-quals`, `x3ctf-2026`, `nitectf-2026`. Glacier, Crate, L3m0n, x3 y nite comparten el retorno por tres días desde el informe del 29/10; Glacier encabeza ese empate por fecha de inicio. WolvCTF usa siete días por no tener estado, salvo que antes lo alcance una excepción.

El horario de SpookyCTF ya fue corregido por el Scout de hoy a las 19:00 UTC: se conserva exactamente el dato actual y no se presenta como corrección de esta revisión.

## Novedades y fuentes

- **csctf-2026** — Las [reglas de plataforma](https://2026.chronos-security.ro/rules) y [premios de plataforma](https://2026.chronos-security.ro/prizes) anuncian Best Writeup Award para cualquier equipo, con certificado y archivo destacado. La plataforma cambia además los beneficios PIECE. La [página institucional de premios](https://www.chronos-security.ro/competitions/csctf-2026/prizes) conserva la versión anterior; se registra explícitamente el conflicto, sin garantizar una duración uniforme. La bolsa EUR 8.000+ sigue combinando contribuciones y aportes en especie.

- **spookyctf-2026** — El [anuncio publicado por el organizador en CTFtime](https://ctftime.org/event/3339/) especifica premios para la división Open, online y presencial, y otro presencial. Es una fuente primaria del organizador alojada en CTFtime; se identifica así en el campo, sin atribuir las cifras a la FAQ del sitio. La [FAQ oficial](https://spooky.ctfd.io/) solo anuncia efectivo presencial. Se corrige el dato previo que dejaba todos los premios remotos sin verificar. Se conserva el símbolo monetario publicado sin asumir divisa.

- **ctf-llaitun-smart-city-2026** — Las [bases oficiales enlazadas por Welcu](https://centrodeinnovacion.uc.cl/assets/uploads/2026/10/Bases-2026_CTF.pdf), páginas 3 y 5, precisan VPN, restricciones de asistencia externa/IA y equipos de hasta cuatro. La sección V fija el cierre en 26/10/2026. [Welcu](https://welcu.com/centroinnovauc/ctf_llaitun_smart_city_edition_2026) sigue ofreciendo acceso al formulario gratuito, lo que no acredita prórroga. No hay hora de cierre: se conserva la fecha en description y se omite registration_deadline para no fabricar el timestamp con zona solicitado. La elegibilidad internacional sigue dudosa; no se afirma exclusión por nacionalidad.

Los `start` y `end` del JSON conservan exactamente los valores actuales de `data/events.json`. Se verificó que los tres archivos de datos no cambiaron durante la revisión. No se completó ninguna inscripción ni se enviaron datos personales.

## Revisados sin cambios

- **first-flag-ctf-2026** — [Evento, Rules y FAQ](https://cyberlearner.org/ctf), más [registro público](https://cyberlearner.org/register), legibles. Mantienen el 7/11 de 09:00 a 15:00 UTC, gratuidad y formato individual. No publican cierre ni restricciones adicionales precisas. Discord se comparte con personas registradas; no se interpreta como fecha límite.

- **swampctf-2026** — [Portada](https://swampctf.com/) e [instrucciones](https://swampctf.com/instructions.html) legibles, sin costo ni cierre de registro explícitos. Se mantienen calendario y equipos sin límite ya incorporados. La plataforma `https://ctf.swampctf.com/` falla por conexión; lectura alternativa devuelve 502 y sitemap inaccesible. Después se comprobó el [Discord oficial](https://discord.com/invite/9H6HbcMk7X): exige cuenta/acceso para leer anuncios. No se convierte la ausencia de pago visible en gratuidad.

- **pointer-overflow-ctf-2026** — [Portada y calendario](https://pointeroverflowctf.com/) y [reglas desplegadas](https://pointeroverflowctf.com/rules.html) legibles. Mantienen el cierre 6/12 a las 16:00 CST (22:00 UTC), flags por equipo, posibles cierres anticipados de retos y pistas de diez puntos finalizados sin reembolso. No se confirma cambio de fechas o reglas respecto del último informe. La próxima oleada publicada es 1/11 a las 09:00 CST; se registra como parte del calendario vigente, no como un evento nuevo. No se buscaron condiciones de inscripción.

- **hi-cyber-con-ctf-2026** — [Portada](https://ctf.hiddeninvestigations.net/) y [Rules](https://ctf.hiddeninvestigations.net/rules) legibles. Sigue en curso, con cierre 1/11 a las 14:00 UTC. La política Human-Led/Agentic AI, alcance y prohibición de soluciones públicas mantienen el texto ya documentado. Los nuevos logotipos no se convierten en reglas o beneficios nuevos. No se buscaron datos de registro.

- **mimic-ctf-2026** — El [sitio oficial](https://ctf.rarebytehub.com/events/mimic) devolvió error de conexión en navegador; lectura sin JavaScript y sitemap inaccesibles. Una búsqueda específica no encontró un canal social público verificable del organizador; se ignoraron servidores homónimos de videojuegos. Como último respaldo se consultó [CTFtime](https://ctftime.org/event/3455/), sin diferencias relevantes: fechas, equipos 1–4 y casual ya estaban cargados. No se confirmaron cierre, costo ni elegibilidad en fuente oficial.

**Sin cambios en el cierre de CSCTF** — Aunque el evento lleva novedades de premios en el JSON, su [portada](https://2026.chronos-security.ro/) conserva exactamente **“Opens 1 Jun 2026”** y [registro](https://2026.chronos-security.ro/register) y reglas no publican un cierre. Se registra la apertura aquí sin transformarla en registration_deadline.

**Sin cambios en el registro de SpookyCTF** — La [FAQ](https://spooky.ctfd.io/) y [formulario](https://spooky.ctfd.io/register) no publican cierre ni tope numérico de equipo. La [invitación enlazada en el sitio](https://discord.com/invite/aH63aNSZ7z) carga, pero requiere cuenta/acceso para leer canales. Las novedades del evento en esta revisión corresponden a premios, no a una fecha de inscripción.

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
      "prizes": "Bolsa anunciada EUR 8.000+ con aportes en especie; reparto por bracket pendiente. Best Writeup Award: certificado y archivo público destacado para un equipo. Beneficio PIECE discrepante entre páginas oficiales; ver description.",
      "description": "Se mantiene el calendario 6–8/11/2026, 48 horas desde 15:00 EET, y el requisito de writeups del top 3 por división hasta el 9/11 a las 15:00 EET. Cualquier equipo puede optar al Best Writeup Award, evaluado por claridad, profundidad técnica y reproducibilidad. La plataforma ahora anuncia un mes de PIECE Premium por participante, certificado tras feedback y tres meses de acceso completo por enviar writeup. La web institucional todavía promete tres meses de PIECE Elite a quienes terminen: hay discrepancia oficial, no un beneficio uniforme confirmado."
    },
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
      "prizes": "Anuncio del organizador en CTFtime: Open (online y presencial), 1.º $100, 2.º $50, 3.º $25; premio presencial $100. Moneda no explicitada."
    },
    {
      "id": "ctf-llaitun-smart-city-2026",
      "name": "Ejercicio Técnico CTF Llaitún – Smart City Edition 2026",
      "start": "2026-11-05T12:00:00.000Z",
      "end": "2026-11-05T20:00:00.000Z",
      "url": "https://welcu.com/centroinnovauc/ctf_llaitun_smart_city_edition_2026",
      "verified_by": [
        "oficial"
      ],
      "team_size": "hasta 4; nombre único y jefe de equipo designado",
      "eligibility": "Equipos de instituciones académicas, organismos públicos, Fuerzas Armadas, empresas tecnológicas o profesionales de ciberseguridad; admisión desde Argentina sin confirmar · para vos: dudoso",
      "description": "Las bases oficiales fijan cierre de inscripción el 26/10/2026, sin hora, mientras Welcu aún permite abrir el formulario: no se confirma prórroga. Se conserva el 5/11, 09:00–17:00 de Chile, online. Equipos de hasta cuatro, con jefe responsable de inscripción. Acceso por VPN y computadores propios. Se prohíben servicios externos de resolución, IA agéntica, orquestación y automatización; el apoyo externo a las instituciones inscritas puede descalificar. El PDF no aclara participación desde Argentina. No se inventa una hora para registration_deadline."
    }
  ]
}
```
