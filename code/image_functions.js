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

function colorContrast(colour){
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

function fixPortSources(){
    // Fixes the "src" attribute for all images in sublist of portrait_objects
    for (let i = 0; i < portrait_objects.length; i += 1){
        let b = portrait_objects[i];
        for (let j = 0; j < panelNum; j += 1){ 
            let name = b.item_list[b.value_list[j]];

            //stubble
            if (b.name =="Stubble"){
                let obj = findNameMatch(portrait_objects, "Head");
                name = head_list[obj.value_list[0]];
            }

            //code to make backs of things match the fronts
            for (let k = 0; k < back_list_port.length; k += 1){ 
                let front_name = back_list_port[k][0];
                if (b.name == front_name+"_back"){
                    obj_front = findNameMatch(portrait_objects, front_name);
                    if (back_list_port[k][1].includes(obj_front.item_list[obj_front.value_list[j]]))
                        name = obj_front.item_list[obj_front.value_list[j]];
                        if (front_name =="Coat" && coat_dec_back_list_port.includes(name)){
                            obj_dec = findNameMatch(portrait_objects, front_name+"_dec");
                            b.colour = obj_dec.colour;
                        }else
                            b.colour = obj_front.colour;
                }
            }

            //code for sleeves
            for (let k = 0; k < sleeve_list_port.length; k += 1){ 
                let front_name = sleeve_list_port[k].name; //eg "Shirt", "Coat" etc
                if (b.name == front_name+"_sleeves"){ //this is "Shirt_sleeves" etc
                    obj_front = findNameMatch(portrait_objects, front_name); //what shirt etc we are wearing
                    name = "None";
                    current_sleeves_list = sleeve_list_port[k].sleeves_list;
                    current_item = obj_front.item_list[obj_front.value_list[j]];
                    if (current_sleeves_list.includes(current_item)){ //the current shirt etc can have sleeves
                            let current_sleeves = sleeve_list[k] //what current sleeve length is
                            if (current_sleeves==0){
                                b.item_list[j] = 0;
                                name = "zilch";
                            }
                            else{
                                b.item_list[j] = 1;
                                if (sleeve_list_port[k].sharp_sleeves.includes(current_item)){
                                    name = "sharp";   
                                }else{
                                    name = "round";   
                                }
                                
                            } 
                            b.colour = obj_front.colour
                    }
                }
                if (b.name == front_name+"_sleeves_dec"){ //this is "Shirt_sleeves_dec" etc
                    obj_front = findNameMatch(portrait_objects, front_name); //what shirt etc we are wearing
                    obj_dec = findNameMatch(portrait_objects, front_name+"_dec"); //what shirt decoration etc we are wearing
                    name = "None";
                    current_sleeves_list = sleeve_list_port[k].sleeves_list;
                    current_item = obj_front.item_list[obj_front.value_list[j]];
                    if (current_sleeves_list.includes(obj_front.item_list[obj_front.value_list[j]])){ //the current shirt etc can have sleeves
                        let current_dec = sleeve_list_port[k].dec_list[obj_dec.value_list[j]]
                        let current_sleeves = sleeve_list[k]  //what current sleeve length is
                        if (current_sleeves==0){
                            b.item_list[j] = 0
                            name = current_dec+" zilch"
                        }
                        else{
                            b.item_list[j] = 1
                            if (sleeve_list_port[k].sharp_sleeves.includes(current_item)){
                                name = current_dec+" sharp";   
                            }else{
                                name = current_dec+" round";   
                            }
                        } 
                        b.colour = obj_dec.colour
                    }
                }
            }
            if (name.includes("None")||name.includes("none")){
                b.image_list[j].src  ="";

            } else{
                if (false){//since all portrait items are coloured
                    b.image_list[j].src = "images/bases/portraits/"+b.location+"/"+name+".png";
                }else{
                    if (b.name =="Nose_front"){
                        b.image_list[j].src  = "images/portraits/"+b.location+"/"+name+"_noshadow_"+b.colour+".png";
                    }else
                        b.image_list[j].src  = "images/portraits/"+b.location+"/"+name+"_"+b.colour+".png";
                }
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
                current_sleeves_list = sleeve_list_port[k].sleeves_list;
                current_item = obj_front.item_list[obj_front.value_list[0]];
                if (false){//(current_item =="letterman"){
                    b.item = Math.max(0,2*2-1+height);
                    b.colour = obj_front.colour
                } else{
                if (current_sleeves_list.includes(current_item)){ //the current shirt etc can have sleeves
                        b.item =Math.max(0,2*sleeve_list[k]-1+height); //what current sleeve length is
                        b.colour = obj_front.colour
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
            b.colour = hair_obj.colour;
        }

        let item = b.item_list[b.item];
        if (item == none){
            b.image.src="";
        }else{
        b.topcorner = item.topcorner;
        b.rowNum= item.rowNum;
        let loc = item.location

        //code to make backs of things match the fronts. 
        for (let k = 0; k < back_list_sprite.length; k += 1){ 
            let front_name = back_list_sprite[k][0];
            if (b.name == front_name+"_back"){
                obj_front = findNameMatch(sprite_objects, front_name);
                if (back_list_sprite[k][1].includes(obj_front.item_list[obj_front.value]))
                    b.item = obj_front.item;
                    b.colour = obj_front.colour;
            }
        }
        //code to make fronts of things match the backs. 
        for (let k = 0; k < front_list_sprite.length; k += 1){ 
            let front_name = front_list_sprite[k][0];
            if (b.name == front_name+"_front"){
                obj_front = findNameMatch(sprite_objects, front_name);
                if (front_list_sprite[k][1].includes(obj_front.item_list[obj_front.value]))
                    
                    b.item = obj_front.item;
                    b.colour = obj_front.colour;
            }
        }
        //set colour
        if (item.colour){
            b.image.src  = "images/sprites/"+loc+"_"+b.colour+".png";
        }else{
            b.image.src = "images/bases/sprites/"+loc+"_base.png";
        }
    }
}
}

function fixSpecialSpriteSources(){
    updateSpecialSprites();
    for (let i = 0; i < special_sprite_objects.length; i += 1){
        let b = special_sprite_objects[i];
        let item = b.item_list[b.item];
        if (item == none){
            b.image.src="";
        }else{
        let loc = item.location;
        if (item.colour){
            b.image.src  = "images/sprites/"+loc+"_"+b.colour+".png";
        }else{
            b.image.src = "images/bases/sprites/"+loc+".png";
        }

        }
    }
}
