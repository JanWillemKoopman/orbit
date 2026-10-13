---
title: "Wat is RAG?"
description: "Retrieval-augmented generation: eerst relevante informatie ophalen, dan een antwoord genereren."
date: 2026-10-13
author: Redactie Orbit
category: kennisbank
order: 42
featured: false
---

RAG staat voor retrieval-augmented generation: een techniek waarbij een systeem eerst relevante informatie ophaalt uit een externe bron en die daarna aan een taalmodel meegeeft om een antwoord te schrijven. Lewis en anderen introduceerden de term in 2020.

Een RAG-systeem werkt meestal in vier stappen:

1. Documenten worden opgeknipt in passages en doorzoekbaar gemaakt, vaak als embeddings: getallenreeksen die de betekenis weergeven.
2. Bij een vraag zoekt het systeem de passages die er het best bij passen.
3. Die passages gaan samen met de vraag naar het taalmodel.
4. Het model formuleert een antwoord, vaak met verwijzingen naar de passages.

Zo kan een model actuele of interne kennis gebruiken zonder opnieuw te worden getraind. Dat is ook het verschil met training: RAG haalt informatie op tijdens het beantwoorden, training legt kennis vast in het model zelf.

De kwaliteit hangt sterk af van de zoekstap. Haalt het systeem de verkeerde passages op, dan wordt het antwoord ook slechter.
