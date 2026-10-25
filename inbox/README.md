# inbox/

Acá caen los archivos diarios de sugerencias (`YYYY-MM-DD.md` o `YYYY-MM-DD.json`).

La GitHub Action `merge-inbox` los procesa en cada push:

- Los válidos se integran en `data/events.json` y se mueven a `inbox/processed/`.
  Si algún evento suelto estaba mal (p. ej. sin URL), se saltea y se anota en un `.skipped.txt`.
- Los archivos ilegibles o sin ningún evento válido se mueven a `inbox/failed/` junto a un
  `.error.txt` con el motivo.

Este README se ignora. El formato esperado está en `PROMPT_CHATGPT.md`.
