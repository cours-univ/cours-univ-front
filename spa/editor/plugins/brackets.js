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
  'editor/plugin',
  'editor/character',
  'editor/characterExcept',
  'editor/utils/deleteChar',
  'editor/utils/insertChar'
], function($, _, Plugin, character, characterExcept, deleteChar, insertChar) {

  var Brackets = function(app) {
    Plugin.apply(this, arguments);

    var that = this;
    this.app.on('input.keydown', function(e) {
      if(!that.deleteAutoComplete(e))
        setTimeout(function() {
          that.addAutoComplete(e);
        }, 10); // TODO : find a proper solution
    });
  };

  Brackets.protoype = _.create(Plugin.prototype, {
    constructor: Brackets
  });

  Brackets.prototype.addAutoComplete = function(e) {
    var previousChar = e.previousChar();
    var actualKey = e.which;
    var selection = e.selection();
    var evenInsert = false;

    // Iterate in characters
    var charLength = character.length, i;
    for (i = 0; i < charLength; i++) {
      if (previousChar === character[i].charac && actualKey == character[i].keyCodeCharac) {
        insertChar.insertBoth(this.input.element, '', selection, character[i].characOppos);
        evenInsert = true;
        break;
      }
    }
    // Iterate in characterExcept
    for (i = 0; i < characterExcept.length; i++) {
      if (!evenInsert && (selection.length > 0) && previousChar === characterExcept[i].charac && actualKey == characterExcept[i].keyCodeCharac) {
        insertChar.insertBoth(this.input.element, '', selection, characterExcept[i].characOppos);
      }
    }
  };

  Brackets.prototype.deleteAutoComplete = function (e) {
    var actualKey = e.which;
    var supprKey = 8;
    var previousChar = e.previousChar();
    var nextChar = e.nextChar();

    for (var i = 0; i < character.length; i++) {
      //Supprime de egalement le caractere de droite s'il est l'oppose du caractere de gauche
      if (actualKey === supprKey && previousChar === character[i].charac && nextChar === character[i].characOppos) {
        deleteChar.deleteRight(this.input.element);
        return true;
      }
      //Si on ecrit ' () ' et qu'on rajoute ' ) ' permet de ne pas ecrire ca ' ()) '
      if ((actualKey === character[i].keyCodeCharacOppos || actualKey === character[i].keyCodeCharacOppos2) && nextChar === character[i].characOppos) {
        deleteChar.deleteRight(this.input.element);
        return true;
      }
    }
  };


  return Brackets;
});