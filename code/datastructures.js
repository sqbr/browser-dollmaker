function saturation(colour){
    //Returns the saturation as a number between ??
    //colour is an array of numbers between 0 and 255. 
    let M = Math.max(...colour);
    let m = Math.min(...colour);
    let d = (M - m)/255;
    let L = (M + m)/510; 
    if (L ==0){
        return 0;
    }    
    else{
        let X = 1 - Math.abs(2*L-1);
        if (X == 0){
            return 0;
        }
        return d/X; 
    }
}      

function luminance(p){
    //Returns the saturation as a number between 0 and 255
    //p is an array of numbers between 0 and 255. 
    return (0.299*p[0] + 0.587*p[1] + 0.114*p[2]);     
}

function hue(p){
    //returns an angle between 0 and 360
    //p is an array of numbers between 0 and 255. 
    let R = p[0]
    let G = p[1]
    let B = p[2]
    if (R==G && R==B){
        return 0;
    }
    if ((R>=G) && G >=B){
        return 60*(G-B)/float(R-B);
    }
    if (G>R && R>= B){
        return 60*(2-(R-B)/float(G-B));
    }
    if (G>=B && B> R){
        return 60*(2+(B-R)/float(G-R));
    }
    if (B>G && G> R){
        return 60*(4-(G-R)/float(B-R));
    }   
    if (B>R && R>= G){
        return 60*(4+(R-G)/float(B-G));
    }   
    return 60*(6-(B-G)/float(R-G));  
}        

function hexToNum(h){
    //takes 2 digit hex string h and returns a number between 0 and 255
    parseInt(h,16)

}
function colour_desc(colour){
        //returns a text description of a hex colour string. For screenreader/colourblind support.
        let R = parseInt(colour.slice(1,3),16);
        let G = parseInt(colour.slice(3,5),16);
        let B = parseInt(colour.slice(5,7),16);
        let p = [R,G,B]
        let h = hue(p);
        let s = saturation(p);
        let v = luminance(p);

        let hue;

        //Algorithmic values 
        if (h < 0.04){
           if s >0.5{
              hue = "red";
           }
           else{
               hue = "brown";
           }
        }    
        else{   
            if (h < 0.13){hue = "orange";}
        else{
            if (h < 0.18){hue = "yellow";}
        else{ 
            if (h < 0.48) {hue = "green";}
        else{
            if (h < 0.73){hue = "blue";}
        else{
        if (h < 0.89) {hue = "purple";}
        else {
            if (s >0.5) {hue = "red";}
        else{
               hue = "brown";}
        }}}}}}      

        //Using the names in colourlist_list where possible

        /*for sublist in colourlist_list:
           if colour in sublist[1]:
               hue = sublist[0]*/

        //Adding "dark"/"light" etc.       

        let c_string = "";
        if (v ==0){
            return "black"}
        else{
            if (v == 1.0 && s==0){return "white";}
        else{
            if (v < 0.2){return hue + "-black";}
        else{
            if (v < 0.50){c_string += "dark ";}
        }}}

        if (s < 0.09){
            return c_string+ "grey";}
        else{
            if (s >0.5){
            return c_string + hue;}
        else{
            if (v>0.5){
                return "light "+ hue;}
        else{
            return "dark grey-"+hue;}
        }}
}        

