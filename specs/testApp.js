define(['app', 'buttons', 'consts', 'components', 'sinon'], function(app, buttons, consts, components, sinon) {
    describe('Test app', function() {
        'use strict';

        beforeEach(function() {
            this.server = sinon.fakeServer.create();
            this.body = consts.DOC.body;
            this.gameMenuClass = new components.GameMenu();
            this.startButtonsClass = new components.StartButtons();
            this.gameContainerClass = new components.GameContainer();

            // create container
            var container = consts.DOC.createElement('div');
            container.id = 'parentContainer';

            // append to body
            this.body.appendChild(container);
        });

        afterEach(function() {
            this.server.restore();
        });

        // test init method
        it('Test app.init method is called', function() {
            spyOn(app, 'init');

            app.init();
            expect(app.init).toBeDefined();
            expect(app.init).toHaveBeenCalled();
            expect(app.init.calls.count()).toBe(1);
        });

        // test Class GameMenu
        it('Test GameMenu Class [appendMenu] method', function() {
            var container = consts.DOC.getElementById('parentContainer');

            this.gameMenuClass.appendMenu(container);

            expect(container.childNodes.length).toBeGreaterThan(0);
            expect(container.childNodes[0].id).toBe('gameMenu');
        });
        it('Test Gamemenu Class [getGameMenu] method', function() {
            var getGameMenu = this.gameMenuClass.getGameMenu(),
                mockResponse = '<div id="gameMenu"></div>';

            expect(getGameMenu.tagName).toBe('DIV');
            expect(getGameMenu.outerHTML).toBe(mockResponse);
        });
        it('Test GameMenu Class [getParent] method', function() {
            var getParent = this.gameMenuClass.getParent(),
                mockResponse = '<div id="parentContainer"><div id="gameMenu"></div></div>';

            expect(getParent.tagName).toBe('DIV');
            expect(getParent.outerHTML).toBe(mockResponse);
        });

        // test Class StartButtons
        it('Test StartButtons Class [appendStartButton, appendLoadButton, appendOptionsButton, appendExitButton] methods', function() {
            var gameContainer = consts.DOC.getElementById('gameMenu');

            this.startButtonsClass.appendStartButton(gameContainer);
            expect(gameContainer.childNodes.length).toBeGreaterThan(0);
            expect(gameContainer.childNodes[0].id).toBe('startButton');

            this.startButtonsClass.appendLoadButton(gameContainer);
            expect(gameContainer.childNodes.length).toBeGreaterThan(1);
            expect(gameContainer.childNodes[1].id).toBe('loadButton');

            this.startButtonsClass.appendOptionsButton(gameContainer);
            expect(gameContainer.childNodes.length).toBeGreaterThan(2);
            expect(gameContainer.childNodes[2].id).toBe('optionsButton');

            this.startButtonsClass.appendExitButton(gameContainer);
            expect(gameContainer.childNodes.length).toBeGreaterThan(3);
            expect(gameContainer.childNodes[3].id).toBe('exitButton');
        });

        // test Class gameContainer
        it('Test GameContainer [getGameContainer] method', function() {
            var getGameContainer = this.gameContainerClass.getGameContainer(),
                mockResponse = '<div id="gameContainer"></div>';

            expect(getGameContainer.tagName).toBe('DIV');
            expect(getGameContainer.outerHTML).toBe(mockResponse);
        });
        it('Test GAMEcontainer [appendGameContainer] method', function() {
            var container = consts.DOC.getElementById('parentContainer');

            this.gameContainerClass.appendGameContainer(container);

            expect(container.childNodes.length).toBeGreaterThan(0);
            expect(container.childNodes[0].id).toBe('gameMenu');
        });
    });
});
