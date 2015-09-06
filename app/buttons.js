define('buttons', ['consts'], function(consts) {
    'use strict';

    const
        _START = consts.DOC.createElement('input'),
        _SAVE = consts.DOC.createElement('input'),
        _LOAD = consts.DOC.createElement('input'),
        _EXIT = consts.DOC.createElement('input'),
        _NEXT = consts.DOC.createElement('input'),
        _BACK = consts.DOC.createElement('input'),
        _OPTIONS = consts.DOC.createElement('input');

    // ids
    _START.id = 'startButton';
    _SAVE.id = 'savebutton';
    _LOAD.id = 'loadButton';
    _EXIT.id = 'exitButton';
    _NEXT.id = 'nextButton';
    _BACK.id = 'backButton';
    _OPTIONS.id = 'optionsButton';
    // type
    _START.setAttribute('type', 'button');
    _SAVE.setAttribute('type', 'button');
    _LOAD.setAttribute('type', 'button');
    _EXIT.setAttribute('type', 'button');
    _NEXT.setAttribute('type', 'button');
    _BACK.setAttribute('type', 'button');
    _OPTIONS.setAttribute('type', 'button');
    // VALUES
    _START.value = 'START';
    _SAVE.value = 'SAVE';
    _LOAD.value = 'LOAD';
    _EXIT.value = 'EXIT';
    _NEXT.value = 'NEXT';
    _BACK.value = 'BACK';
    _OPTIONS.value = 'OPTIONS';

    return {
        START: _START,
        SAVE: _SAVE,
        LOAD: _LOAD,
        EXIT: _EXIT,
        NEXT: _NEXT,
        BACK: _BACK,
        OPTIONS: _OPTIONS
    }
});
