function firstElement(listname){
    //first element of the array listname
    return listname[0];
}

const menu_objects = []; //all the clothing items chosen in the 'Outfit' tab, and the hairstyle

// name, item list, number, colour, colour 2, portrait list lists, sprite list lists

/*
Name: String.
item_list: list of objects as above
colour_list: list of strings describing what colour it can be. Deprecated.
item: index of item_list describing current item
colour1: current item's colour
colour2: current item's secondary colour
ports_list: list of lists [portrait object name, item number]
sprites_list:list of lists [sprite object name, item number]
*/
function add_menu_object(name, list_list, colour_list, port_item_list, port_second_list, sprite_item_list, sprite_second_list){
    let sprite_main_list = xor(sprite_item_list, sprite_second_list);
    let port_main_list = xor(port_item_list, port_second_list);
    menu_objects.push({name: name,list_list: list_list, name_list: list_list.map(firstElement),colour_list: colour_list, port_item_list: port_item_list, sprite_item_list: sprite_item_list, port_second_list: port_second_list, sprite_second_list: sprite_second_list, sprite_main_list: sprite_main_list, port_main_list: port_main_list, sleeves: 0, item: 0,  colour: 0, colour2: 0 });
}

const none_menu = ["None",[],[]];

const wheelchair_menu_list = [none_menu,["Manual",[0],[1]],["Hospital",[0],[2]]]

const hat_menu_list = [ none_menu,["Flower",[20,0,0],[3,0]],["Head Band",[17,0,0],[28,0]],["Cat Ears",[18,0,0],[9,0]],["Bandanna",[19,0,0],[29,0]],["Bow",[5,0,0],[5,0]],["Headphones",[3,0,0],[18,0]],["Ear muffs",[16,0,0],[27,0]],["Flower Crown",[10,0,0],[22,0]],["Soft Cap",[11,0,0],[10,0]],["Cap",[2,0,0],[6,0]],["Joja Cap",[2,1,0],[6,5]],["Turban",[14,0,0],[16,0]],["Helmet",[13,0,0],[25,0]],["Beanie",[8,0,0],[15,0]],["Hijab",[0,0,1],[17,0]],["Bobble Hat",[6,3,0],[21,21]],["Fedora",[9,5,0],[24,24]], ["Bowler",[9,5,0],[23,23]],["Top Hat",[9,5,0],[1,1]],["Cowboy Hat",[15,5,0],[12,12]],["Broad Hat",[7,4,0],[11,11]],["Sun Hat",[1,2,0],[20,20]],["Wizard",[4,0,0],[19,0]],["Witch",[12,0,0],[26,0]],];

const hats_male =[9,12,17,18,19,20,21,25];
const hats_female =[1,2,5,8,15,24 ];

const hair_menu_list = [ none_menu,["Shaved",[17,0],[56]],["Buzzcut",[18,0],[47]],["Balding",[15,12],[52]],["Short",[22,25],[45]],["Short Side-part",[8,25],[3]],["Neat Side-part",[29,25],[8]],["Floppy side part",[24,25],[79]],["Hi-top",[10,0],[12]],["Short Back and Sides",[27,0],[43]],["Short Spiky",[13,10],[1]],["Curly Mop",[6,7],[32]],["Princely",[3,25],[24]],["Short Shaggy",[1,1],[5]], ["Afro",[11,0],[21]],["Curly Bob",[6,6],[11]],["Emo Bob",[2,2],[10]],["Wavy Bob",[26,19],[42]],["Neat bob",[23,16],[26]],["Perm",[16,14],[53]],["Spiky",[7,7],[68]],["Curly Pony",[21,24],[6]],["Half-up locs",[4,3],[7]],["Half-up Wavy",[28,21],[7]],["Straight Pony Low",[28,22],[13]],["Straight Pony High",[28,23],[36]],["Twin Puffs",[21,20],[50]], ["Side Braid",[20,17],[37]], ["Twintails",[9,13],[31]], ["Bangs Bun",[9,11],[23]], ["Bun",[14,11],[23]],["Twin Braids",[9,8],[35]], ["Long Wavy",[9,4],[9]],["Long Locks",[12,9],[51]],["Long Straight",[9,15],[59]],["Long Curly",[25,18],[54]],];
const hair_male =[0,2,3,];
const hair_female =[15,16,18,26,27,28,29,30,31,32,34];

