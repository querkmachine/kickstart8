---
status: draft
---

{% from './fractalMacros.njk' import fractalColoursSingle %}

## Brand colours

{{ fractalColoursSingle(tokens.colors | theoTokenCategory('palette-brand')) }}

## Neutrals

{{ fractalColoursSingle(tokens.colors | theoTokenCategory('palette-neutral')) }}
