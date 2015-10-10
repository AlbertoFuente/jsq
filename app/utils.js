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
        },
        _message = (type, message) => {
            let parentContainer = consts.DOC.getElementById('gameContainer'),
                toggleClass = (type) => {
                    let typeClass = null;

                    switch (type) {
                        case 'green':
                            typeClass = 'messageGreen';
                            break;
                        case 'red':
                            typeClass = 'messageRed';
                            break;
                    }
                    return typeClass;
                },
                showMessage = (container) => {
                    container.className += ' showMessage';
                    consts.WIN.setTimeout(() => {
                        container.className = toggleClass(type);
                    }, 5000);
                },
                createMessage = (type, message) => {
                    let container = consts.DOC.createElement('div'),
                        text = consts.DOC.createElement('p');

                    container.id = 'messageContainer';
                    container.className = toggleClass(type);
                    text.id = 'messageText';
                    text.innerHTML = message;

                    container.appendChild(text);
                    parentContainer.appendChild(container);
                    showMessage(container);
                };

            if (consts.DOC.getElementById('messageContainer')) {
                let messageText = consts.DOC.getElementById('messageText'),
                    messagecontainer = consts.DOC.getElementById('messageContainer');

                if (messageText) {
                    messageText.innerHTML = message;
                    messagecontainer.className = toggleClass(type);
                    showMessage(messagecontainer);
                }
            } else {
                createMessage(type, message);
            }
        },
        _difference = (a, b) => {
            if (a && b) {
                return a.filter((x) => {
                    return b.indexOf(x) < 0;
                });
            } else {
                return [];
            }
        },
        _tooltip = (element, name, show) => {
            let container = consts.DOC.createElement('div'),
                containerText = consts.DOC.createElement('p'),
                position = element.getBoundingClientRect(),
                parentContainer = consts.DOC.getElementById('gameContainer');

            container.id = 'shipTooltip';
            container.appendChild(containerText);

            container.style.top = (position.top - 80) + 'px';
            container.style.left = (position.left - 50) + 'px';

            if (show) {
                containerText.innerHTML = name;
                container.classList.remove('hide');
                container.className = 'show';
            } else {
                container.classList.remove('show');
                container.className = 'hide';
            }

            parentContainer.appendChild(container);
        };

    return {
        emptyContainer: _emptyContainer,
        range: _range,
        message: _message,
        diff: _difference,
        tooltip: _tooltip
    };
});
