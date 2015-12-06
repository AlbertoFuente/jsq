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
                result = null;

            directions[Symbol.iterator] = function() {
                return {
                    next: function() {
                        if (this._top) {
                            let newNum = ((trNum - 1) > 0) ? trNum - 1 : null,
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
                            this._top = false;
                            return {
                                value: {
                                    'tr': (newTr) ? newTr : obj.parent,
                                    'td': obj.box
                                },
                                done: false
                            };
                        } else if (this._bottom) {
                            let newNum = ((trNum - 1) > 0) ? trNum + 1 : null,
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
                            this._bottom = false;
                            return {
                                value: {
                                    'tr': (newTr) ? newTr : obj.parent,
                                    'td': obj.box
                                },
                                done: false
                            };
                        } else if (this._left) {
                            let newTd = 'td' + (tdNum + 1),
                                trKeys = Array.from(obj.tr, (x, i) => (x === obj.parent) ? i : -1),
                                tds = Array.from(trKeys, (x) => (trKeys !== -1 && obj.td[x] !== newTd) ? newTd : -1);

                            if (tds !== -1) {
                                obj.box = newTd;
                            } else {
                                obj.box = false;
                            }
                            this._left = false;
                            return {
                                value: {
                                    'tr': obj.parent,
                                    'td': obj.box
                                },
                                done: false
                            };
                        } else if (this._right) {
                            let newTd = 'td' + (tdNum - 1),
                                trKeys = Array.from(obj.tr, (x, i) => (x === obj.parent) ? i : -1),
                                tds = Array.from(trKeys, (x) => (trKeys !== -1 && obj.td[x] !== newTd) ? newTd : -1);

                            if (tds !== -1) {
                                obj.box = newTd;
                            } else {
                                obj.box = false;
                            }
                            this._right = false;
                            return {
                                value: {
                                    'tr': obj.parent,
                                    'td': obj.box
                                },
                                done: false
                            };
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
                    if (!_obj.done) {
                        if (_obj.value['td'] !== false) {
                            obj.parent = _obj.value['tr'];
                            obj.box = _obj.value['td'];
                        } else {
                            nextBox();
                        }
                    }
                }());
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
