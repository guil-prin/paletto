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
    assertEquals(board.getMarble(2, 2), 's');
    assertException(function(){board.pickMarble("C3")}, "Broken board if played");
};

PalettoTestCase.prototype.testStory6 = function () {
    board.reset();
    board.pickColor('b');
    board.pickMarble("A1");
    board.pickMarble("F6");
    board.switchPlayer();
    board.pickColor('g');
    board.pickMarble("B1");
    board.pickMarble("E6");
    board.pickMarble("F5");
    board.switchPlayer();
    board.pickColor('y');
    board.pickMarble("A2");
    board.pickMarble("A6");
    board.switchPlayer();
    board.pickColor('s');
    board.pickMarble("F3");
    board.switchPlayer();
    board.pickColor('w');
    board.pickMarble("A5");
    board.pickMarble("F4");
    board.pickMarble("F1");
    board.pickMarble("C1");
    board.switchPlayer();
    board.pickColor('r');
    board.pickMarble("E1");
    board.pickMarble("F3");
    board.pickMarble("D6");
    board.pickMarble("A4");
    board.switchPlayer();
    board.pickColor('s');
    board.pickMarble("D3");
    board.pickMarble("F2");
    board.pickMarble("B6");
    board.switchPlayer();
    board.pickColor('y');
    board.pickMarble("B3");
    board.pickMarble("E2");
    board.pickMarble("E5");
    board.switchPlayer();
    board.pickColor('b');
    board.pickMarble("B4");
    board.pickMarble("C6");
    board.pickMarble("D5");
    board.pickMarble("E3");
    assertEquals(board.checkWinner(1), true);
};