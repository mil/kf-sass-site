---
title: kf-stretch
section: Mixins
subsection: '**kf-stretch** ($stretch-duration, $animation-map)'

prev:
  link: /mixins/kf-stagger
  name: kf-stagger

next:
  link: /mixins/kf-debug
  name: kf-debug
---

Time stretches the given [animation map](/guide/animation-maps) by the given stretch-duration.

The provided `$stretch-duration` can be specified either as a new time value (e.g. `2s`) or as a multiplier (e.g. `2`). Both slowing down and speeding up animations works.

<%= render_animation("api-kf-stretch") %>