function fixSources(list){
    // Fixes the "src" attribute for all images in list
    for (let i = 0; i < list.length; i += 1){
        let b = list[i];
        for (let j = 0; j < panelNum; j += 1){ 
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
        case "panels":
            functionName= "setPanelNum";
            break;
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
            document.getElementById("test").innerHTML = "Unknown button type "+type;                
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

function setPanelNum(variablelist, number){
    panelNum = number+1;
    document.getElementById("panelTitle").innerHTML = panelNum;
}

function setMenu(variablelist, number){
    //Setting what section we're editing eg body/expressions etc
    currently_editing = number;
    document.getElementById("editingTitle").innerHTML = editing_list[number];
    let htmlString = "";
    switch(number){
        case 0: //editing the body
            htmlString+="<div class=\"grid-choices\">"
            htmlString+=makeDropbtnString("Skin Colour", skin_list, range(skinNum), "colour");
            htmlString+=makeDropbtnString("Eye Colour", ["Eyes"], range(eyeNum), "colour");
            htmlString+=makeDropbtnString("Hair Colour", hair_list, range(hairNum), "colour");
            htmlString+="</div>"
            htmlString+="<div class=\"grid-choices\">"
            htmlString+=makeDropbtnString("Head Shape", ["Head"], head_list, "body_part");
            htmlString+=makeDropbtnString("Ear Shape", ["Ears"], ears_list, "body_part");
            htmlString+=makeDropbtnString("Nose Shape", ["Nose"], nose_list, "body_part");
            htmlString+="</div>"
            htmlString+="<div class=\"grid-choices\">"
            htmlString+=makeDropbtnString("Hair back", ["Hair_back"], hair_back_list, "body_part");
            htmlString+=makeDropbtnString("Hair middle", ["Hair_middle"], hair_middle_list, "body_part");
            htmlString+=makeDropbtnString("Hair front", ["Hair_front"], hair_front_list, "body_part");
            htmlString+="</div>"
            htmlString+="<div class=\"grid-choices\">"
            htmlString+=makeDropbtnString("Facial Hair", ["Facial_hair"], facial_hair_list, "body_part");
            htmlString+="</div>"
            break;    
        case 1: //editing the outfit
            document.getElementById("test").innerHTML = "Hello";
            for (let i = 0; i < outfit_list.length; i += 1) {
                let b = findNameMatch(body_objects, outfit_list[i]);
                let edit_list = [b.name];
                if (back_list.includes(b.name)){
                    edit_list.push(b.name+"_back");
                } 
                htmlString+="<div class=\"grid-choices\">"
                htmlString+=makeDropbtnString(b.name, [b.name], b.item_list, "body_part");
                htmlString+='<button onclick="colourPicker()">'+b.name+' Colour</button>';
                htmlString+="</div>"
            }
            break;    
        case 2: //editing the expression
            htmlString+="<div class=\"grid-container\"><div style=\"justify-self: end;\">"
            htmlString+=makeDropbtnString("Panel:", ["Panel"], panel_list, "panel");
            htmlString+="</div><h2 id = 'current_panel'>"+panel_list[current_panel] +"</h2></div>";
            htmlString+="<div class=\"grid-choices\">"
            htmlString+=makeDropbtnString("Eyebrows", ["Eyebrows"], eyebrow_list, "body_part_panel");
            htmlString+=makeDropbtnString("Eyes", ["Eyes"], eye_list, "body_part_panel");
            htmlString+=makeDropbtnString("Mouth", ["Mouth"], mouth_list, "body_part_panel");
            htmlString+="</div>"
            break;      
        default:
            htmlString = "Unknown value "+number;

    }
    document.getElementById("controls").innerHTML = htmlString;
}

function colourPicker(){
    let colour = 0;
    let htmlString = "";
    htmlString+=makeDropbtnString(" Colour", ["Shirt"], [0,1], "colour");
    htmlString+='<button onclick="setMenu(["currently_editing"], 0)">Back</button>';
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
        if (back_list.includes(b.name)){
            let b_back = findNameMatch(body_objects, b.name+"_back");//eg the object associated with "hat_back"
            let list = b_back.item_list;
            if (list.includes(b.item_list[number])){ //this is a valid type of back
                b_back.value_list=listOf(list.indexOf(b.item_list[number])); //set to the correct index, may not match the original object   
            } else{
                b_back.value_list=listOf(0); //set to none
            }
        }
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
    //ctx.clearRect(0,0,canvas_width, canvas_height);
    let numrows;
    let numcols;
    if (panelNum ==1){
        numcols = 1;
    }else{
        numcols = 2;
    }
    if (panelNum%2 == 1){
        numrows = (panelNum+1)/2;
    }else{
        numrows = panelNum/2;
    }
    canvas.height = panel_width*numrows;
    canvas.width =  panel_width*numcols;
    let ctx = canvas.getContext("2d");
    fixSources(body_objects);
    document.getElementById("closet").innerHTML = print_body();
    for (let row = 0; row < numrows; row += 1) {
        for (let column = 0; column < numcols; column += 1) {
            if (row*2+column < panelNum){
                let xpos = panel_width*column;
                let ypos = panel_width*row;
                for (let i = 0; i < body_objects.length; i += 1){
                    let b = body_objects[i];
                    if (b.item_list[b.value_list[row*2+column]] !="none"){ 
                        ctx.drawImage(b.image_list[row*2+column], xpos, ypos);
                    }
                }
            }
        }
    }
}

function setup(){
    document.getElementById("currently_editingBtn").innerHTML = makeDropbtnString("Editing:", ["currently_editing"], editing_list, "menu_part");
    document.getElementById("panel_numBtn").innerHTML = makeDropbtnString("Panels", ["panel_num"], [1,2,3,4,5,6,7,8], "panels");
    setMenu(["currently_editing"], 0);
    setPanelNum(["panel_numBtn"], 5);//setting it to the sixth value eg 6
    drawCanvas();
}

window.onload = setup;
var game = setInterval(drawCanvas, 100);//Update canvas every 100 miliseconds

//Some useful posts:
//https://github.com/ninique/Dollmaker-Script
//https://stackoverflow.com/questions/45187291/how-to-change-the-color-of-an-image-in-a-html5-canvas-without-changing-its-patte?rq=1
//https://stackoverflow.com/questions/24405245/html5-canvas-change-image-color
//https://stackoverflow.com/questions/9303757/how-to-change-color-of-an-image-using-jquery
//https://stackoverflow.com/questions/28301340/changing-image-colour-through-javascript
//https://stackoverflow.com/questions/32784387/javascript-canvas-not-redrawing
