define(['app', 'buttons', 'consts', 'sinon'], function(app, buttons, consts, sinon) {
    describe('Test app', function() {
        'use strict';

        beforeEach(function() {
            this.server = sinon.fakeServer.create();
            this.body = consts.DOC.body;

            // create container
            var container = consts.DOC.createElement('div');
            container.id = 'parentContainer';

            // append to body
            this.body.appendChild(container);
        });

        afterEach(function() {
            this.server.restore();
        });
        // test Class GameMenu
        it('Test GameMenu method', function() {
            var gameMenu = new app.GameMenu(),
                container = consts.DOC.getElementById('parentContainer');

            gameMenu.appendMenu(container);

            expect(container.childNodes.length).toBeGreaterThan(0);
            expect(container.childNodes[0].id).toBe('gameMenu');
        });
        // test Class StartButtons
        it('Test StartButtons method', function() {
            var startButtons = new app.StartButtons(),
                gameContainer = consts.DOC.getElementById('gameMenu');

            startButtons.appendStartButton(gameContainer);
            expect(gameContainer.childNodes.length).toBeGreaterThan(0);
            expect(gameContainer.childNodes[0].id).toBe('startButton');

            startButtons.appendLoadButton(gameContainer);
            expect(gameContainer.childNodes.length).toBeGreaterThan(1);
            expect(gameContainer.childNodes[1].id).toBe('loadButton');

            startButtons.appendExitButton(gameContainer);
            expect(gameContainer.childNodes.length).toBeGreaterThan(2);
            expect(gameContainer.childNodes[2].id).toBe('exitButton');
        });
    });
});
