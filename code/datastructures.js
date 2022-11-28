function saturation(p){
    //Returns the saturation as a number between 0 and 1, inclusive
    //p is an array of numbers between 0 and 255. 
    let M = Math.max(...p);
    let m = Math.min(...p);
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
    //Returns the luminance as a number between 0 and 255
    //p is an array of numbers between 0 and 255. 
    return (0.299*p[0] + 0.587*p[1] + 0.114*p[2]);     
}       

function findHue(p){
    //returns an angle between 0 and 360
    //p is an array of numbers between 0 and 255. 
    let R = p[0]
    let G = p[1]
    let B = p[2]
    if (R==G && R==B){
        return 0;
    }
    if ((R>=G) && G >=B){
        return 60*(G-B)/(R-B);
    }
    if (G>R && R>= B){
        return 60*(2-(R-B)/(G-B));
    }
    if (G>=B && B> R){
        return 60*(2+(B-R)/(G-R));
    }
    if (B>G && G> R){
        return 60*(4-(G-R)/(B-R));
    }   
    if (B>R && R>= G){
        return 60*(4+(R-G)/(B-G));
    }   
    return 60*(6-(B-G)/(R-G)); 
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
        let h = findHue(p);
        let s = saturation(p);
        let v = luminance(p);

        //return colour +" H:"+h.toFixed(2)+" "+s.toFixed(3)+" "+v.toFixed(2)

        let hueString = "unknown";

        //Algorithmic values 
        if (h < 14.4){
           if (s >0.5){
            hueString = "red";
           }
           else{
            hueString = "brown";
           }
        }    
        else{   
            if (h < 46.8){hueString = "orange";}
        else{
            if (h < 64.8){hueString = "yellow";}
        else{ 
            if (h < 172.8) {hueString = "green";}
        else{
            if (h < 262.8){hueString = "blue";}
        else{
        if (h < 320.4) {hueString = "purple";}
        else {
            if (s >0.5) {hueString = "red";}
        else{
            hueString = "brown";}
        }}}}}}      

        //Using the names in colourlist_list where possible

        /*for (let i = 0; i < colourlist_list.length; i += 1){
            sublist = colourlist_list[i];
           if (sublist[1].includes(colour)){
            hueString = sublist[0]+"in list"
           }
        }*/

        //Adding "dark"/"light" etc.       

        let c_string = "";
        if (v ==0){
            return "black"}
        else{
            if (v == 255 && s==0){return "white";}
        else{
            if (v < 51){
                if (["red","orange"].includes(hueString)){
                    return "rich dark brown"
                } else{
                    return hueString + "-black";
                }
            }
        else{
            if (v < 125){c_string += "dark ";}
        }}}

        if (s < 0.09){
            return c_string+ "grey";}
        else{
            if (s >0.5){
            return c_string + hueString;}
        else{
            if (v>125){
                return "light "+ hueString;}
        else{
            if (["red","orange"].includes(hueString)){
                return "dark brown"
            } else{
                return "dark grey-"+hueString;
            }
            }
        }}
}        

function fixPortSources(list){
    // Fixes the "src" attribute for all images in sublist of portrait_objects
    for (let i = 0; i < list.length; i += 1){
        let b = list[i];
        for (let j = 0; j < panelNum; j += 1){ 
            if (b.colourNum==1){
                b.image_list[j].src = "images/bases/portraits/"+b.location+"/"+b.item_list[b.value_list[j]]+".png";
            }else{
                b.image_list[j].src  = "images/portraits/"+b.location+"/"+b.item_list[b.value_list[j]]+"_"+b.colour+".png";
            }
        }
    }
}

