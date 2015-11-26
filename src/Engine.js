'use strict';

var NotTwoNeighboursMaxToken = function () {
    this.name = "This token can't be taken !";
};

var BrokenBoardIfPlayed = function () {
    this.name = "Broken board if played";
};

var Engine = function () {

// private attributes and methods
    var grid = [
    ['b', 'y', 's', 'r', 'w', 'y'],
    ['g', 'w', 'y', 'b', 'g', 's'],
    ['w', 'g', 's', 'r', 'y', 'b'],
    ['s', 'r', 'w', 'g', 'b', 'r'],
    ['r', 'y', 'b', 's', 'y', 'g'],
    ['w', 's', 'r', 'w', 'g', 'b']
    ];
    var player = 1, nbMarbles = 36, pickedColor, i, j;
    var marblesPerPlayer = new Array(2);
    for(i = 1 ; i <= 2 ; i++) {
        marblesPerPlayer[i] = {'b' : 0, 'g' : 0, 'w' : 0, 's' : 0, 'r' : 0, 'y' : 0};
    }

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

    this.getMarble = function(position) {
        var pos = this.getGridPositions(position);
        return grid[pos.posx][pos.posy];
    };

    this.getNbColoredMarbles = function(color) {
        return marblesPerPlayer[player][color];
    };

    this.getGridPositions = function (position) {
        var c1 = (position.charCodeAt(0)) - 65, c2 = position.charCodeAt(1) - 49;
        return {posx : c1,
            posy : c2
        };
    };

    this.valueFromGridPosition = function (i, j) {
        return String.fromCharCode(i+65) + String.fromCharCode(j+49);
    };

    this.switchPlayer = function() {
        player = (player === 1 ? 2 : 1);
    };

    this.pickColor = function(color) {
        pickedColor = color;
    };

    this.pickMarble = function(position) {
        var pos = this.getGridPositions(position);
        if(this.nbNeighbours(pos.posx, pos.posy) === 2){
            if(this.areStillConnected(pos.posx, pos.posy)) {
                var token = grid[pos.posx][pos.posy];
                grid[pos.posx][pos.posy] = undefined;
                marblesPerPlayer[player][token]++;
                nbMarbles--;
            }
            else {
                throw new BrokenBoardIfPlayed();
            }
        }
        else if(this.nbNeighbours(pos.posx, pos.posy) === 1) {
            var token = grid[pos.posx][pos.posy];
            grid[pos.posx][pos.posy] = undefined;
            marblesPerPlayer[player][token]++;
            nbMarbles--;
        }
        else {
            throw new NotTwoNeighboursMaxToken();
        }
    };

    this.areStillConnected = function(i, j) {
        var k, l, ok = 0;
        var neighs = this.neighboursOf(i, j);
        var pos1 = this.getGridPositions(neighs[0]);
        var pos2 = this.getGridPositions(neighs[1]);
        var neighs1 = this.neighboursOf(pos1.posx, pos1.posy);
        var neighs2 = this.neighboursOf(pos2.posx, pos2.posy);
        for(k = 0 ; k < neighs1.length ; k++) {
            for(l = 0 ; l < neighs2.length ; l++) {
                if(neighs1[k] === neighs2[l] && neighs1[k] !== this.valueFromGridPosition(i, j))
                    ok++;
            }
        }
        if(ok >= 1) {
            return true;
        }
        return false;
    };

    this.neighboursOf = function(i, j) {
        var neighbours = new Array(this.nbNeighbours(i, j));
        var index = 0;
        if(grid[i+1] !== undefined && grid[i+1][j] !== undefined) {
            neighbours[index] = this.valueFromGridPosition((i+1), j);
            index++
        }
        if(grid[i-1] !== undefined && grid[i-1][j] !== undefined) {
            neighbours[index] = this.valueFromGridPosition((i-1), j);
            index++
        }
        if(grid[i] !== undefined && grid[i][j+1] !== undefined) {
            neighbours[index] = this.valueFromGridPosition(i, (j+1));
            index++
        }
        if(grid[i] !== undefined && grid[i][j-1] !== undefined)
            neighbours[index] = this.valueFromGridPosition(i, (j-1));
        return neighbours;
    };

    this.nbNeighbours = function(i, j) {
        var nbNeigh = 0;
        if(grid[i+1] !== undefined && grid[i+1][j] !== undefined)
            nbNeigh++;
        if(grid[i-1] !== undefined && grid[i-1][j] !== undefined)
            nbNeigh++;
        if(grid[i] !== undefined && grid[i][j+1] !== undefined)
            nbNeigh++;
        if(grid[i] !== undefined && grid[i][j-1] !== undefined)
            nbNeigh++;
        return nbNeigh;
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

    this.checkWinner = function(p) {
        for (var marble in marblesPerPlayer[p]) {
            if(marblesPerPlayer[p][marble] == 6) {
                return true;
            }
        }
        if(nbMarbles === 0) {
            return player === p;
        }
    };

    this.cheatForStepFive = function() {
        grid = [
            [undefined, undefined, undefined, 's', 'r', 'w'],
            [undefined, undefined, undefined, 'r', 'y', undefined],
            [undefined, undefined, 's', 'w', 'b', undefined],
            ['r', 'b', 'r', undefined, undefined, undefined],
            [undefined, 'g', 'y', undefined, undefined, undefined],
            [undefined, undefined, 'b', undefined, undefined, undefined]
        ];
    };

    this.reset = function() {
        grid = [
            ['b', 'y', 's', 'r', 'w', 'y'],
            ['g', 'w', 'y', 'b', 'g', 's'],
            ['w', 'g', 's', 'r', 'y', 'b'],
            ['s', 'r', 'w', 'g', 'b', 'r'],
            ['r', 'y', 'b', 's', 'y', 'g'],
            ['w', 's', 'r', 'w', 'g', 'b']
        ];
        player = 1, nbMarbles = 36, pickedColor;
        for(i = 1 ; i <= 2 ; i++) {
            marblesPerPlayer[i] = {'b' : 0, 'g' : 0, 'w' : 0, 's' : 0, 'r' : 0, 'y' : 0};
        }
    }

};

var board = new Engine();
