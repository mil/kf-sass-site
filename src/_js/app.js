function setup_tab_widget_events() {
  $('.tab-controls button').on('click', function(e) {
    var idx = $(e.target).index() + 1;
    $(e.target)
      .closest('.tab-widget')
      .attr('data-active-tab', idx)
  });

  $(".reset").on('click', function(e) {
    var anims = $(".animation-feature-display div", $($(e).parent()[0]).parent()[0]);
    anims.css("animation", "none");
    setTimeout(function() { anims.css("animation", ""); }, 100);
  });
}

function setup_sidebar() {
  $(".l2 .caret").on("click", function(s) {
    console.log($(s.target).parents(".l2").next(".l2-nest"));
    s.preventDefault();
    $(s.target).parents(".l2").next(".l2-nest").toggleClass("invisible");
  });
}

var Editor = function() {
  var markup_editor, styling_editor, animation_editor;

  function save() {
    var state = {
      markup: markup_editor.doc.getValue(),
      styling: styling_editor.doc.getValue(),
      animation: animation_editor.doc.getValue(),
    };
    var stringified = JSON.stringify(state);
    var base64_state = btoa(stringified);
    location.hash = base64_state;
  }

  function strip_leading_trailing_blank_lines(input) {
    return input;
  }

  function load() {
    try {
      var json_state = atob(location.hash.split("#")[1]);
      var state = JSON.parse(json_state);
      markup_editor.doc.setValue(strip_leading_trailing_blank_lines(state.markup));
      styling_editor.doc.setValue(strip_leading_trailing_blank_lines(state.styling));
      animation_editor.doc.setValue(strip_leading_trailing_blank_lines(state.animation));
    } catch(e) {
      console.log("Loading default state");
    }
  }

  function button_click(item) {
    ["markup", "styling", "animation"].forEach(function(f) {
      $(`.editor-textarea-${f}-wrap`).css('display', f === item ? "block" : "none");
      $(`.editor-button-${f}`)[f === item ? "addClass" : "removeClass"]("active");
    });
    var selector = {
      markup: markup_editor, styling: styling_editor,  animation: animation_editor
    }[item];

    selector.refresh();
    selector.scrollTo(0,0);
  }

  function compile() {
    var markup    = markup_editor.doc.getValue();
    var styling   = styling_editor.doc.getValue();
    var animation = animation_editor.doc.getValue();

    var sass = new Sass;
    sass.writeFile('kf.scss', kf_dist_scss);
    var scss_to_compile = `${styling}\n${animation}`;

    $(".status").html("Compiling");
    $(".status").addClass("compiling").removeClass('ok').removeClass('error');
    var start_ms = Date.now();

    sass.compile(scss_to_compile, function(css_compiled) {
      var now_ms = Date.now();
      var ms_to_compile = now_ms - start_ms;
      var s_to_compile = Math.floor(ms_to_compile / 1000);

      var message = "";
      var addClass = "";
      if (css_compiled.status == 1) {
        message = `Error compiling CSS on line ${css_compiled.line}: ${css_compiled.message}`
        addClass = 'error';
      } else {
        message = `Compiled CSS ok!`;
        addClass = 'ok';
      }
      
      $(".status").removeClass("compiling").addClass(addClass);

      $(".status").html(message);
      console.log("");
      var html_string = `
        <html>
          <head>
            <style>${css_compiled.text}</style>
          </head>
          <body>${markup}</body>
        </html>
      `;
      $(".editor-iframe")[0].src = "data:text/html;charset=utf-8," + escape(html_string);
    });
  }

  function constructor() {
    markup_el        = document.getElementById('editor-textarea-markup');
    styling_el       = document.getElementById('editor-textarea-styling');
    animation_el     = document.getElementById('editor-textarea-animation');
    markup_editor    = CodeMirror.fromTextArea(markup_el, {lineNumbers: true, value: "html", mode: "htmlmixed" });
    styling_editor   = CodeMirror.fromTextArea(styling_el, {lineNumbers: true, value: "scss", mode: "css" });
    animation_editor = CodeMirror.fromTextArea(animation_el, {lineNumbers: true, value: "scss", mode: "css" });

    $('.editor-textarea-markup-wrap').css('display', 'none');
    $('.editor-textarea-styling-wrap').css('display', 'none');
    $(`.editor-button-animation`).addClass("active");

    $('.editor-button-markup').on('click',    function() { button_click("markup") } );
    $('.editor-button-styling').on('click',   function() { button_click("styling") } );
    $('.editor-button-animation').on('click', function() { button_click("animation") } );
    
    $('.editor-button-compile').on('click', compile);


    Split(["#editor-left", "#editor-right"], { 
      sizes: [50, 50],
      onDrag: function() {
        markup_editor.refresh();
        styling_editor.refresh();
        animation_editor.refresh();
      }
    });

    load();
    compile();
  }

  constructor();
  return { 
    load: load, 
    save: save, 
    markup_editor: markup_editor, 
    styling_editor: styling_editor,
    animation_editor: animation_editor
  };
};

Zepto(function($) {
  setup_tab_widget_events();
  setup_sidebar();
  var editor = Editor();
  window.editor = editor;
});
