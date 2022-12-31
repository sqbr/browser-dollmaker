function firstElement(listname){
    return listname[0];
}

const menu_objects = [];

// name, item list, number, colour, colour 2, portrait list lists, sprite list lists

/*
Name: String.
item_list: list of objects as above
colour_list: list of strings describing whsat colour it can be
item: index of item_list describing current item
colour: index of colour_list describing current item's colour
colour2: index of colour_list describing current item's secondary colour
ports_list: list of lists [portrait object name, item number]
sprites_list:list of lists [sprite object name, item number]
*/
function add_menu_object(name, list_list, colour_list, port_item_list, port_second_list, sprite_item_list, sprite_second_list){
    let sprite_main_list = xor(sprite_item_list, sprite_second_list);
    let port_main_list = xor(port_item_list, port_second_list);
    menu_objects.push({name: name,list_list: list_list, name_list: list_list.map(firstElement),colour_list: colour_list, port_item_list: port_item_list, sprite_item_list: sprite_item_list, port_second_list: port_second_list, sprite_second_list: sprite_second_list, sprite_main_list: sprite_main_list, port_main_list: port_main_list, item: 0,  colour: 0, colour2: 0 });
}

const none_menu = ["None",[],[]];

const hat_menu_list = [ none_menu,["Bow",[5,0,0],[77,0]],["Headphones",[3,0,0],[90,0]],["Flower Crown",[10,0,0],[94,0]],["Soft Cap",[11,0,0],[82,0]],["Cap",[2,0,0],[78,0]],["Joja Cap",[2,1,0],[78,5]],["Turban",[14,0,0],[88,0]],["Helmet",[13,0,0],[97,0]],["Beanie",[8,0,0],[87,0]],["Hijab",[0,0,1],[89,0]],["Top Hat",[9,6,0],[73,1]],["Fedora",[9,6,0],[96,24]], ["Bowler",[9,6,0],[95,23]],["Broad Hat",[7,5,0],[83,11]],["Bobble Hat",[6,4,0],[93,21]],["Sun Hat",[1,3,0],[92,20]],["Wizard",[4,0,0],[91,0]],["Witch",[12,7,0],[98,26]],];

const hair_menu_list = [ none_menu,["Shaved",[17,0],[56]],["Buzzcut",[18,0],[47]],["Balding",[15,12],[52]],["Short",[22,0],[45]],["Short Side-part",[8,0],[3]],["Neat Side-part",[29,0],[8]],["Floppy side part",[24,0],[79]],["Hi-top",[10,0],[12]],["Short Back and Sides",[27,0],[43]],["Short Spiky",[13,10],[1]],["Curly Mop",[6,7],[32]],["Princely",[3,0],[24]],["Short Shaggy",[1,1],[5]], ["Afro",[11,0],[21]],["Curly Bob",[6,6],[11]],["Emo Bob",[2,2],[10]],["Wavy Bob",[26,20],[42]],["Neat bob",[23,17],[11]],["Perm",[16,14],[53]],["Spiky",[7,7],[68]],["Curly Pony",[21,25],[6]],["Half-up locs",[4,3],[7]],["Half-up Wavy",[28,22],[7]],["Straight Pony Low",[28,23],[13]],["Straight Pony High",[28,24],[36]],["Twin Puffs",[21,21],[50]], ["Side Braid",[20,18],[37]], ["Twintails",[9,13],[31]], ["Bangs Bun",[9,11],[23]], ["Bun",[14,11],[23]],["Twin Braids",[9,8],[35]], ["Long Wavy",[9,4],[9]],["Long Locks",[12,9],[51]],["Long Straight",[9,16],[51]],["Long Curly",[25,19],[54]],];
//["Curly Updo",[21,15],[56]],["Straight Updo",[19,15],[56]],

const neckwear_menu_list = [ none_menu,["Pendant",[6,0,0],[8]],["Choker",[3,0,0],[5]], ["Beads",[2,0,0],[6]],["Bowtie",[0,5,0],[3]],["Tie",[1,0,0],[4]],["Cravat",[7,0,0],[4]], ["Scarf",[0,0,4],[7]],];

const eyewear_menu_list = [ none_menu,["Glasses",[1],[1]], ["Square Glasses",[2],[1]],["Round Glasses",[3],[1]],["Sunglasses",[4],[5]],["Coloured Glasses",[6],[3]],["Eye-patch",[5],[6]],];

