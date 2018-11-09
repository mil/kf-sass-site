# Kf Site
Static site generator scripts to create the [kf-sass.com](http://kf-sass.com) site. Note this site generator is a bit pieced / hacked together - would eventually like to rebuild this. Was more focused on getting Kf's quality into good shape.

## Setup
Install dependencies with:
`npm install`

Building lots of Kf animations is alot faster through Dart Sass, as such, you'll probably also want to:
`pub install`

## Development
Regenerate the entire site to the dist folder:
`make build_all`

Continually watch source files and rebuilt site on any changes (requires `inotifywatch` and `xargs`):
`make build_monitor`