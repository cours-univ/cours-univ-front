(function() {
  var buttons = [
    'editor/menu/buttons/autoComplete',
    'editor/menu/buttons/shortcuts',
    'editor/menu/buttons/tabulation'
  ];

  define([
    'require',
    'jquery'
  ].concat(buttons), function (require, $) {
    function Menu(app) {
      // Regler la largeur des circle_on_off pour qu'ils soient carrés (rond avec les angles arrondis)
      var height = $('#editor__menu .editor__menu__button__circle_on_off').height();
      $('#editor__menu .editor__menu__button__circle_on_off').css({'width': height + 'px'});

      // Au clic sur la fleche
      $('#editor__menu .editor__menu__hide_button').click(function () {
        var $menu = $('#editor__menu');
        var $input = $('#editor__input');
        var $inputoutput = $('#editor__input, #editor__output');

        // Si le menu est déjà caché
        if ($menu.hasClass("hidden")) {
          // Afficher le menu
          $menu.removeClass("hidden");
          // Changer le sens de la fleche
          $(this).removeClass("down");
          $(this).addClass("up");

          // Redimentionner et replacer l'input et le result
          $input.css({'height': $(window).height() - $menu.height() + 'px'});
          $inputoutput.css({'top': $menu.height() + 'px'}); // TODO : redimensionnement ne se fait que sur l'input
        }

        // Si le menu n'est pas chaché
        else {
          // Cacher le menu
          $menu.addClass("hidden");
          // Changer le sens de la fleche
          $(this).removeClass("up");
          $(this).addClass("down");

          // Redimentionner et replacer l'input et le result
          $input.css({'height': '100%'});
          $inputoutput.css({'top': '0px'}); // TODO : redimensionnement ne se fait que sur l'input
        }

      });

      this.buttons = {};
      var that = this;
      buttons.forEach(function(button) {
        var Plugin = require(button);
        that.buttons[button.slice(20)] = new Plugin(app);
      });
    }

    return Menu;
  });
})();