const earrings_menu_list = [ none_menu,["Studs",[1],[3]],["Single Stud",[2],[4]],["Small Hoops",[4],[3]],["Single Small Hoop",[3],[4]],["Hoops",[7],[1]],["Single Hoop",[8],[5]],["Punk",[5],[3]],["Drops",[6],[1]]];

const coat_menu_list = [ none_menu, ["Fur Coat",[8,2],[10,0,1]],["Letterman",[9,3],[10,0,3]], ["Chinese collar",[6,0],[3,0,0]],["Short Coat",[1,0],[1,0,0]],["Business Jacket",[1,0],[6,0,0]],["Cool Jacket",[2,0],[6,0,0]], ["Hoodie",[3,0],[5,0,0]],["Open Hoodie",[4,0],[7,0,0]],["Leaves",[5,0],[8,0,0]],];
//["Cape with collar",[7,1],[2,2,2]],["Cape",[9,1],[2,0,2]],

const overshirt_menu_list = [ none_menu,["Button up V-neck",[5,0],[2,0]],["V-neck",[1,0],[6,0]],["Argyle V-neck",[1,1],[6,28]], ["Sweater",[2,0],[4,0]],["Open Sweater",[3,0],[1,0]],["Suspenders",[4,0],[5,0]],];

const shirt_menu_list = [ none_menu,["Bikini",[5,0,0,0],[7,0,0]],["Strappy Vest",[5,0,0,0],[2,0,0]],["T-Shirt",[3,0,0,0],[19,0,0]],["Striped V-neck",[9,0,4,0],[26,0,4]],["V-neck",[9,0,0,0],[26,0,0]],["Low Cut",[8,0,0,0],[27,0,0]],["Boatneck",[4,0,0,0],[23,0,0]],["Turtleneck",[7,0,0,0],[21,0,0]],["Chinese Collar",[6,0,0,0],[21,0,0]], ["Open Shirt With Vest",[2,2,3,0],[24,0,25]], ["Open Shirt",[2,2,0,0],[25,0,0]],  ["Button-up",[1,1,0,0],[12,0,0]], ["Plaid Button-up",[1,1,1,1],[12,0,2]],["Stripe Button-up",[1,1,2,0],[12,0,4]],]

const pants_menu_list = [none_menu];
const pants_names_all = ["briefs","trousers"].concat(pants_names)
for (let i = 0; i < pants_names_all.length; i += 1) {
    pants_menu_list.push([pants_names_all[i],[0],[i+1,0]])
}
pants_menu_list.push(["Overalls",[1],[2,1]])
//pants_menu_list.push(["High-waisted trousers",[0],[2,2]])


const shoes_menu_list = [none_menu];
for (let i = 0; i < shoes_names.length; i += 1) {
    shoes_menu_list.push([shoes_names[i],[],[i+1]])
}

const gloves_menu_list = [none_menu];
for (let i = 0; i < gloves_names.length; i += 1) {
    gloves_menu_list.push([gloves_names[i],[],[i+1]])
}

add_menu_object("Hat", hat_menu_list, outfit_colours,["Hat","Hat_dec","Hijab"],["Hat_dec"], ["Hat","Hat_dec"], ["Hat_dec"]);
add_menu_object("Neckwear", neckwear_menu_list, outfit_colours,["Neckwear","Neckwear2","Neckwear3"],[], ["Neckwear"],[]);
add_menu_object("Eyewear", eyewear_menu_list, outfit_colours,["Eyewear"],[],["Eyewear"],[]);
add_menu_object("Earrings", earrings_menu_list, outfit_colours,["Earrings"],[],["Earrings"],[]);
add_menu_object("Shirt", shirt_menu_list, outfit_colours,["Shirt","Shirt_collar","Shirt_dec","Shirt_collar_dec"],["Shirt_dec","Shirt_collar_dec"],["Shirt","Shirt2","Shirt_dec"],["Shirt_dec"]);
add_menu_object("Overshirt", overshirt_menu_list, outfit_colours,["Overshirt","Overshirt_dec"],["Overshirt_dec"],["Overshirt","Overshirt_dec"],["Overshirt_dec"]);
add_menu_object("Coat", coat_menu_list, outfit_colours,["Coat","Coat_dec"],["Coat_dec"],["Coat","Coat_back","Coat_dec"],["Coat_dec"]);
add_menu_object("Pants", pants_menu_list, outfit_colours,["Pants_top"],[],["Pants","Pants top"],[]);
add_menu_object("Shoes", shoes_menu_list, outfit_colours,[],[],["Shoes"],[]);
add_menu_object("Gloves", gloves_menu_list, outfit_colours,[],[],["Gloves"],[]);
// Hairstyle must be at end
add_menu_object("Hairstyle", hair_menu_list, hair_colours,["Hair_front", "Hair_back"],[], ["Hairstyle"], []);

