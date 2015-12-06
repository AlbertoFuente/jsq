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
                        resolve(_setUnShootedBox(obj));
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
            // TODO: pending...
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
            let result = _setResponseObj(arg);
            return result;
        };

    postMessage('module loaded');
    onmessage = (e) => {
        switch (e.data) {
            case 'response':
                console.log('1: ' + e.data);
                let emptyProm = new Promise((resolve) => {
                    resolve(_handleShots('response'));
                });
                emptyProm.then((result) => {
                    postMessage(JSON.stringify(result));
                });
                break;
            default:
                console.log('2: ' + e.data);
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
