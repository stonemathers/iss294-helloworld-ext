var letters = [];
var locX = [];
var locY = [];
var sizes = [];
var directions = [];
var startSize = 140;
var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 700;

//Constants to determine the direction that a letter is travelling
var DIAG_UL = 0;
var DIAG_UR = 1;
var DIAG_DL = 2;
var DIAG_DR = 3;

function setup(){
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    noCursor();
}

function draw(){
    //Draw background
    background("black");

    //Draw cursor
    fill("white");
    ellipse(mouseX, mouseY, 30, 30);

    //Draw letters
    for(i = 0; i < letters.length; i+=4){
        size = sizes[i];
        if(size > 0){
            textSize(size);
            fill(random()*255, random()*255, random()*255);

            for(j = i; j < i+4; j++){
                yoffset = random() * 20;
                xoffset = random() * 20;
                x = locX[j];
                y = locY[j];
                d = directions[j]
                if(d == DIAG_UL){
                    xoffset *= -1;
                    yoffset *= -1;
                    if(x <= 0 && y <= 0){
                        directions[j] = DIAG_DR;
                    }else if(x <= 0){
                        directions[j] = DIAG_UR;
                    }else if(y <= 0){
                        directions[j] = DIAG_DL;
                    }
                }else if(d == DIAG_UR){
                    yoffset *= -1;
                    if(x >= CANVAS_WIDTH && y <= 0){
                        directions[j] = DIAG_DL;
                    }else if(x >= CANVAS_WIDTH){
                        directions[j] = DIAG_UL;
                    }else if(y <= 0){
                        directions[j] = DIAG_DR;
                    }
                }else if(d == DIAG_DL){
                    xoffset *= -1;
                    if(x <= 0 && y >= CANVAS_HEIGHT){
                        directions[j] = DIAG_UR;
                    }else if(x <= 0){
                        directions[j] = DIAG_DR;
                    }else if(y >= CANVAS_HEIGHT){
                        directions[j] = DIAG_UL;
                    }
                }else if(d == DIAG_DR){
                    if(x >= CANVAS_WIDTH && y >= CANVAS_HEIGHT){
                        directions[j] = DIAG_UL;
                    }else if(x >= CANVAS_WIDTH){
                        directions[j] = DIAG_DL;
                    }else if(y >= CANVAS_HEIGHT){
                        directions[j] = DIAG_UR;
                    }
                }
                locX.splice(j, 1, x + xoffset);
                locY.splice(j, 1, y + yoffset);
                text(letters[j], locX[j], locY[j]);
            }

            sizes.splice(i, 4, size - 1, size - 1, size - 1, size - 1);
        }else{
            letters.splice(i, 4);
            locX.splice(i, 4);
            locY.splice(i, 4);
            sizes.splice(i, 4);
            directions.splice(i, 4);
            i -= 4;
        }
    }

}

function keyPressed(){
    if(key.length == 1){
        for(i = 0; i < 4; i++){
            letters.push(key);
            locX.push(mouseX);
            locY.push(mouseY);
            sizes.push(startSize);
        }
    directions.push(DIAG_UL);
    directions.push(DIAG_UR);
    directions.push(DIAG_DL);
    directions.push(DIAG_DR);
    }
}