function fixSpriteSources(list){
    // Fixes the "src" attribute for all images in sublist of sprite_objects
    for (let i = 0; i < list.length; i += 1){
        let b = list[i];
        let item = b.item_list[b.item];
        if (item == none){
            b.image.src="";

        }else{
        b.topcorner = item.topcorner;
        b.rowNum= item.rowNum;
        b.asymmetrical = item.asymmetrical;
        if (item.colour){
            b.image.src  = "images/sprites/"+item.location+"_"+b.colour+".png";
        }else{
            b.image.src = "images/bases/sprites/"+item.location+".png";
        }
    }
    }
}

function niceString(input){
    //the text to put in a button
    let output = input.toString();
    output = output.replace("_", " ");
    return output.charAt(0).toUpperCase()+output.slice(1)

}
function makeDropbtnString(name, variablelist, list, functionName){
    //Create a dropdown menu which is called name, and sets all the entires in variablelist to whatever value of list is chosen 
    let id = name+functionName+'Dropdown';
    
    let drop_string = '<div class="dropdown">';
    drop_string +='<button onclick="dropFunction(\''+id+'\')" class="dropbtn">'+name+'</button>';
    drop_string +='<div id="'+id+'" class="dropdown-content">';
    for (row = 0; row < list.length; row += 1) {
        drop_string +='<button onclick="'+functionName+'(['
        for (i = 0; i < variablelist.length; i += 1){
            drop_string +="\'"+variablelist[i]+"\',"
        }
        drop_string +='],'+row+')" >'
        if (functionName.includes("Colour")){
            drop_string +=niceString(colour_desc(list[row]))
        }else{
            drop_string +=niceString(list[row]); //name of button
        }
        drop_string +='</button>';
    }
    drop_string +='</div></div>';
    return drop_string;
}

function setPanelNum(variablelist, number){
    panelNum = number+1;
    document.getElementById("panelTitle").innerHTML = panelNum;
}

function setTopbar(){
    let s = '';
    //s+='<div><button onclick="exportCanvas()">Export</button></div>\n';
    s+='<div class="grid-container">\n';
    s+='<div id = "image_typeBtn" style="justify-self: end;">Something</div>\n';
    s+='<div><h2 id="imageType" text-align="left">Broken</h2></div> \n';
    s+='</div>\n';
    document.getElementById("topbar").innerHTML = s;
    document.getElementById("image_typeBtn").innerHTML = makeDropbtnString("Image Type:", ["current_imageType"], imageType_list, "setImageType");
}

function setToolbar(number){
    let s = "";
    if (current_imageType == "Portrait"){
        s+='<div id = "panel_numBtn" style="justify-self: end;">Something</div>\n';
        s+='<div><h2 id="panelTitle" text-align="left">Broken</h2></div> \n';
        s+='</div>\n'; 
        s+='<div class="grid-container">\n';
        s+='    <div id = "currently_editing_portBtn" style="justify-self: end;">Secret</div>\n'; 
        s+='    <div><h2 id="editingTitle" text-align="left">errors??</h2></div>\n';
        s+='</div>\n';
        document.getElementById("toolbar").innerHTML = s;
        document.getElementById("currently_editing_portBtn").innerHTML = makeDropbtnString("Editing:", ["currently_editing_port"], editing_list_port, "setMenu");
        document.getElementById("panel_numBtn").innerHTML = makeDropbtnString("Panels", ["panel_num"], [1,2,3,4,5,6,7,8], "setPanelNum");

    } else{
        s+='<div class="grid-container">\n';
        s+='    <div id = "currently_editing_spritesBtn" style="justify-self: end;">Secret</div>\n'; 
        s+='    <div><h2 id="editingTitle" text-align="left">errors??</h2></div>\n';
        s+='</div>\n';
        document.getElementById("toolbar").innerHTML = s;
        document.getElementById("currently_editing_spritesBtn").innerHTML = makeDropbtnString("Editing:", ["currently_editing_sprites"], editing_list_sprites, "setMenu");
    }
}

