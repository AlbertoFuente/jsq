(function() {
    'use strict';

    require.config({
        baseUrl: 'app',
        paths: {
            'consts': 'consts',
            'app': 'app'
        },
        callback: function() {
            'use strict';

            require(['app', 'consts'], function(app, consts) {
                var menu = new app.GameMenu(),
                    parent = menu.getParent();

                menu.appendMenu(parent);
            });
        }
    })
}());
