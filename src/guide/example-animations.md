---
title: Example Animations
section: Guide
subsection: '**Example Animations**'

prev:
  link: /guide/pipeline-functions
  name: Pipeline Functions
---


As explained on the [using mixins](/guide/using-mixins/) guide page, Kf's mixins can be used can be used as **functions** and thus nested *within other mixins*. This feature of Kf let's you quickly compose complex animations that are difficult or impossible to accomplish using manual CSS keyframe specifications. This functionality is best illustrated by example so below are a few additional example animations making use of mixin composability.

#### **Basic slide cross blink**:
Two sliding boxes coordinated to first join together, blink, and then reverse using `kf-chain`, `kf-loop`, and `kf-reverse`.

<%= render_animation("home-slide-cross-blink") %>


#### **Staggering bricks**:
A more in-depth example showing how loops can be used to generate the inputs for `kf-chain` and `kf-parallel`. Also demonstrates `kf-mirror`, which runs the animation first in one direction and then in the opposite direction.

<%= render_animation("showcase-staggering-bricks") %>

#### **Playing with timestretches and easing**:
An example showing how `kf-ease` and `kf-stretch` can be used to manipulate the easing and timing respectively of pre-built animations.

<%= render_animation("guide-nesting-mixins-1") %>

#### **Rotating box**:
An example making use of the animating the `transform` property using `kf-chain`.

<%= render_animation("showcase-rotating-box") %>
