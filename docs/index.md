---
title: Welcome to Kickstart
status: draft
---

{% from './fractalMacros.njk' import fractalStatuses %}

[Kickstart](https://github.com/querkmachine/kickstart8) is a boilerplate for quickly creating design systems in [Fractal](http://fractal.build) using [Nunjucks](https://mozilla.github.io/nunjucks/) and [Theo](https://github.com/salesforce-ux/theo). You should write something here about your project and how this design system complements it.

Remember to keep the system updated, it loses value if it diverges from what it's meant to represent. 

## Component states

{{ fractalStatuses(_config.components.statuses) }}

## Documentation states

{{ fractalStatuses(_config.docs.statuses) }}