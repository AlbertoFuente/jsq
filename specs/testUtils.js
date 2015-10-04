define(['utils', 'consts'], function(utils, consts) {
    describe('Test Utils', function() {

        beforeEach(function() {
            this.body = consts.DOC.body;

            // create container
            var container = consts.DOC.createElement('div');
            container.id = 'parentContainer';

            // append to body
            this.body.appendChild(container);
        });
        afterEach(function() {});

        // emptyContainer
        it('Test emptyContainer method', function() {
            var container = consts.DOC.getElementById('parentContainer'),
                subDiv = consts.DOC.createElement('div');

            subDiv.id = 'gameMenu';
            container.appendChild(subDiv);

            expect(container.childNodes.length).toBeGreaterThan(0);
            expect(container.childNodes[0].id).toBe('gameMenu');

            utils.emptyContainer('parentContainer');
            expect(container.childNodes.length).toBeLessThan(1);
        });
        // range
        it('Test range method', function() {
            var method = utils.range;

            expect(method(0, 4, 0)).toEqual([0, 1, 2, 3, 4]);
            expect(method(0, 4, 2)).toEqual([0, 2, 4]);
        });
        // difference
        it('Test difference method', function() {
            var arr1 = [1, 2, 3],
                arr2 = [2, 3, 4],
                diff = utils.diff(arr1, arr2);

            expect(diff).toEqual([1]);
        });
    });
});