function setImageType(variablelist, number){
    current_imageType = number;
    document.getElementById("imageType").innerHTML = imageType_list[number];
    let htmlString = "";
    switch(number){
        case 0: //editing portraits
            currently_editing_port = 0;
            htmlString+='<div id = "panel_numBtn" style="justify-self: end;">Something</div>\n';
            htmlString+='<div><h2 id="panelTitle" text-align="left">'+panelNum+'</h2></div> \n';
            htmlString+='</div>\n'; 
            htmlString+='<div class="grid-container">\n';
            htmlString+='    <div id = "currently_editing_portBtn" style="justify-self: end;">Secret</div>\n'; 
            htmlString+='    <div><h2 id="editingTitle" text-align="left">'+editing_list_port[currently_editing_port]+'</h2></div>\n';
            htmlString+='</div>\n';
            document.getElementById("toolbar").innerHTML = htmlString; 
            document.getElementById("currently_editing_portBtn").innerHTML = makeDropbtnString("Editing:", ["currently_editing_port"], editing_list_port, "setMenu");
            document.getElementById("panel_numBtn").innerHTML = makeDropbtnString("Panels", ["panel_num"], [1,2,3,4,5,6,7,8], "setPanelNum");
            setMenu([], currently_editing_port)
            break;
        case 1: //editing sprites
            currently_editing_sprites = 0;
            htmlString+='<div class="grid-container">\n';
            htmlString+='    <div id = "currently_editing_spritesBtn" style="justify-self: end;">Editing:</div>\n'; 
            htmlString+='    <div><h2 id="editingTitle" text-align="left">'+editing_list_sprites[currently_editing_sprites]+'</h2></div>\n';
            htmlString+='</div>\n';
            document.getElementById("toolbar").innerHTML = htmlString; 
            document.getElementById("currently_editing_spritesBtn").innerHTML = makeDropbtnString("Editing:", ["currently_editing_sprites"], editing_list_sprites, "setMenu");
            setMenu([], currently_editing_sprites)
            break;
    
        default:
            htmlString = "Unknown value "+number;   
            document.getElementById("toolbar").innerHTML = htmlString;  
    }   

}

