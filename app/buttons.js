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
    // type
    _START.setAttribute('type', 'button');
    _SAVE.setAttribute('type', 'button');
    _LOAD.setAttribute('type', 'button');
    _EXIT.setAttribute('type', 'button');
    _NEXT.setAttribute('type', 'button');
    _PREV.setAttribute('type', 'button');
    // VALUES
    _START.value = 'START';
    _SAVE.value = 'SAVE';
    _LOAD.value = 'LOAD';
    _EXIT.value = 'EXIT';
    _NEXT.value = 'NEXT';
    _PREV.value = 'PREV';

    return {
        START: _START,
        SAVE: _SAVE,
        LOAD: _LOAD,
        EXIT: _EXIT,
        NEXT: _NEXT,
        PREV: _PREV
    }
});
