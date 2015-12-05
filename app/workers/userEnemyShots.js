(function() {
    'use strict';

    let _randomShot = () => {
            return Math.floor(Math.random() * (10 - 1) + 1);
        },
        _setBoxParent = () => {
            let num = _randomShot();
        },
        _setBox = () => {
            let num = _randomShot();
        },
        _handleShots = (arg) => {
            if (arg === 'empty') {
                _setBoxParent();
                _setBox();
            } else {
                console.log(arguments);
            }
        };

    postMessage('module loaded');
    onmessage = (e) => {
        switch (e.data) {
            case 'response':
                _handleShots('empty');
                break;
            default:
                _handleShots(e.data);
                break;
        }
    };
}());
