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
            'app': 'app',
            // Worker
            'enemyWorker': 'workers/enemyWorker'
        },
        shim: {
            '$': {
                exports: '$'
            },
            'enemyWorker': {
                deps: ['utils']
            }
        },
        callback: function() {
            require([
                'app',
                '$',
                'utils',
                'consts',
                'buttons',
                'events',
                'components'
            ], function(app) {
                app.init();
            });
        }
    });
    /*eslint-disable */
    requirejs.onError = function(err) {
        console.log(err.requireType);
        /*eslint-enable */
        if (err.requireType === 'timeout') {
            /*eslint-disable */
            console.log('modules: ' + err.requireModules);
            /*eslint-enable */
        }

        throw err;
    };
}());
