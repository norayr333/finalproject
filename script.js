
//! Setup function fires automatically
 socket = io();
var side = 16;
function setup() {

    

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let gishatichCountElement = document.getElementById('gishatichCount');
    

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        var weather = data.weather
        wheather.innerText = weather
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCount;
        gishatichCountElement.innerText = data.gishatichCount;

        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 0) {
                    fill("#767676");
                    
                    // noStroke();
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 1) {
                    if (weather == "Spring") {
                        fill("green");
                        rect(x * side, y * side, side, side);
                    }
                    else if (weather == "Summer") {
                        fill("darkgreen");
                        rect(x * side, y * side, side, side);
                    }
                    else if (weather == "Autumn") {
                        fill("orange");
                        rect(x * side, y * side, side, side);
                    }
                    else if (weather == "Winter") {
                        fill("white");
                        rect(x * side, y * side, side, side);
                    }
                } else if (matrix[y][x] == 2) {
                    fill("#B6D81F");
                    
                    // stroke(10);
                    rect(x * side, y * side, side, side);
                } else if (matrix[y][x] == 3) {
                    fill("pink");
                    
                    // stroke(10);
                    rect(x * side, y * side, side, side);
                } else if (matrix[y][x] == 4) {
                    fill("red");
                    rect(x * side, y * side, side, side);
                } 
                else if (matrix[y][x] == 6) {
                    fill("black");
                    
                    // stroke(10);
                    rect(x * side, y * side, side, side);
                }
                rect(x * side, y * side, side, side);
            }
        }
        }
       
    }
//Click-y normala bayc chi ashxatum
    // function mousePressed() {
        
    //     var x = Math.floor(mouseX / side);
    //     var y = Math.floor(mouseY / side);
    //     var arr = [x,y];
    //     console.log(arr)
    //     socket.emit("fire",arr)
    // }
    
