define(function () {
  var Output = function(app, elem) {
    this.app = app;
    this.element = elem;
  };

  Output.prototype.setHTML = function(value) {
    this.element.innerHTML = value;
    this.app.trigger('output.htmlchanged', value);
  };

  Output.prototype.getHTML = function() {
    return this.element.innerHTML;
  };

  return Output;
});