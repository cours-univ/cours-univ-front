/**
 * Created by palra on 27/03/15.
 */
define([
  'jquery',
],function ($) {
  function Shortcuts(app) {
    this.app = app;
    var $button = $("#editor__menu__raccourcis");
    var $modal =  $('#editor__window--shortcuts');

    // TODO : Cette foncion n'est pas appelée

    $button.click(function () {
      $modal.removeClass("hidden");
    });

    $("#editor__window--shortcuts .editor__window__title__close").click(function () {
      $modal.addClass("hidden");
    });

  }

  return Shortcuts;
});