const menu_object_names = menu_objects.map(nameOf);

function setCurrentClothing(variablelist, number){
    current_clothing=number;
    setMenu([], 1)
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

function setSpecialSpriteVariable(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(special_sprite_objects, variablelist[i]); //the eleemnt of portrait_objects with the right vriablename
        b.item=number;
    }
    drawCanvas();
}

function setBaseSpriteVariable(variablelist, number){
    // sprite which has two versions for each height
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(sprite_objects, variablelist[i]); //the eleemnt of portrait_objects with the right vriablename
        b.base_item = number; 
        b.item=2*number-1+height;
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

function setSpecialSpriteColour(variablelist, number){
    for (let i = 0; i < special_sprite_objects.length; i += 1) {
        let b = findNameMatch(special_sprite_objects, variablelist[i]); //the eleemnt of portrait_objects with the right vriablename
        b.colour=number;
    }
}

function setClothingColour(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let menu_obj = findNameMatch(menu_objects, variablelist[i]);
        menu_obj.colour = number;
        setPortColour(menu_obj.port_main_list,number);
        setSpriteColour(menu_obj.sprite_main_list,number);
    } 
    setMenu(variablelist,currently_editing);
    drawCanvas();
}

function setClothing2Colour(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let menu_obj = findNameMatch(menu_objects, variablelist[i]);
        menu_obj.colour2 = number;
        setPortColour(menu_obj.port_second_list,number);
        setSpriteColour(menu_obj.sprite_second_list,number);
    } 
    setMenu(variablelist,currently_editing);
    drawCanvas();
}

function setSkinColour(variablelist, number){
    setPortColour(skin_list, number);
    setSpriteColour(["Torso","Arms","Head"], number);
    setSpecialSpriteColour(["Wedding","Flower dance"], number);
    drawCanvas();
}

function setHairColour(variablelist, number){
    
    setPortColour(hair_list, number);
    setSpriteColour(["Hairstyle","Hairstyle_top", "Facial_hair"], number);
    drawCanvas();
}

function setFacialHair(variablelist, number){
    if (number<facial_hair_list_port.length){
    setPortVariable(["Facial_hair"], number);
    setSpriteVariable(["Facial_hair"], number);
    setPortVariable(["Stubble"], 0);
    } 
    else{ //facial hair
        setPortVariable(["Facial_hair"], 0);
        setSpriteVariable(["Facial_hair"], 0);
        setPortVariable(["Stubble"],1);
    }
    drawCanvas();
}

function setEyeType(variablelist, number){
    eye_type = number;
    let b = findNameMatch(sprite_objects, "Eyes");
    b.item = number;
    b = findNameMatch(portrait_objects, "Eyes");
    b.value_list[current_panel] = eye_type*eye_expressions.length + eye_expressions[current_panel];
    drawCanvas();
}

function setEyeExpression(variablelist, number){
    let b = findNameMatch(portrait_objects, "Eyes"); //the eleemnt of portrait_objects with the right vriablename
    eye_expressions[current_panel]=number;
    b.value_list[current_panel] = eye_type*eye_expressions.length + number;
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

function updateSpecialSprites(){
    setSpecialSpriteVariable(["Flower dance"], Math.max(0,4*current_dance_clothes+2*current_gender+height));
    setSpecialSpriteVariable(["Wedding"], Math.max(0,2*current_wedding_clothes-1+height)); 
}

function setWeddingClothes(variablelist, number){
    current_wedding_clothes = number;
    updateSpecialSprites();
    drawCanvas();
}

function setDanceClothes(variablelist, number){
    current_dance_clothes = number;
    updateSpecialSprites();
    drawCanvas();
}

function setSleeves(variablelist, number){
    if (sleeve_havers.indexOf(variablelist[0])>-1){//this item has sleeves
        sleeve_list[sleeve_havers.indexOf(variablelist[0])] = number;
    }
    else
        document.getElementById("test").innerHTML = "Unknown sleeve object"
    drawCanvas();
}

function setClothing(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let menu_obj = findNameMatch(menu_objects, variablelist[i]);
        menu_obj.item = number;
        let current = menu_obj.list_list[number]
        //document.getElementById("test").innerHTML = "found";
        for (let j = 0; j < menu_obj.port_item_list.length; j += 1) {
            let name = menu_obj.port_item_list[j]; //eg "Shirt"
            if (current  == none_menu)
                setPortVariable([name],0);
            else
                setPortVariable([name],current[1][j]);
        }
        for (let j = 0; j < menu_obj.sprite_item_list.length; j += 1) {
            let name = menu_obj.sprite_item_list[j];
            if (current  == none_menu)
                setSpriteVariable([name],0);
            else
                setSpriteVariable([name],current[2][j]);
        }
    } 
    setMenu(variablelist,currently_editing);   
    drawCanvas();
}

