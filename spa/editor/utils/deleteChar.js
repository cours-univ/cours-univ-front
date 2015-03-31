/**
 * Create by Armya on 28//03/15
 */

define(function () {

  var deleteChar = {};

  deleteChar.deleteRight = function (elem) {
    var beforeSelection = elem.value.substring(0, elem.selectionStart);
    var selection = elem.value.substring(elem.selectionStart + 1, elem.selectionEnd + 1);
    var afterSelection = elem.value.substring(elem.selectionEnd + 1);
    elem.value = beforeSelection + selection + afterSelection;
    elem.setSelectionRange(beforeSelection.length, beforeSelection.length + selection.length);
  };

  return deleteChar;
});