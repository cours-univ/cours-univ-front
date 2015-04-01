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
  'editor/plugin'
], function(_, Plugin) {
  function Tabulation() {
    Plugin.apply(this, arguments);
    var that = this;
    this.app.on('input.keydown', function (e) {
      if(that.app.get('tabulation.active')) {
        if (!that.writeTabulation(e)) {
          that.unWriteTabulation(e);
        }
      }
    });
  }

  Tabulation.prototype = _.create(Plugin.prototype, {
    constructor: Tabulation
  });

  function _deleteFirstFindTabOnLine(selection) {
    if (selection.length > 0) {
      for (var i = 0; i < selection.length; i++) {
        if (selection.charAt(i) === String.fromCharCode(10) || selection.charAt(i) === String.fromCharCode(13)) {
          var before = selection.substring(0, i + 1), after;
          if (selection.charAt(i + 1) === String.fromCharCode(9)) {
            after = selection.substring(i + 2);
            selection = before + after;
          }
          if (selection.charAt(i + 1) === ' ' && selection.charAt(i + 2) === ' ' && selection.charAt(i + 3) === ' ' && selection.charAt(i + 4) === ' ') {
            after = selection.substring(i + 5);
            selection = before + after;
          }
        }
      }
    }
    return selection;
  }

  function _deleteTabLastIndex(selection) {
    if (selection.length > 0) {
      var lastIndex = selection.lastIndexOf("\n");
      var before = selection.substring(0, lastIndex + 1), after;

      if (selection.charAt(lastIndex + 1) === "\t") {
        after = selection.substring(lastIndex + 2);
        selection = before + after;
      }
      else if (
        selection.charAt(lastIndex + 1) === ' ' &&
        selection.charAt(lastIndex + 2) === ' ' &&
        selection.charAt(lastIndex + 3) === ' ' &&
        selection.charAt(lastIndex + 4) === ' '
      ) {
        before = selection.substring(0, lastIndex + 1);
        after = selection.substring(lastIndex + 5);
        selection = before + after;
      }
    }
    return selection;
  }


  /**
   * Public methods
   */

  Tabulation.prototype.writeTabulation = function (e) {
    var actualKey = e.which;
    var shiftKey = e.shiftKey;
    var selection = e.selection();
    var self = this.input.element;

    if (actualKey == 9 && !shiftKey) {
      e.preventDefault();
      var tabString = String.fromCharCode(9);

      var beforeSelection = self.value.substring(0, self.selectionStart);
      var afterSelection = self.value.substring(self.selectionEnd);

      if (selection.length > 0) {
        for (var i = 0; i < selection.length; i++) {
          if (selection.charAt(i) === String.fromCharCode(10) || i == 0) {
            var before = selection.substring(0, i + 1);
            var after = selection.substring(i + 1);
            selection = before + String.fromCharCode(9) + after;
            i++;
          }
        }

        if (beforeSelection.length > 0) {
          var lastIndex = beforeSelection.lastIndexOf(String.fromCharCode(10));
          var before = beforeSelection.substring(0, lastIndex + 1);
          var after = beforeSelection.substring(lastIndex + 1);
          beforeSelection = before + String.fromCharCode(9) + after;
        }
      }
      else {
        self.value = beforeSelection + tabString + selection + afterSelection;
        self.setSelectionRange((beforeSelection.length + tabString.length), beforeSelection.length + tabString.length + selection.length);
        return false;
      }

      self.value = beforeSelection + selection + afterSelection;
      self.setSelectionRange((beforeSelection.length), beforeSelection.length + selection.length);

      self.focus();
      return true;
    }
  };


  Tabulation.prototype.unWriteTabulation = function (e) {
    var actualKey = e.which;
    var shiftKey = e.shiftKey;
    var selection = e.selection();
    var previousChar = e.previousChar();
    var nextChar = e.nextChar();
    var self = this.input.element;

    if (actualKey == 9 && shiftKey) {
      e.preventDefault();
      //Cas de la tabulation derriere le curseur
      if (previousChar === String.fromCharCode(9)) {
        var beforeSelection = self.value.substring(0, self.selectionStart - 1);
        var afterSelection = self.value.substring(self.selectionEnd);

        selection = _deleteFirstFindTabOnLine(selection);

        self.value = beforeSelection + selection + afterSelection;
        self.setSelectionRange(beforeSelection.length, beforeSelection.length + selection.length);
        return 0;
      }

      //cas de la tabluation devant le curseur
      else if (nextChar === String.fromCharCode(9)) {
        var beforeSelection = self.value.substring(0, self.selectionStart);

        selection = _deleteFirstFindTabOnLine(selection);

        var afterSelection = self.value.substring(self.selectionEnd + 1);
        self.value = beforeSelection + selection + afterSelection;
        self.setSelectionRange(beforeSelection.length, beforeSelection.length + selection.length);
        return 0;
      }
      else if (selection.length > 0) {
        var beforeSelection = self.value.substring(0, self.selectionStart);
        var afterSelection = self.value.substring(self.selectionEnd);
        beforeSelection = _deleteTabLastIndex(beforeSelection);
        selection = _deleteFirstFindTabOnLine(selection);

        self.value = beforeSelection + selection + afterSelection;
        self.setSelectionRange(beforeSelection.length, beforeSelection.length + selection.length);
      }
      self.focus();
    }
  };

  return Tabulation;
});