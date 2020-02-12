var LiveForm = require("./LiveForm");
var random = require("./random.js");


module.exports = class Gishatich extends LiveForm {


    constructor(x, y, index) {
        super(x, y, index);
       this.life = 15;
    }


    stanalNorKordinatner() {
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


    yntrelVandak(ch) {
        this.stanalNorKordinatner();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    yntrelVandak1(ch) {
        this.stanalNorKordinatner();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] < ch ) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    // sharjvel() {
    //     this.energy-=2;
    //     var patahakanVandak = random(this.yntrelVandak1(1));
            
       
    //     if( matrix[patahakanVandak[1]][patahakanVandak[0]]==1){
    //          matrix[this.y][this.x] = 0;
    //         this.x = patahakanVandak[0];
    //         this.y = patahakanVandak[1];
            
    //         for (var i in grassArr) {
    //             if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
    //                 grassArr.splice(i, 1);
    //                 matrix[this.y][this.x] = 3;
    //                 break;
    //             }
    //         }
    //         for (var i in grassEaterArr) {
    //             if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
    //                 grassEaterArr.splice(i, 1);
    //                 matrix[this.y][this.x] = 3;
    //                 break;
    //             }
    //         }
    //     }
    //      else {    
    //         matrix[this.y][this.x] = 0;
    //         this.x = patahakanVandak[0];
    //         this.y = patahakanVandak[1];
    //         matrix[this.y][this.x] = 3;
    //     }
        
    // }
    move() {
       
        this.life--;
        let emptyCells = this.yntrelVandak(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.mahanal();
        }
    }




    bazmanal() {
        

        var norVandak = random(this.yntrelVandak(0));
        if (this.life == 14 && norVandak) {
            var norGishatich = new Gishatich(norVandak[0], norVandak[1]);
            gishatichArr.push(norGishatich);
            matrix[norVandak[1]][norVandak[0]] = 3;
            this.life = 10;
        }
    }



    utel1() {

        var patahakanVandak = random(this.yntrelVandak(2));
        // var patahakanVandakDatark = random(this.yntrelVandak(0));
        if (patahakanVandak) {
            matrix[this.y][this.x] = 0;
            this.x = patahakanVandak[0];
            this.y = patahakanVandak[1];
            matrix[this.y][this.x] = 3;
            for (var i in grassArr) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1);
                    this.life + 2;
                    break;
                }
            }
            
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                    xotakerArr.splice(i, 1);
                    this.life + 2;
                    break;
                }
            }
        }


        else {
            this.move();
        }

    }



    mahanal() {
        var patahakanVandak = random(this.yntrelVandak(0));
        if (patahakanVandak && this.life <= 0) {
           

            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1);
                    matrix[this.y][this.x] = 0;
                    return true;
                }
            }
        }
        else return false;
    }
}