define(function() {
    'use strict';

    describe('Test Enemy Worker', function() {
        beforeEach(function() {
            this.server = sinon.fakeServer.create();
            this.ships = {
                aircraftCarrier: {
                    name: 'Aircraft Carrier',
                    boxes: 5
                },
                battleship: {
                    name: 'Battleship',
                    boxes: 4
                },
                submarine: {
                    name: 'Submarine',
                    boxes: 3
                },
                destroyer: {
                    name: 'Destroyer',
                    boxes: 3
                },
                patrolBoat: {
                    name: 'Patrol boat',
                    boxes: 2
                }
            };
        });
        afterEach(function() {
            this.server.restore();
            this.enemyWorker = null;
            this.ships = null;
        });

        it('Test worker first response', function() {
            var enemyWorker = new Worker('/base/app/workers/enemyWorker.js'),
                prom = new Promise(function(resolve) {
                    enemyWorker.onmessage = function(e) {
                        if (e.data) {
                            resolve(e.data);
                        }
                    };
                });
            prom.then(function(response) {
                expect(response).toBe('module loaded');
            });
        });
    });
});
