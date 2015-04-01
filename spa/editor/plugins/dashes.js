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
  'editor/utils/deleteChar',
  'editor/utils/insertChar'
], function(_, Plugin, deleteChar, insertChar) {

  var Dashes = function(app) {
    Plugin.apply(this, arguments);
    var that = this;
    this.app.on('input.keydown', function(e) {
      that.handle(e);
    });
  };

  Dashes.protoype = _.create(Plugin.prototype, {
    constructor: Dashes
  });

  Dashes.prototype.handle = function (e) {
    var that = this;
    setTimeout(function () {
      var self = that.input.element;

      var previousChar = (self.value.substring(self.selectionStart - 1, self.selectionStart));
      var previousChar2 = (self.value.substring(self.selectionStart - 2, self.selectionStart - 1));
      var previousChar3 = (self.value.substring(self.selectionStart - 3, self.selectionStart - 2));

      var actualKey = e.which;
      var selection = e.selection();
      var nextChar = (self.value.substring(self.selectionStart, self.selectionStart + 1));
      var beforeSelection = self.value.substring(0, self.selectionStart);
      var afterSelection = self.value.substring(self.selectionEnd);

      //si on fait entré (le caractere d'avant est un entré) et qu'on place un tiret, active le dashmod
      if (previousChar2 === '\n' && previousChar === '-' && (actualKey === 54 || actualKey === 109)) {
        self.setSelectionRange(beforeSelection.length - 1, beforeSelection.length - 1 + selection.length); //recule de 1 la position du curseur
        deleteChar.deleteRight(self);
        insertChar.insertBoth(self, ' - ', selection, '');
        return 0;
      }

      var beforeSelection2 = self.value.substring(0, self.selectionStart - 1);
      if (actualKey === 13 && beforeSelection2.substring(beforeSelection2.lastIndexOf("\n") + 1, beforeSelection2.lastIndexOf("\n") + 4) === ' - ') {
        insertChar.insertBoth(self, ' - ', selection, '');
      }

      if (previousChar.charCodeAt(0) === 10 && previousChar2 === ' ' && previousChar3 === '-') {
        self.setSelectionRange(beforeSelection.length - 4, beforeSelection.length - 4 + selection.length);
        for (var i = 0; i < 7; i++) {
          deleteChar.deleteRight(self);
        }
        insertChar.insertBoth(self, "\n", selection, '');
        return 0;
      }
    }, 10); // TODO : look for a proper solution ...

  };

  return Dashes;
});