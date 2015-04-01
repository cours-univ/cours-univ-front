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
  'lodash',
  'editor/plugin',
  'editor/utils/insertChar'
], function(_, Plugin, insertChar) {

  var CodeQuote = function(app) {
    Plugin.apply(this, arguments);
    var that = this;
    this.app.on('input.keydown', function(e) {
      that.addCodeQuote(e);
    });
  };

  CodeQuote.protoype = _.create(Plugin.prototype, {
    constructor: CodeQuote
  });

  CodeQuote.prototype.addCodeQuote = function (e) {
    var altKey = e.altKey;
    var ctrlKey = e.ctrlKey;
    var actualKey = e.which;
    var selection = e.selection();
    var previousChar = e.previousChar();
    var self = this.input.element;

    // ctrl + alt + c
    if (actualKey === 67 && altKey && ctrlKey && previousChar !== '`') {
      e.preventDefault();

      var enterString = String.fromCharCode(13);
      var beforeSelection = self.value.substring(0, self.selectionStart);
      var afterSelection = self.value.substring(self.selectionEnd);
      var bonus = '';

      var addRight = enterString + '```';

      if (beforeSelection.length > 0) {
        var addLeft = enterString + enterString + '```';
        if (selection.length > 0) {
          bonus = enterString;
        }
      }
      else {
        addLeft = '```';
      }
      self.value = beforeSelection + addLeft + bonus + selection + addRight + afterSelection;
      self.setSelectionRange(beforeSelection.length + addLeft.length, beforeSelection.length + addLeft.length);
    }
    else if (actualKey === 67 && altKey && !ctrlKey && previousChar !== '`') {
      e.preventDefault();

      insertChar.insertBoth(self, '`', selection, '`');
    }
  };

  return CodeQuote;

});