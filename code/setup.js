const canvas_width = 512;
const canvas_height = 768;

const panelSize = 6; //how many panels

// Basic functions

function findNameMatch(list, name){
    //returns the first element of list whose name equals "name"
    for (i = 0; i < list.length; i += 1) {
        if (list[i].name==name){
            return list[i];
        }
    }
}

function range(n){
    // return [0...n-1]
    var x = [];
    for (var i=0;i<n;i++) {
        x[i]=i;
    }
    return x;
}

function listOf(n){
    // return [n,n,n,n,n,n]
    var x = [];
    for (var i=0;i<panelSize;i++) {
        x[i]=n;
    }
    return x;

}

function newImageList(){
    //list of six images
    var x = [];
    for (var i=0;i<panelSize;i++) {
        x[i]=new Image();
    }
    return x;

}

//Initialising data

var currently_editing;
var current_panel = 0;

const editing_list =["Body","Outfit", "Expressions"];

const panel_list = ["0: Neutral", "1: Happy", "2: Sad", "3: Unique", "4: Blushing", "5: Angry"];

//collections of parts that have the same colours
const skin_list = ["Torso", "Head"]
const hair_list = ["Hair_back", "Hair_middle","Hair_front","Facial_hair"]
const clothes_list = ["Top"];

const skinNum = 2; //how many skin colours there are

//Types of parts
const head_list =["medium","round"];
const eyebrow_list = ["none", "flat_thick"];
const torso_list = ["medium"];
const top_list = ["none", "shirt"];

const body_objects =[];

body_objects.push({name: "Torso",location: "torso", item_list: torso_list, colourNum: skinNum, value_list: listOf(0),  colour: 0, image_list: newImageList()});
body_objects.push({name: "Head",location: "head", item_list: head_list, colourNum: skinNum, value_list: listOf(0),  colour: 0, image_list: newImageList()});
body_objects.push({name: "Top",location: "top", item_list: top_list, colourNum: 2, value_list: listOf(0),  colour: 0, image_list: newImageList()});
body_objects.push({name: "Eyebrows",location: "eyebrows", item_list: eyebrow_list, colourNum: 1, value_list: listOf(0),  colour: 0, image_list: newImageList()});

function print_body(){
    s = "";
    for (i = 0; i < body_objects.length; i += 1){
        b = body_objects[i];
        s+="name: "+b.name;
        s+=" location: "+b.location;
        s+=" item_list: "+b.item_list.toString();
        s+=" colourNum: "+b.colourNum;
        s+="  value_list: "+b.value_list.toString();
        s+=" colour: "+b.colour;
        //s+=" src: "+b.image_list[0].src;
        s+="<br>";
    }
    return s
}