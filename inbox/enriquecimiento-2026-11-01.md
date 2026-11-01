# CTF Deep Check — 2026-11-01

Navegador real: **sí**. Se pudieron leer sitios oficiales de **7 de los 8 eventos**, además de páginas institucionales, plataformas y formularios públicos. niteCTF quedó en blanco por un error de WebGL. Se leyeron el sitio de Cryptonite y su perfil de Instagram, pero la publicación del 1/11 requirió iniciar sesión. Cuatro invitaciones de Discord cargaron y solicitaron cuenta/acceso para leer canales.

**Rotación: 3 eventos quedaron finalmente fuera de la cola. El próximo retorno es `swampctf-2026` el 3/11/2026 a las 12:07:16 ART (`2026-11-03T12:07:16-03:00`), empatado con `pointer-overflow-ctf-2026`.** Se toma conservadoramente la hora del commit del informe del 31/10 como referencia de revisión. Ninguna excepción de próximos siete días adelanta esos retornos.

**8 eventos revisados: 1 con novedades y 7 sin cambios.** No se encontraron nuevos cierres de inscripción confirmables ni cambios de fechas. No se buscaron eventos nuevos.

## Cola y rotación

Se leyeron los tres archivos de datos y los siete informes `inbox/processed/enriquecimiento-*.md` disponibles. Se tomó la última revisión de cada evento, respetando que el archivo del 30/10 con sufijo `-2` es posterior al del mismo día sin sufijo. Cuando el JSON anterior contiene novedades, estas prevalecen sobre una observación parcial de inscripción sin cambios.

Cola fijada el 1/11 a las 12:08:02 ART: `csctf-2026`, `spookyctf-2026`, `first-flag-ctf-2026`, `glacierctf-2026`, `crate-ctf-2026`, `l3m0n-ctf-2026-quals`, `x3ctf-2026`, `nitectf-2026`.

Se aplicó overrides con precedencia solo para selección, prioridad y orden; su única entrada corresponde a un evento terminado. No se copian sus valores al JSON. Se excluyeron terminados y descartados. La revisión especial de los estados `inscripto` fue considerada sin exigir campos faltantes, pero ninguno alcanzó el cupo de esta pasada; HI Cyber Con ya había terminado a las 11:00 ART.

Los ocho seleccionados tienen prioridad de interesado sin cierre confirmado, ordenados por inicio. CSCTF, Spooky y First Flag empiezan dentro de siete días. Glacier, Crate, L3m0n, x3 y nite completaron su pausa de tres días a las 12:05:03 ART de hoy, antes de fijar la cola. Había 20 candidatos disponibles: no hizo falta relleno; 12 quedaron fuera por cupo, sin contarlos como excluidos por rotación.

Los tres pausados son `swampctf-2026`, `pointer-overflow-ctf-2026` y `wolvctf-2026`. WolvCTF vuelve el 6/11 a las 00:16:10 ART, por siete días desde el commit de su última revisión; su excepción por inicio comienza más tarde.

## Novedades y fuentes

