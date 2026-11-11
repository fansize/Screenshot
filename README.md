# Screan

**Screenshot Studio for App Store & Google Play**

Create beautiful, localized screenshots for your app store listings. No account, no upload — everything runs in your browser.

[**Try it live at screan.app**](https://screan.app)

## Screenshots

<p align="center">
  <img src="assets/screenshots/light.png" width="49%" />
  <img src="assets/screenshots/dark.png" width="49%" />
</p>

## Features

- **Store formats** — iPhone, iPad, Mac, Android Phone & Tablet
- **Layout presets** — Top, Center, Bottom positioning with adjustable spacing
- **Customizable design** — Fonts, colors, gradients, device frames, shadows
- **Multi-language** — Add languages and export localized screenshots in one click
- **AI translation** — Automatic translation powered by Claude API (optional)
- **ZIP export** — Export all formats and languages at once
- **Persistent storage** — Your work is saved locally in IndexedDB
- **Dark/Light mode** — Automatic theme support
- **No backend** — Everything runs client-side, your data stays in your browser

## Supported Formats

| App Store | Google Play |
|-----------|-------------|
| iPhone Dynamic Island (medium), 1206 × 2622 | Phone, 1080 × 1920 |
| iPad 13", 2064 × 2752 | Tablet, 1200 × 1920 |
| Mac, 2880 × 1800 | |

Exports use one fixed size per platform. The iPhone and iPad sizes match Apple's
required display categories in the [official screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications)
(checked November 11, 2026). App Store Connect can scale these screenshots for
smaller displays. PNG exports use RGB without an alpha channel.

## Usage

1. Select your target platform (iPhone, iPad, Mac, Android)
2. Drag & drop your screenshots or click to add
3. Pick a layout preset (Top, Center, Bottom)
4. Customize title, subtitle, colors and fonts
5. Add languages and translate (manually or with AI)
6. Click **Export** to download a ZIP with screenshots for all populated platforms

## AI Translation

Screan includes optional AI translation powered by Claude:

1. Enter your Claude API key in the Translate tab (stored locally, never sent anywhere except Anthropic)
2. Add a new language from the dropdown
3. Click the translate button to translate all screenshots at once

## Tech Stack

Pure HTML, CSS, and JavaScript. No build step, no frameworks.

- **JSZip** — ZIP export
- **Lucide Icons** — UI icons
- **Claude API** — AI translation (optional)

## Development

No build required. Just serve the files:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000` in your browser.

## Contributing

This is a personal project. The code is open-source for transparency and learning purposes, but I'm not accepting contributions at this time.

## License

[MIT](LICENSE)

## Cloudflare Workers deployment

The deployment at https://screenshot.oodicraft.com uses the `screenshot-studio` Worker.
Its custom domain is declared in `cloudflare.config.ts`.

```bash
npm ci
npm run deploy:check
npm run deploy
```

Authenticate the cf CLI with an account that can deploy Workers and manage the
`oodicraft.com` zone. If the environment needs proxy support, prefix the deploy
commands with `NODE_USE_ENV_PROXY=1`.

The build copies only website files into `dist/`; repository files and deployment
dependencies are not published. `wrangler.config.ts` selects that asset directory.
