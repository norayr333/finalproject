
//! Requiring modules  --  START
Grass = require("./modules/Grass.js");
Gishatich = require("./modules/gishatich.js");
Mard = require("./modules/mard.js");
Blackhole = require("./modules/blackhole.js");
GrassEater = require("./modules/GrassEater.js");
random = require('./modules/random');

//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
xotakerArr = [];
gishatichArr = [];
mardArr = [];
blackholeArr = [];
//----------------
matrix = [];
grassEaterHashiv = 0;
grassHashiv = 0;
gishatichHashiv = 0;
mardHashiv = 0;
blackholeHashiv = 0;
weatherinit = 0;
weather = "Spring";

//! Setting global arrays  -- END




//! Creating MATRIX -- START
function rMatrix(matrix, n, khot, khotaker, gishatich, tuyn, sev, spitak) {
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = 0;

        }

    }
    for (let k = 0; k < khot; k++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        matrix[y][x] = 1;

    }
    for (let k = 0; k < khotaker; k++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        matrix[y][x] = 2;

    }
    for (let k = 0; k < gishatich; k++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        matrix[y][x] = 3;

    }
    for (let k = 0; k < tuyn; k++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        matrix[y][x] = 4;

    }
    for (let k = 0; k < sev; k++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        matrix[y][x] = 6;

    }

}

rMatrix(matrix, 30, 30, 15, 7, 7, 3)
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                xotakerArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var gishatich = new Gishatich(x, y);
                gishatichArr.push(gishatich);
                gishatichHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var mard = new Mard(x, y);
                mardArr.push(mard);
                mardHashiv++;
            }
            else if (matrix[y][x] == 6) {
                var blackhole = new Blackhole(x, y);
                blackholeArr.push(blackhole);
                blackholeHashiv++;
            }

        }
    }
}
creatingObjects();


function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (xotakerArr[0] !== undefined) {
        for (var i in xotakerArr) {
            xotakerArr[i].eat();
        }
    }
    for (var i in gishatichArr) {

        gishatichArr[i].utel1();
        gishatichArr[i].bazmanal();
        gishatichArr[i].mahanal();
    }
    for (var i in mardArr) {
        mardArr[i].utel();
        mardArr[i].utel1();
        mardArr[i].bazmanal();
        mardArr[i].mahanal();

    }
    for (var j in blackholeArr) {

        blackholeArr[j].eat()



    }

    //! Object to send
    sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCount: grassEaterHashiv,
        gishatichCount: gishatichHashiv,

        weather: weather,
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}
//----Weather


function getwheather() {

    weatherinit++;
    if (weatherinit == 5) {
        weatherinit = 0;
    }
    else if (weatherinit == 4) {
        weather = "Winter";
    }
    else if (weatherinit == 3) {
        weather = "Autumn";
    }
    else if (weatherinit == 1) {
        weather = "Spring";
    }
    else if (weatherinit == 2) {
        weather = "Summer";
    }


}
//Click-y normala bayc chi ashxatum

// io.on("connection", function (socket) {
//     socket.on("fire", function (arr) {
//         console.log(arr)
//         var x = arr[0];
//         var y = arr[1];

//         var directions = [
//             [x - 1, y - 1],
//             [x, y - 1],
//             [x + 1, y - 1],
//             [x - 1, y],
//             [x + 1, y],
//             [x - 1, y + 1],
//             [x, y + 1],
//             [x + 1, y + 1]
//         ];
//         if (matrix[y][x] == 1) {
//             for (var i in grassArr) {
//                 if (y === grassArr[i].y && x === grassArr[i].x) {
//                     grassArr.splice(i, 1);
//                     break;
//                 };
//             }
//         }
//         else if (matrix[y][x] == 2) {
//             for (var i in xotakerArr) {
//                 if (y == xotakerArr[i].y && x == xotakerArr[i].x) {
//                     xotakerArr.splice(i, 1);
//                     break;
//                 };
//             }
//         }
//         else if (matrix[y][x] == 3) {
//             for (var i in gishatichArr) {
//                 if (y == gishatichArr[i].y && x == gishatichArr[i].x) {
//                     gishatichArr.splice(i, 1);
//                     break;
//                 };
//             }
//         }
        
      
//         matrix[y][x] = 0;
//         for (var i in directions) {
//             harevanx = directions[i][0];
//             harevany = directions[i][1];

//             if (matrix[harevany][harevanx] == 1) {
//                 for (var i in grassArr) {
//                     if (harevany == grassArr[i].y && harevanx == grassArr[i].x) {
//                         grassArr.splice(i, 1);
//                         break;
//                     };
//                 }
//             }
//             else if (matrix[harevany][harevanx] == 2) {
//                 for (var i in xotakerArr) {
//                     if (harevany == xotakerArr[i].y && harevanx == xotakerArr[i].x) {
//                         xotakerArr.splice(i, 1);
//                         break;
//                     };
//                 }
//             }
//             else if (matrix[harevany][harevanx] == 3) {
//                 for (var i in gishatichArr) {
//                     if (harevany == gishatichArr[i].y && harevanx == gishatichArr[i].x) {
//                         gishatichArr.splice(i, 1);
//                         break;
//                     };
//                 }
//             }
           
           
//             matrix[harevany][harevanx] = 0;
//         }
   
//         io.sockets.emit("data", sendData);
//     });

// });


//-----FS
var obj = { "info": [] };

function writefile() {
    var fileName = "Statics.json";
    obj.info.push({ "cnvac xoteri qanak ": grassHashiv });
    obj.info.push({ "cnvac xotakerneri qanak ": grassEaterHashiv });
    obj.info.push({ "cnvac gishatichneri qanak ": gishatichHashiv });

    fs.writeFileSync(fileName, JSON.stringify(obj, null, 3));
}


setInterval(writefile, 6000);
setInterval(getwheather, 2000);
setInterval(game, 500);