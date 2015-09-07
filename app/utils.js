define('utils', ['consts'], function(consts) {
    'use strict';

    let _emptyContainer = (container) => {
        let element = consts.DOC.getElementById(container),
            elementChilds = element.childNodes;

        Array.from(elementChilds).forEach((key) => {
            if (key.tagName === 'DIV') {
                element.removeChild(key);
            }
        });
    }

    return {
        emptyContainer: _emptyContainer
    }
});
