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
            $(function(){
                // Regler la largeur des circle_on_off pour qu'ils soient carrés (rond avec les angles arrondis)
                var height = $('.editor__menu__button--toggle__circle').height();
                $('.editor__menu__button--toggle__circle').css({'width': height + 'px'});

                // Au clic sur la fleche
                $('.editor__menu__hide_button').click(function () {
                    var $menu = $('#editor__menu');

                    // Si le menu est déjà caché
                    if ($menu.hasClass("hidden")) {
                        // Afficher le menu
                        $menu.removeClass("hidden");
                        // Changer le sens de la fleche
                        $(this).removeClass("down");
                        $(this).addClass("up");

                        // Redimentionner section
                        $('section').css({ 'top' : $menu.height() + 'px' });
                    }

                    // Si le menu n'est pas chaché
                    else {
                        // Cacher le menu
                        $menu.addClass("hidden");
                        // Changer le sens de la fleche
                        $(this).removeClass("up");
                        $(this).addClass("down");

                        // Redimentionner section
                        $('section').css({ 'top' : '0px' });
                    }

                });

                this.buttons = {};
                var that = this;
                buttons.forEach(function(button) {
                    var Plugin = require(button);
                    that.buttons[button.slice(20)] = new Plugin(app);
                });
            });
        }

        return Menu;
    });
})();