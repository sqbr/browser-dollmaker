
function fixSources(list){
    // Fixes the "src" attribute for all images in list
    for (i = 0; i < list.length; i += 1){
        b = list[i];
        for (j = 0; j < panelSize; j += 1){ 
            if (b.colourNum==1){
                b.image_list[j].src = "images/"+b.location+"/"+b.item_list[b.value_list[j]]+".png";
            }else{
                b.image_list[j].src  = "images/"+b.location+"/"+b.item_list[b.value_list[j]]+"/"+b.colour+".png";
            }
        }
    }
}

function makeDropbtnString(name, variablename, list, type){
    var id = variablename+'Dropdown';
    var functionName;
    if (type=="body_part"){
        functionName= "setVariable";
    } 
    if (type=="menu_part"){
        functionName= "setMenu";
    } 
    if (type=="colour"){
        functionName= "setColour";
    } 
    
    drop_string = '<div class="dropdown">';
    drop_string +='<button onclick="dropFunction(\''+id+'\')" class="dropbtn">'+name+'</button>';
    drop_string +='<div id="'+id+'" class="dropdown-content">';
    for (row = 0; row < list.length; row += 1) {
        drop_string +='<button onclick="'+functionName+'(\''+variablename+'\','+row+')" >'+list[row]+'</button>';
    }
    drop_string +='</div></div>';
    return drop_string;
}

function setMenu(variablename, number){
    //Setting what section we're editing eg body/expressions etc
    currently_editing = number;
    document.getElementById("editingTitle").innerHTML = editing_list[number];
    htmlString = "";
    switch(number){
        case 0: //editing the body
            htmlString+=makeDropbtnString("Head Shape", "Head", head_list, "body_part");
            break;    
        case 1: //editing the outfit
            for (i = 0; i < clothes_list.length; i += 1) {
                b = findNameMatch(body_objects, clothes_list[i]); 
                htmlString+=makeDropbtnString(b.name, b.name, b.list, "body_part");
                htmlString+=makeDropbtnString(b.name+" Colour", b.name, range(b.colourNum), "colour");
            }
            break;    
        case 2: //editing the expression
            htmlString+=makeDropbtnString("Eyebrows", "Eyebrows", eyebrow_list, "body_part");
            break;      
        default:
            htmlString = "Unknown value";

    }
    document.getElementById("controls").innerHTML = htmlString;
}

function setVariable(variablename, number){
    b = findNameMatch(body_objects, variablename); //the eleemnt of body_objects with the right vriablename
    b.value_list=listOf(number);
    drawCanvas();
}

function setPanelVariable(variablename, panel, number){
    b = findNameMatch(body_objects, variablename); //the eleemnt of body_objects with the right vriablename
    b.value_list[panel]=number;
    drawCanvas();
}

function setColour(variablename, number){
    b = findNameMatch(body_objects, variablename); //the eleemnt of body_objects with the right vriablename
    b.colour=number;
    drawCanvas();
}

function drawCanvas() {
    var canvas = document.getElementById("portCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas_width, canvas_height);
    document.getElementById("test").innerHTML = print_body();
    fixSources(body_objects);
    for (row = 0; row < 3; row += 1) {
        for (column = 0; column < 2; column += 1) {
            xpos = 256*column;
            ypos = 256*row;
            for (i = 0; i < body_objects.length; i += 1){
                b = body_objects[i];
                if (b.item_list[b.value_list[row*2+column]] !="none"){ 
                    ctx.drawImage(b.image_list[row*2+column], xpos, ypos);
                }
            }
        }
    }
}

function setup(){
    document.getElementById("currently_editingBtn").innerHTML = makeDropbtnString("Editing:", "currently_editing", editing_list, "menu_part");
    setMenu("currently_editing", 0);
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
