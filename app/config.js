(function() {
    'use strict';

    require.config({
        baseUrl: 'app',
        shim: {
            'app': 'app'
        },
        callback: function() {
            'use strict';

            require(['app'], function(app) {
                var menu = new app.GameMenu(),
                    parent = menu.getParent();
                menu.appendMenu(parent);
            });
        }
    })
}());
