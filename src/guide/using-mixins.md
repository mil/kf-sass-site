---
title: Using Mixins
section: Guide
subsection: '**Using Mixins**'

prev:
  link: /guide/animation-maps
  name: Animation Maps
next:
  link: /guide/easing-animations
  name: Easing Animations
---

Keyfram's [selection of mixins](/mixins) can be used in two ways. The first way is as a [top-level include](#using_a_mixin_normally) statement.  And the second way is [as the input for another mixin](#using_mixin_composability)'s animation map.

#### Using a mixin normally:
The first way you can use a Keyfram mixin is with a traditional `@include` statement. Read the documentation for each [mixin](/mixins) to find out the parameters for each.

Say for example, if you want to play an animation map in reverse you could use the [kf-reverse](/mixins/kf-reverse) mixin as:

<%= render_animation("guide-using-mixins-0") %>


#### Using mixin composability (e.g. mixins as functions):
The second way you can use a Keyfram mixin is as a *function*. When a Keyfram mixin is used as a function, its result is a [animation map](/guide/animation-maps) which is compatible as the input animation map for any other Keyfram mixin.

For example say you wanted to play the animation in the previous example first normally, and then in reverse at half speed, you could write simply:

<%= render_animation("guide-using-mixins-1") %>
