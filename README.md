# Keyfram.milesalan.com
Static site generator scripts to create the [keyfram.milesalan.com](http://keyfram.milesalan.com) site.

## Setup
Install dependencies with:
`npm install`

Building lots of keyfram animations is alot faster through Dart Sass, as such, you'll probably also want to:
`pub install`

## Development
Regenerate the entire site to the dist folder:
`make build_all`

Regenerate the entire site to the dist folder (use dart sass):
`USE_DART_SASS=true make build_all`

Continually watch source files and rebuilt site on any changes (requires `inotifywatch` and `xargs`):
`make build_monitor`