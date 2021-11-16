---
status: ready
---

{% from './fractalMacros.njk' import fractalTokens %}

{% set tokens = {
  "tokens": {
    "$gutter": "3rem",
    "$gutter-half": "1.5rem"
  },
  "Colors": {
    "$primary": "#ff0000"
  }
} %}

{{ fractalTokens(tokens) }}
