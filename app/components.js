define('components', ['consts', 'buttons', 'utils'], function(consts, buttons, utils) {
    'use strict';

    let createTable = (parent) => {
        let table = consts.DOC.createElement('table'),
            rows = 20,
            columns = 20,
            trRange = utils.range(0, rows, 0),
            tdRange = utils.range(0, columns, 0),
            trs = [],
            tds = [];

        table.className = 'panelGamerBoard';

        Array.from(trRange).forEach((x) => {
            let trElement = consts.DOC.createElement('tr');
            trElement.className = 'tr' + x;

            Array.from(tdRange).forEach((s) => {
                let tdElement = consts.DOC.createElement('td');
                tdElement.className = 'td' + s;
                trElement.appendChild(tdElement);
            });

            table.appendChild(trElement);
        });

        return table;
    };

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
            this.options = buttons.OPTIONS;
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
        appendOptionsButton(parent) {
            parent.appendChild(this.options);
        }
    }

    class _GameContainer {
        constructor() {
            this.gameContainer = consts.DOC.createElement('div');
            this.gameContainer.id = 'gameContainer';
        }
        getGameContainer() {
            return this.gameContainer;
        }
        appendGameContainer(parent) {
            parent.appendChild(this.gameContainer);
        }
    }

    class _PanelGamer {
        constructor() {
            this.panelGamer = consts.DOC.createElement('div');
            this.panelGamer.id = 'panelGamer';

            this.menuGamer = consts.DOC.createElement('div');
            this.menuGamer.id = 'menuGamer';

            this.table = createTable(this.panelGamer);
        }
        getPanelGamer() {
            return this.panelGamer;
        }
        appendPanelGamer(parent) {
            parent.appendChild(this.panelGamer);
            this.panelGamer.appendChild(this.menuGamer);
            this.panelGamer.appendChild(this.table);
        }
    }

    return {
        GameMenu: _GameMenu,
        StartButtons: _StartButtons,
        GameContainer: _GameContainer,
        PanelGamer: _PanelGamer
    }
});
