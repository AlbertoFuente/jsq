define(['$', 'app', 'buttons', 'consts', 'components', 'sinon'], function($, app, buttons, consts, components, sinon) {
    'use strict';

    describe('Test app', function() {
        beforeEach(function() {
            this.server = sinon.fakeServer.create();
            this.body = consts.DOC.body;
            this.gameMenuClass = new components.GameMenu();
            this.startButtonsClass = new components.StartButtons();
            this.gameContainerClass = new components.GameContainer();
            this.panelGamerClass = new components.PanelGamer();
            this.panelEnemyClass = new components.PanelEnemy();
            this.menuGamer = new components.MenuGamer();
            this.menuEnemy = new components.MenuEnemy();
            this.ships = new components.Ships();

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

        // test Class GameContainer
        it('Test GameContainer Class [getGameContainer] method', function() {
            var getGameContainer = this.gameContainerClass.getGameContainer(),
                mockResponse = '<div id="gameContainer"></div>';

            expect(getGameContainer.tagName).toBe('DIV');
            expect(getGameContainer.outerHTML).toBe(mockResponse);
        });
        it('Test GameContainer Class [appendGameContainer] method', function() {
            var container = consts.DOC.getElementById('parentContainer');

            this.gameContainerClass.appendGameContainer(container);

            expect(container.childNodes.length).toBeGreaterThan(0);
            expect(container.childNodes[0].id).toBe('gameMenu');
        });

        // test Class Ships
        it('Test Ships Class get ships object', function() {
            var ships = this.ships.ships;

            expect(typeof ships).toBe('object');
            expect(ships['aircraftCarrier'].name).toBe('Aircraft Carrier');
            expect(ships['aircraftCarrier'].boxes).toBe(5);
            expect(ships['battleship'].name).toBe('Battleship');
            expect(ships['battleship'].boxes).toBe(4);
            expect(ships['submarine'].name).toBe('Submarine');
            expect(ships['submarine'].boxes).toBe(3);
            expect(ships['destroyer'].name).toBe('Destroyer');
            expect(ships['destroyer'].boxes).toBe(3);
            expect(ships['patrolBoat'].name).toBe('Patrol boat');
            expect(ships['patrolBoat'].boxes).toBe(2);
        });
        it('Test Ships Class [getShipName] method', function() {
            var getShip = this.ships.getShipName('battleship');

            expect(getShip).toBe('Battleship');
        });
        it('Test Ships Class [getShipLength] method', function() {
            var getShipLen = this.ships.getShipLength('aircraftCarrier');

            expect(getShipLen).toBe(5);
        });

        // test Class PanelGamer
        it('Test PanelGamer Class [getPanelGamer] method', function() {
            var panelGamer = this.panelGamerClass.getPanelGamer(),
                mockResponseId = 'panelGamer';

            expect(panelGamer.tagName).toBe('DIV');
            expect(panelGamer.id).toBe(mockResponseId);
        });
        it('Test panelGamer Class [appendPanelGamer] method', function() {
            var container = consts.DOC.getElementById('gameContainer');

            this.panelGamerClass.appendPanelGamer(container);

            expect(container.childNodes.length).toBeGreaterThan(0);
            expect(container.childNodes[0].id).toBe('panelGamer');
        });

        // test Class PanelEnemy
        it('test PanelEnemy Class [getPanelEnemy] method', function() {
            var panelEnemy = this.panelEnemyClass.getPanelEnemy(),
                mockResponseId = 'panelEnemy';

            expect(panelEnemy.tagName).toBe('DIV');
            expect(panelEnemy.id).toBe(mockResponseId);
        });
        it('Test PanelEnemy Class [appendPanelEnemy] method', function() {
            var container = consts.DOC.getElementById('gameContainer');

            this.panelEnemyClass.appendPanelEnemy(container);

            expect(container.childNodes.length).toBeGreaterThan(0);
            expect(container.childNodes[1].id).toBe('panelEnemy');
        });

        // test createTable method
        it('Test createTable method', function() {
            var panelGamer = this.panelGamerClass.getPanelGamer(),
                table = components.createTable(panelGamer);

            panelGamer.appendChild(table);

            expect(panelGamer.childNodes.length).toBeGreaterThan(0);
            expect(panelGamer.childNodes[1].tagName).toBe('TABLE');
        });

        // test MenuGamer Class
        it('Test MenuGamer Class [getMenuGamer] method', function() {
            var getMenu = this.menuGamer.getMenuGamer();

            expect(typeof getMenu).toBe('object');
        });
        it('Test MenuGamer Class [removeElement] method', function() {
            var gamerSlect = consts.DOC.getElementById('gamerSelect');
            this.menuGamer.removeElement('aircraftCarrier');

            expect(gamerSlect.childNodes[0].value).toBe('Battleship');
        });
        it('Test MenuGamer Class [insertHtml] method', function() {
            var gamerSlect = consts.DOC.getElementById('gamerSelect');
            this.menuGamer.insertHtml('- NO SHIPS -');

            expect(gamerSlect.childNodes[4].value).toBe('- NO SHIPS -');
        });

        // test MenuEnemy Class
        it('Test MenuEnemy Class [getMenuEnemy] method', function() {
            var getMenu = this.menuEnemy.getMenuEnemy();

            expect(typeof getMenu).toBe('object');
        });
    });
});
