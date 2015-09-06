(function() {
    'use strict';

    require.config({
        baseUrl: 'app',
        paths: {
            'consts': 'consts',
            'buttons': 'buttons',
            'components': 'components',
            'events': 'events',
            'app': 'app'
        },
        callback: function() {
            'use strict';

            require(['app', 'consts', 'buttons', 'events', 'components'], function(app, consts, buttons, events, components) {
                app.init();
            });
        }
    })
}());
