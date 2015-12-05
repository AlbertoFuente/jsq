(function() {
    'use strict';

    let _randomShot = () => {
            return Math.floor(Math.random() * (10 - 1) + 1);
        },
        _setBoxParent = (parent) => {
            let num = null,
                prefix = null;
            if (!parent) {
                num = _randomShot();
                prefix = 'tr';
            } else {
                // TODO: pending...
            }

            return prefix + num;
        },
        _setBox = (box) => {
            let num = null,
                prefix = null;
            if (!box) {
                num = _randomShot();
                prefix = 'td';
            } else {
                // TODO: pending...
            }

            return prefix + num;
        },
        _handleShots = (arg) => {
            let parent = null,
                box = null;
            if (arg === 'empty') {
                parent = _setBoxParent();
                box = _setBox();
            } else {
                parent = _setBoxParent(arg.parent);
                box = _setBox(arg.box);
            }

            return {
                parent: parent,
                box: box,
                tr: [],
                td: []
            }
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