function setMenu(variablelist, number){
    //Setting what section we're editing eg body/expressions etc
    if (current_imageType==0){ //editing portraits
        currently_editing_port = number;
        document.getElementById("editingTitle").innerHTML = editing_list_port[number];
    }else{
        currently_editing_sprites = number;
        document.getElementById("editingTitle").innerHTML = editing_list_sprites[number];
    }
        let htmlString = "";
    switch(number){
        case 0: //editing the body
            htmlString+="<div class=\"grid-choices\">"
            htmlString+=makeDropbtnString("Skin Colour", skin_list, skin_colours, "setSkinColour");
            htmlString+=makeDropbtnString("Eye Colour", ["Eyes"], eye_colours, "setBothColour");
            htmlString+=makeDropbtnString("Hair Colour", hair_list, hair_colours, "setHairColour");
            htmlString+="</div>"
            if (current_imageType==0){ //portraits
                htmlString+="<div class=\"grid-choices\">"
                htmlString+=makeDropbtnString("Head Shape", ["Head"], head_list, "setPortVariable");
                htmlString+=makeDropbtnString("Ear Shape", ["Ears"], ears_list, "setPortVariable");
                htmlString+=makeDropbtnString("Nose Shape", ["Nose"], nose_list, "setPortVariable");
                htmlString+="</div>"
                htmlString+="<div class=\"grid-choices\">"
                htmlString+=makeDropbtnString("Hair back", ["Hair_back"], hair_back_list, "setPortVariable");
                htmlString+=makeDropbtnString("Hair middle", ["Hair_middle"], hair_middle_list, "setPortVariable");
                htmlString+=makeDropbtnString("Hair front", ["Hair_front"], hair_front_list, "setPortVariable");
                htmlString+="</div>"  
            }else{
                htmlString+="<div class=\"grid-choices\">"
                htmlString+=makeDropbtnString("Hair style", ["Hairstyle"], sprite_hair_list.map(nameOf), "setSpriteHair");
                htmlString+=makeDropbtnString("Height", ["Torso"], ["Short","Tall"], "setHeight");
                htmlString+=makeDropbtnString("Eyelashes", ["Eyes"], eyelash_list, "setSpriteVariable");
                htmlString+="</div>"  
            }
            htmlString+="<div class=\"grid-choices\">"
            htmlString+=makeDropbtnString("Facial Hair", ["Facial_hair"], facial_hair_list, "setBothVariable");
            htmlString+="</div>"
            break;    
        case 1: //editing the outfit
            //document.getElementById("test").innerHTML = "Hello";
            htmlString+="<div class=\"grid-choices\">"
            htmlString+=makeDropbtnString("Shirt", ["Shirt1","Shirt2"], shirt_list, "setShirt");
            htmlString+=makeDropbtnString("Shirt Colour", ["Shirt1","Shirt2"], outfit_colours, "setShirtColour");
            htmlString+="<div class=\"grid-choices\">"
            htmlString+="</div>"
            htmlString+=makeDropbtnString("Coat", ["Coat"], coat_list, "setCoat");
            htmlString+=makeDropbtnString("Coat Colour", ["Coat"], outfit_colours, "setCoatColour");
            htmlString+="</div>"
            for (let i = 0; i < outfit_list.length; i += 1) {
                let current_item = outfit_list[i];
                if (outfit_list_both.includes(current_item)){
                    let b = findNameMatch(sprite_objects, current_item);
                    htmlString+="<div class=\"grid-choices\">"
                    htmlString+=makeDropbtnString(current_item, [current_item], b.item_list.map(nameOf), "set"+current_item);
                    htmlString+=makeDropbtnString(b.name+" Colour", [b.name], outfit_colours, "setBothColour");
                    htmlString+="</div>"
                }
                if (current_imageType==0){
                    if (outfit_list_portOnly.includes(current_item)){
                        let b = findNameMatch(portrait_objects, current_item);
                        let edit_list = [current_item];
                        if (back_list.includes(current_item)){
                            edit_list.push(current_item+"_back");
                        } 
                        htmlString+="<div class=\"grid-choices\">"
                        htmlString+=makeDropbtnString(current_item, [current_item], b.item_list, "setPortVariable");
                        htmlString+=makeDropbtnString(current_item+" Colour", [current_item], outfit_colours, "setPortColour");
                        htmlString+="</div>"
                    }
                }
                else{
                    if (outfit_list_spriteOnly.includes(current_item)){
                        let b = findNameMatch(sprite_objects, current_item);
                        htmlString+="<div class=\"grid-choices\">"
                        if (["Shoes","Gloves"].includes(current_item)){
                            htmlString+=makeDropbtnString(b.name, [b.name], b.name_list, "set"+b.name);
                        } else{
                            htmlString+=makeDropbtnString(b.name, [b.name], b.name_list, "setSpriteVariable");
                        }
                        htmlString+=makeDropbtnString(b.name+" Colour", [b.name], outfit_colours, "setSpriteColour");
                        htmlString+="</div>"
                    } 
                }
            }
            break;    
        case 2: //editing the expression
            if (current_imageType==0){ 
                htmlString+="<div class=\"grid-container\"><div style=\"justify-self: end;\">"
                htmlString+=makeDropbtnString("Panel:", ["Panel"], panel_list, "setPanel");
                htmlString+="</div><h2 id = 'current_panel'>"+panel_list[current_panel] +"</h2></div>";
                htmlString+="<div class=\"grid-choices\">"
                htmlString+=makeDropbtnString("Eyebrows", ["Eyebrows"], eyebrow_list, "setPanelVariable");
                htmlString+=makeDropbtnString("Eyes", ["Eyes"], eye_list, "setPanelVariable");
                htmlString+=makeDropbtnString("Mouth", ["Mouth"], mouth_list, "setPanelVariable");
                htmlString+="</div>"
                break;   
            }   
        default:
            htmlString = "Unknown value "+number;

    }
    document.getElementById("controls").innerHTML = htmlString;
}


