#!/usr/bin/env node
var fs = require('fs');
var fem = require('front-matter');
var mkdirp = require('mkdirp');
var path = require('path');
var rrd = require("recursive-readdir-sync");
var jsdom = require('jsdom');
var process = require('process');
var md = require('markdown-it');
var mdanchor = require('markdown-it-anchor');
var _ = require('lodash');
var CodeMirror = require("../node_modules/codemirror/addon/runmode/runmode.node.js");
require("../node_modules/codemirror/mode/meta.js");
require("../node_modules/codemirror/mode/css/css.js");
require("../node_modules/codemirror/mode/shell/shell.js");
require("../node_modules/codemirror/mode/htmlmixed/htmlmixed.js");
process.chdir(`${__dirname}/..`);

function readFile(f) { return String(fs.readFileSync(f)); }

function cm_highlight(code, langsyntax) {
  var ret = ""
  function esc(str) {
    return str.replace(/[<&]/g, function(ch) { return ch == "&" ? "&amp;" : "&lt;"; });
  }
  var curStyle = null, accum = "";
  function flush() {
    if (curStyle) ret += "<span class=\"" + curStyle.replace(/(^|\s+)/g, "$1cm-") + "\">" + esc(accum) + "</span>";
    else ret += esc(accum);
  }
  CodeMirror.runMode(code, langsyntax, function(text, style) {
    if (style != curStyle) {
      flush();
      curStyle = style; accum = text;
    } else {
      accum += text;
    }
  });
  flush();
  return ret;
}

var built_animations = null;

function context_object(base_ctx = {}) {
  // Vars
  var this_url = base_ctx.this_url;
  var globals = fem(readFile("./src/globals.yml")).attributes;
  var animations = function() {
    if (built_animations != null) { return built_animations; }
    var animsPath = 'src/_animations/';
    built_animations = _.map(fs.readdirSync(animsPath), function(name) {
      var animation = readFile(`${animsPath}/${name}/animation.scss`);
      var styling = readFile(`${animsPath}/${name}/styling.scss`);
      var markup = readFile(`${animsPath}/${name}/markup.html`);

      var j = { markup, styling, animation: `@import "kf.scss";\n\n${animation}` };
      var stringified = JSON.stringify(j);
      var base64_uri = Buffer.from(stringified).toString('base64');
      var url = `/editor#${base64_uri}`;

      var highlight_markup    = cm_highlight(markup, "htmlmixed");
      var highlight_animation = cm_highlight(animation, "css");
      var highlight_styling   = cm_highlight(styling, "css");

      return { name, animation, markup, styling, highlight_animation, highlight_markup, highlight_styling, url }
    });
    return built_animations;
  }();
  // Fns
   function render_partial(partial_name, ctx) {
    var partialsPath = 'src/_partials';
    var partials = _.fromPairs(_.map(fs.readdirSync(partialsPath), function(f) {
      return [f.replace(".html", ""), readFile(`${partialsPath}/${f}`)];
    }));
    return _.template(partials[partial_name])(context_object(ctx));
  };
  function nav_class(this_url, this_nav_path) {
    this_url = this_url.replace("index.html", "")
    this_url = this_url.replace(/^dist/, "")
    this_url = this_url.replace(/\/$/, "")
    var sect = this_url.match(/^\/[A-Za-z]+/);
    var sect_match = !!sect && sect == this_nav_path;
    var exact_match = this_url == this_nav_path;
    return exact_match || sect_match ? "active": "";
  }
  function md_pipe(content) {
    return new md({ html: true }).renderInline(content);
  }
  function md_render(content) {
    return new md({ html: true }).render(content);
  }
  function render_animation(name, display_name = false, show_reset = false) {
    return render_partial("animation_feature", { animation: 
      _.find(animations, function(f) { return f.name == name }),
       display_name,
       show_reset
    });
  }

  return _.extend(
    globals,
    { pretext: false, section: false, subsection: false, next: false, prev: false, this_url, title: "" },
    base_ctx, 
    { render_animation, render_partial, nav_class, md_pipe, md_render, animations }
  );
}

function target_blank_external_links(inputHtml) {
  const dom = new jsdom.JSDOM(inputHtml);
  _.each(dom.window.document.documentElement.querySelectorAll('a'), function(link) {
    if (link.getAttribute('href').match(/^https?:\/\//)) {
      link.setAttribute('target', '_blank');
    }
  });
  return dom.window.document.documentElement.outerHTML;
}

function build_all_pages() {
  function build_page(in_file, out_file) {
    var file_content = readFile(in_file)
    var femed = fem(file_content);
    var mdit = new md({ 
      html: true,
      highlight: function (str, lang) { 
        var use_lang_mode = {
          "scss": "css"
        }[lang] || lang;
        var highlighted = cm_highlight(str, use_lang_mode);
        var result = `<div class='cm-s-default'>${highlighted}</div>`;
        return result;
      }
    }).use(mdanchor, {
      slugify: function(f) {
        return f
          .replace(/\([^)]+\)/g, "")
          .replace(/\s/g, "_")
          .replace(":", "")
          .replace(/_$/g, "")
          .toLowerCase();
        }
    });
    var post_md = mdit.render(femed.body);
    // Really hacky here.. Issue is that partial is escaped & <p> wrapper via md; this undoes that before lodash tmpl
    post_md = post_md.replace(/<p>(&lt;.*&gt;)<\/p>/g, _.unescape);
    var post_lodash = _.template(post_md)(context_object(_.extend(femed.attributes, {this_url: out_file})));
    var layout = femed.attributes.layout || "base";
    var html = _.template(readFile(`src/_layouts/${layout}.html`))(context_object(_.extend(femed.attributes, {
      this_url: out_file,
      classes: in_file.replace(".md", "").replace("src/", "").replace(/\//g, " ").replace(/\.+/g, " "),
      yield_content: post_lodash
    })));
    html = target_blank_external_links(html);
    mkdirp.sync(out_file.replace(path.basename(out_file), ""));
    fs.writeFileSync(out_file, html);
    console.log(`Wrote ${out_file}`);
  }
  var all_path = "./src/";
  var files = rrd(all_path);
  var d = _.map(files, function(in_f) {
    if (in_f.match(".md") === null) { return; }
    var out_f = `dist/${in_f.replace(".md", "")}/index.html`.replace("index/index", "index").replace("src/", "");
    console.log(`${in_f} => ${out_f}`);
    build_page(in_f, out_f);
  });
}

build_all_pages();
