
var currently_editing = 0;
const editing_list =["Body","Expressions"]

var img_head = new Image();
var img_body = new Image();
img_head.src = "temp_images/sam_hair.png";
img_body.src = "temp_images/sam_face.png";

function setControls(number){
    currently_editing = number
    document.getElementById("editingTitle").innerHTML = editing_list[number];

    drop_string = '<div class="dropdown">';
    drop_string +='<button onclick="dropFunction()" class="dropbtn">Hair</button>';
    drop_string +='<div id="myDropdown" class="dropdown-content">';
    drop_string +='<button onclick="setVariable('+number+',0)" >zero</button>';
    drop_string +='<button onclick="setVariable('+number+',1)" >one</button>';
    drop_string +='</div></div>';
    document.getElementById("controls").innerHTML = drop_string;
}

function makeDropbtn(name, variablename, list){
    drop_string = '<div class="dropdown">';
    drop_string +='<button onclick="dropFunction()" class="dropbtn">'+name+'</button>';
    drop_string +='<div id="myDropdown" class="dropdown-content">';
    for (row = 0; row < list.length; row += 1) {
        drop_string +='<button onclick="setVariable('+variablename+','+row+')" >'+list[row]+'</button>';
    }
    drop_string +='</div></div>';
    document.getElementById(variablename+"Btn").innerHTML = drop_string;

}

function setVariable(variable, number){
    if (variable =="hair"){
        if (number==0){
            img_head.src = "temp_images/sam_hair.png";
        }
        else{
            img_head.src = "temp_images/sam_hair2.png";
        }
    }
    else{

    }
    drawCanvas();
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

function setup(){
    makeDropbtn("Editing:", "currently_editing", editing_list);
    drawCanvas();
}

window.onload = setup;

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