function setPanel(variablelist, number){
    current_panel = number;
    document.getElementById("current_panel").innerHTML = panel_list[current_panel];
}

function setPortVariable(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(portrait_objects, variablelist[i]); //the eleemnt of portrait_objects with the right vriablename
        b.value_list=listOf(number);
        if (back_list.includes(b.name)){
            let b_back = findNameMatch(portrait_objects, b.name+"_back");//eg the object associated with "hat_back"
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

function setSpriteVariable(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(sprite_objects, variablelist[i]); //the eleemnt of portrait_objects with the right vriablename
        b.item=number;
    }
    drawCanvas();
}

function setPanelVariable(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(portrait_objects, variablelist[i]); //the eleemnt of portrait_objects with the right vriablename
        b.value_list[current_panel]=number;
    }
    drawCanvas();
}

function setBothColour(variablelist, number){
    setPortColour(variablelist, number);
    setSpriteColour(variablelist, number);
    drawCanvas();
}

function setPortColour(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(portrait_objects, variablelist[i]); //the eleemnt of portrait_objects with the right vriablename
        b.colour=number;
    }
}

function setSpriteColour(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(sprite_objects, variablelist[i]); //the eleemnt of portrait_objects with the right vriablename
        b.colour=number;
    }
}

function setSkinColour(variablelist, number){
    setPortColour(skin_list, number);
    setSpriteColour(["Torso","Arms"], number);
    drawCanvas();
}

function setHairColour(variablelist, number){
    setPortColour(hair_list, number);
    setSpriteColour(["Hairstyle","Facial_hair"], number);
    drawCanvas();
}

function setShirtColour(variablelist, number){
    setPortColour(["Shirt"], number);
    setSpriteColour(["Shirt1","Shirt2"], number);
    drawCanvas();
}

function setCoatColour(variablelist, number){
    setPortColour(["Coat"], number);
    setSpriteColour(["Coat","Sleeves"], number);
    drawCanvas();
}

function setFacialHair(variablelist, number){
    setPortVariable(["Facial_hair"], number);
    setSpriteVariable(["Facial_hair"], number);
    drawCanvas();
}

function setBothVariable(variablelist, number){
    setPortVariable(variablelist, number);
    setSpriteVariable(variablelist, number);
    drawCanvas();
}

function setShoes(variablelist, number){
    currentShoes = number;
    setSpriteVariable(["Shoes"], Math.max(0,2*currentShoes-1+height)); 
    drawCanvas();
}

function setGloves(variablelist, number){
    currentGloves = number;
    setSpriteVariable(["Gloves"], Math.max(0,2*currentGloves-1+height)); 
    drawCanvas();
}

function setEyewear(variablelist, number){
    setBothVariable(variablelist, number);
    drawCanvas();
}

function setShirt(variablelist, number){
    if (number>0)
        setPortVariable(["Shirt"], 1);
    else
        setPortVariable(["Shirt"], 0);
    setSpriteVariable(["Shirt1","Shirt2"], number);
    drawCanvas();
}

function setCoat(variablelist, number){
    if (number>0){
        setPortVariable(["Coat"], 1);
        setSpriteVariable(["Sleeves"], 1);
    }
    else
        setPortVariable(["Coat"], 0);
    setSpriteVariable(["Coat"], number);
    drawCanvas();
}

function setHat(variablelist, number){
    if (number>0)
        setPortVariable(variablelist, 1);
    else
        setPortVariable(variablelist, 0);
    setSpriteVariable(variablelist, number);
    drawCanvas();
}

function setNeckwear(variablelist, number){
    if (number>0)
        setPortVariable(variablelist, 1);
    else
        setPortVariable(variablelist, 0);
    setSpriteVariable(variablelist, number);
    drawCanvas();
}

