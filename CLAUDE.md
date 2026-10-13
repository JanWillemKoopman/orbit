# CLAUDE.md

## Schrijfstijl voor content

Bij het schrijven van **blogartikelen**, **kennisbankartikelen** of **product updates** volg je altijd de schrijfstijl in [`schrijfstijl_blog_kennisbank_product_updates.md`](./schrijfstijl_blog_kennisbank_product_updates.md). Lees dat bestand vóór je begint met schrijven.

Als gevraagd wordt om een artikel te schrijven in ‘de schrijfstijl’, wordt precies deze schrijfstijl bedoeld.

## Vormgeving: altijd volgens het design van linear.app

De website volgt volledig de designprincipes van [linear.app](https://linear.app). Bij **elke** vormgevingstaak (nieuwe pagina, component, sectie, aanpassing van styling, animatie, illustratie) vraag je je eerst af: *hoe zou Linear dit doen?* Kijk zo nodig op linear.app zelf hoe een vergelijkbaar element daar is opgebouwd, en volg dat. Verzin geen eigen stijl, introduceer geen nieuwe kleuren, fonts, radii, schaduwen of easings buiten de tokens hieronder, en voeg geen UI-library of CSS-framework toe.

De tokens staan in `app/globals.css` (`:root`). Gebruik altijd die variabelen in plaats van losse waarden; ontbreekt er een token, voeg het daar toe met de Linear-waarde.

### Principes

- **Donker, rustig en precies.** Bijna-zwarte achtergrond, gelaagde vlakken die net iets lichter zijn, weinig kleur. Kleur alleen voor accent en status.
- **Hiërarchie via tekstkleur, niet via gewicht of grootte alleen.** Vier niveaus: primary, secondary, tertiary, quaternary.
- **Dunne, subtiele randen** (1px, vaak translucent wit) in plaats van zware schaduwen. Diepte komt van lagen, randen en inset-highlights.
- **Strakke typografie:** Inter Variable met negatieve letter-spacing op koppen, gewichten 510 en 590 (niet 500/600/700).
- **Snelle, ingetogen motion:** korte transities, ease-out-curves, nooit stuiterend of speels.
- **Veel witruimte, smalle content, uitgelijnd op een grid.** Geen drukke achtergronden, gradients alleen heel subtiel.

### Kleuren

| Rol | Token | Waarde |
|---|---|---|
| Achtergrond pagina | `--bg-primary` | `#08090a` |
| Vlak niveau 1 / 2 / 3 | `--bg-level-1/2/3` | `#0f1011` / `#141516` / `#191a1b` |
| Translucent vlak / hover | `--bg-translucent` / `--bg-hover` | `rgba(255,255,255,.05)` / `rgba(255,255,255,.08)` |
| Tekst primary | `--text-primary` | `#f7f8f8` |
| Tekst secondary | `--text-secondary` | `#d0d6e0` |
| Tekst tertiary | `--text-tertiary` | `#8a8f98` |
| Tekst quaternary | `--text-quaternary` | `#62666d` |
| Rand standaard | `--border-primary` | `#23252a` |
| Rand translucent | `--border-translucent` | `rgba(255,255,255,.08)` |
| Rand sterk | `--border-strong` | `#34343a` |
| Accent (ORBIT) | `--accent` | `#bcff2f` |
| Fout / rood | `--red` | `#eb5757` |
| Invert-knop | `--button-invert-bg(-hover)` | `#e5e5e6` / `#ffffff` |

Het accent is de enige bewuste afwijking van Linear (Linear gebruikt indigo `#7170ff`): ORBIT gebruikt lime `#bcff2f`, op dezelfde spaarzame manier als Linear zijn accent inzet (focus, selectie, kleine highlights, nooit grote vlakken). Statuskleuren, als ze nodig zijn, nemen we van Linear over: groen `#27a644`, blauw `#4ea7fc`, oranje `#fc7840`, geel `#f0bf00`, teal `#00b8cc`.

### Typografie

- Fonts: `--font-sans` (Inter Variable) en `--font-mono` (JetBrains Mono Variable, in plaats van Linear's Berkeley Mono).
- Altijd `font-feature-settings: 'cv01', 'ss03'` (`--font-settings`), `font-optical-sizing: auto` en antialiased rendering, zoals op `body`.
- Gewichten: `--weight-normal` 400, `--weight-medium` 510, `--weight-semibold` 590 (Linear bold is 680, alleen bij uitzondering).
- Koppen: letter-spacing `-0.022em` vanaf ±32px, `-0.012em` voor kleinere titels. Line-height krap: 1–1.1 voor grote koppen, 1.33 voor kleine titels.
- Lopende tekst: 15px/1.6 met `-0.011em`; klein 13–14px met `-0.01em` tot `-0.013em`; micro 12px. Mono-labels (datums, tags) in 12px uppercase met `0.02em`.
- Linear's titelschaal ter referentie: 17, 20, 24, 32, 40, 48, 56, 64, 72px.

### Randen, radius en schaduw

- Radius-schaal van Linear: 4, 6, 8, 12, 16, 24, 32px, plus `--radius-pill` (9999px) voor knoppen en tabs. Kaarten en afbeeldingen 5–6px, menu's en popovers 8–14px.
- Randen 1px, bij voorkeur translucent (`--border-translucent`) of als `inset 0 0 0 1px rgba(255,255,255,.05)`. Op afbeeldingen een rand via `::after` met `pointer-events: none`.
- Schaduwen zijn zacht en donker, nooit gekleurd. Linear-referentie (donker thema): low `0 2px 4px rgba(0,0,0,.1)`, medium `0 4px 24px rgba(0,0,0,.2)`, high `0 7px 32px rgba(0,0,0,.35)`. Voor zwevende elementen combineer je een inset-highlight (`inset 0 1px 0 rgba(255,255,255,.04)`) met een donkere outline (`0 0 0 1px rgba(0,0,0,.6)`).
- Header en overlays: translucent achtergrond met `backdrop-filter: blur(20px)` en een 1px rand `rgba(255,255,255,.08)`.

### Motion

- Duur: `--speed-quick` 0.1s voor hover en kleur, `--speed-regular` 0.25s voor grotere overgangen; uitzonderlijk tot 0.6s voor beeldzoom.
- Easing: `--ease-out-quad` als standaard, `--ease-out-expo` voor beweging van beeld en panelen. Geen `linear`, geen bounce of spring.
- Binnenkomen: kleine verschuiving plus fade (`translateY(-4px) scale(.99)` → `none`). Indrukken: `scale(.97)` op `:active`.
- Animeer alleen `opacity`, `transform`, `color` en `background`. Altijd een `@media (prefers-reduced-motion: reduce)`-variant.

### Layout en componenten

- Content-breedte via `.container` (`--page-max-width`, `--page-padding` 36px, mobiel 24px). Header 72px (mobiel 64px).
- Knoppen: pill-vormig, 32/40/44px hoog, gewicht 510; primaire knop is de invert-knop (licht op donker).
- Focus: `:focus-visible` met 2px outline in het accent en 2px offset.
- Hergebruik bestaande klassen in `app/globals.css` en `app/article.css` voordat je nieuwe schrijft.
- Alles moet werken van 320px breed tot desktop, zonder horizontale scroll.

## Productkennis over ORBIT ENGINE

Deze repo bevat alleen de website van ORBIT ENGINE, alles vóór het inloggen. De app zelf staat in de repo `janwillemkoopman/orbit-engine`. Noemt een artikel of een pagina ORBIT ENGINE of een van zijn functies, haal die repo dan bij de sessie als hij er nog niet is, en gebruik:

- `docs/ORBIT_ENGINE_PROCESDOCUMENTATIE.md` voor de werking en de functies;
- `docs/ORBIT_ENGINE_WAAROM.md` voor de USP's;
- de code zelf; die is leidend als documentatie en code elkaar tegenspreken.

Plan- en analysedocumenten (`docs/PLAN_*.md`, `docs/ANALYSE_*.md`) beschrijven voornemens en tellen niet als bron. De bestaande artikelen en `content/changelog.ts` in deze repo zijn dummydata en ook geen bron.
