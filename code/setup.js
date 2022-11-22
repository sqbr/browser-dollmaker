const canvas_width = 512;
const canvas_height = 768;

let panelNum = 6; //how many panels
let panel_width = 256; //width and height of panels in pixels

let current_imageType = "Portrait";
let currently_editing = "Body";
let current_panel = 0;

const editing_list =["Body","Outfit", "Expressions"];
const imageType_list =["Portrait","Sprite"];

const panel_list = ["0: Neutral", "1: Happy", "2: Sad", "3: Unique", "4: Blushing", "5: Angry","6","7","8","9","10"];

back_list = ["Hat","Coat"]; //have a back

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
    if (name == "Coat_back"){
        loc = "outfit/coat";
        col = outfitNum;
    }
    if (name == "Hat_back"){
        loc = "outfit/hat";
        col = outfitNum;
    }

    loc+="/"+name.toLowerCase();
    body_objects.push({name: name,location: loc, item_list: list, colourNum: col, value_list: listOf(0),  colour: 0, image_list: newImageList()});
}

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