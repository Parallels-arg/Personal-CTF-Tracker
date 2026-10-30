# CTF Deep Check — 2026-10-30 — revisión de las 12:00 ART

Navegador real: **sí**. Se leyeron **5 de los 7 sitios oficiales intentados**: CSCTF, Dragos, Shellmates, ASIS y GaianSpace. bi0s devolvió error DNS 1016 y Backdoor error de conexión 522. Shellmates y ASIS fueron legibles, pero sus páginas no verifican las condiciones de las ediciones seleccionadas. Tres invitaciones de Discord cargaron y requieren cuenta/acceso para leer canales.

**Rotación: 15 candidatos quedaron fuera al fijar la cola; el próximo en volver es `spookyctf-2026` el 30/10/2026 a las 18:00 ART (`2026-10-30T18:00:00-03:00`), por quedar su inicio a siete días.** Nueve estaban en pausa tras revisiones sin cambios; otros seis tuvieron novedades en una revisión anterior de hoy y pueden volver al día siguiente.

**7 eventos revisados; 5 con correcciones o información nueva y 2 sin cambios.** No se confirmó un nuevo cierre de inscripción ni un cambio de fechas. No se buscaron eventos nuevos.

## Selección e historial

Se leyeron `data/events.json`, `data/status.json`, `data/overrides.json` y los informes procesados de enriquecimiento del 25, 26, 28, 29 y 30/10. Se aplicaron las fechas y cierres de overrides para selección y prioridad, sin trasladarlos al JSON. Su única entrada corresponde a un evento ya terminado.

La cola se fijó a las 12:00 ART. CSCTF entra por la excepción de inicio en los próximos siete días. Orden: `csctf-2026`, `dragos-ot-ctf-2026`, `bi0sctf-2026`, `bsides-algiers-2026-ctf`, `backdoorctf-2026`, `asis-ctf-finals-2026`, `gaian-space-perihelion-ctf-2027`.

Se excluyeron por revisión sin cambios: `spookyctf-2026`, `first-flag-ctf-2026`, `mimic-ctf-2026`, `wolvctf-2026`, `glacierctf-2026`, `crate-ctf-2026`, `l3m0n-ctf-2026-quals`, `x3ctf-2026`, `nitectf-2026`. Los estados interesado/inscripto usan tres días y sin estado siete; el retorno más cercano es la excepción de Spooky indicada arriba.

La revisión anterior de hoy tuvo novedades en `swampctf-2026`, `pointer-overflow-ctf-2026`, `hi-cyber-con-ctf-2026`, `tvx-ctf-2026`, `eyesopenctf-2026` y `outback-overflow-2026`: no se repiten esas novedades. Para el relleno faltaba una plaza, pero ningún pausado superaba las 24 horas al fijar la cola: el informe del 29/10 se publicó a las 12:05:03 ART y el del 30/10 es de hoy. Por eso se revisan siete, sin forzar ocho.

Ya existe `inbox/processed/enriquecimiento-2026-10-30.md` con la revisión anterior. Se conserva intacto; este informe se agrega únicamente en la ruta de inbox solicitada. El JSON contiene solo las nuevas correcciones de esta revisión.

## Correcciones y fuentes

