define('app', ['consts', 'buttons'], function(consts, buttons) {
    'use strict';

    class _GameMenu {
        constructor() {
            this.gameMenu = consts.DOC.createElement('div');
            this.gameMenu.id = 'gameMenu';
        }
        getParent() {
            return consts.DOC.getElementById('parentContainer');
        }
        getGameMenu() {
            return this.gameMenu;
        }
        appendMenu(parent) {
            parent.appendChild(this.gameMenu);
        }
    }

    class _StartButtons {
        constructor() {
            this.start = buttons.START;
            this.load = buttons.LOAD;
            this.exit = buttons.EXIT;
        }
        appendStartButton(parent) {
            parent.appendChild(this.start);
        }
        appendLoadButton(parent) {
            parent.appendChild(this.load);
        }
        appendExitButton(parent) {
            parent.appendChild(this.exit);
        }
    }

    let _init = () => {
        let menu = new _GameMenu(),
            parent = menu.getParent(),
            startButtons = new _StartButtons(),
            parentGameMenu = menu.getGameMenu();

        menu.appendMenu(parent);

        startButtons.appendStartButton(parentGameMenu);
        startButtons.appendLoadButton(parentGameMenu);
        startButtons.appendExitButton(parentGameMenu);
    };

    return {
        init: _init,
        GameMenu: _GameMenu,
        StartButtons: _StartButtons
    }
});
