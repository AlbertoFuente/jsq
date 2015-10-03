define('app', ['consts', 'buttons', 'components'], function(consts, buttons, components) {
    'use strict';

    let _init = () => {
        let menu = new components.GameMenu(),
            parent = menu.getParent(),
            startButtons = new components.StartButtons(),
            parentGameMenu = menu.getGameMenu();

        menu.appendMenu(parent);

        startButtons.appendStartButton(parentGameMenu);
        startButtons.appendLoadButton(parentGameMenu);
        startButtons.appendOptionsButton(parentGameMenu);
        startButtons.appendExitButton(parentGameMenu);
    };

    return {
        init: _init
    };
});
