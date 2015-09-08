define(['utils', 'consts'], function(utils, consts) {
    describe('Test Utils', function() {

        // emptyContainer
        it('Test emptyContainer method', function() {
            var container = consts.DOC.getElementById('parentContainer');

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
    });
});
