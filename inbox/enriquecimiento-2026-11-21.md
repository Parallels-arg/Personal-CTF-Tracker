# CTF Deep Check — 2026-11-21

Usé un navegador real con JavaScript y pude leer los sitios oficiales de 6 de los 8 eventos revisados. Black Hat India y su sitemap devolvieron 522; DMOJ permaneció en verificación de seguridad. Consulté alternativas oficiales y CTFtime donde correspondía.

La rotación dejó 11 eventos finalmente fuera de la cola después de aplicar excepciones y relleno. Los próximos en volver son `cyberzerk-ctf-2026` y `bi0sctf-2026`, el 2026-11-21 a las 12:07:53 ART, por fin de pausa. La cola se fijó el 21/11 a las 11:56:21 ART. No necesitó relleno.

- **TUCTF:** el reglamento limita los premios a equipos de EE.UU. con afiliación escolar, en categorías secundaria y universidad de grado. La marca «para vos: no» se refiere a premios; no se afirma que esté prohibido participar desde Argentina. La plataforma de registro y su sitemap devolvieron 404. [Portada](https://tuctf.com/) · [Reglas](https://tuctf.com/rules) · [CTFtime](https://ctftime.org/event/3518)
- **Electro Station / Whoami-Labs:** el formulario de la cuenta y las condiciones del servicio exigen ser mayor de 18 años. Se agrega esa restricción y se usa «para vos: dudoso» porque tu edad no está confirmada. [Temporadas](https://whoami-labs.com/ctf) · [Registro](https://whoami-labs.com/register) · [Condiciones de Uso](https://whoami-labs.com/condiciones-uso)

No confirmé cierres nuevos de inscripción ni cambios de fechas. Los valores de overrides se usaron únicamente para seleccionar y ordenar.

## Revisados sin cambios

- `l3m0n-ctf-2026-quals` — Portada, FAQ y formulario mantienen abierto el registro y el clasificatorio online del 28/11 de 01:30 a 13:30 ART, abierto a todos y con equipos de uno a cuatro. Las reglas mantienen literalmente «More to come: the finals dates, the registration deadline and the prizes will be announced on the home page and on CTFtime.». No hay fecha de cierre confirmada. [Portada](https://l3m0nctf.xyz/) · [Reglas](https://l3m0nctf.xyz/rules/) · [Registro](https://play.l3m0nctf.xyz/register)
- `outback-overflow-2026` — La portada mantiene las 36 horas ya incorporadas, hasta el 22/11 a las 08:00 ART, gratuidad y equipos de hasta cuatro. El FAQ sigue indicando inscripción abierta y el formulario es público, sin fecha de cierre. Las reglas de IA conservan lo registrado. [Portada](https://outbackoverflow26.hscyber.org/) · [FAQ](https://outbackoverflow26.hscyber.org/faq.html) · [Reglas](https://outbackoverflow26.hscyber.org/rules.html) · [Registro](https://ctf.hscyber.org/register)
- `redreaper-ctf-2026` — La portada mantiene equipos de dos a cuatro y el formulario continúa visible, sin cierre ni costo publicados. Las reglas redirigen al inicio de sesión; Discord pide cuenta. La modalidad híbrida entre clasificación y finales sigue sin detallar qué fase exige presencialidad. CTFtime conserva el 27/11 de 08:00 a 16:00 ART y peso futuro pendiente. [Portada](https://qualification.redx.site/) · [Registro](https://qualification.redx.site/register) · [CTFtime](https://ctftime.org/event/3502)
- `n0v4ctf-2026` — El sitio mantiene inscripción mundial gratuita, equipos sin límite y el 27–28/11 de 14:00 a 14:00 ART. Las reglas conservan la prohibición de compartir flags y soluciones y el límite de ocho envíos por minuto por cuenta. No publica cierre. Los cambios de presentación no aportan datos nuevos de registro. [Sitio y reglas oficiales](https://n0v4ctf.devs.surf/)
- `black-hat-india-official-ctf-2026` — La portada, el sitemap y el sitio de CTF7 devolvieron «Connection timed out Error code 522» en este navegador. Instagram mostró «Profile isn't available». CTFtime mantiene el 28–29/11 a las 11:00 ART, pero allí dice hasta tres integrantes, mientras el FAQ oficial previamente verificado exigía tres exactos. Al no poder reconfirmar el oficial, no cambio el tamaño de equipo ni agrego un cierre. [Sitio oficial con error](https://ctf.blackhat-india.com/) · [CTFtime](https://ctftime.org/event/3510)
- `leos-20th-birthday-bash-2026` — DMOJ permaneció en «Performing security verification» y no pude leer la ficha en este navegador. El anuncio del organizador en Codeforces recuperado por búsqueda mantiene equipos de uno a diez, 24 horas y prohibición de IA generativa interactiva. CTFtime conserva 12–13/12 de 01:00 a 01:00 UTC, la cuenta compartida por equipo y el carácter casual. No confirmé costo ni cierre. [Ficha oficial con verificación](https://dmoj.ca/contest/leo20) · [Anuncio del organizador](https://sas.codeforces.com/blog/entry/158417?mobile=false) · [CTFtime](https://ctftime.org/event/3498/)

```json
{
  "events": [
    {
      "id": "tuctf-2026",
      "name": "TUCTF 2026",
      "start": "2026-12-04T10:00:00.000Z",
      "url": "https://tuctf.com/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "eligibility": "Premios solo para equipos de EE.UU. con afiliación a secundaria o universidad de grado · para vos: no",
      "ctftime_rated": null,
      "description": "El reglamento enlazado desde la portada oficial de TUCTF 2026 limita los premios a equipos de Estados Unidos, con la escuela o universidad indicada en Affiliation; premia al top 3 de secundaria y al top 3 universitario de grado y envía todo a una sola dirección. Como residente en Argentina, no se confirma elegibilidad para esos premios: esta restricción se refiere a premios y no demuestra una prohibición general de jugar desde Argentina. Se mantiene el máximo de cinco integrantes. La plataforma CTFd y su sitemap devuelven 404; Discord pide cuenta. No confirmé costo ni cierre de inscripción. Se conservan las fechas de data/events.json; CTFtime mantiene el 4–6/12 y el peso futuro pendiente."
    },
    {
      "id": "whoami-labs-electro-station-ctf-2026",
      "name": "Whoami-Labs Electro Station CTF 2026",
      "start": "2026-12-05T13:00:00.000Z",
      "url": "https://whoami-labs.com/ctf",
      "verified_by": [
        "oficial"
      ],
      "eligibility": "Plataforma abierta a Latinoamérica, incluida Argentina; cuenta para mayores de 18 años. Tu edad no está confirmada · para vos: dudoso",
      "description": "El formulario público de Whoami-Labs requiere declarar ser mayor de 18 años, y las Condiciones de Uso confirman ese requisito para el servicio. Como Electro Station utiliza la misma cuenta, se incorpora esta condición de acceso; tu edad no está confirmada. La ficha T2026-2 mantiene 80 retos en 24 horas, equipos de uno a tres o juego individual y el 5–6/12 de 08:00 a 08:00 GMT-5 (10:00 ART). La sección general todavía dice fecha por confirmar. Se conservan las fechas de data/events.json; no se publica un cierre específico para esta edición."
    }
  ]
}
```
