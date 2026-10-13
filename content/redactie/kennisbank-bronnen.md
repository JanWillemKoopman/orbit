# Kennisbank: bronnen per artikel

Intern redactiebestand. Dit bestand wordt niet gepubliceerd: de site leest alleen `content/posts`.
Controledatum voor alle bronnen: **13 oktober 2026**, tenzij anders vermeld.

Per bewering staat erbij wat het is:

- **[doc]**: gedocumenteerde werking, uit officiële documentatie of een oorspronkelijke publicatie.
- **[vak]**: gangbare vakterminologie zonder één officiële definitie.
- **[aanname]**: een redelijke maar niet bewezen interpretatie of tactiek. In de tekst staat die ook zo verwoord.

## Gedeelde bronnen

Deze bronnen gelden voor meerdere artikelen en worden hieronder met een letter aangehaald.

- **G1** Google Search Central, *AI features and your website*: https://developers.google.com/search/docs/appearance/ai-features
- **G2** Google Search Central, *Optimizing for generative AI search* (bijgewerkt 10-07-2026): https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- **G3** Google Search Console Help, *Generative AI performance report*: https://support.google.com/webmasters/answer/16984139
- **G4** Search Engine Journal, uitrol van de AI-rapporten en de opt-out in Search Console (secundair): https://www.searchenginejournal.com/google-search-console-ai-reports-rolled-out-worldwide/587836/
- **G5** Google Search Central, *Creating helpful, reliable, people-first content*: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- **G6** Google Search Central, *Spam policies* (scaled content abuse): https://developers.google.com/search/docs/essentials/spam-policies
- **G7** Google Search Central, *How Search works*: https://developers.google.com/search/docs/fundamentals/how-search-works
- **G8** Google Search Central, *SEO Starter Guide*: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- **P1** Aggarwal e.a., *GEO: Generative Engine Optimization* (KDD 2024): https://arxiv.org/abs/2311.09735
- **P2** Lewis e.a., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* (2020): https://arxiv.org/abs/2005.11401

## Per artikel

### 1. Wat is GEO?
- P1: definitie GEO, tot 40% meer zichtbaarheid in de testopstelling, effect verschilt per domein [doc]
- G2: Google noemt optimaliseren voor generatieve AI in Search ‘still SEO’, AEO/GEO als labels [doc]
- Afbakening GEO/AEO/LLMO [vak]

### 2. Hoe meet je AI-zichtbaarheid?
- G3: rapport generatieve AI-prestaties, vertoningen in AI Overviews en AI Mode [doc]
- Meetmethode met vaste vragenset en herhaling [vak]; variatie tussen antwoorden [vak, algemeen waargenomen]

### 3. Hoe kiest AI zijn bronnen?
- G1, G2: AI Overviews en AI Mode steunen op de kernranking- en kwaliteitssystemen, query fan-out, eligibility (geïndexeerd en snippet-geschikt) [doc]
- OpenAI, *Overview of OpenAI Crawlers*: https://developers.openai.com/api/docs/bots [doc]
- Weging van bronnen bij andere aanbieders is niet gepubliceerd [doc: afwezigheid van documentatie]

### 4. Hoe herkent AI een merk?
- G2: ‘Seeking inauthentic mentions … isn’t as helpful as it might seem’ [doc] (niet in de tekst opgenomen; achtergrond)
- Training versus ophalen tijdens het antwoorden: P2 en Anthropic, ClaudeBot/Claude-User: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler [doc]
- Herkenning via co-occurrence en consistente omschrijving [aanname, als werkingsprincipe van taalmodellen]

### 5. Hoe maak je content begrijpelijk voor AI?
- G1: belangrijke inhoud in tekst, structured data in lijn met zichtbare tekst [doc]
- G2: geen chunking nodig, geen speciale AI-bestanden [doc]
- Effect van opmaak bij andere AI-diensten: niet gedocumenteerd [aanname vermeden]

### 6. Wat is een AI-citatie?
- G1: AI-functies tonen links naar ondersteunende pagina’s [doc]
- Onderscheid vermelding/citatie [vak]

### 7. Wat is share of voice in AI?
- Begrip en rekenwijze [vak]; geen standaarddefinitie [vak]

