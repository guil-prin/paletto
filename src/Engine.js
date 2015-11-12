'use strict';

var NotTwoNeighboursMaxToken = function () {
    this.name = "This token can't be taken !";
};

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
    for(i = 1 ; i <= 2 ; i++) {
        marblesPerPlayer[i] = {'b' : 0, 'g' : 0, 'w' : 0, 's' : 0, 'r' : 0, 'y' : 0};
    };

// public methods

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

    this.getGridPositions = function (position) {
        var c1 = (position.charCodeAt(0)) - 65, c2 = position.charCodeAt(1) - 49;
        return {posx : c2,
            posy : c1
        };
    };

    this.switchPlayer = function() {
        player = (player === 1 ? 2 : 1);
    }

    this.pickColor = function(color) {
        pickedColor = color;
    };

    this.pickMarble = function(position) {
        var pos = this.getGridPositions(position);
        if((this.nbNeighbours(pos.posx, pos.posy) == 2) || (this.nbNeighbours(pos.posx, pos.posy) == 1)) {
            var token = grid[pos.posx][pos.posy];
            grid[pos.posx][pos.posy] = undefined;
            marblesPerPlayer[player][token]++;
            nbMarbles--;
        }
        else {
            throw new NotTwoNeighboursMaxToken();
        }
    };

    this.nbNeighbours = function(i, j) {
        var nbNeigh = 0;
        if(grid[i+1] !== undefined && grid[i+1][j] !== undefined)
            nbNeigh++;
        if(grid[i-1] !== undefined && grid[i-1][j] !== undefined)
            nbNeigh++;
        if(grid[i][j+1] !== undefined)
            nbNeigh++;
        if(grid[i][j-1] !== undefined)
            nbNeigh++;
        return nbNeigh;
    }

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

};

var board = new Engine();
