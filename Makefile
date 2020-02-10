
ifeq ($(USE_DART_SASS),)
	USE_DART_SASS=false
endif
ifeq ($(USE_DART_SASS),true)
	SASS_COMPILE_COMMAND=./script/dart-scss-compile.dart src/_scss/all.scss /tmp/cssbuild.css
else
	SASS_COMPILE_COMMAND=node_modules/sass/sass.js src/_scss/all.scss > /tmp/cssbuild.css
endif

default: build_monitor

help: ## Show this help message
	@grep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build_all: cp js html scss ## Rebuild entire site to dist folder

build_monitor: ## Continutally watch input files and rebuild the entire to the dist folder
	$(MAKE) -j4 serve cp build_js build_scss build_html

build_js: js ## Continually watch JS files for changes and rebuild
	find src -name "*.js" | xargs inotifywait -re modify || true
	$(MAKE) build_js

build_scss: scss ## Continually watch SCSS files for changes and rebuild
	find src -name "*.scss" | xargs inotifywait -re modify || true
	$(MAKE) html build_scss

build_html: html ## Continually watch HTML files for changes and rebuild
	find src -name "*.md" -o -name "*.html" -o -name '*.yml' | xargs inotifywait -re modify || true
	$(MAKE) build_html

deps: ## Instal npm & pub deps
	npm install
	pub install

serve: ## Browser-sync
	sleep 1
	./node_modules/browser-sync/dist/bin.js  --port 4080 start --server dist/ -b null --files 'dist/*.css' --no-notify

make_dist_folder: ## Make the dist folder
	mkdir -p dist

clean: ## Remove the dist folder
	rm -rf dist
cp: make_dist_folder ## Copy static assets from src/assets to the dist folder
	cp -r src/assets dist

make_kf_dist_js: ## Make kf dist_js for Sass.js from src/_scss/vendor/kf*.scss single-file artifact
	echo 'var kf_dist_scss  = `' > src/_js/kf_dist.scss.js
	cat src/_scss/vendor/kf-*.scss >> src/_js/kf_dist.scss.js
	echo '`;' >> src/_js/kf_dist.scss.js

js: make_kf_dist_js make_dist_folder ## Rebuild JS
	cat src/_js/kf_dist.scss.js src/_js/split.js src/_js/codemirror.js src/_js/css.js src/_js/htmlmixed.js src/_js/zepto.js src/_js/app.js > dist/app.js
	cp src/_js/sass.worker.js src/_js/sass.js dist/
html: make_dist_folder ## Rebuild HTML
	./script/template.js
scss: make_dist_folder ## Rebuild SCSS
	@echo "Building SCSS; using dart sass? ($(USE_DART_SASS))"
	$(SASS_COMPILE_COMMAND) || true
	cp /tmp/cssbuild.css dist/all.css
	./node_modules/browser-sync/dist/bin.js  reload --port 4080
	@echo "Built SCSS ok!"

docker_build_all:
	docker build -t keyfram-site .
	docker run -v $(shell pwd)/dist:/app/dist keyfram-site make build_all

deploy:
	@rsync -e "ssh -o StrictHostKeyChecking=no" -avh --delete dist/ $(USER_AT_SERVER):/home/public/keyfram.milesalan.com
