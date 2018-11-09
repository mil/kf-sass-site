---
title: kf-chain
section: Mixins
subsection: '**kf-chain** ($animation-map, ...)'

prev:
  link: /mixins/kf
  name: kf

next:
  link: /mixins/kf-ease
  name: kf-ease
---

Chains two or more animations to run sequentially. Once the first completes, the second starts, and so on and so forth. Any number of [animation maps](/guide/animation-maps) may be passed as arguments.

To place intermediate pauses between animations, use [kf-sleep](/mixins/kf-sleep).

<%= render_animation("api-kf-chain") %>
