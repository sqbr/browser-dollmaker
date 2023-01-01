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

function setSpritePreset(variablelist, number){
    current_sprite_preset = number;
    let dance_object = findNameMatch(special_sprite_objects,"Flower dance");
    let wedding_object = findNameMatch(special_sprite_objects,"Wedding");
    if (current_sprite_preset==1){ //female love interest
        current_gender = 0;
        dance_object.dimensions = [64,64];
        dance_object.heightOffset = 320;
        wedding_object.heightOffset = 288;
    } else{
        current_gender = 1;
        dance_object.dimensions = [64,32];
        dance_object.heightOffset = 352;
        wedding_object.heightOffset = 384;

    }
    document.getElementById("panelTitle").innerHTML = sprite_presets[current_sprite_preset];
}

function setTopbar(){
    let s = '';
    s+='<div class="four-columns">\n';
    s+='<div id = "image_typeBtn" style="justify-self: end;">Something</div>\n';
    s+='<div><h2 id="imageType" text-align="left">'+niceString(imageType_list[current_imageType])+'</h2></div> \n';
    if (current_imageType==0){
        s+='<div id = "panel_numBtn" style="justify-self: end;">Something</div>\n';
        s+='<div><h2 id="panelTitle" text-align="left">Broken</h2></div> \n';
        s+='</div>\n'; 
    } else{
        s+='<div id = "sprite_presetBtn" style="justify-self: end;">Something</div>\n';
        s+='<div><h2 id="panelTitle" text-align="left">Broken</h2></div> \n';
        s+='</div>\n';
    }
    s+='</div>\n';
    document.getElementById("topbar").innerHTML = s;
    document.getElementById("image_typeBtn").innerHTML = makeDropbtnString("Image Type:", ["current_imageType"], imageType_list, "setImageType");
    if (current_imageType==0){
        document.getElementById("panelTitle").innerHTML = panelNum;
        document.getElementById("panel_numBtn").innerHTML = makeDropbtnString("Panels:", ["panel_num"], [1,2,3,4,5,6,7,8,9,10], "setPanelNum");
    } else{
        document.getElementById("panelTitle").innerHTML = niceString(sprite_presets[current_sprite_preset]);
        document.getElementById("sprite_presetBtn").innerHTML = makeDropbtnString("Spritesheet:", ["current_sprite_preset"], sprite_presets, "setSpritePreset");

    }   
    
}

function setToolbar(){
    let s = "";
    s+='<div><button onclick="download()">Export</button></div>';
    s+='<h2 style="justify-self: end;">Load:</h2><input type="file" onchange=\'readText(this)\' />'
    if (currently_editing==1){
        s+='<div class="four-columns">\n';
    }else{
        s+='<div class="three-columns">\n';
    }
    
    s+='    <div id = "currently_editing_Btn" style="justify-self: end;">Secret</div>\n'; 
    s+='    <div><h2 id="editingTitle" text-align="left">errors??</h2></div>\n';
    if (currently_editing==1){
        s+='    <div id = "current_clothes_Btn" style="justify-self: end;">Secret</div>\n'; 
        s+='    <div><h2 id="clothesTitle" text-align="left">'+niceString(menu_object_names[current_clothing])+'</h2></div>\n';     
    }
    s+='</div>\n';
    document.getElementById("toolbar").innerHTML = s;
    document.getElementById("editingTitle").innerHTML = niceString(editing_list[currently_editing]);
    document.getElementById("currently_editing_Btn").innerHTML = makeDropbtnString("Editing:", ["currently_editing"], editing_list, "setMenu");
    if (currently_editing==1){
        document.getElementById("current_clothes_Btn").innerHTML = makeDropbtnString("Editing:", ["current_clothing"], menu_object_names.slice(0,menu_object_names.length-1), "setCurrentClothing");
    }
}

function setImageType(variablelist, number){
    current_imageType = number;
    setTopbar(); 
    setMenu([], currently_editing); 
}

