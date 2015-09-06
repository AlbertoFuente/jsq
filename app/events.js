define('events', ['consts', 'buttons'], function(consts, buttons) {
    'use strict';

    const
        _start = () => {
            console.log('START');
        },
        _save = () => {
            console.log('SAVE');
        },
        _load = () => {
            console.log('LOAD');
        },
        _options = () => {
            console.log('OPTIONS');
        },
        _exit = () => {
            console.log('EXIT');
        },
        _next = () => {
            console.log('NEXT');
        },
        _back = () => {
            console.log('BACK');
        }

    // on click
    buttons.START.onclick = () => {
        _start();
    };
    buttons.SAVE.onclick = () => {
        _save();
    };
    buttons.LOAD.onclick = () => {
        _load();
    };
    buttons.OPTIONS.onclick = () => {
        _options();
    };
    buttons.EXIT.onclick = () => {
        _exit();
    };
    buttons.NEXT.onclick = () => {
        _next();
    };
    buttons.BACK.onclick = () => {
        _back();
    };

    return {
        start: _start,
        save: _save,
        load: _load,
        options: _options,
        exit: _exit,
        next: _next,
        back: _back
    }
});
