---
title: kf-loop
section: Mixins
subsection: '**kf-loop** (*[$number-of-times]*, $animation-map)'

prev:
  link: /mixins/kf-lead
  name: kf-lead

next:
  link: /mixins/kf-mirror
  name: kf-mirror
---

Loops the given [animation map](/guide/animation-maps/) for the provided number of times.

If only a single parameter is passed, e.g. as `kf-loop($animation-map)` - then the animation will be looped indefinetly. If provided two parameters, e.g. as `kf-loop(5, $animation-map)` - the animation will be looped only for the given number of times.

<%= render_animation("api-kf-loop") %>
