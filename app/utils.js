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
        },
        _range = (start, end, step) => {
            let range = [],
                alp = 'abcdefghijklmnopqrstuvwxyz';

            if (typeof start === 'number' && typeof end === 'number') {
                range[0] = start;
                step = step || 1;

                while (start + step <= end) {
                    range[range.length] = start += step;
                }
            } else {
                if (start === start.toUpperCase()) {
                    end = end.toUpperCase();
                    alp = alp.toUpperCase();
                }
                alp = alp.substring(alp.indexOf(start), alp.indexOf(end) + 1);
                range = alp.toUpperCase().split('');
            }
            return range;
        }

    return {
        emptyContainer: _emptyContainer,
        range: _range
    }
});
