
const canvas_width = 512;
const canvas_height = 768;

var currently_editing;
const editing_list =["Body","Expressions"];

const head_list =["None","Medium"];
const head_colours = 2;

const body_objects =[];

body_objects.push({name: "Head",variablename: "Head", list: head_list, value: 0, colour: 0, image: new Image()});

function fixSources(list){
    // Fixes the "src" attribute for all images in list
    for (i = 0; i < list.length; i += 1){
        b = list[i]
        b.image.src = "images/"+b.variablename+"/"+b.list[b.value]+"/"+b.colour+".png"
    }
}

function makeDropbtn(name, variablename, list){
    document.getElementById(variablename+"Btn").innerHTML = makeDropbtnString(name, variablename, list)
}

function makeDropbtnString(name, variablename, list){
    var id = variablename+'Dropdown';
    drop_string = '<div class="dropdown">';
    drop_string +='<button onclick="dropFunction(\''+id+'\')" class="dropbtn">'+name+'</button>';
    drop_string +='<div id="'+id+'" class="dropdown-content">';
    for (row = 0; row < list.length; row += 1) {
        drop_string +='<button onclick="setVariable(\''+variablename+'\','+row+')" >'+list[row]+'</button>';
    }
    drop_string +='</div></div>';
    return drop_string
}

function findNameMatch(list, name){
    //returns the first element of list whose variablename equals name
    for (i = 0; i < list.length; i += 1) {
        if (list[i].variablename==name){
            return list[i];
        }
    }
}

function setVariable(variablename, number){
    if (variablename =="currently_editing"){
        currently_editing = number
        document.getElementById("editingTitle").innerHTML = editing_list[number];
        if (number ==0){//editing the body
            htmlString = "";
            for (i = 0; i < body_objects.length; i += 1) {
                b = body_objects[i];
                htmlString+=makeDropbtnString(b.name, b.variablename, b.list);
            }
            document.getElementById("controls").innerHTML = htmlString
        } else{
            document.getElementById("controls").innerHTML = "not body";
        }
    }else{
        //variablename = "Head"
        b = findNameMatch(body_objects, variablename); //the eleemnt of body_objects with the right vriablename
        b.value=number;
        drawCanvas();
    }
}

function drawCanvas() {
    var canvas = document.getElementById("portCanvas");
    var ctx = canvas.getContext("2d");
    //ctx.clearRect(canvas_width, canvas_height)
    fixSources(body_objects);
    for (row = 0; row < 3; row += 1) {
        for (column = 0; column < 2; column += 1) {
            xpos = 256*column;
            ypos = 256*row;
            for (i = 0; i < body_objects.length; i += 1){
                b = body_objects[i];
                if (b.value !=0){ //Not "none"
                    ctx.drawImage(b.image, xpos, ypos);
                }
            }
        }
    }
}

function exportCanvas(){
    var mycanvas = document.getElementById("portCanvas");
    var img = mycanvas.toDataURL("image/png;base64;");
    window.open(img,"","width="+canvas_width+",height="+canvas_height);
}

function setup(){
    makeDropbtn("Editing:", "currently_editing", editing_list);
    setVariable("currently_editing", 0);
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