const neckwear_menu_list = [ none_menu,["Pendant",[6,0,0],[8]],["Choker",[3,0,0],[5]], ["Beads",[2,0,0],[6]],["Bowtie",[0,5,0],[3]],["Tie",[1,0,0],[4]],["Cravat",[7,0,0],[4]],["Bandanna",[8,0,0],[7]], ["Scarf",[0,0,4],[7]],];
const neckwear_male = [4,5];
const neckwear_female = [1,2,3];

const eyewear_menu_list = [ none_menu,["Glasses",[1],[1]], ["Square Glasses",[2],[1]],["Round Glasses",[3],[1]],["Sunglasses",[4],[5]],["Coloured Glasses",[6],[3]],["Eye-patch",[5],[6]],];

const earrings_menu_list = [ none_menu,["Studs",[1],[3]],["Single Stud",[2],[4]],["Small Hoops",[4],[3]],["Single Small Hoop",[3],[4]],["Hoops",[7],[1]],["Single Hoop",[8],[5]],["Punk",[5],[3]],["Drops",[6],[1]]];
const earrings_male = [2,4,6];
const earrings_female = [1,3,5,8];

const coat_menu_list = [ none_menu, ["Fur Coat",[8,2],[10,0,1]],["Letterman",[9,3],[10,0,3]], ["Chinese collar",[6,0],[3,0,0]],["Short Coat",[1,0],[1,0,0]],["Business Jacket",[1,0],[6,0,0]],["Cool Jacket",[2,0],[6,0,0]], ["Hoodie",[3,0],[5,0,0]],["Open Hoodie",[4,0],[7,0,0]],["Leaves",[5,0],[8,0,0]],["Cape",[10,1],[2,2,2]],["Cape with collar",[7,1],[2,2,2]],];

const overshirt_menu_list = [ none_menu,["Button up V-neck",[5,0],[3,0]],["V-neck",[1,0],[6,0]],["Argyle V-neck",[1,1],[6,28]], ["Sweater",[2,0],[4,0]],["Open Sweater",[3,0],[1,0]],["Suspenders",[4,0],[5,0]],];

const shirt_menu_list = [ none_menu,["Bikini",[5,0,0,0],[7,0]],["Strappy Vest",[10,0,0,0],[2,0]],["Halter-neck",[11,0,0,0],[2,0]],["Bodice",[12,0,0,0],[14,0]],["Sleeved Bodice",[13,0,0,0],[14,0]],["T-Shirt",[3,0,0,0],[19,0]],["Striped V-neck",[9,0,4,0],[26,4]],["V-neck",[9,0,0,0],[26,0]],["Low Cut",[8,0,0,0],[27,0]],["Boatneck",[4,0,0,0],[23,0]],["Turtleneck",[7,0,0,0],[21,0]],["Chinese Collar",[6,0,0,0],[21,0]], ["Open Shirt With Vest",[2,2,3,0],[24,25]], ["Open Shirt",[2,2,0,0],[25,0]],  ["Button-up",[1,1,0,0],[12,0]], ["Plaid Button-up",[1,1,1,1],[12,2]],["Stripe Button-up",[1,1,2,0],[12,4]],]

const shirt_male = [14];
const shirt_female = [1,2,3,4,5,10];

const pants_menu_list = [none_menu];
const pants_names_all = ["briefs","trousers"].concat(pants_names)
for (let i = 0; i < pants_names_all.length; i += 1) {
    pants_menu_list.push([pants_names_all[i],[0],[i+1,0]])
}
pants_menu_list.push(["Overalls",[1],[2,1]])
//pants_menu_list.push(["High-waisted trousers",[0],[2,2]])

