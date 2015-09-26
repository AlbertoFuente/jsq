(function() {
    'use strict';

    require.config({
        baseUrl: 'app',
        paths: {
            // vendor
            '$': '../node_modules/jquery/dist/jquery.min',
            // app
            'utils': 'utils',
            'consts': 'consts',
            'buttons': 'buttons',
            'components': 'components',
            'events': 'events',
            'app': 'app'
        },
        shim: {
            '$': {
                exports: '$'
            }
        },
        callback: function() {
            'use strict';

            require([
                '$',
                'utils',
                'app',
                'consts',
                'buttons',
                'events',
                'components'
            ], function($, utils, app, consts, buttons, events, components) {
                app.init();
            });
        }
    });

    requirejs.onError = function(err) {
        console.log(err.requireType);
        if (err.requireType === 'timeout') {
            console.log('modules: ' + err.requireModules);
        }

        throw err;
    };
}());
