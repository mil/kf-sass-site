---
title: Install
section: Guide
subsection: '**Install**'

version: 1.0.0
playground_link: http://kf-sass.com/editor/#eyJtYXJrdXAiOiI8ZGl2IGNsYXNzPSdzbGlkZS1jcm9zcy1ibGluayc+XG4gIDxkaXYgY2xhc3M9J2EnPjwvZGl2PlxuICA8ZGl2IGNsYXNzPSdiJz48L2Rpdj5cbjwvZGl2PlxuIiwic3R5bGluZyI6Ii5zbGlkZS1jcm9zcy1ibGluayB7XG4gICRzaXplOiAyMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDUwMHB4O1xuICBoZWlnaHQ6ICRzaXplICogMjtcbiAgZGl2IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6ICRzaXplO1xuICAgIGhlaWdodDogJHNpemU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIH1cbn1cbiIsImFuaW1hdGlvbiI6IkBpbXBvcnQgXCJrZi5zY3NzXCI7XG5cbi5zbGlkZS1jcm9zcy1ibGluayB7XG4gICRzbGlkZS10by1jZW50ZXI6IChcbiAgICAnLmEnOiAobWFyZ2luLWxlZnQ6ICgwbXM6IDAlLCAgIDEyNTBtczogNTAlKSksXG4gICAgJy5iJzogKG1hcmdpbi1sZWZ0OiAoMG1zOiAxMDAlLCAxMjUwbXM6IDUwJSkpLFxuICApO1xuICAkYmxpbmstZGl2OiAoXG4gICAgJy5iJzogKFxuICAgICAgYmFja2dyb3VuZDogKDBtczogd2hpdGUsIDEwMG1zOiBibGFjaywgMjAwbXM6IHdoaXRlKVxuICAgIClcbiAgKTtcbiAgQGluY2x1ZGUga2YtY2hhaW4oXG4gICAgJHNsaWRlLXRvLWNlbnRlcixcbiAgICBrZi1sb29wKDQsICRibGluay1kaXYpLFxuICAgIGtmLXJldmVyc2UoJHNsaWRlLXRvLWNlbnRlcilcbiAgKTtcbn1cbiJ9

next:
  link: /guide/animation-maps
  name: Animation Maps
---

You can either download the <a href="https://raw.githubusercontent.com/mil/kf-sass/master/dist/kf-<%= version %>.scss">single file import</a> via the latest Github relase or alternativly fetch Kf through its [NPM package](http://npmjs.com/package/kf-sass):
```bash
npm install --save kf-sass
```

Next simply import `kf.scss` as an import in your main SCSS/Sass file:

```scss
@import 'relative/path-to/kf.scss';
```

#### Alternative: Live playground
If you just want to play around before installing - you can use the <a href="<%= playground_link %>">live playground</a> instead which preloads Kf in a live [Sass.js](https://github.com/medialize/sass.js/) environment.
