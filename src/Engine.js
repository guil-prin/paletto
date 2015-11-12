'use strict';

var Engine = function () {

// private attributes and methods
    var grid = [
    ['b', 'g', 'w', 's', 'r', 'w'],
    ['y', 'w', 'g', 'r', 'y', 's'],
    ['s', 'y', 's', 'w', 'b', 'r'],
    ['r', 'b', 'r', 'g', 's', 'w'],
    ['w', 'g', 'y', 'b', 'y', 'g'],
    ['y', 's', 'b', 'r', 'g', 'b']
    ];
    var player = 1, nbMarbles = 36, pickedColor, i, j;
    var marblesPerPlayer = new Array(2);
    for(i = 0 ; i < 2 ; i++) {
        marblesPerPlayer[i] = {'b' : 0, 'g' : 0, 'w' : 0, 's' : 0, 'r' : 0, 'y' : 0};
    };

    this.getPlayer = function() {
        return player;
    };

    this.getPickedColor = function() {
        return pickedColor;
    };

    this.getNbMarbles = function() {
        return nbMarbles;
    };

    this.getNbColoredMarbles = function(color) {
        return marblesPerPlayer[player][color];
    };

    this.pickColor = function(color) {
        pickedColor = color;
    };

    this.pickMarble = function(position) {
        var pos = this.getGridPositions(position);
        var token = grid[pos.posx][pos.posy];
        grid[pos.posx][pos.posy] = undefined;
        marblesPerPlayer[player][token]++;
        nbMarbles--;
    };

    this.getGridPositions = function (position) {
        var c1 = (position.charCodeAt(0)) - 65, c2 = position.charCodeAt(1) - 49;
        return {posx : c2,
                posy : c1
               };
    };

    this.isColoredAdjacent = function(i, j) {
        return (this.sameHorizontalColor(i,j) || this.sameVerticalColor(i,j));
    };

    this.sameHorizontalColor = function(i, j) {
        var left = false, right = false;
        if(i > 0) {
            left = (grid[i][j] === grid[i-1][j] ? true : false);
        }
        if(i < 6) {
            right = (grid[i][j] === grid[i+1][j] ? true : false);
        }
        return (left || right);
    };

    this.sameVerticalColor = function(i, j) {
        var left = false, right = false;
        if(j > 0) {
            left = (grid[i][j] === grid[i][j-1] ? true : false);
        }
        if(j < 6) {
            right = (grid[i][j] === grid[i][j+1] ? true : false);
        }
        return (left || right);
    };


// public methods
};

var board = new Engine();
