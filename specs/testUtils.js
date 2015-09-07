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
    });
});
