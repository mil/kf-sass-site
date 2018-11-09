---
title: Easing Animations
section: Guide
subsection: '**Easing Animations**'

prev:
  link: /guide/using-mixins
  name: Using Mixins

next:
  link: /guide/pipeline-functions
  name: Pipeline Functions
---

Kf supports easing animations using [standard CSS easing functions](https://www.w3.org/TR/css-easing-1/) such as `ease-in` and additionally cubic bezier definitions such as `cubic-bezier(0,1,1,0)`. By default if easing is unset, Kf will use linear easing for all animations.

You can ease animations both on a  [per-animation](#per-animation_easing) or [per-transition](#per-transition_easing) level. Notice below, in the first example using [kf-ease](/mixins/kf-ease), ease-in-out is applied to the sliding box transition in both directions, however in the second example since per-transition easing is used, the ease-in-out easing in only applied to the sliding box on the first transition.

#### Per-Animation Easing
Per-animations easing can be set using the [kf-ease](/mixins/kf-ease/) mixin. This mixin takes an existing animation map and applies the specified easing to all transitions in the animation:

<%= render_animation("api-kf-ease") %>

#### Per-Transition Easing
For more granular control over individual transitions easing, instead of specifying just values in a [animation map]() you can specify a list of 2 elements, target value and then easing,  to transition to:

<%= render_animation("guide-easing-0") %>