function setMenu(variablelist, number){
    //Setting what section we're editing eg body/expressions etc
    currently_editing = number;
    //document.getElementById("editingTitle").innerHTML = editing_list[number];
    setToolbar();
    let htmlString = "";
    switch(number){
        case 0: //editing the body
            htmlString+="<div class=\"grid-choices\">"
            htmlString+=makeDropbtnString("Skin Colour", skin_list, skin_colours, "setSkinColour");
            htmlString+=makeDropbtnString("Eye Colour", ["Eyes"], eye_colours, "setBothColour");
            htmlString+=makeDropbtnString("Hair Colour", hair_list, hair_colours, "setHairColour");
            htmlString+="</div>"
            
            htmlString+="<div class=\"grid-choices\">"
            htmlString+=makeDropbtnString("Head Shape", ["Head"], head_list, "setPortVariable");
            htmlString+=makeDropbtnString("Height", ["Torso"], ["Short","Tall"], "setHeight");
            htmlString+=makeDropbtnString("Nose Shape", ["Nose","Nose_front"], nose_list, "setPortVariable");
            htmlString+="</div>" 
            
            htmlString+="<div class=\"grid-choices\">"
            htmlString+=makeDropbtnString("Hairstyle", ["Hairstyle"], findNameMatch(menu_objects, "Hairstyle").name_list, "setHair");
            htmlString+=makeDropbtnString("Facial Hair", ["Facial_hair"], facial_hair_list_menu, "setFacialHair");
            htmlString+=makeDropbtnString("Eye Type", ["Eyes"], eye_type_list_port, "setEyeType");
            htmlString+="</div>"  
            
            htmlString+="<div class=\"grid-choices\">"
            htmlString+=makeDropbtnString("Complexion", ["Complexion"], complexion_list, "setPortVariable");
            htmlString+="</div>"
            break;    
        case 1: //editing the outfit
            //document.getElementById("test").innerHTML = print_menu_objects();
            let current_item = menu_object_names[current_clothing];
            if (current_item == "Hairstyle")
                document.getElementById("test").innerHTML = "Oops why is this editing the hairstyle??"
            htmlString+="<div class=\"grid-choices\">"
            
            let obj = findNameMatch(menu_objects, current_item);
            if (["Shoes","Gloves"].includes(current_item)){
                htmlString+=makeDropbtnString(current_item, [current_item], obj.name_list, "set"+current_item);
                if (current_item=="Shoes")
                    var current_value = currentShoes;
                else  
                    var current_value = currentGloves;
            }
            else{
                htmlString+=makeDropbtnString(current_item, [current_item], obj.name_list, "setClothing"); 
                var current_value = obj.item;
            }
            htmlString+='<div><h2 id="clothingTitle" text-align="left">'+niceString(obj.name_list[current_value])+'</h2></div>';
            htmlString+="</div>" 
            htmlString+="<div class=\"grid-choices\">"    
            htmlString+=makeDropbtnString("Main Colour", [current_item], outfit_colours, "setClothingColour");
            htmlString+='<div><h2 id="clothingColour" text-align="left">'+niceString(colour_desc(obj.colour_list[obj.colour]))+'</h2></div>';
            htmlString+="</div>" 
            htmlString+="<div class=\"grid-choices\">" 
            htmlString+=makeDropbtnString("Highlight Colour", [current_item], outfit_colours, "setClothing2Colour");
            htmlString+='<div><h2 id="clothingColour2" text-align="left">'+niceString(colour_desc(obj.colour_list[obj.colour2]))+'</h2></div>';
            htmlString+="</div>"
            if (sleeve_havers.includes(current_item)){
                htmlString+="<div class=\"grid-choices\">" 
                htmlString+=makeDropbtnString("Sleeves:", [current_item], sleeves_names, "setSleeves");
                //document.getElementById("test").innerHTML = sleeve_list.toString();
                htmlString+='<div><h2 id="hasSleevesTitle" text-align="left">'+niceString(sleeves_names[sleeve_list[sleeve_havers.indexOf(current_item)]])+'</h2></div>';
                htmlString+="</div>"
            }  
            
            break;    
        case 2: //editing the expression
                htmlString+="<div class=\"grid-pair\">" 
                htmlString+="<div style=\"justify-self: end;\">"
                htmlString+=makeDropbtnString("Panel:", ["Panel"], panel_list.slice(0,panelNum), "setPanel");
                htmlString+="</div><div><h2 id = 'current_panel'>"+niceString(panel_list[current_panel]) +"</h2></div></div>";
                htmlString+="<div class=\"four-columns\">"
                htmlString+=makeDropbtnString("Eyebrows", ["Eyebrows"], eyebrow_list, "setPanelVariable");
                htmlString+=makeDropbtnString("Eyes", ["Eyes"], eye_expression_list_port, "setEyeExpression");
                htmlString+=makeDropbtnString("Mouth", ["Mouth"], mouth_list, "setPanelVariable");
                htmlString+=makeDropbtnString("Blush", ["Blush"], blush_list, "setPanelVariable");
                htmlString+="</div>"
                break;   
        case 3: //editing the wedding outfit
            htmlString+=makeDropbtnString("Wedding Outfit", ["current_wedding_clothes"], ["Regular outfit"].concat(wedding_clothes_list), "setWeddingClothes");
            break;   
        case 4: //editing the dance outfit
            htmlString+=makeDropbtnString("Flower Dance Outfit", ["current_dance_clothes"], dance_clothes_list, "setDanceClothes");
            break;   

        default:
            htmlString = "Unknown value "+number;

    }
    document.getElementById("controls").innerHTML = htmlString;
    //updateMenuCanvases();
}

