define(['utils', 'consts'], function(utils, consts) {
    'use strict';
    describe('Test Utils', function() {

        beforeEach(function() {
            this.body = consts.DOC.body;
            this.utils = Object.create({
                container: consts.DOC.createElement('div'),
                gameContainer: consts.DOC.createElement('div')
            });

            this.utils.container.id = 'parentContainer';
            this.utils.gameContainer.id = 'gameContainer';
            // append to body
            this.utils.container.appendChild(this.utils.gameContainer);
            this.body.appendChild(this.utils.container);
        });
        afterEach(function() {
            this.body = null;
            this.utils = null;
        });

        // emptyContainer
        it('Test emptyContainer method', function() {
            var subDiv = consts.DOC.createElement('div');

            subDiv.id = 'gameMenu';
            this.utils.container.appendChild(subDiv);

            expect(this.utils.container.childNodes.length).toBeGreaterThan(0);
            expect(this.utils.container.childNodes[1].id).toBe('gameMenu');

            utils.emptyContainer('parentContainer');
            expect(this.utils.container.childNodes.length).toBeLessThan(1);
            // remove subDiv
            subDiv.remove();
        });
        // range
        it('Test range method', function() {
            var method = utils.range;

            expect(method(0, 4, 0)).toEqual([0, 1, 2, 3, 4]);
            expect(method(0, 4, 2)).toEqual([0, 2, 4]);
            expect(method('a', 'e', 0)).toEqual(['A', 'B', 'C', 'D', 'E']);
        });
        // message
        it('Test message method', function() {
            // Green message
            utils.message('green', 'Green message');
            var messageGreenContainer = consts.DOC.getElementById('messageContainer');
            expect(messageGreenContainer.className).toBe('messageGreen showMessage');
            // Red message
            utils.message('red', 'Red message');
            var messageRedContainer = consts.DOC.getElementById('messageContainer');
            expect(messageRedContainer.className).toBe('messageRed showMessage');
            // remove messages
            messageGreenContainer.remove();
            messageRedContainer.remove();
        });
        // difference
        it('Test diff method', function() {
            var arr1 = [1, 2, 3],
                arr2 = [2, 3, 4],
                diff = utils.diff(arr1, arr2),
                diff2 = utils.diff(arr1, arr1);

            expect(diff).toEqual([1]);
            expect(diff2).toEqual([]);
        });
        // tooltip
        it('Test tooltip method', function() {
            var element = consts.DOC.createElement('div'),
                elementName = null;

            element.id = 'testElement';
            element.setAttribute('data-name', 'Battleship');
            elementName = element.getAttribute('data-name');

            this.utils.gameContainer.appendChild(element);
            // show tooltip
            utils.tooltip(element, elementName, true);
            expect(consts.DOC.getElementById('shipTooltip')).toBeDefined();
            expect(consts.DOC.getElementById('shipTooltip').className).toBe('show');
            // hide tooltip
            utils.tooltip(element, null, false);
            expect(consts.DOC.getElementById('shipTooltip').className).toBe('hide');
            // remove tooltip
            consts.DOC.getElementById('shipTooltip').remove();
            // remove element
            element.remove();
        });
        // randomNumber
        it('Test randomNumber method', function() {
            let min = 1,
                max = 5,
                result = utils.randomNumber(min, max);
            expect(result >= 1 && result <= 5).toBeTruthy();
        });
        // randomPosition
        it('Test randomPosition method', function() {
            let v = 'vertical',
                h = 'horizontal',
                result = utils.randomPosition();
            expect(result === v || result === h).toBeTruthy();
        });
    });
});