- **csctf-2026** — La [plataforma de premios](https://2026.chronos-security.ro/prizes) ya coincide con la [página institucional](https://www.chronos-security.ro/competitions/csctf-2026/prizes) sobre PIECE Elite para quienes finalicen. Se corrige la descripción que mantenía una discrepancia. La plataforma también confirma descuento ThunderCipher y bolsas Elastic. Las [reglas](https://2026.chronos-security.ro/rules) y [FAQ institucional](https://www.chronos-security.ro/competitions/csctf-2026/faq) conservan calendario y plazo de writeups. El [registro público](https://2026.chronos-security.ro/register) no publica cierre de inscripción. El JSON conserva los `start` y `end` actuales; no supone cuándo se modificaron las páginas.

Se comprobó antes de publicar que los tres archivos de datos conservaban sus SHA iniciales. No se enviaron formularios ni se completó ninguna inscripción.

## Revisados sin cambios

- **spookyctf-2026** — [Portada y FAQ](https://spooky.ctfd.io/) y [registro](https://spooky.ctfd.io/register) legibles. Sin cierre ni máximo numérico de equipo. El [Discord enlazado](https://discord.com/invite/aH63aNSZ7z) requiere cuenta/acceso. El [anuncio del organizador en CTFtime](https://ctftime.org/event/3339/) mantiene el desplazamiento de dos horas respecto de la cabecera: se conservan 6–7/11 a las 19:00 UTC, ya cargados. Premios y reglas sobre IA también estaban documentados; no se repiten como novedades.

- **first-flag-ctf-2026** — [Evento, reglas y FAQ](https://cyberlearner.org/ctf) y [registro](https://cyberlearner.org/register) legibles. Conservan 7/11, 09:00–15:00 UTC, acceso gratuito e individual. Sin cierre ni nuevas condiciones explícitas de elegibilidad. La FAQ indica que Discord se comparte con las personas registradas antes del evento; eso no fija un cierre de inscripción.

- **glacierctf-2026** — [Portada con reglas e información de premios](https://glacierctf.com/) legible, sin enlace de registro ni cierre, costo o máximo de integrantes publicados. Las condiciones académicas, sanciones y writeups ya constan en el repositorio. El [Discord oficial](https://discord.com/invite/DFYnRAME23) requiere cuenta/acceso. [CTFtime](https://ctftime.org/event/3337/) conserva 20–21/11 a las 18:00 UTC y peso futuro pendiente; no hay corrección que incorporar.

- **crate-ctf-2026** — [Página institucional](https://foi.se/cratectf), [plataforma con reglas](https://ctf.crate.foi.se/) y [registro](https://ctf.crate.foi.se/register) legibles. La institución conserva exactamente **“Anmälan till Crate-CTF 2026 öppnde 1 september.”** Es apertura, no cierre. Sin costo ni nueva confirmación de elegibilidad internacional. Se mantienen 21/11, 14:00–22:00 de Suecia y equipos sin límite; las preguntas académicas y el envío opcional de stickers solo dentro de Suecia no se convierten en restricciones de participación. El [Discord](https://discord.com/invite/bMUNpzPanH) requiere cuenta/acceso.

- **l3m0n-ctf-2026-quals** — [Portada y FAQ desplegada](https://l3m0nctf.xyz/) y [Rules](https://l3m0nctf.xyz/rules/) legibles. La portada dice **“Registration opens soon”** y la FAQ **“Registration is not open yet.”** Las reglas conservan **“the registration link and deadline, and the prizes will be announced on the home page and on CTFtime.”** Sin inventar fecha ni costo. Se mantienen 28/11, 04:30–16:30 UTC, equipos 1–4 y clasificatorio abierto. Las finales presenciales son otra fase.

- **x3ctf-2026** — [About y Rules](https://x3c.tf/) legibles: 4–6/12 a las 18:00 UTC y una cuenta compartida por equipo, sin cierre, costo, máximo numérico o nueva elegibilidad explícita. Premios y reglas de LLM siguen pendientes. El [Discord oficial](https://discord.com/invite/WpFHfD6nqH) requiere cuenta/acceso; no se convierten las reglas pendientes en una apertura de registro.

- **nitectf-2026** — La [web oficial](https://nitectf.cryptonitemit.in/) se intentó con JavaScript en navegador real: pantalla vacía y consola **`THREE.WebGLRenderer: Error creating WebGL context.`**. Se siguió esta secuencia: lectura sin JavaScript, que solo solicita habilitarlo; sitemap inaccesible; [sitio del organizador](https://cryptonitemit.in/) y [Instagram oficial](https://www.instagram.com/cryptonite_mit/), donde la publicación del 1/11 requiere iniciar sesión; finalmente [CTFtime](https://ctftime.org/event/3367/), sin cambios en 11–13/12 a las 12:00 UTC y peso futuro pendiente. La lectura web alternativa de esa publicación tampoco estuvo disponible. No se verifican oficialmente los datos faltantes de 2026, por lo que no se cambia URL ni se agrega “oficial”.

**Sin cambios en el cierre de CSCTF** — El evento tiene novedades en el JSON, pero portada, registro, reglas y FAQ no publican cierre. La portada ahora muestra **“REGISTRATION Open”**; se documenta el estado de apertura sin deducir una fecha límite.

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
      "prizes": "Bolsa anunciada EUR 8.000+ con aportes en especie; reparto por bracket pendiente. Cinco bolsas Elastic para un equipo ganador. Best Writeup Award: certificado y archivo destacado para un equipo. Quienes finalicen reciben tres meses de PIECE Elite, sin compra ni tarjeta; certificado tras feedback.",
      "description": "Se conserva el calendario 6–8/11, 48 horas desde las 15:00 EET. La plataforma ya coincide con la web institucional: tres meses de PIECE Elite para quienes finalicen; queda resuelta la discrepancia previa de Premium/Elite y duración. Todos los participantes tienen un descuento del 66 % en examen ThunderCipher con código TCCSCTF66. Cualquier equipo puede enviar writeup al archivo público y optar al Best Writeup Award. El top 3 por división debe entregarlo hasta el 9/11 a las 15:00 EET; no es un cierre de inscripción."
    }
  ]
}
```
