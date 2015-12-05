(function() {
    'use strict';
    postMessage('module loaded');
    onmessage = (e) => {
        let response = 'Worker response';
        // TODO: Pending...
        postMessage(response);
    };
}());