function updateMenuCanvases(){
    //updates the little canvas in the colour select screen
    switch(currently_editing){
        case 1: 
            let current_item = menu_object_names[current_clothing];
            let obj = findNameMatch(menu_objects, current_item);
            var canvas = document.getElementById("clothingCanvas");
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = obj.colour_list[obj.colour];
            ctx.fillRect(0, 0, 20, 20);
            break;
    }
}


function setPanel(variablelist, number){
    current_panel = number;
    document.getElementById("current_panel").innerHTML = panel_list[current_panel];
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
    //return the Y coordinate of the row of the original image
    return obj.topcorner[1]+row*obj.dimensions[1];
}

function newX(obj, row, column){
    //return the X coordinate of the column of the new image
    let gap = 0;
    if ((obj.name.includes("Hairstyle")) && (row==3))
        gap =-1;
    return 16*column+obj.offset[0]+gap;
}

function newY(obj, row,column){
    //return the Y coordinate of the row of the new image
    let bob = 0;
    if (obj.bobs){
        bob =column%2;
        if (row == 2)
            bob-=1;
    }
    /*if (row == 2)
        bob+=obj.backOffset;*/
    if ((obj.name.includes("Hairstyle")) && [1,3].includes(row))
        bob-=1;
    return row*32+obj.offset[1]+bob+(1-height)*obj.heightOffset;
}

