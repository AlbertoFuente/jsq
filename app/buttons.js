define('buttons', ['consts'], function(consts) {
    'use strict';

    const
        _START = consts.DOC.createElement('input'),
        _SAVE = consts.DOC.createElement('input'),
        _LOAD = consts.DOC.createElement('input'),
        _EXIT = consts.DOC.createElement('input'),
        _NEXT = consts.DOC.createElement('input'),
        _PREV = consts.DOC.createElement('input');
    // ids
    _START.id = 'startButton';
    _SAVE.id = 'savebutton';
    _LOAD.id = 'loadButton';
    _EXIT.id = 'exitButton';
    _NEXT.id = 'nextButton';
    _PREV.id = 'prevButton';

    return {
        START: _START,
        SAVE: _SAVE,
        LOAD: _LOAD,
        EXIT: _EXIT,
        NEXT: _NEXT,
        PREV: _PREV
    }
});
