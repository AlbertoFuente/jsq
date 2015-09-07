define('events', ['components', 'consts', 'buttons', 'utils'], function(components, consts, buttons, utils) {
    'use strict';

    const
        _start = () => {
            let gameContainer = new components.GameContainer();

            utils.emptyContainer('parentContainer');
            gameContainer.appendGameContainer(consts.DOC.getElementById('parentContainer'));
            // TODO: pending...
        },
        _save = () => {
            // TODO: pending...
        },
        _load = () => {
            // TODO: pending...
        },
        _options = () => {
            utils.emptyContainer('parentContainer');
            // TODO: pending...
        },
        _exit = () => {
            // TODO: pending...
        },
        _next = () => {
            utils.emptyContainer('parentContainer');
            // TODO: pending...
        },
        _back = () => {
            utils.emptyContainer('parentContainer');
            // TODO: pending...
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
