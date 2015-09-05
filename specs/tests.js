define(['app', 'buttons', 'consts', 'sinon'], function(app, buttons, consts, sinon) {

    describe('Test app', function() {
        'use strict';

        beforeEach(function() {
            this.server = sinon.fakeServer.create();
            this.body = window.document.body;

            // create container
            var container = window.document.createElement('div');
            container.id = 'parentContainer';

            // append to body
            this.body.appendChild(container);
        });

        afterEach(function() {
            this.server.restore();
        });

        it('Test gameMenu method', function() {
            console.log(app);
            var gameMenu = new GameMenu(),
                container = document.getElementById('parentContainer');

            gameMenu.appendMenu(container);

            expect(container.childNodes.length).toBeGreaterThan(0);
            expect(container.childNodes[0].id).toBe('gameMenu');
        });
    });
});
