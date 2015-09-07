(function() {
    'use strict';

    require.config({
        baseUrl: 'app',
        paths: {
            'utils': 'utils',
            'consts': 'consts',
            'buttons': 'buttons',
            'components': 'components',
            'events': 'events',
            'app': 'app'
        },
        callback: function() {
            'use strict';

            require(['utils', 'app', 'consts', 'buttons', 'events', 'components'], function(utils, app, consts, buttons, events, components) {
                app.init();
            });
        }
    })
}());
