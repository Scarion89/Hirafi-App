# Hirafi — promo videos (Remotion)

A [Remotion](https://www.remotion.dev/) project for producing branded promo
videos for the Hirafi app. Compositions use the same dark-amber design tokens
as the app (`../constants/theme.js`), mirrored in `src/Hirafi/theme.ts`.

## Compositions

| ID            | Size      | Duration | Description                                                   |
| ------------- | --------- | -------- | ------------------------------------------------------------- |
| `HirafiIntro` | 1080×1920 | 6s @30fps| Portrait brand intro — wordmark, tagline, service categories, CTA. Suited for App Store previews, Reels / Stories / TikTok. |

Text and colors are parametrized (see `defaultProps` in `src/Root.tsx`), so you
can override them per render without touching code:
[parametrized rendering](https://www.remotion.dev/docs/parametrized-rendering).

## Commands

```console
npm i            # install dependencies
npm run dev      # open Remotion Studio to preview / edit live
npm run lint     # eslint + tsc

# Render the intro to an MP4
npx remotion render HirafiIntro out/hirafi-intro.mp4

# Render a single still frame (e.g. a thumbnail)
npx remotion still HirafiIntro out/thumbnail.png --frame=95
```

`out/` is gitignored — rendered videos and stills are not committed.

### Rendering in a sandbox / CI without Chrome download

Remotion downloads a headless Chrome on first render. When outbound network is
restricted, point it at a pre-installed Chromium **headless shell** instead
(the full Chrome binary won't launch in old-headless mode):

```console
npx remotion render HirafiIntro out/hirafi-intro.mp4 \
  --browser-executable=/path/to/chrome-headless-shell
```

## Project structure

```
src/
  index.ts             # registers the root
  Root.tsx             # <Composition> registrations
  Hirafi/
    theme.ts           # brand tokens + service categories (mirrors the app)
    HirafiIntro.tsx    # the intro composition
    Wordmark.tsx       # animated logo badge + "Hirafi" wordmark
    CategoryChips.tsx  # staggered service-category chips
```

## Docs

- [Remotion fundamentals](https://www.remotion.dev/docs/the-fundamentals)
- [CLI reference](https://www.remotion.dev/docs/cli)

## License

Remotion may require a company license for some entities.
[Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
