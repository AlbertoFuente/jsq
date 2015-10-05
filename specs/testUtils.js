define(['utils', 'consts'], function(utils, consts) {
    describe('Test Utils', function() {

        beforeEach(function() {
            this.body = consts.DOC.body;

            // create container
            this.container = consts.DOC.createElement('div');
            this.gameContainer = consts.DOC.createElement('div');
            this.container.id = 'parentContainer';
            this.gameContainer.id = 'gameContainer';
            // append to body
            this.container.appendChild(this.gameContainer);
            this.body.appendChild(this.container);
        });
        afterEach(function() {});

        // emptyContainer
        it('Test emptyContainer method', function() {
            var subDiv = consts.DOC.createElement('div');

            subDiv.id = 'gameMenu';
            this.container.appendChild(subDiv);

            expect(this.container.childNodes.length).toBeGreaterThan(0);
            expect(this.container.childNodes[1].id).toBe('gameMenu');

            utils.emptyContainer('parentContainer');
            expect(this.container.childNodes.length).toBeLessThan(1);
        });
        // range
        it('Test range method', function() {
            var method = utils.range;

            expect(method(0, 4, 0)).toEqual([0, 1, 2, 3, 4]);
            expect(method(0, 4, 2)).toEqual([0, 2, 4]);
        });
        // message
        it('Test message method', function() {
            // Green message
            var messageGreen = utils.message('green', 'Green message'),
                messageGreenContainer = consts.DOC.getElementById('messageContainer');
            expect(messageGreenContainer.className).toBe('messageGreen showMessage');
            // Red message
            var messageRed = utils.message('red', 'Red message'),
                messageRedContainer = consts.DOC.getElementById('messageContainer');
            expect(messageRedContainer.className).toBe('messageRed showMessage');
        });
        // difference
        it('Test diff method', function() {
            var arr1 = [1, 2, 3],
                arr2 = [2, 3, 4],
                diff = utils.diff(arr1, arr2);

            expect(diff).toEqual([1]);
        });
    });
});
