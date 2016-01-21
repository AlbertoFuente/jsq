(function() {
    'use strict';

    let utils = {
            range: (start, end, step) => {
                let range = [],
                    alp = 'abcdefghijklmnopqrstuvwxyz';

                if (typeof start === 'number' && typeof end === 'number') {
                    range[0] = start;
                    step = step || 1;

                    while (start + step <= end) {
                        range[range.length] = start += step;
                    }
                } else {
                    if (start === start.toUpperCase()) {
                        end = end.toUpperCase();
                        alp = alp.toUpperCase();
                    }
                    alp = alp.substring(alp.indexOf(start), alp.indexOf(end) + 1);
                    range = alp.toUpperCase().split('');
                }
                return range;
            },
            position: ['vertical', 'horizontal'],
            randomNumber: (min, max) => {
                let numRange = utils.range(min, max, 0),
                    randomNum = Math.floor(Math.random() * numRange.length);
                return numRange[randomNum];
            },
            randomPosition: () => {
                let _getPosition = Math.floor(Math.random() * utils.position.length);
                return utils.position[_getPosition];
            }
        },
        _ships = ['aircraftCarrier', 'battleship', 'submarine', 'destroyer', 'patrolBoat'],
        _randomPosition = () => {
            return utils.randomPosition();
        },
        _randomNumber = () => {
            return utils.randomNumber(1, 10);
        },
        _controlPlaceShip = (shipLen, number) => {
            return !!((shipLen + number) <= 10);
        },
        _controlBoxes = (parent, child, position) => {
            let result = false;
            if (Object.keys(_enemyShips).length > 0) {
                Array.from(_ships).forEach((x) => {
                    let posObj = {
                        'horizontal': (x) => {
                            if (_enemyShips[x] && _enemyShips[x]['trParent']) {
                                let trControl = _enemyShips[x]['trParent'].findIndex(d => d === parent);
                                if (trControl && trControl > -1) {
                                    let tdControl = _enemyShips[x]['tdChild'].findIndex(d => d === child);
                                    if (tdControl > -1) {
                                        result = true;
                                    }
                                }
                            }
                        },
                        'vertical': (x) => {
                            if (_enemyShips[x] && _enemyShips[x]['tdChild']) {
                                let tdControl = _enemyShips[x]['tdChild'].findIndex(d => d === child);
                                if (tdControl && tdControl > -1) {
                                    let trControl = _enemyShips[x]['trParent'].findIndex(d => d === parent);
                                    if (trControl > -1) {
                                        result = true;
                                    }
                                }
                            }
                        }
                    };
                    if (position && posObj[position]) {
                        posObj[position](x);
                    } else {
                        return false;
                    }
                });
            }
            return result;
        },
        _enemyShips = {},
        _setEnemyShips = (ships) => {
            Array.from({
                length: _ships.length
            }, (x, i) => {
                let shipLen = ships[_ships[i]].boxes,
                    position = _randomPosition(),
                    number = _randomNumber(),
                    placeControl = [],
                    setVertical = (number) => {
                        let td = ['td' + _randomNumber()],
                            num = number,
                            j = 0,
                            prom = new Promise((resolve) => {
                                let numRange = utils.range(number, number + shipLen, 0);
                                placeControl = [];
                                Array.from(numRange).forEach((x) => {
                                    let result = _controlBoxes('tr' + x, td, position);
                                    placeControl.push(result);
                                });
                                resolve(placeControl);
                            });
                        _enemyShips[_ships[i]] = {
                            'trParent': [],
                            'tdChild': td,
                            'position': 'vertical'
                        };
                        prom.then((result) => {
                            (function vertical(result) {
                                let pControl = result.findIndex((x) => x === true);
                                if (pControl < 0) {
                                    while (j < shipLen) {
                                        _enemyShips[_ships[i]]['trParent'].push('tr' + num);
                                        j++;
                                        num++;
                                    }
                                } else {
                                    td = ['td' + _randomNumber()];
                                    _enemyShips[_ships[i]]['tdChilds'] = td;
                                    prom.then(vertical(result));
                                }
                            }(result));
                        });
                    },
                    setHorizontal = (number) => {
                        let trParent = ['tr' + _randomNumber()],
                            j = 0,
                            num = number,
                            prom = new Promise((resolve) => {
                                let numRange = utils.range(number, number + shipLen, 0);
                                Array.from(numRange).forEach((x) => {
                                    let result = _controlBoxes(trParent, 'td' + x, position);
                                    placeControl.push(result);
                                });
                                resolve(placeControl);
                            });
                        _enemyShips[_ships[i]] = {
                            'trParent': trParent,
                            'tdChild': [],
                            'position': 'horizontal'
                        };
                        prom.then((result) => {
                            (function horizontal(result) {
                                let pControl = result.findIndex((x) => x === true);
                                if (pControl < 0) {
                                    while (j < shipLen) {
                                        _enemyShips[_ships[i]]['tdChild'].push('td' + num);
                                        j++;
                                        num++;
                                    }
                                } else {
                                    trParent = ['tr' + _randomNumber()];
                                    _enemyShips[_ships[i]]['trParent'] = trParent;
                                    prom.then(horizontal(result));
                                }
                            }(result));
                        });
                    };
                (function canPlace(cP) {
                    if (!cP) {
                        number = _randomNumber();
                        canPlace(_controlPlaceShip(shipLen, number));
                    } else {
                        if (position) {
                            let posObj = {
                                'vertical': () => {
                                    setVertical(number);
                                },
                                'horizontal': () => {
                                    setHorizontal(number);
                                }
                            };
                            if (posObj[position]) {
                                posObj[position]();
                            }
                        }

                    }
                }(_controlPlaceShip(shipLen, number)));
            });
            return _enemyShips;
        };

    postMessage('module loaded');
    onmessage = (e) => {
        let prom = new Promise((resolve) => {
            resolve(_setEnemyShips(e.data.ships));
        });
        prom.then((data) => {
            postMessage(data);
        });
    };
}());
