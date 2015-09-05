define(['buttons'], function(buttons) {
    describe('Test Const Buttons', function() {
        // START
        it('Test START button', function() {
            var start = buttons.START;

            expect(start).toBeDefined();
            expect(start.id).toBe('startButton');
        });
        // SAVE
        it('Test SAVE button', function() {
            var save = buttons.SAVE;

            expect(save).toBeDefined();
            expect(save.id).toBe('savebutton');
        });
        // LOAD
        it('Test LOAD button', function() {
            var load = buttons.LOAD;

            expect(load).toBeDefined();
            expect(load.id).toBe('loadButton');
        });
        // EXIT
        it('Test EXIT button', function() {
            var exit = buttons.EXIT;

            expect(exit).toBeDefined();
            expect(exit.id).toBe('exitButton');
        });
        // NEXT
        it('Test NEXT button', function() {
            var next = buttons.NEXT;

            expect(next).toBeDefined();
            expect(next.id).toBe('nextButton');
        });
        // PREV
        it('Test PREV button', function() {
            var prev = buttons.PREV;

            expect(prev).toBeDefined();
            expect(prev.id).toBe('prevButton');
        });
    });
});
