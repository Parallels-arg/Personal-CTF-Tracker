# CTF Deep Check — 2026-10-25

Navegador real: **sí**. Se pudieron leer los sitios oficiales de **8 de 8 eventos**, más **5 sitios oficiales complementarios** (organizador, reglamentos o plataforma de competición). Se revisaron también dos invitaciones de Discord: ambas requieren cuenta/acceso para leer los canales.

**3 eventos con datos nuevos o corregidos; 5 revisados sin cambios.** No se encontraron nuevos cierres de inscripción confirmables ni cambios de fechas. No había archivos `inbox/processed/enriquecimiento-*.md` para aplicar el período de exclusión de 14 días. La selección se obtuvo únicamente de `data/events.json` y `data/status.json`; se excluyeron eventos finalizados o descartados y se respetó la prioridad y el límite de ocho.

## Hallazgos y fuentes

- **sudocrypt-v16**: la [FAQ oficial de Exun](https://reg.exunclan.com/query) permite expresamente participación independiente sin afiliación escolar en Sudocrypt. La [web del evento](https://sudocrypt.com/) confirma equipos de tres y conserva 27/10 03:30 UTC–28/10 15:30 UTC. La FAQ publica un plazo general del simposio, pero no lo asigna inequívocamente al registro específico de Sudocrypt y resulta posterior a su cierre: no se trasladó a `registration_deadline`. Costo sin confirmación oficial. [CTFtime](https://ctftime.org/event/3443/) mantiene Future weight 0 fijado: `ctftime_rated: false`.
- **csctf-2026**: el [registro oficial](https://2026.chronos-security.ro/register) especifica que **todos** los integrantes de Juniors deben ser menores de 18 y **todos** los de Seniors deben tener 18 o más; Fighters no tiene restricción de edad. Ofrece consentimiento opcional para compartir datos y desempeño con sponsors/partners con fines laborales, educativos o de colaboración. Los [premios](https://2026.chronos-security.ro/prizes) confirman certificados para participantes y logros; importes pendientes. Se leyeron además [reglas de la plataforma](https://2026.chronos-security.ro/rules) y [reglas completas del organizador](https://www.chronos-security.ro/competitions/csctf-2026/rules). No publican fecha límite de registro. Horarios conservados y coincidentes con [CTFtime](https://ctftime.org/event/3333/), que indica Future weight por definir: `ctftime_rated: null`.
- **crate-ctf-2026**: las reglas en la [plataforma oficial](https://ctf.crate.foi.se/) dicen que no hay límite de integrantes por equipo y que cada participante solo puede pertenecer a uno. La plataforma enlaza empleos y proyectos de tesis en FOI; el [formulario público](https://ctf.crate.foi.se/register) no publica cierre ni costo. Se leyó también la [página institucional](https://foi.se/cratectf). [CTFtime](https://ctftime.org/event/3336/) muestra peso actual 37 y **Future weight: to be determined**: se corrige `ctftime_rated` de `true` a `null`. No se alteran las fechas.

Los campos `start` y `end` se mantienen exactamente como estaban y fueron reconfirmados; no se dedujeron nuevos plazos, costos ni restricciones.

## Revisados sin cambios

- **hi-cyber-con-ctf-2026** — Sitios legibles: [plataforma](https://ctf.hiddeninvestigations.net/), [Rules](https://ctf.hiddeninvestigations.net/rules), [Community](https://ctf.hiddeninvestigations.net/community) y [CTF del organizador](https://hicybercon.hiddeninvestigations.net/ctf). Confirman gratuidad, acceso mundial, 1–5 integrantes y fechas ya cargadas, pero no un cierre de inscripción. No hay datos nuevos necesarios para completar los campos faltantes.
- **spookyctf-2026** — [Sitio y FAQ](https://spooky.ctfd.io/) y [registro](https://spooky.ctfd.io/register) legibles. Repiten gratuidad, participación individual o grupal y 18+ solo presencial; no especifican máximo de integrantes ni cierre. La [invitación oficial de Discord](https://discord.com/invite/aH63aNSZ7z) carga, pero solicita cuenta/acceso para leer canales; no se inició sesión ni se creó cuenta.
- **first-flag-ctf-2026** — [Evento, reglas y FAQ](https://cyberlearner.org/ctf), y [registro](https://cyberlearner.org/register) legibles. Sin plazo de inscripción ni restricciones adicionales explícitas de país/edad/afiliación. La FAQ dice que el Discord se comunica a las personas registradas; no hay invitación pública específica accesible desde esa página. No se interpretó esa referencia como plazo de registro.
- **glacierctf-2026** — [Web oficial](https://glacierctf.com/) y [organizador](https://losfuzzys.net/) legibles; el evento no enlaza todavía registro, Rules ni FAQ y no publica costo, límite de integrantes o cierre. La [invitación de Discord de LosFuzzys](https://discord.com/invite/RrUKAvGB2N) carga, pero solicita cuenta/acceso para leer canales. No se trasladaron reglas de ediciones anteriores.
- **l3m0n-ctf-2026-quals** — [Web](https://l3m0nctf.xyz/) y [reglas](https://l3m0nctf.xyz/rules/) legibles. Las reglas confirman que enlace y fecha límite de registro se anunciarán más adelante; costo no publicado. Abierto a todos, equipos de 1–4 y fechas ya coinciden con los datos existentes. No se interpretó la intención de puntuar globalmente como un peso de CTFtime ya fijado.

```json
{
  "events": [
    {
      "id": "sudocrypt-v16",
      "name": "Sudocrypt v16.0",
      "start": "2026-10-27T03:30:00.000Z",
      "end": "2026-10-28T15:30:00.000Z",
      "url": "https://sudocrypt.com/",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "eligibility": "abierto a todos; permite participación independiente sin afiliación escolar",
      "ctftime_url": "https://ctftime.org/event/3443/",
      "weight": 0,
      "ctftime_rated": false
    },
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
      "eligibility": "mundial; Juniors: todos menores de 18; Seniors: todos de 18+; Fighters: sin restricción de edad",
      "career_value": "El registro permite optar por compartir datos y desempeño con sponsors y partners para oportunidades laborales, educativas o de colaboración; no garantiza ofertas.",
      "prizes": "Top 3 por track, importes por anunciar; writeups en las 24 h posteriores al cierre. Certificados de participación y logros tras los resultados.",
      "ctftime_url": "https://ctftime.org/event/3333/",
      "weight": 0,
      "ctftime_rated": null
    },
    {
      "id": "crate-ctf-2026",
      "name": "Crate-CTF",
      "start": "2026-11-21T13:00:00.000Z",
      "end": "2026-11-21T21:00:00.000Z",
      "url": "https://foi.se/cratectf",
      "verified_by": [
        "oficial",
        "ctftime"
      ],
      "team_size": "individual o equipo sin límite de integrantes; cada persona solo puede integrar un equipo",
      "career_value": "La plataforma oficial enlaza vacantes y proyectos de tesis en FOI; elegibilidad laboral desde Argentina no confirmada.",
      "tags": [
        "forensics",
        "rev",
        "pwn",
        "web",
        "crypto",
        "OSINT",
        "network",
        "misc"
      ],
      "ctftime_url": "https://ctftime.org/event/3336/",
      "weight": 37,
      "ctftime_rated": null
    }
  ]
}
```
