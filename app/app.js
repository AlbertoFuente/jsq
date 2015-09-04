define('app', ['consts'], function(consts) {
    'use strict';

    class _GameMenu {
        constructor() {
            this.gameMenu = consts.DOC.createElement('div');
            this.gameMenu.id = 'gameMenu';
        }
        getParent() {
            return window.document.getElementById('parentContainer');
        }
        appendMenu(parent) {
            parent.appendChild(this.gameMenu);
        }
    }

    return {
        GameMenu: _GameMenu
    }
});
