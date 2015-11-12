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

    this.isColoredAdjacent = function(i, j) {
        return this.sameHorizontalColor(i,j) && this.sameVerticalColor(i,j);
    };

    this.sameHorizontalColor = function(i, j) {
        var left = false, right = false;
        if(i > 0) {
            left = (grid[i][j] === grid[i-1][j] ? true : false);
        }
        if(i < 6) {
            right = (grid[i][j] === grid[i+1][j] ? true : false);
        }
        return (left && right);
    };

    this.sameVerticalColor = function(i, j) {
        var left = false, right = false;
        if(j > 0) {
            left = (grid[i][j] === grid[i][j-1] ? true : false);
        }
        if(j < 6) {
            right = (grid[i][j] === grid[i][j+1] ? true : false);
        }
        return (left && right);
    };
// public methods
};

var board = new Engine();
