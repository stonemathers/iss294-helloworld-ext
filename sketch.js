var letters = [];
var locX = [];
var locY = [];
var sizes= [];
var startSize = 100;

function preload(){
    img = loadImage("images/SpongeBob.png");
}

function setup(){
    createCanvas(1200, 700);
    noCursor();
    rectMode(CENTER);
}

function draw(){
    //Draw background
    background("black");

    //Draw cursor
    if(mouseIsPressed){
        fill(random()*255, random()*255, random()*255);
        if(random() <= 0.5){
            ellipse(mouseX, mouseY, random()*400, random()*400);
        }else{
            rect(mouseX, mouseY, random()*400, random()*400);
        }
    }else{
        //fill("white");
        //ellipse(mouseX, mouseY, 30, 30);
        w = img.width/6;
        h = img.height/6;
        image(img, mouseX - w/2, mouseY - h/2, w, h);
    }

    //Draw letters
    for(i = 0; i < letters.length; i++){
        size = sizes[i];
        if(size > 0){
            yoffset = (noise(locX[i], locY[i]) - 0.46) * 100;
            xoffset = -10;
            x = locX[i];
            y = locY[i];
            locX.splice(i, 1, x + xoffset);
            locY.splice(i, 1, y + yoffset);

            fill(random()*255, random()*255, random()*255);
            textSize(size);
            text(letters[i], locX[i], locY[i]);
            sizes.splice(i, 1, size - 1);
        }else{
            letters.splice(i, 1);
            locX.splice(i, 1);
            locY.splice(i, 1);
            sizes.splice(i, 1);
            i -= 1;
        }
    }

}

function keyPressed(){
    letters.push(key);
    locX.push(mouseX);
    locY.push(mouseY);
    sizes.push(startSize);
}