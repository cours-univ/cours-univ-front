/**
 * Created by palra on 27/03/15.
 */
define([
  'lodash',
  'editor/menu/buttons/ToggleButton'
], function (_, ToggleButton) {
  function Tabulation(app) {
    this._key = 'tabulation.active';
    this.element = document.getElementById("editor__menu__tabulation");
    ToggleButton.apply(this, arguments);
  }

  Tabulation.prototype = _.create(ToggleButton.prototype, {
    constructor: Tabulation
  });

  return Tabulation;
});