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

const none_menu = ["none",[],[]];

const hat_menu_list = [ none_menu,["Headphones",[3,0],[90,0]],["Sun Hat",[1,3],[83,11]],["Cap",[2,0],[78,0]],["Joja Cap",[2,1],[78,5]],["Joja Cap 2",[2,2],[78,6]],["Wizard",[4,0],[91,0]],];

const hair_menu_list = [ none_menu,["Short Shaggy",[1,1],[5]],["Emo Bob",[2,2],[10]], ["Princely",[3,0],[24]]];

const neckwear_menu_list = [ none_menu, ["Tie",[1],[4]]];

const eyewear_menu_list = [ none_menu,["Glasses",[1],[1]]];

const earrings_menu_list = [ none_menu,["Studs",[1],[3]]];

const coat_menu_list = [ none_menu, ["Short Coat",[1],[1,1,0]],["Hoodie",[3],[5,1,0]],["Cool Jacket",[2],[6,1,0]]];

const overshirt_menu_list = [ none_menu];

const shirt_menu_list = [ none_menu,["T-Shirt",[2,0,0,0],[19,0,0,0]], ["Short-sleeve Buttoned",[1,1,0,0],[12,0,0,0]], ["Long-sleeve Buttoned",[1,1,0,0],[12,0,0,1]],["Short-sleeve Plaid",[1,1,1,1],[12,0,2,0]], ["Long-sleeve Plaid",[1,1,1,1],[12,0,2,1]],["Vest",[2,0,0,0],[19,0,0,0]],["Boatneck",[2,0,0,0],[19,0,0,0]]]

const pants_menu_list = [none_menu];
const pants_names_all = ["briefs","trousers"].concat(pants_names)
for (let i = 0; i < pants_names_all.length; i += 1) {
    pants_menu_list.push([pants_names_all[i],[0],[i+1,0]])
}
pants_menu_list.push(["High-waisted trousers",[0],[2,1]])
pants_menu_list.push(["Overalls",[1],[2,2]])

const shoes_menu_list = [none_menu];
for (let i = 0; i < shoes_names.length; i += 1) {
    shoes_menu_list.push([shoes_names[i],[],[i+1]])
}

const gloves_menu_list = [none_menu];
for (let i = 0; i < gloves_names.length; i += 1) {
    gloves_menu_list.push([gloves_names[i],[],[i+1]])
}

add_menu_object("Hat", hat_menu_list, outfit_colours,["Hat","Hat_dec"],["Hat_dec"], ["Hat","Hat_dec"], ["Hat_dec"]);
add_menu_object("Hairstyle", hair_menu_list, hair_colours,["Hair_front","Hair_back"],[], ["Hairstyle"], []);
add_menu_object("Neckwear", neckwear_menu_list, outfit_colours,["Neckwear"],[], ["Neckwear"],[]);
add_menu_object("Eyewear", eyewear_menu_list, outfit_colours,["Eyewear"],[],["Eyewear"],[]);
add_menu_object("Earrings", earrings_menu_list, outfit_colours,["Earrings"],[],["Earrings"],[]);
add_menu_object("Shirt", shirt_menu_list, outfit_colours,["Shirt","Shirt_collar","Shirt_dec","Shirt_collar_dec"],["Shirt_dec","Shirt_collar_dec"],["Shirt1","Shirt2","Shirt_dec", "Shirt_sleeves"],["Shirt_dec"]);
add_menu_object("Overshirt", overshirt_menu_list, outfit_colours,["Overshirt"],[],["Overshirt","Overshirt_sleeves"],[]);
add_menu_object("Coat", coat_menu_list, outfit_colours,["Coat"],[],["Coat","Coat_sleeves","Coat_back"],[]);
add_menu_object("Pants", pants_menu_list, outfit_colours,["Pants_top"],[],["Pants","Pants top"],[]);
add_menu_object("Shoes", shoes_menu_list, outfit_colours,[],[],["Shoes"],[]);
add_menu_object("Gloves", gloves_menu_list, outfit_colours,[],[],["Gloves"],[]);

const menu_object_names = menu_objects.map(nameOf);

function setSimpleVariable(variablelist, number){
    variablelist[0]=number;
}

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

function setClothingColour(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let menu_obj = findNameMatch(menu_objects, variablelist[i]);
        setPortColour(menu_obj.port_main_list,number);
        setSpriteColour(menu_obj.sprite_main_list,number);
    } 
    drawCanvas();
}

function setClothing2Colour(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let menu_obj = findNameMatch(menu_objects, variablelist[i]);
        setPortColour(menu_obj.port_second_list,number);
        setSpriteColour(menu_obj.sprite_second_list,number);
    } 
    drawCanvas();
}

function setSkinColour(variablelist, number){
    setPortColour(skin_list, number);
    setSpriteColour(["Torso","Arms"], number);
    drawCanvas();
}

function setHairColour(variablelist, number){
    setPortColour(hair_list, number);
    setSpriteColour(["Hairstyle","Hairstyle_top", "Facial_hair"], number);
    drawCanvas();
}

function setShirtColour(variablelist, number){
    setPortColour(["Shirt"], number);
    setSpriteColour(["Shirt1","Shirt2"], number);
    if (!hasCoatSleeves && hasShirtSleeves)
        setSpriteColour(["Sleeves"], number);
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

function setClothing(variablelist, number){
    for (let i = 0; i < variablelist.length; i += 1) {
        let menu_obj = findNameMatch(menu_objects, variablelist[i]);
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

function setHair(variablelist, number){
    setClothing(["Hairstyle"],number);
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
    //document.getElementById("test").innerHTML = Math.max(0,2*currentGloves-1+height)+" "+Math.max(0,2*currentShoes-1+height);
    if (isBald){
        setSpriteVariable(["Torso"], 2+number);
    }else { 
        setSpriteVariable(["Torso"], number); 
    } 
    let sprite_obj = findNameMatch(sprite_objects, "Pants");
    let pants_obj = findNameMatch(sprite_obj.item_list, "trousers");
    pants_obj.location = "outfit/pants/longpants_"+height_list[height]
    drawCanvas();
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