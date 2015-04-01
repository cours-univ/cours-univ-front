/**
 * Created by palra on 27/03/15.
 */
define([
  'lodash',
  'editor/menu/buttons/ToggleButton'
], function (_, ToggleButton) {
  function AutoComplete(app) {
    this._key = 'autocomplete.active';
    this.element = document.getElementById("editor__menu__autocomplete");
    ToggleButton.apply(this, arguments);
  }

  AutoComplete.prototype = _.create(ToggleButton.prototype, {
    constructor: AutoComplete
  });

  return AutoComplete;
});