### 8. Wat zijn Google AI Overviews?
- Google, *Generative AI in Search* (14-05-2024, start VS): https://blog.google/products/search/generative-ai-google-search-may-2024/ [doc]
- Google Nederland, *AI-overzichten in het Nederlands*: https://blog.google/intl/nl-nl/product/zoeken-kijken/googlen-is-nu-nog-eenvoudiger-met-ai-overzichten-in-het-nederlands/ [doc]. De pagina zelf toont geen datum; mei 2025 is bevestigd via iPhoned (19-05-2025): https://www.iphoned.nl/tips/google-ai-uitschakelen/ en via het AI Mode-bericht van oktober 2025, dat AI-overzichten al als bestaand noemt.
- G1: geen extra eisen; nosnippet, data-nosnippet, max-snippet [doc]
- G2, G4: opt-out ‘Search generative AI control’ in Search Console [doc + secundair]
- G3: rapport generatieve AI-prestaties [doc]

### 9. Wat is Google AI Mode?
- Google Nederland, *De AI-modus komt naar Google Zoeken in Nederland* (08-10-2025): https://blog.google/intl/nl-nl/product/zoeken-kijken/de-ai-modus-komt-naar-google-zoeken-in-nederland/ [doc]
- G1: query fan-out, ‘wider and more diverse set of helpful links’ [doc]
- G3 [doc]

### 10. Hoe werkt een AI-zoekmachine?
- G2: retrieval uit de zoekindex en grounding, query fan-out [doc]
- P2: retrieval plus generatie [doc]
- Stappenmodel als vereenvoudiging [vak]

### 11. Wat is AEO?
- Herkomst en gebruik van de term [vak]; geen primaire bron voor de oorsprong gevonden
- G2: AEO/GEO zijn voor Google SEO [doc]

### 12. Wat is LLMO?
- Begrip [vak]; geen officiële definitie
- Training versus ophalen: OpenAI-bots (GPTBot vs OAI-SearchBot), Anthropic (ClaudeBot vs Claude-SearchBot) [doc]

### 13. Wat is SEO?
- G8: definitie, ‘no secrets’, wijzigingen kosten tijd [doc]
- G2: AI-functies geworteld in de kernrankingssystemen [doc]
- Driedeling techniek/content/autoriteit [vak]

### 14. Wat betekent Agentic AI?
- Anthropic, *Building effective agents* (19-12-2024): https://www.anthropic.com/engineering/building-effective-agents [doc]
- G2: browseragents lezen screenshots, DOM en accessibility tree [doc]
- Geen eenduidige definitie [vak]

### 15. Wat is programmatic SEO?
- G6: scaled content abuse [doc]
- Begrip en toepassingen [vak]

### 16. Hoe maak je goede AI-content?
- G5: Who/How/Why, transparantie over automatisering, AI om rankings te manipuleren is spam [doc]
- G6 [doc]
- G2: first-hand, non-commodity content [doc]

### 17. Wat is een contentstrategie?
- Begrip [vak]; voorbeeld is fictief

### 18. Wat is zoekintentie?
- Vierdeling informatief/navigationeel/commercieel/transactioneel [vak]; geen officiële Google-classificatie

### 19. Hoe vind je relevante zoekwoorden?
- Werkwijze [vak]; Search Console-prestatiedata: https://support.google.com/webmasters/answer/7576553 [doc]

### 20. Wat is een topiccluster?
- Begrip [vak]; geen eis of rankingfactor van Google

### 21. Wat is een pillar page?
- Begrip [vak]

### 22. Wat is topical authority?
- Google, *Understanding news topic authority* (23-05-2023): https://developers.google.com/search/blog/2023/05/understanding-news-topic-authority [doc]
- Begrip buiten nieuws [vak]; voorbeeld van de tuinsite is als vermoeden verwoord [aanname]

### 23. Wat is het verschil tussen topical authority en domeinautoriteit?
- Moz Domain Authority (schaal 1–100, linkgebaseerd); moz.com kon niet direct worden opgehaald, bevestigd via Search Engine Journal: https://www.searchenginejournal.com/ranking-factors/domain-authority-ranking-factor/ [secundair]
- Google gebruikt externe DA-scores niet (uitspraken John Mueller, via SEJ) [secundair]
- Nieuws-topic authority: zie artikel 22 [doc]

### 24. Wat betekent E-E-A-T?
- G5: geen specifieke rankingfactor, trust het belangrijkst, raters beïnvloeden ranking niet direct, YMYL zwaarder [doc]
- Google, *E-A-T gets an extra E for Experience* (december 2022): https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t [doc]

