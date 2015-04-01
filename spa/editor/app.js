define([
  'backbone',
  'lodash',
  'editor/input',
  'editor/output',
  'editor/menu/main'
], function (Backbone, _, Input, Output, Menu) {
  var App = function(input, output) {
    this.input = new Input(this, input);
    this.output = new Output(this, output);
    this.plugins = {};
    this.settings = {};
    this.menu = new Menu(this);
  };

  _.extend(App.prototype, Backbone.Events);

  App.prototype.registerPlugin = function(name, Plugin) {
    this.plugins[name] = new Plugin(this);
  };

  App.prototype.get = function(key, defaultValue) {
    if(!this.has(key) && localStorage.getItem(key) !== null) {
      this.settings[key] = localStorage.getItem(key);
    }

    if(this.settings[key] === 'true')
      return this.settings[key] = true;
    if(this.settings[key] === 'false')
      return this.settings[key] = false;

    return this.settings[key] || defaultValue;
  };

  App.prototype.has = function(key) {
    return this.settings[key] !== undefined;
  };

  App.prototype.set = function(key, value) {
    localStorage.setItem(key, value);
    this.settings[key] = value;
  };

  return App;
});