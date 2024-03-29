function saturation(p){
    //Returns the saturation as a number between 0 and 1, inclusive
    //p is an array of numbers between 0 and 255. 
    let M = Math.max(p[0],p[1],p[2]);
    let m = Math.min(p[0],p[1],p[2]);
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

const rgbToLightness = (r,g,b) => 
    1/2 * (Math.max(r,g,b) + Math.min(r,g,b));

const rgbToSaturation = (r,g,b) => {
    const L = rgbToLightness(r,g,b);
    const max = Math.max(r,g,b);
    const min = Math.min(r,g,b);
    return (L === 0 || L === 1)
     ? 0
     : (max - min)/(1 - Math.abs(2 * L - 1));
  };

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

function hex_to_rgb(colour){
    // takes hex code, returns RGB array with integers between 0 and 255
    let R = parseInt(colour.slice(1,3),16);
    let G = parseInt(colour.slice(3,5),16);
    let B = parseInt(colour.slice(5,7),16);
    return [R,G,B];
}

function rgb_to_hex(colour){
//Return color as #rrggbb for the given color values.
    var s = '#';
    for (let i = 0; i < 3; i += 1){
        if (colour[i]< 16)
            s+="0"; //pad with a zero
        s+=(+colour[i]).toString(16).toUpperCase();
    }
    return s
}

function blushcolour(skincolour){
        //Given a colour string, returns the appropriate blush colour
        //Not very reliable
        if (skincolour=="#000000")
            skincolour="#525252";    
        new_colour = hex_to_rgb(skincolour);
        shadow = hex_to_rgb("#FF0462");
        colour = [0,0,0];
        r = 0.3 //opacity of shadow
        for (let i = 0; i < 3; i += 1) // #multiply
           colour[i] = parseInt((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255);   
        return rgb_to_hex(colour) 
}

function frecklecolour(skincolour){
    //Given a colour string, returns the appropriate freckle colour
    //Not very reliable

    if (skincolour=="#000000")
        return "#646464" 
    new_colour = hex_to_rgb(skincolour)
    
    shadow = hex_to_rgb("#854C2C")
    colour = [0,0,0]
    r = 0.5 //opacity of shadow
    for (let i = 0; i < 3; i += 1) // #multiply
        colour[i] = parseInt((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255);   
    return rgb_to_hex(colour) 

}

function colorContrast(colour){
    //given a hexcode, returns a nicely contrasting hexcode. No longer used. 
    let R = parseInt(colour.slice(1,3),16);
    let G = parseInt(colour.slice(3,5),16);
    let B = parseInt(colour.slice(5,7),16);
    let p = [R,G,B]
    let h = findHue(p);
    let s = saturation(p);
    let v = luminance(p);

    if (v<125)
        return "#FFFFFF"
    return "#000000"

}

function colour_string(hex_colour){
    //Which colour of shadow to use
    h = findHue(hex_to_rgb(hex_colour));
    let colour = "purple";
    if (h <62) //reds and yellow
        colour ="red";
    else{ 
    if (h<120) //yellow-green
        colour ="yellow";
    else{
    if (h<180) //green-aqua
        colour ="green";
    else{
    if (h<240)
        colour ="aqua";
    else{ 
    if (h<300)
        colour ="blue";
    }}}}
    return colour
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

        let hueString = "Unknown";

        //Algorithmic values 
        if (h < 14.4){
           if (s >0.5){
            hueString = "Red";
           }
           else{
            hueString = "Brown";
           }
        }    
        else{   
            if (h < 46.8){hueString = "Orange";}
        else{
            if (h < 64.8){hueString = "Yellow";}
        else{ 
            if (h < 172.8) {hueString = "Green";}
        else{
            if (h < 262.8){hueString = "Blue";}
        else{
        if (h < 320.4) {hueString = "Purple";}
        else {
            if (s >0.5) {hueString = "Red";}
        else{
            hueString = "Brown";}
        }}}}}}      

        if (skin_colours.includes(colour) && (h<50||h>325)&& v>0 ){
            let i = skin_colours.indexOf(colour);
            if (i%2 ==0){
                    hueString = "Peach";
            }
            else{
                hueString = "Olive";

            }
            if (i<4){
                return "Pale "+hueString;
            }else{
                if (i>7)
                    return "Dark "+hueString;
                else
                return hueString;
            }
        }    
        
        

        //Adding "dark"/"light" etc.       

        let c_string = "";
        if (v ==0){
            return "Black"}
        else{
            if (v == 255 && s==0){return "White";}
        else{
            if (v < 51){
                if (["Red","Orange"].includes(hueString)){
                    return "Rich Dark Brown"
                } else{
                    return hueString + "-Black";
                }
            }
        else{
            if (v < 100){
                if (hueString =="Orange" && s >0.5)
                    return "Brown"
                else    
                    c_string += "Dark ";
            }
        }}}

        if (s < 0.09){
            return c_string+ "Grey";}
        else{
            if (s >0.5){
            return c_string + hueString;}
        else{
            if (v>160){
                return "Light "+ hueString;}
        else{
            if (["Red","Orange"].includes(hueString)){
                return "Dark Brown"
            } else{
                return "Dark Grey-"+hueString;
            }
            }
        }}
} 

function fixPortSources(){
    // Fixes the "src" attribute for all images in sublist of portrait_objects
    for (let i = 0; i < portrait_objects.length; i += 1){
        let name = "None"
        let b = portrait_objects[i];
        for (let j = 0; j < panelNum; j += 1){ 
            name = b.item_list[b.value_list[j]];

            //stubble
            if (b.name =="Stubble"){
                let obj = findNameMatch(portrait_objects, "Head");
                name = head_list[obj.value_list[0]];
            }

            //stubble
            if (b.name =="Lips"){
                if (current_lips==0)
                    name = "None"    
            } 

            //code to make backs of things match the fronts
            for (let k = 0; k < back_list_port.length; k += 1){ 
                let front_name = back_list_port[k][0];
                if (b.name == front_name+"_back"){
                    obj_front = findNameMatch(portrait_objects, front_name);
                    if (front_name =="Coat" && coat_dec_back_list_port.includes(name)){
                        obj_dec = findNameMatch(portrait_objects, front_name+"_dec");
                        b.colour1 = obj_dec.colour1;
                    }else
                        b.colour1 = obj_front.colour1;
                    if (back_list_port[k][1].includes(obj_front.item_list[obj_front.value_list[j]]))
                        name = obj_front.item_list[obj_front.value_list[j]];    
                }
            }

            //code for sleeves
            for (let k = 0; k < sleeve_list_port.length; k += 1){ 
                let front_name = sleeve_list_port[k].name; //eg "Shirt", "Coat" etc
                if (b.name == front_name+"_sleeves"){ //this is "Shirt_sleeves" etc
                    obj_front = findNameMatch(portrait_objects, front_name); //what shirt etc we are wearing
                    b.colour1 = obj_front.colour1
                    name = "None";
                    b.value_list[j] = 0;
                    current_sleeves_list = sleeve_list_port[k].sleeves_list;
                    current_item = obj_front.item_list[obj_front.value_list[j]];
                    if (current_sleeves_list.includes(current_item)){ //the current shirt etc can have sleeves
                            let current_sleeves = sleeve_list[k] //what current sleeve length is
                            if (current_sleeves==0){
                                b.value_list[j] = 1;
                                name = "zilch";
                            }
                            else{
                                b.value_list[j] = 2;
                                if (sleeve_list_port[k].sharp_sleeves.includes(current_item)){
                                    name = "sharp";   
                                }else{
                                    name = "round";   
                                }
                                
                            } 
                    }
                }
                if (b.name == front_name+"_sleeves_dec"){ //this is "Shirt_sleeves_dec" etc
                    obj_front = findNameMatch(portrait_objects, front_name); //what shirt etc we are wearing
                    obj_dec = findNameMatch(portrait_objects, front_name+"_dec"); //what shirt decoration etc we are wearing
                    b.colour1 = obj_dec.colour1
                    name = "None";
                    b.value_list[j] = 0;
                    if (obj_dec.value_list[j]!=0){ //item is decorated
                        current_sleeves_list = sleeve_list_port[k].sleeves_list;
                        current_item = obj_front.item_list[obj_front.value_list[j]];
                        if (current_sleeves_list.includes(obj_front.item_list[obj_front.value_list[j]])){ //the current shirt etc can have sleeves
                            let current_dec = sleeve_list_port[k].dec_list[obj_dec.value_list[j]]
                            if (current_dec!="None"){
                                let current_sleeves = sleeve_list[k]  //what current sleeve length is
                                if (current_sleeves==0){
                                    b.value_list[j] = obj_dec.value_list[j]*current_sleeves_list.length+1;
                                    name = current_dec+" zilch"
                                }
                                else{
                                    b.value_list[j] = obj_dec.value_list[j]*current_sleeves_list.length+2;
                                    if (sleeve_list_port[k].sharp_sleeves.includes(current_item)){
                                        name = current_dec+" sharp";   
                                    }else{
                                        name = current_dec+" round";   
                                    }
                                } 
                            }
                        }
                    }
                }
            }
            if (name.includes("None")||name.includes("none")){
                b.base_image_list[j].src  ="";
                b.shadow_image_list[j].src  ="";
                b.highlight_image_list[j].src  ="";
                b.overlay_image_list[j].src  ="";

            } else
            {
                if (b.name =="Nose_front")
                    name+="_noshadow";
                save_string = "images/portraits/"+b.location+"/"+name 
                   
                b.base_image_list[j].src  = save_string+"_base.png";
                b.highlight_image_list[j].src  = save_string+"_highlight.png";
                b.overlay_image_list[j].src  = save_string+"_overlay.png";
                b.shadow_image_list[j].src  = save_string+"_multiply_"+colour_string(b.colour1)+".png";
                
            }
        }
    }
}

function fixSpriteSources(){
    // Fixes the "src" attribute for all images in sublist of sprite_objects
    for (let i = 0; i < sprite_objects.length; i += 1){
        let b = sprite_objects[i];
        
        //code for sleeves
        for (let k = 0; k < sleeve_list_port.length; k += 1){ 
            let front_name = sleeve_list_port[k].name; //eg "Shirt", "Coat" etc
            if (b.name == front_name+"_sleeves"){ //this is "Shirt_sleeves" etc
                obj_front = findNameMatch(portrait_objects, front_name); //what shirt etc we are wearing
                b.colour1 = obj_front.colour1
                current_sleeves_list = sleeve_list_port[k].sleeves_list;
                current_item = obj_front.item_list[obj_front.value_list[0]];
                if (false){//(current_item =="letterman"){
                    b.item = Math.max(0,2*2-1+height);
                    b.colour1 = obj_front.colour1
                } else{
                if (current_sleeves_list.includes(current_item)){ //the current shirt etc can have sleeves
                    if (findNameMatch(sprite_objects, "Wheelchair").item>0){ //there's a wheelchair
                        if (sleeve_list[k] ==0)
                            b.item = 0; 
                        else    
                            b.item =4+sleeve_list[k];
                    }
                    else
                        b.item =Math.max(0,2*sleeve_list[k]-1+height); //what current sleeve length is
                } else{
                        b.item = 0;  
                }
                }
            }
            }
        
        //Make Hair_top match Hairstyle
        if (b.name =="Hairstyle_top"){
            let hair_obj=findNameMatch(sprite_objects, "Hairstyle");
            b.item =hair_obj.item;
            b.colour1 = hair_obj.colour1;
        }

        let item = b.item_list[b.item];
        if (item != none){
            b.topcorner = item.topcorner;
            b.rowNum= item.rowNum;

            //code to make backs of things match the fronts. 
            for (let k = 0; k < back_list_sprite.length; k += 1){ 
                let front_name = back_list_sprite[k][0];
                if (b.name == front_name+"_back"){
                    obj_front = findNameMatch(sprite_objects, front_name);
                    b.colour1 = obj_front.colour1;
                    if (back_list_sprite[k][1].includes(obj_front.item_list[obj_front.value]))
                        b.item = obj_front.item;
                        
                }
            }
            //code to make fronts of things match the backs. 
            for (let k = 0; k < front_list_sprite.length; k += 1){ 
                let front_name = front_list_sprite[k][0];
                if (b.name == front_name+"_front"){
                    obj_front = findNameMatch(sprite_objects, front_name);
                    b.colour1 = obj_front.colour1;
                    if (front_list_sprite[k][1].includes(obj_front.item_list[obj_front.value]))
                        b.item = obj_front.item;
                        
                }
            }
        }

        if (b.item_list[b.item].name.includes("None")||b.item_list[b.item].name.includes("none")){
            b.base_image.src="";
            b.shadow_image.src="";
            b.highlight_image.src="";
            b.overlay_image.src="";
        } else{
            loc = b.item_list[b.item].location;
            
            //set colour
            if (item.colour){
                loc_string = "images/sprites/"+loc;
            }else{
                loc_string = "images/bases/sprites/"+loc; 
            }
            b.base_image.src  =loc_string+"_base.png";
            b.shadow_image.src  =loc_string+"_multiply_"+colour_string(b.colour1)+".png";
            b.highlight_image.src  =loc_string+"_highlight.png";
            b.overlay_image.src  =loc_string+"_overlay.png";
        }
}
}

function fixSpecialSpriteSources(){
    // Fixes the "src" attribute for all sprites for flower dance/wedding
    updateSpecialSprites();
    for (let i = 0; i < special_sprite_objects.length; i += 1){
        let b = special_sprite_objects[i];
        let item = b.item_list[b.item];
        if (item == none){
            b.base_image.src="";
            b.shadow_image.src="";
            b.highlight_image.src="";
            b.overlay_image.src="";
        }else{
            let loc = item.location;
            if (b.name == "Wedding"){
                if (current_gender ==1)//male love interest
                    b.heightOffset = 384;
                else
                    b.heightOffset = 288;
            }
            else{
                if (current_gender ==1)//male love interest
                    b.heightOffset = 352;
                else
                    b.heightOffset = 320;
            }        

            
            if (item.colour){
                loc_string = "images/sprites/"+loc;
            }else{
                loc_string = "images/bases/sprites/"+loc; 
            }
            b.base_image.src  =loc_string+"_base.png";
            b.shadow_image.src  =loc_string+"_multiply_"+colour_string(b.colour1)+".png";
            b.highlight_image.src  =loc_string+"_highlight.png";
            b.overlay_image.src  =loc_string+"_overlay.png";

        }
    }
}

function draw_coloured_port(obj, index, colour, ctx, sourceX, sourceY, xpos, ypos){
    //draw image for portrait object
    //obj: the object
    //index: what panel we're drawing
    //colour: current colour 
    //ctx: 2Dcontext of relevant canvas
    //sourceX: X value of top left corner of section we're cutting from source image 
    //sourceY: Y value of top left corner of section we're cutting from source image 
    //xpos: X value of top left corner of pasted image 
    //ypos: Y value of top left corner of pasted image 
    if (!(obj.name =="Lips" && (current_lips==0))){
    if (obj.name =="Blush")
        off_ctx.fillStyle = blushcolour(colour);
    else{
        if (obj.name == "Complexion"&& obj.item_list[obj.value_list[0]])
            off_ctx.fillStyle = frecklecolour(colour);
        else
            off_ctx.fillStyle = colour;
    }
    off_ctx.fillRect(0, 0, 256, 268);

    off_ctx.globalCompositeOperation = "destination-in";
    off_ctx.drawImage(obj.base_image_list[index],0,0,256,268, 0, 0,256,268);

    off_ctx.globalCompositeOperation = "multiply";
    off_ctx.drawImage(obj.shadow_image_list[index],0,0,256,268, 0, 0,256,268);
    off_ctx.globalCompositeOperation = "screen";
    off_ctx.drawImage(obj.highlight_image_list[index],0,0,256,268, 0, 0,256,268);
    off_ctx.globalCompositeOperation = "source-over"; 
    off_ctx.drawImage(obj.overlay_image_list[index],0,0,256,268, 0, 0,256,268);
    ctx.drawImage(off_canvas,sourceX,sourceY,256,256, xpos, ypos,256,256);
}
}

function draw_coloured_sprite(obj, ctx, colour, sourceX, sourceY, sourcewidth,sourceheight,xpos, ypos,width,height){
    //draw image for portrait object
    //obj: the object
    //ctx: 2Dcontext of relevant canvas
    //colour: current colour 
    //sourceX: X value of top left corner of section we're cutting from source image 
    //sourceY: Y value of top left corner of section we're cutting from source image 
    //sourcewidth: width of section we're cutting from source image 
    //sourceheight: height of section we're cutting from source image 
    //xpos: X value of top left corner of pasted image 
    //ypos: Y value of top left corner of pasted image 
    //width: width of pasted image  
    //height: height of pasted image  

    if (!obj.item_list[obj.item].name.includes("None")&&!obj.item_list[obj.item].name.includes("none")){
    off_ctx.globalCompositeOperation = "source-over";
    off_ctx.fillStyle = colour;
    off_ctx.fillRect(0, 0, sourcewidth,sourceheight);

    off_ctx.globalCompositeOperation = "destination-in";
    off_ctx.drawImage(obj.base_image,sourceX,sourceY,sourcewidth,sourceheight, 0, 0,sourcewidth,sourceheight);
    
    off_ctx.globalCompositeOperation = "multiply";
    
    off_ctx.drawImage(obj.shadow_image,sourceX,sourceY,sourcewidth,sourceheight, 0, 0,sourcewidth,sourceheight);
    
    off_ctx.globalCompositeOperation = "screen";
    off_ctx.drawImage(obj.highlight_image,sourceX,sourceY,sourcewidth,sourceheight, 0, 0,sourcewidth,sourceheight);
    
    off_ctx.globalCompositeOperation = "source-over"; 
    off_ctx.drawImage(obj.overlay_image,sourceX,sourceY,sourcewidth,sourceheight, 0, 0,sourcewidth,sourceheight);
    
    ctx.drawImage(off_canvas,0,0,sourcewidth,sourceheight, xpos, ypos,width,height);
    }
}
