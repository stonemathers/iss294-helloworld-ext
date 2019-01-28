//Canvas constants
var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 650;

//Variables for letters
var letters = [];
var locX = [];
var locY = [];
var sizes = [];
var directions = [];
var startSize = 140;

//Animation Constants
var SPEED_MAX = 50;
var BGCOLOR_DIV = 80;

//Constants to determine the direction that a letter is travelling
var DIAG_UL = 0;
var DIAG_UR = 1;
var DIAG_DL = 2;
var DIAG_DR = 3;

//Variables for circle
var circleDx = 1;
var circleDy = 1;
var circleSpeed = 0
var circleX = CANVAS_WIDTH/2;
var circleY = CANVAS_HEIGHT/2;
var CIRCLE_W = 30;
var CIRCLE_H = circleW;

function setup(){
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    noCursor();
}

function draw(){
    numLet = letters.length/4;

    //Draw background
    fromBG = color('black');
    toBG = color('white');
    bgColor = fromBG;
    if(numLet > 0){
        bgColor = lerpColor(fromBG, toBG, numLet/BGCOLOR_DIV);
    }
    background(bgColor);

    //Adjust circle speed
    circleSpeed = Math.min(numLet, SPEED_MAX);

    //Adjust circle direction
    if(circleX >= CANVAS_WIDTH || circleX <= 0){
        circleDx *= -1;
    }
    if(circleY >= CANVAS_HEIGHT || circleY <= 0){
        circleDy *= -1;
    }

    //Set circle position
    circleX += circleSpeed * circleDx;
    circleY += circleSpeed * circleDy;

    //Draw circle
    fill("white");
    ellipse(circleX, circleY, CIRCLE_W, CIRCLE_H);

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
            //Remove letters with size 0
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
            locX.push(circleX);
            locY.push(circleY);
            sizes.push(startSize);
        }
    directions.push(DIAG_UL);
    directions.push(DIAG_UR);
    directions.push(DIAG_DL);
    directions.push(DIAG_DR);
    }
}