function drawCanvas() {
    canvas = document.getElementById("exportCanvas");
    ctx = canvas.getContext("2d");
    canvas_preview = document.getElementById("previewCanvas");
    ctx_preview = canvas_preview.getContext("2d");
    fixSpriteSources();
    fixPortSources();
    fixSpecialSpriteSources();

    //preview canvas
    canvas_preview.width = canvas_preview.width; //clears
    //document.getElementById("closet").innerHTML = print_portrait_objects();
    let hair = findNameMatch(sprite_objects, "Hairstyle");
    for (let i = 0; i < sprite_objects.length; i += 1){ //sprite preview
        let b = sprite_objects[i];
        if (b.item_list[b.value] !=none){ 
            for (let column = 0; column < 2; column += 1) //column 1-2
                if(b.name !="Hairstyle_top" || column >0)
                    ctx_preview.drawImage(b.image, oldX(b,0), oldY(b,column),b.dimensions[0],b.dimensions[1],4*newX(b,0,column),4*newY(b,0,column),b.dimensions[0]*4,b.dimensions[1]*4);
            ctx_preview.drawImage(b.image, oldX(b,0), oldY(b,3),b.dimensions[0],b.dimensions[1],4*newX(b,2,2),4*(newY(b,2,2)-64),b.dimensions[0]*4,b.dimensions[1]*4);
            // else{
            //     if (b.rowNum==3)
            //         ctx_preview.drawImage(b.image, oldX(b,0), oldY(b,2),b.dimensions[0],b.dimensions[1],64*2+b.offset[0]*4,b.offset[1]*4,b.dimensions[0]*4,b.dimensions[1]*4);
            // }    
        }        
    }
    //portrait preview
    ctx_preview.drawImage(portrait_back, 256, 0);
    for (let i = 0; i < portrait_objects.length; i += 1){
        let b = portrait_objects[i];
        if (b.item_list[b.value_list[current_panel]] !="None"){ 
            ctx_preview.drawImage(b.image_list[current_panel], 256, getOffset(b.name));
        }
    }
    //main canvas
    if (current_imageType==0){ //portrait
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
                        if (b.item_list[b.value_list[row*2+column]] !="None"){ 
                            //sourceX, sourceY, sourceWidth, sourceHeight, destWidth and destHeight 
                            ctx.drawImage(b.image_list[row*2+column],0,-getOffset(b.name),256,256, xpos, ypos,256,256);
                        }
                    }
                }
            }
        }
    } else{ //sprites
        canvas.width =  64;
        if (current_sprite_preset == 0)
            canvas.height = 128;
        else    
            canvas.height = 416;
        
        //document.getElementById("closet").innerHTML = print_sprite_objects();
        //sourceX, sourceY, sourceWidth, sourceHeight, destWidth and destHeight   
        for (let i = 0; i < sprite_objects.length; i += 1){
            let b = sprite_objects[i];
            if (b.image.src !=""){ 
                for (let row = 0; row < 2; row += 1){//rows 1,2   
                    for (let column = 0; column < 2; column += 1)
                        if(b.name !="Hairstyle_top" || column >0)
                            ctx.drawImage(b.image, oldX(b,column), oldY(b,row),b.dimensions[0],b.dimensions[1],newX(b,row,column), newY(b,row,column),b.dimensions[0],b.dimensions[1]);//column 1
                    ctx.drawImage(b.image, oldX(b,0), oldY(b,row),b.dimensions[0],b.dimensions[1],newX(b,row, 2), newY(b,row,2),b.dimensions[0],b.dimensions[1]); //column 3  
                    ctx.drawImage(b.image, oldX(b,2), oldY(b,row),b.dimensions[0],b.dimensions[1],newX(b,row,3), newY(b,row,3),b.dimensions[0],b.dimensions[1]); //column 4              
                }
                if (b.rowNum==4){ //don't have to flip
                        for (let column = 0; column < 2; column += 1){
                            ctx.drawImage(b.image, oldX(b,column), oldY(b,3),b.dimensions[0],b.dimensions[1],newX(b,2,column), newY(b,2,column),b.dimensions[0],b.dimensions[1]);//ROW 3
                            ctx.drawImage(b.image, oldX(b,column), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,column), newY(b,3,column),b.dimensions[0],b.dimensions[1]);//ROW 4
                        }
                        ctx.drawImage(b.image, oldX(b,0), oldY(b,3),b.dimensions[0],b.dimensions[1],newX(b,2,2), newY(b,2,2),b.dimensions[0],b.dimensions[1]); //column 3 row 3 
                        ctx.drawImage(b.image, oldX(b,2), oldY(b,3),b.dimensions[0],b.dimensions[1],newX(b,2,3), newY(b,2,3),b.dimensions[0],b.dimensions[1]); //column 4  row 3 
                        ctx.drawImage(b.image, oldX(b,0), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,2), newY(b,3,2),b.dimensions[0],b.dimensions[1]); //column 3 row 4 
                        ctx.drawImage(b.image, oldX(b,2), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,3), newY(b,3,3),b.dimensions[0],b.dimensions[1]); //column 4  row 4             
    
                }
                
            }
        }  
        if (current_sprite_preset >0){
            var wedding_height = 288;
            var dance_height = 320;
            var sleeping_height = 256
            if (current_sprite_preset==2){//male love interest
                wedding_height = 384;
                dance_height = 352;
            }
            let noWeddingOutfit = (findNameMatch(special_sprite_objects,"Wedding").item==0);
            //heads behind clothes

            for (let i = 0; i < sprite_objects.length; i += 1){
                let b = sprite_objects[i];
                if (b.image.src !=""){ 
                    if (sprite_special_list.includes(b.name) || noWeddingOutfit){
                        //wedding  
                        let wedding_offset =0;
                        if (sprite_special_list.includes(b.name))
                            wedding_offset =1;
                        ctx.drawImage(b.image, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0), newY(b,0,0)+wedding_height,b.dimensions[0],b.dimensions[1]);//facing forward
                        ctx.drawImage(b.image, oldX(b,0), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,0)+15, newY(b,3,0)+wedding_height-96+wedding_offset,b.dimensions[0],b.dimensions[1]); //sideways not kissing
                        if (b.name =="Eyes")
                            ctx.drawImage(closed_eyes_image, 36, 24,12,12,32, wedding_height+4,12,12);
                        else{  //sideways, kissing 
                            if (b.name=="Arms" || b.name.includes("sleeves")|| b.name=="Gloves")   //shonky 'reaching forward' arm
                                ctx.drawImage(b.image, oldX(b,2), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,0)+29, newY(b,3,0)+wedding_height-96,b.dimensions[0],b.dimensions[1]);
                            else
                                ctx.drawImage(b.image, oldX(b,0), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,0)+30, newY(b,3,0)+wedding_height-96+wedding_offset,b.dimensions[0],b.dimensions[1]);
                        }
                    }
                    //sleeping/kissing
                    if (b.name =="Eyes")
                        ctx.drawImage(closed_eyes_image, 36, 24,12,12,-1, sleeping_height+3,12,12);
                    else { 
                        if (b.name=="Arms" || b.name.includes("sleeves")|| b.name=="Gloves")  //shonky 'reaching forward' arm
                            ctx.drawImage(b.image, oldX(b,2), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,0)-4, newY(b,3,0)+sleeping_height-96,b.dimensions[0],b.dimensions[1]);
                        else
                            ctx.drawImage(b.image, oldX(b,0), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,0)-3, newY(b,3,0)+sleeping_height-96,b.dimensions[0],b.dimensions[1]);
                    }    
                    if (sprite_special_list.includes(b.name)){    
                        if (current_sprite_preset==1){
                            //female 
                            //dance heads
                            for (let column = 0; column < 2; column++)
                                ctx.drawImage(b.image, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0)+column*16, newY(b,0,0)+dance_height,b.dimensions[0],b.dimensions[1]);
                            ctx.drawImage(b.image, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0)+2*16-1, newY(b,0,0)+dance_height,b.dimensions[0],b.dimensions[1]);    
                            ctx.drawImage(b.image, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0)+3*16, newY(b,0,0)+dance_height+1,b.dimensions[0],b.dimensions[1]);  
                            for (let column = 0; column < 2; column++)
                                ctx.drawImage(b.image, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0)+column*16, newY(b,0,0)+dance_height+33,b.dimensions[0],b.dimensions[1]);  
                            ctx.drawImage(b.image, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0)+2*16, newY(b,0,0)+dance_height+32,b.dimensions[0],b.dimensions[1]);  
                            ctx.drawImage(b.image, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0)+3*16, newY(b,0,0)+dance_height+33,b.dimensions[0],b.dimensions[1]);  
                        } 
                    }
                }
            }
            for (let i = 0; i < special_sprite_objects.length; i += 1){
                let b = special_sprite_objects[i];
                if (b.image.src !=""){ 
                    ctx.drawImage(b.image, 0, 0,b.dimensions[0],b.dimensions[1],0, b.heightOffset,b.dimensions[0],b.dimensions[1]);
                }
            }

            //heads in front of clothes

            for (let i = 0; i < sprite_objects.length; i += 1){
                let b = sprite_objects[i];
                if (b.image.src !=""){ 
                    if (sprite_special_list.includes(b.name)){
                        if (current_sprite_preset==2){
                            //male 
                            //dance heads
                            ctx.drawImage(b.image, oldX(b,0), oldY(b,3),b.dimensions[0],b.dimensions[1],newX(b,2,0), newY(b,2,0)+dance_height-64,b.dimensions[0],b.dimensions[1]);
                            for (let column = 1; column < 4; column++)
                                ctx.drawImage(b.image, oldX(b,0), oldY(b,3),b.dimensions[0],b.dimensions[1],newX(b,2,0)+column*16, newY(b,2,0)+dance_height-63,b.dimensions[0],b.dimensions[1]);  
                        }   
                    }
                }
            }
            

            //closed eyes
            
        }
    }
}

