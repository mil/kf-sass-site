---
Title: Pipeline Functions
section: Guide
subsection: '**Pipeline Functions**'

prev:
  link: /guide/easing-animations
  name: Easing Animations
next:
  link: /guide/example-animations
  name: Example Animations
---

Using a pipeline function lets you apply a processing function to *all* animations (on a global basis).  For example, consider if you find yourself repeating `kf-loop` on all your animations because you want every animation on your site to loop indefinitely.

There are two ways of doing this. You could either specify `kf-loop` around each animation, individually, or alternatively you could set the `kf-pipeline` to be `kf-loop` to apply this processing globally. As such the below two blocks are equivalent:

```scss
// Without a pipeline-function
@include kf-loop(kf-reverse($animation-map-a));
@include kf-loop(kf-stretch(0.5, $animation-map-b));
@include kf-loop($animation-map-c);

// With a pipeline function
@include kf-pipeline(kf-loop);
@include kf-reverse($animation-map-a);
@include kf-stretch(0.5, $animation-map-a);
@include kf($animation-map-b);
```

#### Custom Pipeline Functions

While any Keyfram mixin can be used as a pipeline function, you can also use custom Sass functions with kf-pipeline as well. For example to play all animations at half speed and then subsequently full speed:

```scss
@function half-and-then-full-speed($kf-map) {
  @return kf-chain(
    kf-stretch($kf-map, 0.5),
    $kf-map
  );
}

@include kf-pipeline(half-and-then-full-speed);
```
