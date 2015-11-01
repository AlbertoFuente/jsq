define('components', ['$', 'consts', 'buttons', 'utils'], function($, consts, buttons, utils) {
    'use strict';

    let _createTable = () => {
            let table = consts.DOC.createElement('table'),
                rows = 10,
                columns = 10,
                trRange = utils.range(0, rows, 0),
                tdRange = utils.range(0, columns, 0),
                lettersRange = utils.range('a', 'j', 0);

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
                    trElement.setAttribute('data-number', x);
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
            _moveShips(table);
            _hoverShips(table);
            return table;
        },
        _tableObject = (table) => {
            let tableObject = {};

            Object.keys(table.childNodes).forEach((x) => {
                if (table.childNodes[x].className !== 'tr0') {
                    let arr = [],
                        selected = [];
                    Object.keys(table.childNodes[x].childNodes).forEach((d) => {
                        if (table.childNodes[x].childNodes[d].className !== 'td0') {
                            arr.push(table.childNodes[x].childNodes[d]);
                        }
                        if (table.childNodes[x].childNodes[d].classList.contains('selected')) {
                            selected.push(table.childNodes[x].childNodes[d]);
                        }
                    });
                    tableObject[table.childNodes[x].className] = {
                        childs: arr,
                        selected: selected
                    };
                    arr = [];
                    selected = [];
                }
            });

            return tableObject;
        },
        _hoverSelected = {},
        _moveShips = (table) => {
            table.onclick = (e) => {
                let tableObject = _tableObject(table),
                    elementClass = e.target.classList,
                    elementDataName = e.target.getAttribute('data-name') || null,
                    elementParent = e.target.parentNode.className,
                    elementParentNumber = e.target.parentNode.getAttribute('data-number'),
                    elementNumber = e.target.getAttribute('data-number'),
                    ships = new _Ships();

                Array.from(elementClass).forEach((x) => {
                    if (x === 'selected') {
                        let selectedLen = (function(eName) {
                                let arr = [];
                                Array.from(tableObject[elementParent].selected).forEach((x) => {
                                    let name = x.getAttribute('data-name');
                                    if (name === eName) {
                                        arr.push(x);
                                    }
                                });
                                return arr.length;
                            }(elementDataName)),
                            selecteds = tableObject[elementParent].selected;

                        if (elementDataName !== null && selectedLen > 1) {
                            Array.from(selecteds).forEach((f) => {
                                if (f.classList.contains('selected') && !f.classList.contains('hover') && f.hasAttribute('data-name') && f.attributes[3].value === elementDataName) {
                                    _hoverSelected = {
                                        name: elementDataName,
                                        position: 'horizontal',
                                        parent: elementParent,
                                        len: ships.getShipLength(elementDataName),
                                        number: elementNumber,
                                        selected: e.target,
                                        hover: true
                                    };
                                    f.classList.remove('selected');
                                } else if (f.classList.contains('selected') && f.classList.contains('hover')) {
                                    _hoverSelected = {};
                                    f.classList.remove('hover');
                                } else {
                                    return;
                                }
                            });
                        } else if (elementDataName !== null && selectedLen === 1) {
                            let shipLen = ships.getShipLength(elementDataName),
                                trClasses = Array.from({
                                    length: shipLen
                                }, (x, i) => 'tr' + (parseInt(elementParentNumber) + i)),
                                tdClass = e.target.classList[0];

                            _hoverSelected = {
                                name: elementDataName,
                                position: 'vertical',
                                parent: elementParent,
                                len: ships.getShipLength(elementDataName),
                                number: elementNumber,
                                selected: e.target,
                                hover: true
                            };

                            Array.from(trClasses).forEach((x) => {
                                Array.from(tableObject[x].selected).forEach((d) => {
                                    if (d.classList.contains(tdClass) && d.classList.contains('selected') && !d.classList.contains('hover')) {
                                        d.classList.remove('selected');
                                        d.removeAttribute('data-name');
                                    } else if (d.classList.contains(tdClass) && d.classList.contains('selected') && d.classList.contains('hover')) {
                                        _hoverSelected = {};
                                        d.classList.remove('hover');
                                    } else {
                                        return;
                                    }
                                });
                            });
                        }
                    } else {
                        return;
                    }
                });
            };
        },
        _removeSelected = (element) => {
            let table = consts.DOC.getElementsByClassName('panelGamerBoard');

            Array.from(table[0].childNodes).forEach((tr) => {
                let tds = tr.childNodes;
                Array.from(tds).forEach((td) => {
                    if (td.className !== 'panelGamerBoard' && td.classList.contains('hover')) {
                        if (!!element.attributes[3] && !!td.attributes[3] && element.attributes[3].value === td.attributes[3].value) {
                            return false;
                        } else {
                            td.classList.remove('selected');
                            td.classList.remove('hover');
                            $(td).removeAttr('data-name');
                        }
                    }
                });
            });
        },
        _checkHorizontalSelecteds = (table, elementNumber, elementParent, elementLen) => {
            let printSelected = (_hoverSelected.len <= (11 - elementNumber)) ? true : false,
                tableObj = _tableObject(table),
                elementRange = utils.range(parseInt(elementNumber), (parseInt(elementNumber) + (parseInt(elementLen) - 1)), 0),
                parentClass = elementParent.className,
                selecteds = [];

            if (printSelected) {
                Array.from(tableObj[parentClass].selected).forEach((x) => {
                    if (elementLen) {
                        if (!x.classList.contains('hover')) {
                            let selNumber = x.attributes[1].value;
                            Array.from(elementRange).forEach((d) => {
                                if (d === parseInt(selNumber)) {
                                    selecteds.push(d);
                                }
                            });
                        }
                    }
                });
                return (selecteds.length > 0) ? false : true;
            } else {
                return false;
            }
        },
        _checkVerticalSelected = (elementParent, elementLen, element) => {
            let parentNumber = (elementParent.classList[0] !== 'tr0') ? parseInt(elementParent.getAttribute('data-number')) : 0,
                printSpace = ((parentNumber + elementLen) <= 11) ? true : false,
                elementClass = element.classList[0],
                result = true;

            if (printSpace) {
                Array.from({
                    length: elementLen
                }, () => {
                    let tr = consts.DOC.getElementsByClassName('tr' + parentNumber);
                    Array.from(tr[0].childNodes).forEach((d) => {
                        if (d.classList.contains(elementClass) && d.classList.contains('selected')) {
                            result = false;
                        }
                    });
                    parentNumber++;
                });
                return result;
            } else {
                return false;
            }
        },
        _hoverShips = (table) => {
            $(table).find('td').hover((e) => {
                let element = e.currentTarget,
                    elementParent = e.currentTarget.parentNode,
                    elementParentNumber = elementParent.getAttribute('data-number'),
                    elementNumber = parseInt(e.currentTarget.getAttribute('data-number')),
                    elementName = e.currentTarget.getAttribute('data-name') || null,
                    printHorizontalSelected = _checkHorizontalSelecteds(table, elementNumber, elementParent, _hoverSelected.len),
                    printVerticalSelected = _checkVerticalSelected(elementParent, _hoverSelected.len, element),
                    len = _hoverSelected.len ? _hoverSelected.len : 0,
                    i = 0;

                if (elementName) {
                    utils.tooltip(element, elementName, true);
                } else {
                    utils.tooltip(element, null, false);
                }

                if (_hoverSelected.position) {
                    switch (_hoverSelected.position) {
                        case 'horizontal':
                            if (!element.classList.contains('selected') && elementParent.className !== 'tr0' && element.className !== 'td0' && _hoverSelected.hasOwnProperty('name')) {
                                _removeSelected(element);

                                if (printHorizontalSelected) {
                                    for (i; i < len; i++) {
                                        let selected = $('.td' + elementNumber);

                                        if (selected.parent().hasClass(elementParent.className)) {
                                            $('.' + elementParent.className).find(selected).addClass('selected hover');
                                            $('.' + elementParent.className).find(selected).attr('data-name', _hoverSelected.name);
                                            elementNumber++;
                                        }
                                    }
                                }
                            }
                            break;
                        case 'vertical':
                            if (!element.classList.contains('selected') && elementParent.className !== 'tr0' && element.className !== 'td0' && _hoverSelected.hasOwnProperty('name')) {
                                _removeSelected(element);

                                if (printVerticalSelected) {
                                    let trRange = utils.range(parseInt(elementParentNumber), 10, 0),
                                        trClasses = Array.from(trRange, (x) => 'tr' + x),
                                        notSelecteds = [];

                                    Array.from(trClasses).forEach((x) => {
                                        Array.from(table.childNodes).forEach((d) => {
                                            if (d.classList.contains(x) && !d.classList.contains('selected')) {
                                                notSelecteds.push(x);
                                            }
                                        });
                                    });
                                    if (notSelecteds.length >= _hoverSelected.number) {
                                        Array.from({
                                            length: _hoverSelected.len
                                        }, (x, i) => {
                                            Array.from(table.childNodes).forEach((d) => {
                                                if (d.classList.contains(notSelecteds[i]) && !d.childNodes[elementNumber].classList.contains('selected')) {
                                                    d.childNodes[elementNumber].className += ' selected hover';
                                                    d.childNodes[elementNumber].setAttribute('data-name', _hoverSelected.name);
                                                }
                                            });
                                        });
                                    }
                                }
                            }
                            break;
                    }
                } else {
                    return;
                }
            });
        },
        _shipSelected = {},
        _checkTds = (trChilds) => {
            let table = {};

            Array.from(trChilds).forEach((x) => {
                let arr = [],
                    name = [];
                Array.from(x.childNodes).forEach((f) => {
                    if (f.className !== 'td0') {
                        arr.push(f);
                    }
                    if (f.hasAttribute('data-name')) {
                        name.push(f);
                    }
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
                if (i < range.length) {
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
                let message = 'Move your ships for place more.';
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
        _changeHorizontalBox = (trs, range, name) => {
            let i = 0,
                d = 0,
                arr = {},
                firstChild = null,
                menuGamer = new _MenuGamer();

            Object.keys(trs).forEach((x) => {
                if (trs[x].childsShips.length === 0 && i < 1) {
                    firstChild = x;
                    arr[x] = trs[x];
                    i++;
                }
            });
            Array.from(arr[firstChild].childs).forEach((j) => {
                if (d < range.length) {
                    j.className += ' selected';
                    j.setAttribute('data-name', name);
                    d++;
                }
            });
            menuGamer.removeElement(name);
        },
        _horizontalShip = (num, name) => {
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
            _changeHorizontalBox(_resultTrs, _range, name);
        },
        _placeShip = (ship, position) => {
            let num = 0,
                result = {},
                selectBox = new _MenuGamer(),
                defaultPosition = (position !== null) ? position : 'horizontal',
                defaultShip = () => {
                    let select = consts.DOC.getElementById('gamerSelect');
                    Object.keys(select.childNodes).forEach((x) => {
                        if (select.hasOwnProperty(x) && num < 1) {
                            let selected = select.childNodes[x];
                            result.value = selected.value;
                            result.name = selected.getAttribute('data-name');
                            result.boxes = selected.getAttribute('data-box');
                            num++;
                        }
                    });
                    return result;
                },
                shipSelected = (typeof ship === 'object' && Object.keys(ship).length !== 0) ? ship : defaultShip();

            if (shipSelected.value && shipSelected.value !== '- NO SHIPS -' && defaultPosition) {
                switch (defaultPosition) {
                    case 'vertical':
                        _verticalShip(shipSelected.boxes, shipSelected.name);
                        break;
                    case 'horizontal':
                        _horizontalShip(shipSelected.boxes, shipSelected.name);
                        break;
                }
            } else if (shipSelected.value && !defaultPosition) {
                let message = 'You must choose one ship and the position you want to place it.';
                utils.message('red', message);
            } else if (!shipSelected.value && defaultPosition) {
                let message = 'There are no more ships to select.';
                selectBox.insertHtml('- NO SHIPS -');
                utils.message('red', message);
            }
            _shipSelected = {};
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

    class _Ships {
        constructor() {
            this.ships = {
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
            };
        }
        getShipName(ship) {
            return this.ships[ship].name;
        }
        getShipLength(ship) {
            return this.ships[ship].boxes;
        }
    }

    class _MenuGamer {
        constructor() {
            this.menuGamer = consts.DOC.createElement('div');
            this.menuGamer.id = 'menuGamer';
            this.ships = new _Ships();
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
            let ships = this.ships.ships,
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

            divSelect3.appendChild(placeButton);
            this.menuGamer.appendChild(divSelect3);

            placeButton.onclick = () => {
                let position = consts.DOC.getElementById('selectPosition');
                _placeShip(_shipSelected, position.value);
            };
        }
        appendMenuGamer(parent) {
            this.shipsMenu();
            parent.appendChild(this.menuGamer);
        }
        insertHtml(text) {
            let option = consts.DOC.createElement('option'),
                select = consts.DOC.getElementById('gamerSelect');
            option.value = text;
            option.innerHTML = text;
            select.appendChild(option);
        }
    }

    class _PanelGamer {
        constructor() {
            this.panelGamer = consts.DOC.createElement('div');
            this.panelGamer.id = 'panelGamer';

            this._menuGamer = new _MenuGamer();
            this._menuGamer.appendMenuGamer(this.panelGamer);

            this._table = _createTable();
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
        Ships: _Ships,
        MenuGamer: _MenuGamer,
        PanelGamer: _PanelGamer,
        createTable: _createTable
    };
});
