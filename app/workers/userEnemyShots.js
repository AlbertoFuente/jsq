(function() {
    'use strict';

    let _randomShot = () => {
            return Math.floor(Math.random() * (10 - 1) + 1);
        },
        _setBoxParent = (parent) => {
            if (!parent) {
                let num = _randomShot(),
                    prefix = 'tr';
                return prefix + num;
            } else {
                // TODO: pending...
            }
        },
        _setBox = (box) => {
            if (!parent) {
                let num = _randomShot(),
                    prefix = 'td';
                return prefix + num;
            } else {
                // TODO: pending...
            }
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
                box: box
            }
        };

    postMessage('module loaded');
    onmessage = (e) => {
        switch (e.data) {
            case 'response':
                _handleShots('empty');
                break;
            default:
                let prom = new Promise((resolve) => {
                    resolve(_handleShots(JSON.parse(e.data)));
                });
                prom.then((result) => {
                    postMessage(JSON.stringify(result));
                });
                break;
        }
    };
}());
