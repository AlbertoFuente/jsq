(function() {
    'use strict';

    let _randomShot = () => {
            return Math.floor(Math.random() * (10 - 1) + 1);
        },
        _responseObj = {
            parent: null,
            box: null,
            tr: [],
            td: [],
            shooted: false
        },
        _prefixes = ['tr', 'td'],
        _setResponseObj = (obj) => {
            let trPrefix = _prefixes[0],
                tdPrefix = _prefixes[1];

            if (obj === 'response') {
                _responseObj.parent = trPrefix + _randomShot();
                _responseObj.box = tdPrefix + _randomShot();
                return _responseObj;
            } else {
                if (obj.shooted) {
                    let shootedProm = new Promise((resolve) => {
                        resolve(_setShootedBox(obj));
                    });
                    shootedProm.then((result) => {
                        obj = result;
                    });
                    return obj;
                } else {
                    let unShootedProm = new Promise((resolve) => {
                        resolve(_setUnShootedBox(obj));
                    });
                    unShootedProm.then((result) => {
                        obj = result;
                    });
                    return obj;
                }
            }
        },
        _setShootedBox = (obj) => {
            let trNum = obj.parent.slice(2, 3),
                tdNum = obj.box.slice(2, 3),
                directions = ['top', 'bottom', 'left', 'right'],
                result = null,
                objShooted = {
                    parent: [],
                    box: [],
                    direction: null,
                    prev: 0
                },
                getTopBottomPosition = (pos) => {
                    if ((trNum - 1) > 0) {
                        let newNum = (pos === 'top') ? parseFloat(trNum) - 1 : parseFloat(trNum) + 1,
                            newTr = (newNum) ? _prefixes[0] + newNum : null,
                            self = this;
                        if (newTr) {
                            let trKeys = Array.from(obj.tr, (x, i) => (x === newTr) ? i : -1),
                                resObj = Array.from(trKeys).forEach((x) => {
                                    if (x !== -1) {
                                        if (obj.td[x] !== obj.box) {
                                            return obj.box;
                                        } else {
                                            return obj.box = false;
                                        }
                                    }
                                });
                        } else {
                            obj.box = false;
                        }
                        return {
                            value: {
                                'tr': (newTr) ? newTr : obj.parent,
                                'td': obj.box,
                                'direction': pos
                            },
                            done: false
                        };
                    } else {
                        return {
                            value: {
                                'tr': objShooted.parent[0],
                                'td': objShooted.box[0],
                                'position': (pos === 'top') ? 'bottom' : 'top'
                            },
                            done: false
                        };
                    }
                },
                getLeftRightPosition = (pos) => {
                    if ((trNum - 1) > 0) {
                        let newTd = (pos === 'left') ? 'td' + (parseFloat(tdNum) + 1) : 'td' + (parseFloat(tdNum) - 1),
                            trKeys = Array.from(obj.tr, (x, i) => (x === obj.parent) ? i : -1),
                            tds = Array.from(trKeys, (x) => (trKeys !== -1 && obj.td[x] !== newTd) ? newTd : -1);

                        if (tds !== -1) {
                            obj.box = newTd;
                        } else {
                            obj.box = false;
                        }
                        return {
                            value: {
                                'tr': obj.parent,
                                'td': obj.box,
                                'direction': pos
                            },
                            done: false
                        };
                    } else {
                        return {
                            value: {
                                'tr': objShooted.parent[0],
                                'td': objShooted.box[0],
                                'position': (pos === 'left') ? 'right' : 'left'
                            },
                            done: false
                        };
                    }
                };


            directions[Symbol.iterator] = function() {
                return {
                    next: function() {
                        if (this._top) {
                            this._top = false;
                            return getTopBottomPosition('top');
                        } else if (this._bottom) {
                            this._bottom = false;
                            return getTopBottomPosition('bottom');
                        } else if (this._left) {
                            this._left = false;
                            return getLeftRightPosition('left');
                        } else if (this._right) {
                            this._right = false;
                            return getLeftRightPosition('right');
                        } else {
                            return {
                                done: true
                            };
                        }
                    },
                    _top: true,
                    _bottom: true,
                    _left: true,
                    _right: true
                };
            };
            result = directions[Symbol.iterator]();

            if (obj.shooted) {
                let objResult = () => {
                    return result.next();
                };
                (function nextBox() {
                    let _obj = objResult();
                    objShooted.parent.push(_obj.tr);
                    objShooted.box.push(_obj.td);
                    objShooted.direction = _obj.value.direction;
                    objShooted.prev = 1;
                    if (!_obj.done) {
                        if (_obj.value['td'] !== false) {
                            obj.parent = _obj.value['tr'];
                            obj.box = _obj.value['td'];
                        } else {
                            obj.parent = objShooted.parent[0];
                            obj.box = objShooted.box[0];
                            nextBox();
                        }
                    }
                }());
            } else {
                objShooted.parent = [];
                objShooted.box = [];
                objShooted.direction = null;
                objShooted.prev = 0;
            }
        },
        _setUnShootedBox = (obj) => {
            let randomParent = () => {
                    return _prefixes[0] + _randomShot();
                },
                randomBox = () => {
                    return _prefixes[1] + _randomShot();
                };

            return (function checkShooted() {
                let tr = randomParent(),
                    td = randomBox();

                if (obj.tr.findIndex(x => x === tr) < 0) {
                    obj.parent = tr;
                    obj.box = td;
                } else {
                    let trKeys = Array.from(obj.tr, (x, i) => (x === tr) ? i : -1);

                    Array.from(trKeys).forEach((x) => {
                        if (x !== -1) {
                            if (obj.td[x] !== td) {
                                obj.parent = tr;
                                obj.box = td;
                            } else {
                                checkShooted();
                            }
                        }
                    });
                }
                return obj;
            }());
        },
        _handleShots = (arg) => {
            return _setResponseObj(arg);
        };

    postMessage('module loaded');
    onmessage = (e) => {
        switch (e.data) {
            case 'response':
                let emptyProm = new Promise((resolve) => {
                    resolve(_handleShots('response'));
                });
                emptyProm.then((result) => {
                    postMessage(JSON.stringify(result));
                });
                break;
            default:
                let objProm = new Promise((resolve) => {
                    resolve(_handleShots(JSON.parse(e.data)));
                });
                objProm.then((result) => {
                    postMessage(JSON.stringify(result));
                });
                break;
        }
    };
}());
