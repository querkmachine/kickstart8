---
status: draft
---

{% from './fractalMacros.njk' import fractalColoursSingle %}

## Brand colours

{% set brandColors = {
  "$primary": "#ff0000",
  "$secondary": "rgba(0, 255, 0, .25)"
} %}

{{ fractalColoursSingle(brandColors) }}

## Neutrals

{% set neutralColors = {
  "$grey": "#777777"
} %}

{{ fractalColoursSingle(neutralColors) }}