function setHair(variablelist, number){
    setClothing(["Hairstyle"],number);
    if ([0,52].includes(number)){ //all bald hairstyles
        setSpriteVariable(["Head"], 0);
    }
    else{
        setSpriteVariable(["Head"], 1);
    }   
    setHeight([], height);
}

function setHeight(variablelist, number){
    height = number;
    setSpriteVariable(["Arms"], number);
    setSpriteVariable(["Shoes"], Math.max(0,2*currentShoes-1+height)); 
    setSpriteVariable(["Gloves"], Math.max(0,2*currentGloves-1+height)); 
    //document.getElementById("test").innerHTML = Math.max(0,2*currentGloves-1+height)+" "+Math.max(0,2*currentShoes-1+height);
    setSpriteVariable(["Torso"], number); 
    let sprite_obj = findNameMatch(sprite_objects, "Pants");
    let pants_obj = findNameMatch(sprite_obj.item_list, "trousers");
    pants_obj.location = "outfit/pants/longpants_"+height_list[height]
    drawCanvas();
}

function getOffset(name){
    let obj = findNameMatch(portrait_objects, "Head");
    let head = head_list[obj.value_list[0]];
    switch(head){
        case "round":
            if (torso_offset_list.includes(name))   
                return -9;
            if (["Nose","Nose_front", "Facial_hair"].includes(name))  
                return -3;
            if (["Mouth"].includes(name))  
                return -2;     
            break;
        case "jowly": 
        if (torso_offset_list.includes(name))   
            return -9;
        if (["Nose","Nose_front", "Facial_hair"].includes(name))  
            return -2;
        if (["Mouth"].includes(name))  
            return -1;     
    break;   
        case "oval":
        
            if (torso_offset_list.includes(name))   
                return -6;
            if (["Nose",,"Nose_front","Facial_hair"].includes(name))  
                return -2;
            if (["Mouth"].includes(name))  
                return -1;        
            break;
        case "medium":
            if (torso_offset_list.includes(name))   
                return -1;
            if (["Nose",,"Nose_front","Facial_hair"].includes(name))  
                return -1;
            break; 
        case "square":
            if (torso_offset_list.includes(name))   
                return -1;
            if (["Nose",,"Nose_front","Facial_hair"].includes(name))  
                return -1;
            break;     
        case "rectangular":  
            if (torso_offset_list.includes(name))   
                return 2;
            if (["Facial_hair"].includes(name))  
                return 4;
            if (["Nose",,"Nose_front","Facial_hair"].includes(name))  
                return -1;    
            if (["Mouth"].includes(name))  
                return 3;    
            break;     
        case "pointed":  
            if (torso_offset_list.includes(name))   
                return 2;
            if (["Facial_hair"].includes(name))  
                return 4;
            if (["Mouth"].includes(name))  
                return 3;    
            break;               
    }    
    return 0;    
}

function print_menu_objects(){
    s = "";
    for (i = 0; i < menu_objects.length; i += 1){
        b = menu_objects[i];
        s+="name: "+b.name;
        s+=" port_main_list: "+b.port_main_list.toString();
        s+=" port_second_list: "+b.port_second_list.toString();
        //s+=" name_list: "+b.name_list.toString();
        //s+="  colour_list: "+b.colour_list.toString();
        s+=" item: "+b.item;
        //s+=" colour: "+b.colour;
        s+="<br>";
    }
    return s
}

function print_menu_list(listname){
    s = "";
    for (i = 0; i < listname.length; i += 1){
        s+="name: "+b.name;
        s+=" name_list: "+b.name_list.toString();
        
        //s+="  colour_list: "+b.colour_list.toString();
        //s+=" item: "+b.item;
        //s+=" colour: "+b.colour;
        s+="<br>";
    }
    return s
}