const pants_male = [];
const pants_female = [5,6, 7, 9,  10, 12,14];

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
add_menu_object("Shirt", shirt_menu_list, outfit_colours,["Shirt","Shirt_collar","Shirt_dec","Shirt_collar_dec"],["Shirt_dec","Shirt_collar_dec"],["Shirt","Shirt_dec"],["Shirt_dec"]);
add_menu_object("Overshirt", overshirt_menu_list, outfit_colours,["Overshirt","Overshirt_dec"],["Overshirt_dec"],["Overshirt","Overshirt_dec"],["Overshirt_dec"]);
add_menu_object("Coat", coat_menu_list, outfit_colours,["Coat","Coat_dec"],["Coat_dec"],["Coat","Cape","Coat_dec"],["Coat_dec"]);
add_menu_object("Pants", pants_menu_list, outfit_colours,["Pants_top"],[],["Pants","Pants top"],[]);
add_menu_object("Shoes", shoes_menu_list, outfit_colours,[],[],["Shoes"],[]);
add_menu_object("Gloves", gloves_menu_list, outfit_colours,[],[],["Gloves"],[]);
add_menu_object("Wheelchair", wheelchair_menu_list, outfit_colours,["Wheelchair"],[], ["Wheelchair"], []);
// Hairstyle must be at end
add_menu_object("Hairstyle", hair_menu_list, hair_colours,["Hair_front", "Hair_back"],[], ["Hairstyle"], []);

const menu_object_names = menu_objects.map(nameOf);

const gendered_lists = []; //what items can show up in randomised androgynous, masculine, and feminine characters

function add_gendered_list(name, never_fem,never_masc, never_used){
    //name is just for clarity
    //never_fem: items with these indices never show up on feminine characters
    //never_masc: items with these indices never show up on masculine characters
    //never_used:  items with these indices never show up on any randomised character
    gender_pos=gendered_lists.length;
    current_items = menu_objects[gender_pos].name_list;
    
    all_list = [];
    male_list = [];
    female_list = [];

    for (let i = 0; i < current_items.length; i += 1) {
        if (!never_used.includes(i)){
            all_list.push(i);
            if (!never_fem.includes(i))
                female_list.push(i);
            if (!never_masc.includes(i))
                male_list.push(i);    
        }
    }
    gendered_lists.push([all_list, male_list,female_list]) 
}
add_gendered_list("Hat", hats_male,hats_female,[]);
add_gendered_list("Neckwear", neckwear_male,neckwear_female,[]);
add_gendered_list("Eyewear", [],[],[]);
add_gendered_list("Earrings", earrings_male,earrings_female,[]);
add_gendered_list("Shirt", shirt_male,shirt_female,[0]);
add_gendered_list("Overshirt", [],[],[]);
add_gendered_list("Coat", [],[],[]);
add_gendered_list("Pants", pants_male,pants_female,[0]);
add_gendered_list("Shoes", [],[],[]);
add_gendered_list("Gloves", [],[],[]);
add_gendered_list("Wheelchair", [],[],[2]);
add_gendered_list("Hairstyle", hair_male,hair_female,[]);

function setPortVariable(variablelist, number){
    //for every string in 'variablelist', set the portrait element with that name to have value 'number'
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
}

function setSpriteVariable(variablelist, number){
    //for every string in 'variablelist', set the sprite element with that name to have value 'number'
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(sprite_objects, variablelist[i]); //the eleemnt of portrait_objects with the right vriablename
        b.item=number;
    }
}

function setSpecialSpriteVariable(variablelist, number){
    //for every string in 'variablelist', set the special occasion element with that name to have value 'number'
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(special_sprite_objects, variablelist[i]); //the eleemnt of portrait_objects with the right vriablename
        b.item=number;
    }
}

function setValuelist(variable, list){
    //for every string in 'variablelist', set the portrait element with that name to have value list 'list'
    let b = findNameMatch(portrait_objects, variable); //the eleemnt of portrait_objects with the right vriablename
    b.value_list=list;
}

function setBothColour(variablelist, colour){
    //for every string in 'variablelist', set the portrait and sprite elements with that name to have colour1 'colour'
    setPortColour(variablelist, colour);
    setSpriteColour(variablelist, colour);
}

function setPortColour(variablelist, colour){
    //for every string in 'variablelist', set the portrait element with that name to have colour1 'colour'
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(portrait_objects, variablelist[i]); //the eleemnt of portrait_objects with the right vriablename
        b.colour1=colour;
    }
}

