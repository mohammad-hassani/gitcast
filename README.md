# GitCast

GitCast is a podcast website with episodes stored as Markdown files and an automatically generated RSS feed.

## Run the website locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add a new episode

1. Record and edit the episode, then upload the audio to a public host. Copy its direct public audio URL; the episode wizard does not upload audio.
2. From the project folder, start the guided wizard:

   ```bash
   npm run podcast -- new
   ```

3. Answer the prompts for the episode title, English URL slug, short description, publication date, public audio URL, duration, optional cover image, and tags. Duration can be entered as `MM:SS`, `HH:MM:SS`, or seconds.
4. Review the summary and confirm to create the episode. The wizard assigns the next available episode number and creates `content/episodes/<number>/episode.md`.
5. Open the generated `episode.md` and replace the show-notes placeholder with the episode notes. Include useful links or chapter headings as needed.
6. Validate the episode and build the site:

   ```bash
   npm run podcast -- validate
   npm run build
   ```

7. Publish using the project's normal deployment process. Make sure the audio URL is publicly accessible so podcast apps can play it.

The wizard requires an interactive terminal and will not create files until you confirm. For the episode format and field requirements, see [docs/GitCast-EPISODE.md](docs/GitCast-EPISODE.md).

## Edit website text or add a language

Website interface copy and translations are centralized in [`content/i18n/translations.ts`](content/i18n/translations.ts). Edit the English (`en`) and Persian (`fa`) message values there to change the navigation, buttons, accessibility labels, player text, and page copy. Episode titles, descriptions, and show notes are episode content, so edit those in the relevant `content/episodes/<number>/episode.md` instead.

To add another interface language, add a new entry to `translations` in that same file. Copy every message key from the English messages, translate its value, and set the language's `nativeName`, short switcher label (`shortName`), `intlLocale` (for dates), and text `direction` (`ltr` or `rtl`). The language switcher cycles through the configured entries automatically. Set `defaultLocale` in the same file if you want the new language to be the first-time default.
