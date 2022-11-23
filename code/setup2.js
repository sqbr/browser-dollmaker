const sprite_body_list = ["male","female","male_bald", "female_bald"];

const gender_list = ["male","female"];

const none = {name:"none"}

/*
Name: String.
location: String. Where the file is, stopping before the _[colour].png
colour: Boolean. whether this image has colour variants
topcorner: coordinates of the top corner of the looking down standing still sprite
*/

const sprite_torso_list = []
for (let i =0; i<sprite_body_list.length;i++){
    b= sprite_body_list[i];
    sprite_torso_list.push({name: b, location: "body/farmer_"+b, colour: true, topcorner:[0,0]})
}

const sprite_eyes_list = []
for (let i =0; i<gender_list.length;i++){
    b= gender_list[i];
    sprite_eyes_list.push({name: b, location: "eyes/"+b, colour: true, topcorner:[0,0]})
}

const sprite_shoes_list = []
for (let i =0; i<gender_list.length;i++){
    b= gender_list[i];
    sprite_shoes_list.push({name: b, location: "shoes/"+b, colour: true, topcorner:[0,0]})
}

const sprite_pants_list = []
sprite_pants_list.push({name: "Shorts", location: "pants/pants", colour: true, topcorner:[0,0]})

const sprite_shirt_list = []
sprite_shirt_list.push({name: "Overalls", location: "shirts/shirts", colour: false, topcorner:[0,0]})

const sprite_accessory_list = []
sprite_accessory_list.push({name: "Glasses", location: "accessory/accessories", colour: false, topcorner:[0,32]})

const sprite_hair_list = []
sprite_hair_list.push({name: "Side part", location: "hair/hairstyles", colour: true, topcorner:[32,0]})

const sprite_hat_list = []
sprite_hat_list.push({name: "Santa hat", location: "hats/hats", colour: false, topcorner:[23,159]})

const sprite_arms_list = []
for (let i =0; i<sprite_body_list.length;i++){
    b= sprite_body_list[i];
    sprite_arms_list.push({name: b, location: "body/farmer_"+b, colour: true, topcorner:[96,0]})
}

const sprite_objects =[];

function add_sprite_object(name, list,colour_list,isWalk, dimensions, offset){
    sprite_objects.push({name: name,item_list: list, colour_list: colour_list, item: 0,  colour: 0, image: new Image(), isWalk: isWalk, topcorner:[0,0],dimensions: dimensions, offset: offset});
}

add_sprite_object("Torso", sprite_torso_list,skin_colours,true,[16,32],[0,0]);
add_sprite_object("Eyes", sprite_eyes_list,eye_colours,true,[16,32],[0,0]);
add_sprite_object("Pants", sprite_pants_list,outfit_colours,true,[16,32],[0,0]);
add_sprite_object("Shoes", sprite_shoes_list,outfit_colours,true,[16,32],[0,0]);
add_sprite_object("Shirt", sprite_shirt_list,outfit_colours,false,[8,8],[4,15]);
add_sprite_object("Accessory", sprite_accessory_list,outfit_colours,false,[16,16],[0,1]);
add_sprite_object("Hair", sprite_hair_list,hair_colours,false,[16,32],[0,1]);
//add_sprite_object("Hat", sprite_hat_list,outfit_colours,false,[16,20],[0,0]);
add_sprite_object("Arms", sprite_arms_list,skin_colours,true,[16,32],[0,0]);

function print_sprite_objects(){
    s = "";
    for (i = 0; i < sprite_objects.length; i += 1){
        b = sprite_objects[i];
        s+="name: "+b.name;
        s+=" item_list: "+b.item_list.toString();
        s+="  colour_list: "+b.colour_list.toString();
        s+=" item: "+b.item;
        s+=" colour: "+b.colour;
        s+=" src: "+b.image.src;
        s+="<br>";
    }
    return s
}
