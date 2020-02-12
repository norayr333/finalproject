var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Blackhole extends LiveForm {
    constructor(x, y) {
        super(x, y);
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    sharjvel() {
      
        this.getNewCoordinates();
        var x = Math.floor(random(matrix[0].length));
        var y = Math.floor(random(matrix.length));

        matrix[y][x] = 6;

        matrix[this.y][this.x] = 0;

        for (var i in grassArr) {
            if (x == grassArr[i].x && y == grassArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }
        for (var i in xotakerArr) {
            if (x == xotakerArr[i].x && y == xotakerArr[i].y) {
                xotakerArr.splice(i, 1);
                break;
            }
        }
        for (var i in gishatichArr) {
            if (x == gishatichArr[i].x && y == gishatichArr[i].y) {
                gishatichArr.splice(i, 1);
                break;
            }
        }
       

        this.x = x;
        this.y = y;


    }
    eat() {
        
        this.getNewCoordinates();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                matrix[y][x] = 0;

                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                for (var i in xotakerArr) {
                    if (x == xotakerArr[i].x && y == xotakerArr[i].y) {
                        xotakerArr.splice(i, 1);
                        break;
                    }
                }
                for (var i in gishatichArr) {
                    if (x == gishatichArr[i].x && y == gishatichArr[i].y) {
                        gishatichArr.splice(i, 1);
                        break;
                    }
                }
                for (var i in mardArr) {
                    if (x == mardArr[i].x && y == mardArr[i].y) {
                        mardArr.splice(i, 1);
                        break;
                    }
                }
                
            }
        }
        this.sharjvel();
    }
}