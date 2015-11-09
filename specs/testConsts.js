define(['consts'], function(consts) {
    'use strict';
    describe('Test Consts', function() {
        // DOC
        it('Test DOC const', function() {
            var constDoc = consts.DOC;
            expect(constDoc).toBeDefined();
        });
        // DOCBODY
        it('Test DOCBODY const', function() {
            var constDocBody = consts.DOCBODY;
            expect(constDocBody).toBeDefined();
        });
    });
});
