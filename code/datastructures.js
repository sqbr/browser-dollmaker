
function fixSources(list){
    // Fixes the "src" attribute for all images in list
    for (let i = 0; i < list.length; i += 1){
        let b = list[i];
        for (let j = 0; j < panelSize; j += 1){ 
            if (b.colourNum==1){
                b.image_list[j].src = "images/"+b.location+"/"+b.item_list[b.value_list[j]]+".png";
            }else{
                b.image_list[j].src  = "images/"+b.location+"/"+b.item_list[b.value_list[j]]+"_"+b.colour+".png";
            }
        }
    }
}

function makeDropbtnString(name, variablelist, list, type){
    //Create a dropdown menu which is called name, and sets all the entires in variablelist to whatever value of list is chosen 
    let id = name+'Dropdown';
    let functionName;
    switch(type){
        case "body_part":
            functionName= "setVariable";
            break;
        case "body_part_panel":
            functionName= "setPanelVariable";
            break;    
        case "panel":
            functionName= "setPanel";
            break;        
        case "menu_part":
            functionName= "setMenu";
            break;  
        case "colour":
            functionName= "setColour";
            break;  
        default:
            document.getElementById("test").innerHTML = "Unknown button type";                
    }
    
    let drop_string = '<div class="dropdown">';
    drop_string +='<button onclick="dropFunction(\''+id+'\')" class="dropbtn">'+name+'</button>';
    drop_string +='<div id="'+id+'" class="dropdown-content">';
    for (row = 0; row < list.length; row += 1) {
        drop_string +='<button onclick="'+functionName+'(['
        for (i = 0; i < variablelist.length; i += 1){
            drop_string +="\'"+variablelist[i]+"\',"
        }
        drop_string +='],'+row+')" >'+list[row]+'</button>';
    }
    drop_string +='</div></div>';
    return drop_string;
}

function setMenu(variablelist, number){
    //Setting what section we're editing eg body/expressions etc
    currently_editing = number;
    document.getElementById("editingTitle").innerHTML = editing_list[number];
    let htmlString = "";
    switch(number){
        case 0: //editing the body
            htmlString+=makeDropbtnString("Head Shape", ["Head"], head_list, "body_part");
            htmlString+=makeDropbtnString("Skin Colour", skin_list, range(skinNum), "colour");
            break;    
        case 1: //editing the outfit
            document.getElementById("test").innerHTML = "Hello";
            for (let i = 0; i < outfit_list.length; i += 1) {
                let b = findNameMatch(body_objects, outfit_list[i]); 
                htmlString+=makeDropbtnString(b.name, [b.name], b.item_list, "body_part");
                htmlString+=makeDropbtnString(b.name+" Colour", [b.name], range(b.colourNum), "colour");
            }
            break;    
        case 2: //editing the expression
            htmlString+="<div class=\"grid-container\"><div style=\"justify-self: end;\">"
            htmlString+=makeDropbtnString("Panel:", ["Panel"], panel_list, "panel");
            htmlString+="</div><h2 id = 'current_panel'>"+panel_list[current_panel] +"</h2></div>";
            htmlString+=makeDropbtnString("Eyebrows", ["Eyebrows"], eyebrow_list, "body_part_panel");
            htmlString+=makeDropbtnString("Eyes", ["Eyes"], eye_list, "body_part_panel");
            htmlString+=makeDropbtnString("Mouth", ["Mouth"], mouth_list, "body_part_panel");
            break;      
        default:
            htmlString = "Unknown value";

    }
    document.getElementById("controls").innerHTML = htmlString;
}

function setPanel(variablelist, number){
    current_panel = number;
    document.getElementById("current_panel").innerHTML = panel_list[current_panel];
}

function setVariable(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(body_objects, variablelist[i]); //the eleemnt of body_objects with the right vriablename
        b.value_list=listOf(number);
    }
    drawCanvas();
}

function setPanelVariable(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(body_objects, variablelist[i]); //the eleemnt of body_objects with the right vriablename
        b.value_list[current_panel]=number;
    }
    drawCanvas();
}

function setColour(variablelist, number){
    let s = "";
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(body_objects, variablelist[i]); //the eleemnt of body_objects with the right vriablename
        b.colour=number;
        s += i +" " + variablelist[i] +" "+b.colour+" - "; 
    }
    document.getElementById("test").innerHTML = s;
    drawCanvas();
}

function drawCanvas() {
    let  canvas = document.getElementById("portCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas_width, canvas_height);
    fixSources(body_objects);
    document.getElementById("closet").innerHTML = outfit_list.length +print_body();
    for (let row = 0; row < 3; row += 1) {
        for (let column = 0; column < 2; column += 1) {
            let xpos = 256*column;
            let ypos = 256*row;
            for (let i = 0; i < body_objects.length; i += 1){
                let b = body_objects[i];
                if (b.item_list[b.value_list[row*2+column]] !="none"){ 
                    ctx.drawImage(b.image_list[row*2+column], xpos, ypos);
                }
            }
        }
    }
}

function gameLoop(){
    //from https://stackoverflow.com/questions/32784387/javascript-canvas-not-redrawing
    //I don't understand how it works but it makes canvas updating MUCH smoother
    drawCanvas()
    requestAnimationFrame(gameLoop);
  }

function setup(){
    document.getElementById("currently_editingBtn").innerHTML = makeDropbtnString("Editing:", ["currently_editing"], editing_list, "menu_part");
    setMenu(["currently_editing"], 0);
}

window.onload = setup;
requestAnimationFrame(gameLoop);

//https://github.com/ninique/Dollmaker-Script
//https://stackoverflow.com/questions/45187291/how-to-change-the-color-of-an-image-in-a-html5-canvas-without-changing-its-patte?rq=1
//https://stackoverflow.com/questions/24405245/html5-canvas-change-image-color
//https://stackoverflow.com/questions/9303757/how-to-change-color-of-an-image-using-jquery
//https://stackoverflow.com/questions/28301340/changing-image-colour-through-javascript
