const sprite_body_list = ["short","tall","short_bald","tall_bald"];

const height_list = ["short","tall"];

const eyelash_list = ["short","long"];

let height = 0;

let isBald = true;

const none = {name:"None",location: "", colour: false, rowNum: 3, topcorner:[0,0]}

const hairstyles_names = ["Short shaggy", "Pageboy", "side-part", "Afro", "Mod", "Fauxhawk", "Pompador", "Comb-over", "Shaggy", "Emo", "spiky", "Hi-top", "ponytail", "Short spiky", "Comma", "Curtained", "High ponytail", "Flip", "Devil flip", "Little buns", "Short fro", "Little low twintails", "Bun", "Pixie", "Long side-part", "Medium bangs", "Long centre-part", "Medium side-part", "Ponytail centre-part", "Long bangs", "Little high twintails", "Double bun", "French twist", "Double braids long", "Double braids", "Ponytail medium", "Long over shoulder", "Curly twintails", "Bob no bangs","Headband", "Fluffy medium", "Wavy medium", "Frosted tips", "Richie rich", "Mop", "Short cornrows", "Short", "Long bangs", "Mullet", "Mohawk", "Long tonsure", "Short tonsure", "Shaved curl", "Shaved shaggy", "Shaved neat" ]

const hairstyles2_names = ["Flippy", "Wavy", "Long", "loose pony", "high braid", "Over shoulder", "Wavy over shoulder", "short bob", "short", "80s bob", "Half shaved", "short spiky", "Short wavy", "short centre part", "Short bangs", "blowout", "short centre part", "short shaggy", "wavy long", "shaggy medium", "blowout","half shaved medium", "side part medium"]

/*
Name: String.
location: String. Where the file is, stopping before the _[colour].png
colour: Boolean. whether this image has colour variants
topcorner: coordinates of the top corner of the looking down standing still sprite
*/

const sprite_torso_list = []
for (let i =0; i<sprite_body_list.length;i++){
    b= sprite_body_list[i];
    sprite_torso_list.push({name: b, location: "body/"+b, colour: true, rowNum: 3,topcorner:[0,0]})
}

const sprite_body_names = ["Short","Tall"]

const sprite_eyes_list = []
for (let i =0; i<height_list.length;i++){
    b= eyelash_list[i];
    sprite_eyes_list.push({name: b, location: "eyes/"+b, colour: true, rowNum: 3,topcorner:[0,0]})
}

const sprite_shoes_list = []
for (let i =0; i<height_list.length;i++){
    b= height_list[i];
    sprite_shoes_list.push({name: b, location: "shoes/"+b, colour: true, rowNum: 3,topcorner:[0,0]})
}

const sprite_pants_list = []
sprite_pants_list.push({name: "Shorts", location: "pants/pants", colour: true, rowNum: 3,topcorner:[0,0]})

const sprite_pants_names = sprite_pants_list.map(nameOf);

const sprite_shirt_list = []
sprite_shirt_list.push({name: "Overalls", location: "shirts/shirts", colour: false, rowNum: 4,topcorner:[0,0]})

const sprite_accessory_list = []
sprite_accessory_list.push({name: "Glasses", location: "accessory/accessories", colour: false, rowNum: 2,topcorner:[0,32]})

const sprite_accessory_names = sprite_accessory_list.map(nameOf);

const sprite_facialhair_list = [none]
for (let column =0; column<6;column++){
    sprite_facialhair_list.push({name: facial_hair_list[column+1], location: "facialhair/facialhair", colour: true, rowNum: 2,topcorner:[16*column,0]})
}

const sprite_facialhair_names = sprite_facialhair_list.map(nameOf);

const sprite_hair_list = [none]
for (let row =0; row<7;row++)
    for (let column =0; column<8;column++){
        if (row*8+column< hairstyles_names.length)
            sprite_hair_list.push({name: hairstyles_names[row*8+column], location: "hair/hairstyles", colour: true, rowNum: 3,topcorner:[16*column,96*row]})
}
for (let row =0; row<3;row++)
    for (let column =0; column<8;column++){
        if (row*8+column<hairstyles2_names.length)
            sprite_hair_list.push({name: hairstyles2_names[row*8+column], location: "hair/hairstyles2", colour: true, rowNum: 3,topcorner:[16*column,128*row]})
}
const sprite_hair_names = sprite_hair_list.map(nameOf);

const sprite_hat_list = []
sprite_hat_list.push({name: "Santa hat", location: "hats/hats", colour: false, rowNum: 4,topcorner:[23,159]})

const sprite_arms_list = []
for (let i =0; i<sprite_body_list.length;i++){
    b= sprite_body_list[i];
    sprite_arms_list.push({name: b, location: "body/"+b, colour: true, rowNum: 3,topcorner:[96,0]})
}

const sprite_objects =[];
/*
Name: String.
item_list: lost oif objects as above
colour_list: list of strings
item: number
colour: number
image: an image
iswalk: does it have separate sprites for each part of walk cycle
bobs: does it bob up and down (not relevant is isWalk)
topcorner: coordinates of the top corner of the looking down standing still sprite
*/
function add_sprite_object(name, list,colour_list,isWalk,bobs, dimensions, offset){
    sprite_objects.push({name: name,item_list: list, colour_list: colour_list, item: 0,  colour: 0, image: new Image(), isWalk: isWalk, bobs: bobs, rowNum: 3, topcorner:[0,0],dimensions: dimensions, offset: offset});
}

add_sprite_object("Torso", sprite_torso_list,skin_colours,true, false, [16,32],[0,0]);
add_sprite_object("Eyes", sprite_eyes_list,eye_colours,true,false,[16,32],[0,0]);
add_sprite_object("Pants", sprite_pants_list,outfit_colours,true,false,[16,32],[0,0]);
add_sprite_object("Shoes", sprite_shoes_list,outfit_colours,true,false,[16,32],[0,0]);
add_sprite_object("Shirt", sprite_shirt_list,outfit_colours,false,false,[8,8],[4,15]);
//add_sprite_object("Accessory", sprite_accessory_list,outfit_colours,false,true,[16,16],[0,2]);
add_sprite_object("Facial Hair", sprite_facialhair_list,hair_colours,false,true,[16,16],[0,2]);
add_sprite_object("Hairstyle", sprite_hair_list,hair_colours,false,true, [16,32],[0,1]);
//add_sprite_object("Hat", sprite_hat_list,outfit_colours,false,true, [16,20],[0,0]);
add_sprite_object("Arms", sprite_arms_list,skin_colours,true,false, [16,32],[0,0]);

function print_sprite_objects(){
    s = "";
    for (i = 0; i < sprite_objects.length; i += 1){
        b = sprite_objects[i];
        s+="name: "+b.name;
        //s+=" item_list: "+b.item_list.toString();
        //s+="  colour_list: "+b.colour_list.toString();
        s+=" item: "+b.item;
        s+=" colour: "+b.colour;
        //s+=" src: "+b.image.src;
        s+="<br>";
    }
    return s
}

function print_sprite_list(listname){
    s = "";
    for (i = 0; i < listname.length; i += 1){
        b = listname[i];
        s+="name: "+b.name;
        s+=" topcorner: "+b.topcorner.toString();
        s+="<br>";
    }
    return s
}
