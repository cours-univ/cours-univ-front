/**
 * Created by palra on 27/03/15.
 */

define([
  'backbone',
  'lodash',
  'spa',
  'editor/app',
  'text!editor/template.html.ejs'
], function (Backbone, _, spa, app, editorTpl) {
  var EditorView = Backbone.View.extend({
    initialize: function() {
      this.render();
    },
    render: function() {
      this.$el.html( _.template(editorTpl, {} ));
      app.run();
      plugins.compiler.handle();
    }
  });

  return EditorView;
});