function setup(){
    //document.getElementById("test").innerHTML = print_sprite_objects();
    setTopbar();

    checkFileAPI();
    setToolbar();

    setEyeType([],0);
    setSkinColour([],4);
    setBothColour(['Eyes'],13);
    setHairColour([],8);
    setHair([],11);
    setPortVariable(["Nose"],3);
    setPortVariable(["Head"],3)

    setClothing(["Pants"],2);
    setClothingColour(["Pants"],10);
    
    setClothing(["Shirt"],3);
    setClothingColour(["Shirt"],0);
    
    current_panel = 0;
    setPanelVariable(["Eyebrows"],6);
    setPanelVariable(["Mouth"],5);
    setEyeExpression(["Eyes"],0);
    current_panel = 1;
    setPanelVariable(["Eyebrows"],2);
    setPanelVariable(["Mouth"],1);
    setEyeExpression(["Eyes"],2);
    current_panel = 2;
    setPanelVariable(["Eyebrows"],3);
    setPanelVariable(["Mouth"],10);
    setEyeExpression(["Eyes"],1);
    current_panel = 3;
    setPanelVariable(["Eyebrows"],1);
    setPanelVariable(["Mouth"],0);
    setEyeExpression(["Eyes"],0);
    current_panel = 4;
    setPanelVariable(["Eyebrows"],4);
    setPanelVariable(["Mouth"],3);
    setEyeExpression(["Eyes"],3);
    setPanelVariable(["Blush"],1);
    current_panel = 5;
    setPanelVariable(["Eyebrows"],5);
    setPanelVariable(["Mouth"],12);
    setEyeExpression(["Eyes"],4);
    for (current_panel = 6; current_panel < 10; current_panel += 1){ 
        setPanelVariable(["Eyebrows"],6);
        setPanelVariable(["Mouth"],5);
        setEyeExpression(["Eyes"],0);
    }

    current_panel = 0;

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