- **bi0sctf-2026** — La [web oficial](https://ctf.bi0s.in/) falló en navegador por **Origin DNS error 1016**. Luego se probaron lectura sin JavaScript y sitemap, ambos inaccesibles. El [Twitter oficial](https://twitter.com/teambi0s) indicado por el organizador no aportó texto legible. Finalmente, [CTFtime](https://ctftime.org/event/3480/) muestra **“Future weight: to be determined”**: se corrige `ctftime_rated` de true a null. Se conserva el peso histórico 79,51 y las fechas, sin copiarlos como novedades. Cierre, costo, elegibilidad y equipo siguen sin confirmación oficial.

- **bsides-algiers-2026-ctf** — [Shellmates](https://www.shellmates.club/) carga con JavaScript; se revisaron Events y el menú CTF, sin condiciones de la edición 2026. No se trasladan datos de la ficha de 2023 a este evento. El [Discord oficial](https://discord.com/invite/nt7U5q8gtW) pide cuenta/acceso. [CTFtime](https://ctftime.org/event/3475/) conserva calendario y peso 22,90, pero el peso futuro está pendiente: se corrige únicamente `ctftime_rated` a null. No se completa elegibilidad usando solo el requisito presencial anunciado en CTFtime ni se afirma verificación oficial de esta edición.

- **backdoorctf-2026** — La [web oficial](https://backdoor.infoseciitr.in/) devolvió **522 Connection timed out**. Se intentaron después lectura sin JavaScript y sitemap, sin datos legibles; el [Discord oficial](https://discord.com/invite/chHtsSTQ2) requiere cuenta/acceso para leer anuncios. Como último respaldo, [CTFtime](https://ctftime.org/event/3472/) conserva fechas y peso 77,38, con peso futuro pendiente. Se corrige únicamente `ctftime_rated` a null; no se inventan cierre, costo, equipo ni elegibilidad.

- **asis-ctf-finals-2026** — [Portada](https://asisctf.com/), [Rules](https://asisctf.com/rules) y [FAQ](https://asisctf.com/faq) son legibles, pero muestran el clasificatorio de agosto y contenido de Tech Olympics, sin verificar las condiciones de la final de diciembre. La frase sobre inscripción hasta el final del juego y el tamaño de cuatro no se trasladan a esta final. El [Discord de ASIS](https://discord.com/invite/Dk5jB8v38M) requiere acceso. [CTFtime](https://ctftime.org/event/3062/) mantiene el 27–28/12, peso 99,38 y peso futuro pendiente: se corrige `ctftime_rated` a null, conservando las fechas. El aviso Game Finished corresponde al clasificatorio, no a la final seleccionada.

- **gaian-space-perihelion-ctf-2027** — [Portada](https://gaian.space/ctf/), [registro público](https://gaian.space/ctf/signup/), [reglas](https://gaian.space/ctf/rules/) y [términos](https://gaian.space/ctf/terms/) reconfirman calendario y cierre existentes. Las reglas publican premios en SATS y un premio al writeup de categoría, con entrega hasta el 10/1/2027 a las 18:00 UTC. Se documentan los requisitos y la prohibición de publicar/enviar antes del cierre. Se conserva la restricción 18+ o consentimiento parental y se agrega evaluación personal dudosa por edad/consentimiento no confirmados. Costo no explícito: se omite.

Los cinco eventos del JSON usan sus ids exactos; `start` y `end` se mantienen como en `data/events.json`. En los cuatro con solo corrección de rating no se agrega `oficial`: no se verificaron oficialmente las condiciones de esas ediciones. No se cambian los pesos históricos.

## Revisados sin cambios

- **csctf-2026** — [Portada](https://2026.chronos-security.ro/), [registro](https://2026.chronos-security.ro/register) y [Rules](https://2026.chronos-security.ro/rules) legibles. Se mantienen calendario, gratuidad, equipos 1–5 y categorías. La portada conserva exactamente **“Opens 1 Jun 2026”**; no publica cierre de inscripción. Las reglas siguen señalando 9/11 a las 15:00 EET para writeups, que no es un cierre de registro. No se convierten cambios de presentación del formulario en datos nuevos. El intento de abrir el enlace de Discord agotó el tiempo de espera del navegador, sin lectura de canales.

- **dragos-ot-ctf-2026** — La [página y formulario oficiales](https://hub.dragos.com/ctf-registration-26) cargaron completos. Mantienen 28–30/10, 16:00 UTC de inicio/cierre, participación individual o en equipo, sin tope numérico, costo o cierre de inscripción explícitos. Sigue la referencia a asistentes de DISC; no se confirma admisión de personas externas ni acceso inmediato a esta altura del evento. El selector de Argentina no se toma como prueba suficiente de admisión. No se registró ni envió ningún formulario y no se reutilizan condiciones del recap 2025.

```json
{
  "events": [
    {
      "id": "bi0sctf-2026",
      "name": "bi0sCTF 2026",
      "start": "2026-12-05T05:00:00.000Z",
      "end": "2026-12-06T17:00:00.000Z",
      "url": "https://ctftime.org/event/3480/",
      "verified_by": [
        "ctftime"
      ],
      "ctftime_rated": null
    },
    {
      "id": "bsides-algiers-2026-ctf",
      "name": "BSides Algiers 2026 CTF",
      "start": "2026-12-17T19:00:00.000Z",
      "end": "2026-12-19T07:00:00.000Z",
      "url": "https://ctftime.org/event/3475/",
      "verified_by": [
        "ctftime"
      ],
      "ctftime_rated": null
    },
    {
      "id": "backdoorctf-2026",
      "name": "BackdoorCTF 2026",
      "start": "2026-12-19T12:00:00.000Z",
      "end": "2026-12-20T12:00:00.000Z",
      "url": "https://ctftime.org/event/3472/",
      "verified_by": [
        "ctftime"
      ],
      "ctftime_rated": null
    },
    {
      "id": "asis-ctf-finals-2026",
      "name": "ASIS CTF Finals 2026",
      "start": "2026-12-27T14:00:00.000Z",
      "end": "2026-12-28T14:00:00.000Z",
      "url": "https://ctftime.org/event/3062/",
      "verified_by": [
        "ctftime"
      ],
      "ctftime_rated": null
    },
    {
      "id": "gaian-space-perihelion-ctf-2027",
      "name": "GaianSpace Perihelion CTF 2027",
      "start": "2027-01-02T18:00:00.000Z",
      "end": "2027-01-03T18:00:00.000Z",
      "url": "https://gaian.space/ctf/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "eligibility": "Internacional; 18+ o consentimiento parental, sujeto a normativa local. Edad/consentimiento sin confirmar · para vos: dudoso",
      "prizes": "1.º 10.000 SATS; 2.º 5.000; 3.º 2.500; mejor writeup de categoría 5.000 SATS. Mención de ganadores en web/redes; premios sujetos a cambios.",
      "description": "Se mantienen fechas y cierre de inscripción del repositorio, reconfirmados en portada, registro y reglas. El premio al writeup exige cubrir una categoría completa, incluyendo intentos y retos no resueltos; no admite un solo reto aislado ni una lista de flags. Enviar después del cierre del CTF y hasta 2027-01-10T18:00:00Z a ctf[at]gaian.space, un correo por categoría desde una dirección del equipo, en Markdown, PDF o enlace disponible. No publicar ni enviar writeups antes del cierre."
    }
  ]
}
```
