---
status: draft
---

{% from './fractalMacros.njk' import fractalTyperun %}

{% set longText %}Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing (leading), and letter-spacing (tracking), and adjusting the space between pairs of letters (kerning).{% endset %}

{% set shortText %}The art and technique of typography.{% endset %}

## Font stacks

{{ fractalTyperun('font-family', tokens['font-family'], shortText) }}

## Font sizes

{{ fractalTyperun('font-size', tokens['font-size'], shortText) }}

## Leading

{{ fractalTyperun('line-height', tokens['font-leading'], longText) }}

## Tracking

{{ fractalTyperun('letter-spacing', tokens['font-tracking'], longText) }}

## Measure

{{ fractalTyperun('max-width', tokens['font-measures'], longText) }}
