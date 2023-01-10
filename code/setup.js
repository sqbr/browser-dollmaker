//player controlled

let panelNum =6; //how many panels

let current_imageType =0; //whether editing sprites or portraits
let current_sprite_preset = 0;

let currently_editing = 0; //which element of editing list we are editing
let current_panel = 0;
let current_clothing = 0;

let port_offset = 1;

let height = 0;

let skinColour;
let eyeColour;
let hairColour;

let currentShoes = 0;
let currentGloves = 0;

let eye_type = 0;
let eye_expressions = listOf(0);

//internal

const canvas_width = 512;
const canvas_height = 768;
let panel_width = 256; //width and height of panels in pixels

const imageType_list =["Portrait","Sprite"];

const editing_list =["Body","Outfit", "Expressions","Occasions"];

const torso_offset_list = ["Torso","Shirt","Shirt_collar","Shirt_dec","Shirt_collar_dec","Shirt_sleeves","Shirt_sleeves_dec","Coat","Coat_sleeves","Coat_dec","Coat_sleeves_dec","Coat_back","Pants_top","Overshirt","Overshirt_dec","Overshirt_sleeves","Overshirt_sleeves_dec","Neckwear","Neckwear2","Neckwear3"];

const panel_list = ["0: Neutral", "1: Happy", "2: Sad", "3: Unique", "4: Blushing", "5: Angry","6","7","8","9","10"];

const sprite_presets = ["Walk Sprites", "Female Love Interest","Male Love Interest"];

const back_list = ["Hat","Coat"]; //have a back

const sleeve_havers = ["Shirt","Overshirt","Coat"]
let sleeve_list = [0,0,0]

const sprite_clothes = ["Shoes","Gloves","Pants"];


let canvas;
let canvas_preview;
let ctx_preview;
let ctx;

// Basic functions

function nameOf(obj){
    return obj.name;
}

function findNameMatch(list, name){
    //returns the first element of list whose name equals "name"
    for (let i = 0; i < list.length; i += 1) {
        if (list[i].name==name){
            //document.getElementById("test").innerHTML = "value: "+name;
            return list[i];
            
        }
    }
    document.getElementById("test").innerHTML = "Unknown value: "+name;
}

function range(n){
    // return [0...n-1]
    let x = [];
    for (let i=0;i<n;i++) {
        x[i]=i;
    }
    return x;
}

function listOf(n){
    // return [n,n,n,n,n,n]
    let x = [];
    for (let i=0;i<10;i++) {
        x[i]=n;
    }
    return x;

}

function newImageList(){
    //list of six images
    let x = [];
    for (let i=0;i<10;i++) {
        x[i]=new Image();
    }
    return x;

}

function xor(list1,list2){
    //return everything in list1 not in list2
    let output = [];
    for (let i=0;i<list1.length;i++) {
        if(!list2.includes(list1[i]))
            output.push(list1[i]);
    }
    return output;
}

//Setting up portrait data
const portrait_objects =[];

function add_portrait_object(name, list, location){
    let loc;
    if (["Neckwear2","Neckwear3"].includes(name))
        loc=location+"/Neckwear";
    else    
        loc=location+"/"+name.toLowerCase();
    if (name == "Nose_front")
        loc = "body/nose"; 

    portrait_objects.push({name: name,location: loc, item_list: list, colour: true, value_list: listOf(0),  colour: 0, image_list: newImageList()});
}

function print_portrait_objects(){
    s = "";
    for (i = 0; i < portrait_objects.length; i += 1){
        b = portrait_objects[i];
        s+="name: "+b.name;
        s+=" location: "+b.location;
        s+=" item_list: "+b.item_list.toString();
        //s+=" colourNum: "+b.colourNum;
        s+="  value_list: "+b.value_list.toString();
        //s+=" colour: "+b.colour;
        s+=" src: "+b.image_list[0].src;
        s+="<br>";
    }
    return s
}