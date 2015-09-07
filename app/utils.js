define('utils', ['consts'], function(consts) {
    'use strict';

    let _emptyContainer = (container) => {
        let element = consts.DOC.getElementById(container),
            elementChilds = element.childNodes,
            i = 0,
            len = elementChilds.length;

        for (i; i < len; i++) {
            if (elementChilds[i].tagName === 'DIV') {
                element.removeChild(elementChilds[i]);
            }
        }
    }

    return {
        emptyContainer: _emptyContainer
    }
});
