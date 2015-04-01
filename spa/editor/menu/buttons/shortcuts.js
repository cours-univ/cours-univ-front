/**
 * Created by palra on 27/03/15.
 */
define([
  'jquery',
],function ($) {
  function Shortcuts(app) {
    this.app = app;
    var $button = $("#editor__menu__shortcuts");
    var $modal =  $('#editor__menu__shortcuts__modal');

    $button.click(function () {
      $modal.removeClass("hidden");
    });

    $("#editor__menu__shortcuts__modal .title .close").click(function () {
      $modal.addClass("hidden");
    });

  }

  return Shortcuts;
});