function setEarrings(variablelist, number){
    if (number>0)
        setPortVariable(variablelist, 1);
    else
        setPortVariable(variablelist, 0);
    setSpriteVariable(variablelist, number);
    drawCanvas();
}

function setSpriteHair(variablelist, number){
    setSpriteVariable(["Hairstyle"], number);
    if (number ==0)
        isBald = true;
    else
        isBald = false;    
    setHeight([], height);
}

function setHeight(variablelist, number){
    height = number;
    setSpriteVariable(["Arms"], number);
    setSpriteVariable(["Shoes"], Math.max(0,2*currentShoes-1+height)); 
    setSpriteVariable(["Gloves"], Math.max(0,2*currentGloves-1+height)); 
    document.getElementById("test").innerHTML = Math.max(0,2*currentGloves-1+height)+" "+Math.max(0,2*currentShoes-1+height);
    if (isBald){
        setSpriteVariable(["Torso"], 2+number);
    }else { 
        setSpriteVariable(["Torso"], number); 
    } 
    drawCanvas();
}

function oldX(obj, column){
    //return the X coordinate of the column of the original image
    let xgap = 0;
    if (obj.isWalk){
        xgap = obj.dimensions[0];
    }
    return obj.topcorner[0]+column*xgap;
}

function oldY(obj, row){
    //return the X coordinate of the row of the original image
    return obj.topcorner[1]+row*obj.dimensions[1];
}

function newX(obj, column){
    //return the X coordinate of the row of the new image
    return 16*column+obj.offset[0];
}

function newY(obj, row,column){
    //return the X coordinate of the row of the new image
    let bob = 0;
    if (obj.bobs){
        bob =column%2;
    }
    return row*32+obj.offset[1]+bob+(1-height)*obj.heightOffset;
}

