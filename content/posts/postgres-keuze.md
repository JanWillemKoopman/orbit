---
title: "Waarom we voor Postgres kozen"
description: "Iedereen verwachtte een gespecialiseerde database. We kozen voor saai, en daar hebben we geen spijt van."
date: 2026-09-04
author: Daan Smit
category: van-het-team
cover: "art:bars:5"
featured: true
---

Toen we Orbit bouwden, lag een gespecialiseerde vectordatabase voor de hand. We kozen toch voor Postgres met een paar extensies.

## Eén systeem om te begrijpen

Alle data op één plek betekent één back-upstrategie, één manier van monitoren en één plek om te zoeken als er iets misgaat.

```sql
select brand, count(*) filter (where mentioned) * 1.0 / count(*) as kans
from answers
where prompt_id = $1 and created_at > now() - interval '7 days'
group by brand
order by kans desc;
```

Natuurlijk zijn er grenzen. Maar we lopen er nog lang niet tegenaan, en ondertussen is ons systeem eenvoudig gebleven.
