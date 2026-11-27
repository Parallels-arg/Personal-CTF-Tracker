# CTF Deep Check — 2026-11-27

Usé un navegador real con JavaScript y pude leer los 8 sitios oficiales seleccionados. Seguí reglas, FAQ, formularios y las invitaciones públicas de Discord disponibles. Los canales de Discord consultados requieren cuenta y la consola de Black Hat India requiere login y hCaptcha. No se envió ningún formulario ni se resolvió un CAPTCHA.

La rotación dejó 12 eventos finalmente fuera de la cola después de aplicar excepciones y relleno. El próximo en volver es `x3ctf-2026`, el 2026-11-27 a las 12:03:25 ART por fin de pausa; `nitectf-2026` y `pointer-overflow-ctf-2026` retornan al mismo tiempo. Cola fijada el 27/11 a las 11:57:39 ART: esos retornos son posteriores al corte. Había nueve candidatos habilitados; se revisaron los primeros ocho por prioridad e inicio y quedó uno fuera por el máximo, no por rotación. No hizo falta relleno.

- **idktheCTF:** se recupera el enlace oficial frente al valor actual de CTFtime. Al finalizar la carga de JavaScript muestra el calendario correcto, sin cambio de fechas. [Portada](https://ctf.idktheflag.sh/) · [Registro](https://ctf.idktheflag.sh/register)
- **LA CTF:** se aclara que el enlace de la portada de 2027 conduce a la plataforma de 2026; sus reglas y condiciones de premios no se trasladan a 2027. No hay registro online de la nueva edición confirmado en esa plataforma. [Portada de 2027](https://lac.tf/) · [Plataforma a la que redirige](https://platform.2026.lac.tf/)

No se confirmaron nuevos cierres de inscripción ni cambios de fechas. Los overrides se aplicaron solo a selección y orden, sin copiarse al JSON. Solo se revisaron eventos existentes; esta revisión no acredita inscripción ni reserva.

## Revisados sin cambios

- `l3m0n-ctf-2026-quals` — Portada, FAQ, reglas y formulario mantienen registro abierto, clasificatorio online del 28/11 de 01:30 a 13:30 ART, abierto a todos y equipos de uno a cuatro. La final sigue prevista para el 12/12 a las 01:30 ART, 24 horas, en Coimbatore, para los mejores 75–85 equipos. No hay cierre ni costo publicados. El formulario se pudo leer, aunque mostró un aviso de sesión terminada; no se inició sesión ni se enviaron datos. Discord requiere una cuenta para leer anuncios. [Portada](https://l3m0nctf.xyz/) · [Reglas](https://l3m0nctf.xyz/rules/) · [Registro](https://play.l3m0nctf.xyz/register)
- `n0v4ctf-2026` — Portada, reglas y formulario conservan acceso mundial gratuito, equipos sin límite y 27–28/11 de 14:00 a 14:00 ART. Los premios TryHackMe y las condiciones de entrega ya están incorporados; no se detectó una novedad. Mantiene ocho envíos por minuto por cuenta y prohibición de compartir flags, pistas inéditas o soluciones. No publica cierre; Discord requiere una cuenta. [Sitio, reglas y registro](https://n0v4ctf.devs.surf/)
- `black-hat-india-official-ctf-2026` — Portada y respuestas del FAQ mantienen gratuidad, acceso mundial con cuenta CTF7, exactamente tres integrantes (sin solo ni dúos) y 24 horas desde el 28/11 a las 11:00 ART. Las reglas de alcance y uso de IA no cambiaron. La consola pide login y hCaptcha; no hay cierre publicado en las páginas públicas. [Portada y FAQ](https://ctf.blackhat-india.com/)
- `tuctf-2026` — Portada, FAQ, reglas y registro mantienen 4–6/12 de 15:00 a 15:00 ART, hasta cinco integrantes o juego individual, acceso abierto a cualquiera y ausencia de premios. El formulario sigue accesible. La IA puede asistir, pero no resolver o interactuar autónomamente con los retos; los tickets deben escribirlos personas. No publica costo ni cierre; Discord requiere una cuenta. [Portada](https://tuctf.com/) · [FAQ](https://tuctf.com/faq/) · [Reglas](https://tuctf.com/rules/) · [Registro](https://ctfd.tuctf.com/register)
- `whoami-labs-electro-station-ctf-2026` — La ficha específica y el reglamento conservan 16/01/2027 a las 10:00 ART hasta 18/01 a las 01:59 ART, 40 retos, 150 plazas y equipos de uno a tres o juego individual. Se mantienen puntos fijos, pistas que restan puntos, laboratorios Docker locales y aislados, y la prohibición de usar IA para resolver retos o generar exploits/flags. Gestión del equipo y arena requieren sesión. No se publica costo ni cierre específico de inscripción; el cierre del arena no se toma como cierre de registro. [Ficha y reglas](https://whoami-labs.com/ctf/temporada/2026-2)
- `jerseyctf-vii-2027` — La portada conserva literalmente «The competition has concluded. Stay tuned for JerseyCTF VII in Spring 2027!». El aviso de registro abierto, FAQ, formulario y reglas siguen identificados como JerseyCTF VI; no se trasladan a VII su gratuidad, edad presencial, condiciones de divisiones ni ausencia de límite de equipo. No se confirmó apertura, cierre, costo, tamaño de equipo o admisión desde Argentina para VII, ni otra fecha oficial detallada. El anuncio de conclusión corresponde a VI y no cambia el estado temporal de VII. [Portada y FAQ](https://jerseyctf.com/) · [Formulario de VI](https://ctf.jerseyctf.com/register) · [Reglas de VI](https://ctf.jerseyctf.com/rules)

```json
{
  "events": [
    {
      "id": "idkthectf-2026",
      "name": "idktheCTF 2026",
      "start": "2026-12-26T01:00:00.000Z",
      "url": "https://ctf.idktheflag.sh/",
      "verified_by": [
        "ctftime",
        "oficial"
      ],
      "description": "Se recupera la URL oficial HTTPS y la verificación oficial frente a la ficha de CTFtime que conserva la carga actual. Tras esperar la carga de JavaScript, la portada confirma inicio el 26/12/2026 a las 01:00 UTC y final el 28/12 a las 04:59 UTC: 25/12 a las 22:00 ART hasta 28/12 a las 01:59 ART. Se conservan las fechas de data/events.json; el texto inicial Starts: Not set / Ends: Not set era transitorio durante la carga. El formulario público de registro pide usuario, correo y contraseña. Se permite formar un equipo de uno para jugar solo. Las reglas mantienen no atacar infraestructura, no hacer fuerza bruta ni compartir soluciones y respetar el alcance. No se publica costo, cierre de inscripción, límite numérico de equipo ni requisitos de elegibilidad suficientes para completar esos campos."
    },
    {
      "id": "la-ctf-2027",
      "name": "LA CTF 2027",
      "start": "2027-02-20T02:00:00.000Z",
      "url": "https://lac.tf/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "description": "La portada oficial mantiene 19–21/02/2027 de 18:00 a 18:00 PST, equivalentes a 19–21/02 de 23:00 a 23:00 ART. Se conservan inicio y fin de data/events.json. La división Open admite cualquier procedencia y equipos sin límite; la división UCLA exige estudiantes de grado actuales de UCLA y limita a cuatro los equipos elegibles para sus premios. El enlace CTF Platform redirige a https://platform.2026.lac.tf/, que dice The CTF is over y conserva reglas de 2026: no se atribuyen a 2027 sus restricciones de premios a un contacto estadounidense ni su política de herramientas. La portada de 2027 anuncia que los detalles de premios, incluidos los de writeups, se publicarán cerca de la competencia. El RSVP publicado es para la actividad presencial y no confirma un registro online de 2027. No se confirmó costo ni fecha límite de inscripción para la próxima edición. Discord requiere una cuenta para leer los canales."
    }
  ]
}
```