function drawCanvas() {
    canvas = document.getElementById("exportCanvas");
    ctx = canvas.getContext("2d");
    canvas_preview = document.getElementById("previewCanvas");
    ctx_preview = canvas_preview.getContext("2d");
    fixSpriteSources(sprite_objects);
    fixPortSources(portrait_objects);

    //preview canvas
    canvas_preview.width = canvas_preview.width; //clears
    document.getElementById("closet").innerHTML = print_portrait_objects();
    let hair = findNameMatch(sprite_objects, "Hairstyle");
    for (let i = 0; i < sprite_objects.length; i += 1){ //sprite preview
        let b = sprite_objects[i];
        if (b.item_list[b.value] !=none){ 
            for (let column = 0; column < 2; column += 1) //column 1-2
                ctx_preview.drawImage(b.image, oldX(b,0), oldY(b,column),b.dimensions[0],b.dimensions[1],64*column+b.offset[0]*4,4*(b.offset[1]+(1-height)*b.heightOffset),b.dimensions[0]*4,b.dimensions[1]*4);
            if (b.rowNum==4)
                ctx_preview.drawImage(b.image, oldX(b,0), oldY(b,3),b.dimensions[0],b.dimensions[1],64*2+b.offset[0]*4,b.offset[1]*4,b.dimensions[0]*4,b.dimensions[1]*4);
            else{
                if (b.rowNum==3)
                    ctx_preview.drawImage(b.image, oldX(b,0), oldY(b,2),b.dimensions[0],b.dimensions[1],64*2+b.offset[0]*4,b.offset[1]*4,b.dimensions[0]*4,b.dimensions[1]*4);
            }    
        }        
    }
    //drawing hair
    ctx_preview.drawImage(hair.image, oldX(hair,0), oldY(hair,1),hair.dimensions[0],hair.dimensions[1],64+hair.offset[0]*4,4*(hair.offset[1]+(1-height)*hair.heightOffset),hair.dimensions[0]*4,hair.dimensions[1]*4);
    ctx_preview.drawImage(hair.image, oldX(hair,0), oldY(hair,2),hair.dimensions[0],hair.dimensions[1],64*2+hair.offset[0]*4,hair.offset[1]*4,hair.dimensions[0]*4,hair.dimensions[1]*4);
    ctx_preview.drawImage(portrait_back, 256, 0);
    for (let i = 0; i < portrait_objects.length; i += 1){
        let b = portrait_objects[i];
        if (b.item_list[b.value_list[current_panel]] !="none"){ 
            ctx_preview.drawImage(b.image_list[current_panel], 256, 0);
        }
    }
    //main canvas
    if (current_imageType==0){
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
        
        for (let row = 0; row < numrows; row += 1) {
            for (let column = 0; column < numcols; column += 1) {
                if (row*2+column < panelNum){
                    let xpos = panel_width*column;
                    let ypos = panel_width*row;
                    for (let i = 0; i < portrait_objects.length; i += 1){
                        let b = portrait_objects[i];
                        if (b.item_list[b.value_list[row*2+column]] !="none"){ 
                            ctx.drawImage(b.image_list[row*2+column], xpos, ypos);
                        }
                    }
                }
            }
        }
    } else{
        canvas.height = 128;
        canvas.width =  64;
        document.getElementById("closet").innerHTML = print_sprite_objects();
        //sourceX, sourceY, sourceWidth, sourceHeight, destWidth and destHeight   
        for (let i = 0; i < sprite_objects.length; i += 1){
            let b = sprite_objects[i];
            if (b.image.src !=""){ 
                for (let row = 0; row < 2; row += 1){//rows 1,2   
                    for (let column = 0; column < 2; column += 1)
                        ctx.drawImage(b.image, oldX(b,column), oldY(b,row),b.dimensions[0],b.dimensions[1],newX(b,column), newY(b,row,column),b.dimensions[0],b.dimensions[1]);//column 1
                    ctx.drawImage(b.image, oldX(b,0), oldY(b,row),b.dimensions[0],b.dimensions[1],newX(b,2), newY(b,row,2),b.dimensions[0],b.dimensions[1]); //column 3  
                    ctx.drawImage(b.image, oldX(b,2), oldY(b,row),b.dimensions[0],b.dimensions[1],newX(b,3), newY(b,row,3),b.dimensions[0],b.dimensions[1]); //column 4              
                }
                if (b.rowNum==4){ //don't have to flip
                    for (let column = 0; column < 4; column += 1){
                            ctx.drawImage(b.image, oldX(b,0), oldY(b,3),b.dimensions[0],b.dimensions[1],newX(b,column), newY(b,2,column),b.dimensions[0],b.dimensions[1]); //3rd row
                            ctx.drawImage(b.image, oldX(b,0), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,column), newY(b,3,column),b.dimensions[0],b.dimensions[1]); //4th row                
                    }
                }else{
                    if (b.rowNum==3){ //has a back
                        //row 3
                        for (let column = 0; column < 2; column += 1)
                            ctx.drawImage(b.image, oldX(b,column), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,column),newY(b,2,column),b.dimensions[0],b.dimensions[1]); //3rd row cols 1-2
                        ctx.drawImage(b.image, oldX(b,0), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,2), newY(b,2,2),b.dimensions[0],b.dimensions[1]); //column 3  
                        ctx.drawImage(b.image, oldX(b,2), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3), newY(b,2,3),b.dimensions[0],b.dimensions[1]); //column 4   
                    }           
                    //row 4
                    if (!b.asymmetrical){
                        for(let x = 0; x < b.dimensions[0]; x++){ //janky way of flipping
                            for (let column = 0; column < 2; column += 1)
                                    ctx.drawImage(b.image, oldX(b,column)+x, oldY(b,1), 1, b.dimensions[1], newX(b,column)+b.dimensions[0] - x, newY(b,3,column), 1, b.dimensions[1]);
                            ctx.drawImage(b.image, oldX(b,0)+x, oldY(b,1), 1, b.dimensions[1], newX(b,2)+b.dimensions[0] - x, newY(b,3,2), 1, b.dimensions[1]); 
                            ctx.drawImage(b.image, oldX(b,2)+x, oldY(b,1), 1, b.dimensions[1], newX(b,3)+b.dimensions[0] - x, newY(b,3,3), 1, b.dimensions[1]);       
                        }     
                    }   
                }        
            }
        }
        if (hair.rowNum==3){ //has a back
            //row 3
            for (let column = 0; column < 2; column += 1)
                ctx.drawImage(hair.image, oldX(hair,column), oldY(hair,2),hair.dimensions[0],hair.dimensions[1],newX(hair,column),newY(hair,2,column),hair.dimensions[0],hair.dimensions[1]); //3rd row cols 1-2
            ctx.drawImage(hair.image, oldX(hair,0), oldY(hair,2),hair.dimensions[0],hair.dimensions[1],newX(hair,2), newY(hair,2,2),hair.dimensions[0],hair.dimensions[1]); //column 3  
            ctx.drawImage(hair.image, oldX(hair,2), oldY(hair,2),hair.dimensions[0],hair.dimensions[1],newX(hair,3), newY(hair,2,3),hair.dimensions[0],hair.dimensions[1]); //column 4   
        }           
        //row 4
        if (!hair.asymmetrical){
            for(let x = 0; x < hair.dimensions[0]; x++){ //janky way of flipping
                for (let column = 0; column < 2; column += 1)
                        ctx.drawImage(hair.image, oldX(hair,column)+x, oldY(hair,1), 1, hair.dimensions[1], newX(hair,column)+hair.dimensions[0] - x, newY(hair,3,column), 1, hair.dimensions[1]);
                ctx.drawImage(hair.image, oldX(hair,0)+x, oldY(hair,1), 1, hair.dimensions[1], newX(hair,2)+hair.dimensions[0] - x, newY(hair,3,2), 1, hair.dimensions[1]); 
                ctx.drawImage(hair.image, oldX(hair,2)+x, oldY(hair,1), 1, hair.dimensions[1], newX(hair,3)+hair.dimensions[0] - x, newY(hair,3,3), 1, hair.dimensions[1]);       
            }     
        }   
    }
}

