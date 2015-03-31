/**
 * Created by palra on 27/03/15.
 */
define([
  'editor/input',
  'text!editor/raccourcis.md',
  'editor/plugins/compiler',
  'jquery'
], function (input, raccourcis, compiler, $) {
  var raccourcisButton = document.getElementById("raccourcis");
  var $modal = $('#shortcuts');

  raccourcisButton.addEventListener('click', function () {
    $modal.removeClass("hidden");
  });

  $("#shortcuts .title .close").click(function () {
    $modal.addClass("hidden");
  });

  return raccourcisButton;
});
