/**
 * Created by palra on 27/03/15.
 */
(function(){
  var plugins =
    [
      'editor/plugins/compiler',
      'editor/plugins/brackets',
      'editor/plugins/dashes',
      'editor/plugins/tabulation',
      'editor/plugins/codeQuote',
      'editor/plugins/stats'
    ];

  define([
    'require',
    'backbone',
    'lodash',
    'spa',
    'editor/app',
    'text!editor/template.html.ejs'
  ].concat(plugins), function (require, Backbone, _, spa, App, editorTpl) {
    var EditorView;
    EditorView = Backbone.View.extend({
      initialize: function () {
        this.render();
      },
      render: function () {
        this.$el.html(_.template(editorTpl, {}));
        var app = new App(
          document.getElementById('editor__input'),
          document.getElementById('editor__result')
        );

        plugins.forEach(function(pluginPath){
          var Plugin = require(pluginPath);
          app.registerPlugin(pluginPath.slice(15), Plugin);
        });

        app.plugins.compiler.handle();
      }
    });

    return EditorView;
  });


})();