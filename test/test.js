'use strict';

var PalettoTestCase = TestCase("PalettoTestCase");

PalettoTestCase.prototype.testStory1 = function () {
    var i, j;
    for(i = 0 ; i < 5 ; i++) {
        for(j = 0 ; j < 5 ; j++) {
            !assertEquals(board.isColoredAdjacent(i,j), false);
        }
    }
};

