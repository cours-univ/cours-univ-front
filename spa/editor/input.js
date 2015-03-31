define([
  'backbone',
  'lodash',
  'text!editor/raccourcis.md'
], function (Backbone, _, raccourcis) {
  var Input = function(app, elem) {
    this.app = app;
    this.element = elem;

    var that = this;

    var _buildEvent = function(e) {
    };

    this.element.addEventListener('keydown', function(e) {
      var elem = this;
      that.app.trigger('input.keydown', Input.buildEvent.bind(elem)(e));
    });

    if (localStorage.getItem('input') !== "" || localStorage.getItem('input') !== null) {
      this.element.value = localStorage.getItem('input');
    }
  };

  Input.prototype.getValue = function() {
    return this.element.value;
  };

  Input.buildEvent = function(e) {
    e.which = (e || window.event).which; //code clavier de la touche pressée
    e.shiftKey = (e || window.event).shiftKey; //booleen : true si shift appuyé
    e.ctrlKey = (e || window.event).ctrlKey; //booleen : true si ctrl appuyé
    e.altKey = (e || window.event).altKet; //booleen : true si ctrl appuyé

    var that = this;
    e.selection = function() {
      return that.value.substring(that.selectionStart, that.selectionEnd);
    };

    e.previousChar = function() {
      return that.value.substring((that.selectionStart - 1), that.selectionStart);
    };

    e.nextChar = function() {
      return that.value.substring(that.selectionStart, (that.selectionStart + 1));
    };

    return e;
  };

  return Input;
});