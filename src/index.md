---
section: ''
---

<h1 class='h1-home'><strong>Keyfram</strong> is a modular SCSS animation library which makes composing CSS keyframe-based animations simple.</h1>

Keyfram lets you define animations in a simple <a href="/guide/animation-maps/">SCSS map format</a> and then modify and compose your animations together using a collection of self-explanatory <a href="/mixins">mixins</a>. Keyfram takes care of the laborious work of translating your animation into CSS keyframes, freeing you up to focus on your animation itself.

You can use Keyfram for creating anything from simple button hovers to intricately timed and sequenced animations spanning over multiple elements (once only thought feasible by using javascript). Install via <a href="http://npmjs.com/package/kf-sass">NPM</a> or get the <a target="_blank" href="https://raw.githubusercontent.com/mil/kf-sass/master/dist/kf-1.0.0.scss">single-file import</a> to get started.

<%= render_animation("home-slide-cross-blink") %>
