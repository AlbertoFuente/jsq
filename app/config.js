(function() {
    'use strict';

    require.config({
        baseUrl: 'app',
        paths: {
            'consts': 'consts',
            'buttons': 'buttons',
            'app': 'app'
        },
        callback: function() {
            'use strict';

            require(['app', 'consts'], function(app, consts) {
                app.init();
            });
        }
    })
}());
