/**
 * Created by palra on 31/03/15.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
define([
  'jquery',
  'lodash',
  'editor/plugin'
], function($, _, Plugin) {

  /**
   * Plugin that debounces compilation on user input.
   *
   * @param app
   * @constructor
   */
  var Compiler = function(app) {
    Plugin.apply(this, arguments);

    this.delay = 500;
    this.maxWait = 2000;
    this.path = '/editor';

    this.app.on('input.keydown', _.debounce(this.handle.bind(this), this.delay, {
      'maxWait': this.maxWait
    }));
  };

  Compiler.protoype = _.create(Plugin.prototype, {
    constructor: Compiler
  });

  /**
   * Triggers compilation
   */
  Compiler.prototype.handle = function() {
    localStorage.setItem("input", this.input.getValue());
    this.compile();
  };

  /**
   * Compiles `app.input` and places the compiled markdown in `app.output`
   */
  Compiler.prototype.compile = function() {
    return Compiler.compile(this.input.getValue(), this.output.setHTML.bind(this.output));
  };

  Compiler.compile = function(markup, elem) {
    $.post("/editor", {
      markup: markup
    }, function (data) {
      if(_.isFunction(elem))
        elem(data);
      else
        elem.innerHTML = data;

      $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
      }); // TODO : make use of `output.htmlchanged` for highlight coloration, and other stuffs
    });
  };

  return Compiler;
});