importScripts('../../node_modules/requirejs/require.js');

require(['../utils.js'], function(utils) {
    'use strict';

    let _ships = ['aircraftCarrier', 'battleship', 'submarine', 'destroyer', 'patrolBoat'],
        _randomPosition = () => {
            return utils.randomPosition();
        },
        _randomNumber = () => {
            return utils.randomNumber(1, 10);
        },
        _controlPlaceShip = (shipLen, number) => {
            return ((shipLen + number) <= 10) ? true : false;
        },
        _controlBoxes = (parent, child, position) => {
            let result = false;
            if (Object.keys(_enemyShips).length > 0) {
                Array.from(_ships).forEach((x) => {
                    if (position) {
                        switch (position) {
                            case 'horizontal':
                                if (_enemyShips[x] && _enemyShips[x].hasOwnProperty('trParent')) {
                                    let trControl = _enemyShips[x]['trParent'].findIndex(d => d === parent);
                                    if (trControl && trControl > -1) {
                                        let tdControl = _enemyShips[x]['tdChild'].findIndex(d => d === child);
                                        if (tdControl > -1) {
                                            result = true;
                                        }
                                    }
                                }
                                break;
                            case 'vertical':
                                if (_enemyShips[x] && _enemyShips[x].hasOwnProperty('tdChild')) {
                                    let tdControl = _enemyShips[x]['tdChild'].findIndex(d => d === child);
                                    if (tdControl && tdControl > -1) {
                                        let trControl = _enemyShips[x]['trParent'].findIndex(d => d === parent);
                                        if (trControl > -1) {
                                            result = true;
                                        }
                                    }
                                }
                                break;
                        }
                    }
                });
            }
            return result;
        },
        _enemyShips = {},
        _setEnemyShips = (ships) => {
            console.log(ships);
            Array.from({
                length: _ships.length
            }, (x, i) => {
                let shipLen = ships[_ships[i]].boxes,
                    position = _randomPosition(),
                    number = _randomNumber(),
                    placeControl = [],
                    self = this,
                    setVertical = (number) => {
                        let td = 'td' + _randomNumber(),
                            num = number,
                            j = 0,
                            control = () => {
                                let numRange = utils.range(number, number + shipLen, 0);
                                placeControl = [];
                                Array.from(numRange).forEach((x) => {
                                    let result = _controlBoxes('tr' + x, td, position);
                                    placeControl.push(result);
                                });
                            };
                        _enemyShips[_ships[i]] = {
                            'trParent': [],
                            'tdChild': [td],
                            'position': 'vertical'
                        };
                        $.when(control()).then(() => {
                            (function vertical(placeControl) {
                                let pControl = placeControl.findIndex((x) => x === true);
                                if (pControl < 0) {
                                    while (j < shipLen) {
                                        self._enemyShips[_ships[i]]['trParent'].push('tr' + num);
                                        j++;
                                        num++;
                                    }
                                } else {
                                    td = ['td' + _randomNumber()];
                                    self._enemyShips[_ships[i]]['tdChilds'] = td;
                                    $.when(control()).then(vertical(placeControl));
                                }
                            }(placeControl));
                        });
                    },
                    setHorizontal = (number) => {
                        let trParent = 'tr' + _randomNumber(),
                            j = 0,
                            num = number,
                            control = () => {
                                let numRange = utils.range(number, number + shipLen, 0);
                                placeControl = [];
                                Array.from(numRange).forEach((x) => {
                                    let result = _controlBoxes(trParent, 'td' + x, position);
                                    placeControl.push(result);
                                });
                            };
                        _enemyShips[_ships[i]] = {
                            'trParent': [trParent],
                            'tdChild': [],
                            'position': 'horizontal'
                        };
                        $.when(control()).then(() => {
                            (function horizontal(placeControl) {
                                let pControl = placeControl.findIndex((x) => x === true);
                                if (pControl < 0) {
                                    while (j < shipLen) {
                                        self._enemyShips[_ships[i]]['tdChild'].push('td' + num);
                                        j++;
                                        num++;
                                    }
                                } else {
                                    trParent = ['tr' + _randomNumber()];
                                    self._enemyShips[_ships[i]]['trParent'] = trParent;
                                    $.when(control()).then(horizontal(placeControl));
                                }
                            }(placeControl));
                        });
                    };
                (function canPlace(cP) {
                    if (!cP) {
                        number = _randomNumber();
                        canPlace(_controlPlaceShip(shipLen, number));
                    } else {
                        switch (position) {
                            case 'vertical':
                                setVertical(number);
                                break;
                            case 'horizontal':
                                setHorizontal(number);
                                break;
                        }
                    }
                }(_controlPlaceShip(shipLen, number)));
            });
            return _enemyShips;
        };

    self.addEventListener('message', function(e) {
        _setEnemyShips(e.data.ships);
    }, false);

});