### 25. Wat is information gain?
- Patent US 11.354.342, *Contextual estimation of link information gain* (Google): https://patents.justia.com/patent/11354342 (directe fetch gaf 403; inhoud bevestigd via zoekresultaat en GoFish Digital: https://gofishdigital.com/blog/information-gain-scores/) [doc + secundair]
- G5/G2: originele informatie en eigen analyse aanbevolen [doc]
- Toepassing in ranking niet bewezen [aanname, zo verwoord]

### 26. Wat is een content gap?
- Begrip en werkwijze [vak]

### 27. Wat is zoekwoordkannibalisatie?
- Begrip en oplossingen [vak]

### 28. Wat meet Google Search Console?
- Prestatierapport (klikken, vertoningen, CTR, positie, dimensies): https://support.google.com/webmasters/answer/7576553 [doc]
- G3: generatieve AI-rapport, alleen vertoningen, dimensies pagina/land/apparaat/datum [doc]
- G4: uitrol 2026, wereldwijd vanaf 31-08-2026 [secundair]

### 29. Wat is een zero-click zoekopdracht?
- SparkToro/Datos 2024 (58,5% VS, 59,7% EU), via Search Engine Land: https://searchengineland.com/google-search-zero-click-study-2024-443869 [secundair over primair onderzoek]
- Definities lopen uiteen [doc/vak]

### 30. Wat is een SERP?
- Begrip [vak]; G7: resultaten verschillen per locatie, taal en apparaat [doc]

### 31. Wat is technische SEO?
- G7: crawlen, renderen, indexeren [doc]
- Dat niet elke crawler JavaScript uitvoert zoals Googlebot [vak, breed waargenomen; niet per aanbieder gedocumenteerd]

### 32. Wat is structured data?
- Google, *Introduction to structured data*: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data [doc]
- Google, *General structured data guidelines*: https://developers.google.com/search/docs/appearance/structured-data/sd-policies [doc]
- G1/G2: niet nodig voor AI-functies, geen speciale markup [doc]

### 33. Wat is een AI-crawler?
- OpenAI: https://developers.openai.com/api/docs/bots [doc]
- Anthropic: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler [doc]
- Perplexity: https://docs.perplexity.ai/guides/bots [doc]
- Google-Extended: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers [doc]

### 34. Wat is llms.txt?
- https://llmstxt.org/ (voorstel Jeremy Howard, 03-09-2024) [doc]
- G2: Google Search negeert zulke bestanden, helpt noch schaadt [doc]
- Search Engine Journal over Lighthouse 13.3 en Googles standpunt (20-05-2026): https://www.searchenginejournal.com/googles-llms-txt-guidance-depends-on-which-product-you-ask [secundair]; Lighthouse-documentatie: https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt
- Gebruik door andere AI-diensten: onbekend [doc: afwezigheid van documentatie]

### 35. Wat is query fan-out?
- G1, G2 en het Google Nederland-bericht over de AI-modus (zie artikel 9) [doc]
- Voorbeeld is fictief

### 36. Wat is semantisch zoeken?
- Google, *Understanding searches better than ever before* (25-10-2019, BERT): https://blog.google/products/search/search-language-understanding-bert/ [doc]
- Embeddings [vak]

### 37. Wat is conversational search?
- Begrip [vak]; G1 en artikel 9 over vervolgvragen in AI Mode [doc]

### 38. Wat is een LLM?
- Vaswani e.a., *Attention Is All You Need* (2017): https://arxiv.org/abs/1706.03762 [doc]
- Trainingsfasen [vak]

### 39. Wat is generatieve AI?
- Begrip [vak]; diffusiemodellen voor beeld [vak]

### 40. Wat is een AI-hallucinatie?
- Kalai e.a., *Why Language Models Hallucinate* (OpenAI, 04-09-2025): https://arxiv.org/abs/2509.04664 [doc]
- Grounding/RAG verkleinen de kans, sluiten niet uit [vak]

### 41. Wat betekent grounding bij AI?
- G2: grounding van AI Overviews/AI Mode in de zoekindex [doc]
- Google-Extended en grounding in Gemini-apps: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers [doc]

### 42. Wat is RAG?
- P2 [doc]

## Niet of beperkt geverifieerd

- Exacte startdatum van AI-overzichten in het Nederlands: de officiële Google-pagina toont geen datum; mei 2025 komt uit secundaire bronnen.
- moz.com, patents.justia.com en openai.com gaven bij ophalen een fout; daar is op secundaire bronnen of arXiv vertrouwd.
- De oorsprong van de term AEO is niet in een primaire bron teruggevonden.