function setSpriteColour(variablelist, colour){
    //for every string in 'variablelist', set the sprite element with that name to have colour1 'colour'
    for (let i = 0; i < variablelist.length; i += 1) {
        let b = findNameMatch(sprite_objects, variablelist[i]); //the eleemnt of portrait_objects with the right vriablename
        b.colour1=colour;
    }
}

function setSpecialSpriteColour(variablelist, colour){
    //for every string in 'variablelist', set the special event element with that name to have colour1 'colour'
    for (let i = 0; i < special_sprite_objects.length; i += 1) {
        let b = findNameMatch(special_sprite_objects, variablelist[i]); //the eleemnt of portrait_objects with the right vriablename
        b.colour1=colour;
    }
}

function setClothingColour(variablelist, colour){
    //for every string in 'variablelist', set the portrait and sprite elements associated with the menu object with that name to have colour1 'colour'
    for (let i = 0; i < variablelist.length; i += 1) {
        let menu_obj = findNameMatch(menu_objects, variablelist[i]);
        menu_obj.colour1 = colour;
        setPortColour(menu_obj.port_main_list,colour);
        setSpriteColour(menu_obj.sprite_main_list,colour);
    } 
}

function setClothingColour2(variablelist, colour){
    //for every string in 'variablelist', set the portrait and sprite elements associated with the menu object with that name to have colour2 'colour'
    for (let i = 0; i < variablelist.length; i += 1) {
        let menu_obj = findNameMatch(menu_objects, variablelist[i]);
        menu_obj.colour2 = colour;
        setPortColour(menu_obj.port_second_list,colour);
        setSpriteColour(menu_obj.sprite_second_list,colour);
    } 
}

function setBothVariable(variablelist, number){
    //for every string in 'variablelist', set the portrait and sprite elements with that name to have value 'number'
    setPortVariable(variablelist, number);
    setSpriteVariable(variablelist, number);
}

function updateSpecialSprites(){
    //update the wedding and flower dance values to match the gender and wheelchair values
    if (current_sprite_preset <2)
        current_gender = 0; //female
    else
        current_gender = 1; //male
    if (findNameMatch(sprite_objects, "Wheelchair").item>0){ //there is a wheelchair    
        setSpecialSpriteVariable(["Flower dance"], Math.max(0,8+2*current_dance_clothes+current_gender));
        if (current_wedding_clothes==0)
            setSpecialSpriteVariable(["Wedding"], 0);
        else 
            setSpecialSpriteVariable(["Wedding"], Math.max(0,4+current_wedding_clothes)); 
    } else{
        setSpecialSpriteVariable(["Flower dance"], Math.max(0,4*current_dance_clothes+2*current_gender+height));
        setSpecialSpriteVariable(["Wedding"], Math.max(0,2*current_wedding_clothes-1+height)); 
    }
}

function setClothing(variablelist, number){
    //for every string in 'variablelist', set the menu object with that name to have value 'number' and update the relevant sprite and portrait objects
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
}

function getOffset(name){
    //how much the portrait image with name 'name' is shifted up or down to match the head shape
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
    //print the elements of menu_objects. For bug fixing.
    s = "";
    for (i = 0; i < menu_objects.length; i += 1){
        b = menu_objects[i];
        s+="name: "+b.name;
        s+=" port_main_list: "+b.port_main_list.toString();
        s+=" port_second_list: "+b.port_second_list.toString();
        //s+=" name_list: "+b.name_list.toString();
        //s+="  colour_list: "+b.colour_list.toString();
        s+=" item: "+b.item;
        //s+=" colour: "+b.colour1;
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
        //s+=" colour: "+b.colour1;
        s+="<br>";
    }
    return s
}

function print_gendered_lists(){
    //print the elements of gendered_lists. For bug fixing.
    s = "";
    for (i = 0; i < menu_objects.length; i += 1){
        s+= menu_objects[i].name+": [" 
        for (j = 0; j < 3; j += 1){
            s+= "["
            list = gendered_lists[i][j];
            for (k = 0; k < list.length; k += 1){
                s+=menu_objects[i].name_list[list[k]]+", "
            }
            s+= "] "  
        }
    s+= "] "  
    }
    return s;
}