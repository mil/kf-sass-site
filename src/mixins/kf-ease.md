---
title: kf-ease
section: Mixins
subsection: '**kf-ease** ($easing, $animation-map)'

prev:
  link: /mixins/kf-chain
  name: kf-chain

next:
  link: /mixins/kf-lag
  name: kf-lag
---

Applies the specified easing to the given [animation map](/guide/animation-maps). This easing may be any standard CSS [animation-timing-function](https://www.w3.org/TR/css-easing-1/). For example `linear`, `ease-in-out` or `cubic-bezier(0,1,1,0)` are all valid easing values. 

<%= render_animation("api-kf-ease") %>
