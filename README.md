# ekschedl-dev

This template should help get you started developing with Vue in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Pixel pflegen

- **Texte, Beispielfragen und vorbereitete Antworten:** In `src/locales/de.ts`, `en.ts` und `ru.ts` ändern. Bei FAQ-Einträgen dieselbe ID in allen drei Sprachen verwenden.
- **Fragen werden falsch erkannt:** In `src/pixel/questionMatching.ts` die Schlagwörter oder Fragevarianten ergänzen. Dort wird auch die Fragesprache erkannt.
- **Wissen für KI-Antworten:** `src/pixel/sources.ts` liest die veröffentlichten Texte, FAQ und Projektdaten. Bestehende Inhalte am Ursprung pflegen. `src/pixel/facts.ts` enthält gemeinsame Zeitangaben, Arbeitsstunden und Technologien.
- **Dialog und Aussehen:** `src/pixel/Assistant.vue` enthält die Oberfläche und steuert die Unterhaltung. `src/pixel/usePixelContact.ts` verwaltet den Formularzustand, Turnstile und den Versand.
- **Server:** `functions/api/pixel-chat.js` ruft bei aktivem KI-Modus Workers AI auf. `functions/api/pixel-contact.js` prüft das Kontaktformular und verschickt die Nachricht.
