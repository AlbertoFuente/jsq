'use strict';

const doc = window.document,
    docBody = doc.body;

class GameMenu {
    constructor() {
        this.gameMenu = doc.createElement('div');
        this.gameMenu.id = 'gameMenu';
    }
    appendMenu(parent) {
        parent.appendChild(this.gameMenu);
    }
}