function setup(){
    setTopbar();
    setImageType([],0);

    setHeight([],height);
    setSkinColour([],4);
    setBothColour(['Eyes'],3);
    setHairColour([],3);
    setBothVariable(['Facial_hair'],3);
    setSpriteHair([],5);
    setPortVariable(["Hair_back","Hair_front","Hair_middle"],1)

    setSpriteVariable(["Pants"],1);
    setSpriteColour(["Pants"],10);
    setShoes([],1);
    setSpriteColour(["Shoes"],4);
    setBothVariable(["Eyewear"],2);
    setSpriteColour(["Eyewear"],10);
    setShirt(['Shirt'],1);
    setShirtColour(['Shirt'],3);
    setGloves([],1);
    setSpriteColour(["Gloves"],4);

    drawCanvas();
}
let portrait_back = new Image();
portrait_back.src = "images/portrait_back.png"
window.onload = setup;
var game = setInterval(drawCanvas, 100);//Update canvas every 100 miliseconds

//Some useful posts:
//https://github.com/ninique/Dollmaker-Script
//https://stackoverflow.com/questions/45187291/how-to-change-the-color-of-an-image-in-a-html5-canvas-without-changing-its-patte?rq=1
//https://stackoverflow.com/questions/24405245/html5-canvas-change-image-color
//https://stackoverflow.com/questions/9303757/how-to-change-color-of-an-image-using-jquery
//https://stackoverflow.com/questions/28301340/changing-image-colour-through-javascript
//https://stackoverflow.com/questions/32784387/javascript-canvas-not-redrawing
