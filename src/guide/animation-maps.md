---
title: Animation Maps
section: Guide
subsection: '**Animation Maps**'
prev:
  link: /guide/install
  name: Install
next:
  link: /guide/using-mixins
  name: Using Mixins
---

Keyfram's [mixins](/mixins) all accept a common map format referred to as the *animation map*. The idea behind the animation map format is that you can represent any animation as a nested SCSS map specifying *timings*, *elements*, and *properties* as keys of the map. Two styles of maps are valid with all mixins:

#### 1. Implicit Selector Format
If you are only interested in animating a **single selector** (or element), just specify a 2-level SCSS map with just *properties* and then *timings* as map keys. When unspecified, the selector to animate is implied to be the selector from where the mixin is called from:

<%= render_animation("guide-map-formats-2") %>

#### 2. Multiple Selectors Format
Often animations don't just involve a single element but rather need to be synchronized over **multiple selectors**. For this case, specify a 3-level map with *selectors*, *properties*, and *timings* as map keys:

<%= render_animation("guide-map-formats-0") %>
