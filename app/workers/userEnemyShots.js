(function() {
    'use strict';

    let _responseObj = {
            parent: null,
            box: null,
            tr: [],
            td: [],
            shooted: false
        },
        _objShooted = {
            parent: [],
            box: [],
            direction: null,
            prev: 0,
            prevParent: null,
            prevBox: null
        },
        _prefixes = ['tr', 'td'],
        _randomShot = () => {
            return Math.floor(Math.random() * (10 - 1) + 1);
        },
        _setResponseObj = (obj) => {
            let trPrefix = _prefixes[0],
                tdPrefix = _prefixes[1],
                toggleShooted = (obj, callback) => {
                    let toggleProm = new Promise((resolve) => {
                        resolve(callback(obj));
                    });
                    toggleProm.then((result) => {
                        obj = result;
                    });
                    return obj;
                };

            if (obj === 'response') {
                return Object.defineProperties(_responseObj, {
                    'parent': {
                        'value': trPrefix + _randomShot(),
                        'writable': true
                    },
                    'box': {
                        'value': tdPrefix + _randomShot(),
                        'writable': true
                    }
                });
            } else {
                if (obj.shooted) {
                    return toggleShooted(obj, _setShootedBox);
                } else {
                    return toggleShooted(obj, _setUnShootedBox);
                }
            }
        },
        getTopBottomPosition = (pos, trNum, tdNum, obj) => {
            if (trNum && (parseFloat(trNum) - 1) > 0) {
                let newNum = (pos === 'top') ? parseFloat(trNum) - 1 : parseFloat(trNum) + 1,
                    newTr = (newNum) ? _prefixes[0] + newNum : null;
                if (newTr) {
                    let trKeys = Array.from(obj.tr, (x, i) => (x === newTr) ? i : -1);
                    Array.from(trKeys).forEach((x) => {
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
                let _parent = () => {
                    return (pos === 'top' && (parseFloat(trNum) - 1) > 0) ?
                        _prefixes[0] + (parseFloat(trNum) - 1) :
                        _prefixes[0] + (parseFloat(trNum) + 1);
                };
                return {
                    value: {
                        'tr': _parent(),
                        'td': obj.box,
                        'position': (pos === 'top') ? 'bottom' : 'top'
                    },
                    done: false
                };
            }
        },
        getLeftRightPosition = (pos, trNum, tdNum, obj) => {
            if ((parseFloat(trNum) - 1) > 0) {
                let newTd = (pos === 'left') ? _prefixes[1] + (parseFloat(tdNum) + 1) : _prefixes[1] + (parseFloat(tdNum) - 1),
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
                        'tr': obj.parent,
                        'td': (pos === 'left') ? _prefixes[1] + (parseFloat(tdNum) + 1) : _prefixes[1] + (parseFloat(tdNum) - 1),
                        'position': (pos === 'left') ? 'right' : 'left'
                    },
                    done: false
                };
            }
        },
        _setShootedBox = (obj) => {
            let trNum = (obj) ? obj.parent.slice(2, 3) : null,
                tdNum = (obj) ? obj.box.slice(2, 3) : null,
                directions = ['top', 'bottom', 'left', 'right'],
                result = null;

            directions[Symbol.iterator] = function() {
                return {
                    next: function() {
                        if (this._top || this._bottom) {
                            let pos = (this._top) ? 'top' : 'bottom';
                            (this._top) ? this._top = false: this._bottom = false;
                            return getTopBottomPosition(pos, trNum, tdNum, obj);
                        } else if (this._left || this._right) {
                            let pos = (this._left) ? 'left' : 'right';
                            (this._left) ? this._left = false: this._right = false;
                            return getLeftRightPosition(pos, trNum, tdNum, obj);
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

                    _objShooted.parent.push(_obj.value.tr);
                    _objShooted.box.push(_obj.value.td);
                    _objShooted.direction = _obj.value.direction;
                    if (_objShooted.prev !== 1) {
                        _objShooted.prevParent = 'tr' + (trNum - 1);
                        _objShooted.prevBox = _obj.value.td;
                    }
                    _objShooted.prev = 1;

                    if (!_obj.done) {
                        if (_obj.value.td !== false) {
                            obj.parent = _obj.value.tr;
                            obj.box = _obj.value.td;
                        } else {
                            obj.parent = _objShooted.parent[0];
                            obj.box = _objShooted.box[0];
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
