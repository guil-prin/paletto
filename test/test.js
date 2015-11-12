'use strict';

var PalettoTestCase = TestCase("PalettoTestCase");

PalettoTestCase.prototype.testStory1 = function () {
    var i, j;
    for(i = 0 ; i < 5 ; i++) {
        for(j = 0 ; j < 5 ; j++) {
            assertEquals(board.isColoredAdjacent(i,j), false);
        }
    }
};

PalettoTestCase.prototype.testStory2 = function () {
    assertEquals(board.getPlayer(), 1);
    board.pickColor('y');
    assertEquals(board.getPickedColor(), 'y');
};

PalettoTestCase.prototype.testStory3 = function () {
    board.pickMarble("A6");
    assertEquals(board.getNbMarbles(), 35);
    assertEquals(board.getNbColoredMarbles('y'), 1);
};

PalettoTestCase.prototype.testStory4 = function () {
    board.switchPlayer();
    board.pickColor('b');
    board.pickMarble("A1");
    board.pickMarble("F6");
    assertEquals(board.getNbMarbles(), 33);
    assertEquals(board.getNbColoredMarbles('b'), 2);
};

PalettoTestCase.prototype.testStory5 = function () {
    board.cheatForStepFive();
    board.pickColor('s');
    AssertException(function(){board.pickMarble("C3")}, "Broken board if played");
};