define([
  'editor/input',
  'editor/output'
], function (require) {
  var app = {};

  app.run = function() {
    this.input = require('editor/input');
    this.output = require('editor/output');

    require('editor/plugins/main');
    require('editor/menu/main');
  };

  return app;
});