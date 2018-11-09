---
title: kf-debug
section: Mixins
subsection: '**kf-debug** ($animation-map)'

prev:
  link: /mixins/kf-stretch
  name: kf-stretch

---
Provides a visual debugger showing each selector's property transition state at which timings they appear. Helpful in debuging whether animations are actually taking place. Utilizes the `&:before` psuedo-selector of the selector the mixin is called from. The `kf-debug` mixin should only be used at the top-level of the animation.

<%= render_animation("api-kf-debug") %>
