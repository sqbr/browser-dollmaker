

var img_head = new Image();
var img_body = new Image();
img_head.src = "temp_images/sam_hair.png";
img_body.src = "temp_images/sam_face.png";

function setVariable(part, number){
    if (part =="hair"){
        if (number==0){
            img_head.src = "temp_images/sam_hair.png";
        }
        else{
            img_head.src = "temp_images/sam_hair2.png";
        }
    }
    drawCanvas();
    document.getElementById("controls").innerHTML = "Hello "+number; 
}

function drawCanvas() {
    var canvas = document.getElementById("portCanvas");
    var ctx = canvas.getContext("2d");
    for (row = 0; row < 3; row += 1) {
        for (column = 0; column < 2; column += 1) {
            xpos = 256*column
            ypos = 256*row
            ctx.drawImage(img_body, xpos, ypos);
            ctx.drawImage(img_head, xpos, ypos);
        }
    }
}

window.onload = drawCanvas;

// addbutton to cycle between colours
// then turn it into popup window
//then do all of body
//then add separatre windows for the different parts
//show: back, expression, front
//add save and load with text boxes

//https://github.com/ninique/Dollmaker-Script
//https://stackoverflow.com/questions/45187291/how-to-change-the-color-of-an-image-in-a-html5-canvas-without-changing-its-patte?rq=1
//https://stackoverflow.com/questions/24405245/html5-canvas-change-image-color
//https://stackoverflow.com/questions/9303757/how-to-change-color-of-an-image-using-jquery
//https://stackoverflow.com/questions/28301340/changing-image-colour-through-javascript
