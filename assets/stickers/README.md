# Stickers and bouquet art

Everything in this folder is original and covered by the project's MIT license.

| Files | What they are |
|---|---|
| `bouquet-wrap-*.png` | The 5 paper and lace wraps for the bouquet |
| `flower-*.png`, `bow-*.png` | Bouquet flowers and bows, drawn by `tools/draw-bouquet-art.py` |

The flowers and bows also show up in the Photo Booth under
**Stickers → My stickers**, because they are listed in
`CONFIG.photoBoothStickers` in `js/data/config.js`.

## Adding your own

Drop transparent PNGs here (short names, no capitals or spaces), then:

- **Photo Booth sticker:** add `"assets/stickers/your-file.png"` to
  `CONFIG.photoBoothStickers` in `js/data/config.js`.
- **Bouquet flower:** add a line to `BOUQUET_FLOWERS` in `js/app.js`.

Only add images you made yourself or have the right to share.
