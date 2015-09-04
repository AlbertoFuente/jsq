define('app', [], function(app) {
    'use strict';

    const doc = window.document,
        docBody = doc.body;

    class _GameMenu {
        constructor() {
            this.gameMenu = doc.createElement('div');
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
}());
