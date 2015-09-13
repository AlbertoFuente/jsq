define('components', ['consts', 'buttons', 'utils'], function(consts, buttons, utils) {
    'use strict';

    let _createTable = (parent) => {
            let table = consts.DOC.createElement('table'),
                rows = 10,
                columns = 10,
                trRange = utils.range(0, rows, 0),
                tdRange = utils.range(0, columns, 0),
                lettersRange = utils.range('a', 'j', 0),
                trs = [],
                tds = [];

            table.className = 'panelGamerBoard';

            Array.from(trRange).forEach((x) => {
                let trElement = consts.DOC.createElement('tr');

                if (x === 0) {
                    trElement.className = 'tr' + x;
                    Array.from(tdRange).forEach((s) => {
                        let tdElement = consts.DOC.createElement('td'),
                            tdNumber = consts.DOC.createElement('p');

                        if (s !== 0) {
                            tdElement.className = 'td' + s;
                            tdNumber.innerHTML = s + '';
                            tdElement.appendChild(tdNumber);
                        }

                        trElement.appendChild(tdElement);
                    });
                } else {
                    trElement.className = 'tr' + x;

                    Array.from(tdRange).forEach((s) => {
                        let tdElement = consts.DOC.createElement('td'),
                            tdLetter = consts.DOC.createElement('p'),
                            letter = lettersRange[x - 1];

                        tdElement.className = 'td' + s;
                        tdElement.setAttribute('data-number', s + '');
                        tdElement.setAttribute('data-letter', letter);
                        tdLetter.innerHTML = letter;

                        if (s === 0) {
                            tdElement.appendChild(tdLetter);
                        }
                        trElement.appendChild(tdElement);
                    });
                }

                table.appendChild(trElement);
            });

            return table;
        },
        _defaultShip = {
            value: 'Aircraft Carrier',
            name: 'aircraftCarrier',
            boxes: '5'
        },
        _defaultPosition = 'horizontal',
        _shipSelected = {},
        _positionSelected = null,
        _checkTds = (trChilds, range) => {
            let table = {},
                arr = [];

            Array.from(trChilds).forEach((x) => {
                let arr = [],
                    name = [];
                Array.from(x.childNodes).forEach((f) => {
                    if (f.className !== 'td0') arr.push(f);
                    if (f.hasAttribute('data-name')) name.push(f);
                });
                table[x.className] = {
                    childs: arr,
                    childsShips: name
                };
            });
            return table;
        },
        _changeVerticalBox = (trs, range, name) => {
            let i = 0,
                arr = {},
                menuGamer = new _MenuGamer();

            Object.keys(trs).forEach((x) => {
                if (trs[x].childsShips.length === 0 && i < range.length) {
                    arr[x] = trs[x];
                    i++;
                }
            });

            if (i === range.length) {
                Object.keys(arr).forEach((d) => {
                    let arrChild = arr[d].childs[0];
                    arrChild.className += ' selected';
                    arrChild.setAttribute('data-name', name);
                });
                menuGamer.removeElement(name);
            } else {
                let message = 'Move your ships form place more.';
                utils.message('green', message);
            }
        },
        _verticalShip = (num, name) => {
            let _table = consts.DOC.getElementsByClassName('panelGamerBoard'),
                _range = utils.range(1, parseFloat(num), 0),
                _trs = _table[0].childNodes,
                _trArr = [],
                _resultTrs = {};

            Array.from(_trs).forEach((x) => {
                if (x.className !== 'tr0') {
                    _trArr.push(x);
                }
            });
            _resultTrs = _checkTds(_trArr, _range);
            _changeVerticalBox(_resultTrs, _range, name);
        },
        _horizontalShip = (num, name) => {
            let _table = consts.DOC.getElementsByClassName('panelGamerBoard'),
                _td = null,
                _range = utils.range(1, parseFloat(num), 0);

            for (let i of _range) {
                //_changeBox('tr1', 'td' + i, name);
            }
        },
        _placeShip = (ship, position) => {
            debugger
            if (typeof ship === 'object' && position) {
                switch (position) {
                    case 'vertical':
                        _verticalShip(ship.boxes, ship.name);
                        break;
                    case 'horizontal':
                        _horizontalShip(ship.boxes, ship.name);
                        break;
                }
            } else {
                let message = 'You must choose one ship and the position you want to place it.';
                utils.message('red', message);
            }
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

    class _MenuGamer {
        constructor() {
            this.menuGamer = consts.DOC.createElement('div');
            this.menuGamer.id = 'menuGamer';
        }
        getMenuGamer() {
            return this.menuGamer;
        }
        removeElement(element) {
            let select = consts.DOC.getElementById('gamerSelect');
            Object.keys(select.childNodes).forEach((x) => {
                if (select.childNodes[x]) {
                    let dataName = select.childNodes[x].getAttribute('data-name');
                    if (dataName === element) {
                        select.remove(select.selectedIndex);
                    }
                }
            });
        }
        shipsMenu() {
            let ships = {
                    aircraftCarrier: {
                        name: 'Aircraft Carrier',
                        boxes: 5
                    },
                    battleship: {
                        name: 'Battleship',
                        boxes: 4
                    },
                    submarine: {
                        name: 'Submarine',
                        boxes: 3
                    },
                    destroyer: {
                        name: 'Destroyer',
                        boxes: 3
                    },
                    patrolBoat: {
                        name: 'Patrol boat',
                        boxes: 2
                    }
                },
                selectTitle = consts.DOC.createElement('h3'),
                selectPositionText = consts.DOC.createElement('h3'),
                position = ['horizontal', 'vertical'],
                divSelect1 = consts.DOC.createElement('div'),
                divSelect2 = consts.DOC.createElement('div'),
                divSelect3 = consts.DOC.createElement('div'),
                placeButton = consts.DOC.createElement('input');

            placeButton.id = 'placeShipButton';
            placeButton.type = 'button';
            placeButton.value = 'PLACE';

            divSelect1.className = 'divSelect1';
            divSelect2.className = 'divSelect2';
            divSelect3.className = 'divSelect3';

            selectTitle.className = 'selectShipsText';
            selectTitle.innerHTML = 'Place your ships:';

            this.selectMenuShips = consts.DOC.createElement('select');
            this.selectMenuShips.id = 'gamerSelect';

            Object.keys(ships).forEach((x) => {
                let option = consts.DOC.createElement('option');
                option.value = ships[x].name;
                option.innerHTML = ships[x].name;
                option.setAttribute('data-name', x + '');
                option.setAttribute('data-box', ships[x].boxes + '');

                this.selectMenuShips.appendChild(option);
            });

            divSelect1.appendChild(selectTitle);
            divSelect1.appendChild(this.selectMenuShips);
            this.menuGamer.appendChild(divSelect1);

            this.selectMenuShips.onchange = (event) => {
                let evTarget = event.target.selectedOptions[0];
                _shipSelected.value = evTarget.value;
                _shipSelected.boxes = evTarget.getAttribute('data-box');
                _shipSelected.name = evTarget.getAttribute('data-name');
            };

            selectPositionText.className = 'selectPositionText';
            selectPositionText.innerHTML = 'Ship Position:';

            this.selectShipPosition = consts.DOC.createElement('select');
            this.selectShipPosition.id = 'selectPosition';

            Array.from(position).forEach((x) => {
                let option = consts.DOC.createElement('option');
                option.value = x;
                option.innerHTML = x + '';

                this.selectShipPosition.appendChild(option);
            });

            divSelect2.appendChild(selectPositionText);
            divSelect2.appendChild(this.selectShipPosition);
            this.menuGamer.appendChild(divSelect2);

            this.selectShipPosition.onchange = (event) => {
                _positionSelected = event.target.selectedOptions[0].value;
            };

            divSelect3.appendChild(placeButton);
            this.menuGamer.appendChild(divSelect3);

            placeButton.onclick = () => {
                _placeShip(_shipSelected, _positionSelected);
            }
        }
        appendMenuGamer(parent) {
            this.shipsMenu();
            parent.appendChild(this.menuGamer);
        }
    }

    class _PanelGamer {
        constructor() {
            this.panelGamer = consts.DOC.createElement('div');
            this.panelGamer.id = 'panelGamer';

            this._menuGamer = new _MenuGamer();
            this._menuGamer.appendMenuGamer(this.panelGamer);

            this._table = _createTable(this.panelGamer);
            this.panelGamer.appendChild(this._table);
        }
        getPanelGamer() {
            return this.panelGamer;
        }
        appendPanelGamer(parent) {
            parent.appendChild(this.panelGamer);
        }
    }

    return {
        GameMenu: _GameMenu,
        StartButtons: _StartButtons,
        GameContainer: _GameContainer,
        MenuGamer: _MenuGamer,
        PanelGamer: _PanelGamer,
        createTable: _createTable
    }
});
