const canvas_width = 512;
const canvas_height = 768;

let panelNum = 6; //how many panels
let panel_width = 256; //width and height of panels in pixels

// Basic functions

function findNameMatch(list, name){
    //returns the first element of list whose name equals "name"
    for (let i = 0; i < list.length; i += 1) {
        if (list[i].name==name){
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
    for (let i=0;i<panelNum;i++) {
        x[i]=n;
    }
    return x;

}

function newImageList(){
    //list of six images
    let x = [];
    for (let i=0;i<panelNum;i++) {
        x[i]=new Image();
    }
    return x;

}

//Initialising data

let currently_editing;
let current_panel = 0;

const editing_list =["Body","Outfit", "Expressions"];

const panel_list = ["0: Neutral", "1: Happy", "2: Sad", "3: Unique", "4: Blushing", "5: Angry"];

const body_objects =[];

function add_item(name, list){
    col = 2;
    if (outfit_list.includes(name)){
        loc = "outfit";
        col = outfitNum;
    } else {
        if (body_list.includes(name)){
            loc = "body";
            col = outfitNum;
        } else{
            if (expression_list.includes(name)){
            loc = "expression";
            col = skinNum;
            } else{
                if (hair_list.includes(name)){
                    loc = "body/hair";
                    col = hairNum;
                }
            }
        }
    }
    loc+="/"+name.toLowerCase();
    body_objects.push({name: name,location: loc, item_list: list, colourNum: col, value_list: listOf(0),  colour: 0, image_list: newImageList()});
}

//body_objects.push({name: "Torso",location: "body/torso", item_list: torso_list, colourNum: skinNum, value_list: listOf(0),  colour: 0, image_list: newImageList()});
/*body_objects.push({name: "Head",location: "body/head", item_list: head_list, colourNum: skinNum, value_list: listOf(0),  colour: 0, image_list: newImageList()});
body_objects.push({name: "Shirt",location: "outfit/shirt", item_list: top_list, colourNum: 2, value_list: listOf(0),  colour: 0, image_list: newImageList()});
body_objects.push({name: "Eyebrows",location: "expression/eyebrows", item_list: eyebrow_list, colourNum: 1, value_list: listOf(0),  colour: 0, image_list: newImageList()});
*/

//add_item("Torso","torso_list")

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