const sprite_body_list = ["short","tall","short_bald","tall_bald"];

const height_list = ["short","tall"];

const eyelash_list = ["short","long"];

let height = 0;

let isBald = true;
let currentShoes = 0;
let currentGloves = 0;
let hasShirtSleeves = false;
let hasCoatSleeves = false;

const none = {name:"None",location: "", colour: false, rowNum: 3, topcorner:[0,0]}

const hairstyles_names = ["Short shaggy", "Pageboy", "side-part", "Afro", "Mod", "Fauxhawk", "Pompador", "Comb-over", "Shaggy", "Emo", "spiky", "Hi-top", "ponytail", "Short spiky", "Comma", "Curtained", "High ponytail", "Flip", "Devil flip", "Little buns", "Short fro", "Little low twintails", "Bun", "Pixie", "Long side-part", "Medium bangs", "Long centre-part", "Medium side-part", "Ponytail centre-part", "Long bangs", "Little high twintails", "Double bun", "French twist", "Double braids long", "Double braids", "Ponytail medium", "Long over shoulder", "Curly twintails", "Bob no bangs","Headband", "Fluffy medium", "Wavy medium", "Frosted tips", "Richie rich", "Mop", "Short cornrows", "Short", "Long bangs", "Mullet", "Mohawk", "Long tonsure", "Short tonsure", "Shaved curl", "Shaved shaggy", "Shaved neat" ]

const hairstyles2_names = ["Flippy", "Wavy", "Long", "loose pony", "high braid", "Over shoulder", "Wavy over shoulder", "short bob", "short", "80s bob", "Half shaved", "short spiky", "Short wavy", "short centre part", "Short bangs", "blowout", "short centre part", "short shaggy", "wavy long", "shaggy medium", "blowout","half shaved medium", "side part medium"]

const pants_names = ["trousers","shorts", "long dress", "short skirt", "pleated skirt", "Dinosaur Pants", "yellow grass skirt", "green grass skirt", "pantaloons", "tight pants", "baggy pants", "simple dress", "relaxed fit pants", "relaxed fit shorts"];

const coloured_shirts_names = ["Classic overalls", "Shirt", "Mint Blouse", "Dark Shirt", "Skull Shirt", 
"Light Blue Shirt","Tan Striped Shirt","Green Overalls",'"Good Grief" Shirt',"Aquamarine Shirt","Suit Top","Green Belted Shir","Lime Green Striped Shirt","Red Striped Shirt","Skeleton Shirt","Orange Shirt","Night Sky Shirt","Mayoral Suspenders","Brown Jacket","Sailor Shirt","Green Vest","Yellow and Green Shirt"]

const coloured_shirts_numbers = [2,4,5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, ];

const uncoloured_shirts_names = ["Striped Shirt","Tank Top (low neck)","Tank Top","Crop Tank Top (Low neck)", "Crop Tank Top","Bikini Top","80's Shirt (curvy)","Crop Top Shirt","???","Strapped Top","Button Down Shirt","Tube Top",]

const shirt_dec_names = ["fish", "gi", "high waist", "letterman", "skeleton", "overalls", "star", "sports shoulders", "heart", "overalls2?", "collar", "necklace", "necklace2", "dot?", "dot?", "collar", "sailor", "sailor2", "bandana", "Dark Highlight Shirt", "dots", "silky", "vest sleeves", "oily?", "vest"]
const neckwear_names = ["bandana", "necklace", "bow-tie", "tie", "choker"]

const earrings_list_sprites = ["gold drop","blue drop", "studs", "single stud"]

const hat_names = ["cowboy hat", "Bowler", "Top hat", "sombrero", "straw hat", "official cap", "blue bonnet", "Chapeau", "Skeleton mask", "Goblin Mask", "Chicken Mask", "Earmuffs", "Delicate Bow", "Tropiclip", "Butterfly Bow", "Hunter's Cap", "Trucker Hat", "Sailor's Cap", "Good Ol' Cap", "Fedora", "Cool Cap", "Lucky Bow", "Polka Bow", "Gnome's Cap", "Eye Patch", "Santa Hat", "Tiara", "Hard Hat", "Sou'wester", "Daisy", "Watermelon Band", "Mouse Ears", "Cat Ears", "Cowgal Hat", "Cowpoke Hat", "Archer's Cap", "Panda Hat", "Blue Cowboy Hat", "Red Cowboy Hat", "Cone Hat", "Living Hat", "Emily's Magic Hat", "Mushroom Cap", "Dinosaur Hat", "Totem Mask", "Logo Cap", "Dwarf Helm", "Fashion Hat", "Pumpkin Mask", "Hair Bone",]
/*
Name: String.
location: String. Where the file is, stopping before the _[colour].png
colour: Boolean. whether this image has colour variants
topcorner: coordinates of the top corner of the looking down standing still sprite
*/

const sprite_torso_list = []
for (let i =0; i<sprite_body_list.length;i++){
    b= sprite_body_list[i];
    sprite_torso_list.push({name: b, location: "body/"+b, colour: true, asymmetrical: false,  rowNum: 3,topcorner:[0,0]})
}

const sprite_body_names = ["Short","Tall"]

const sprite_eyes_list = []
for (let i =0; i<height_list.length;i++){
    b= eyelash_list[i];
    sprite_eyes_list.push({name: b, location: "body/eyes/"+b, colour: true, asymmetrical: false,rowNum: 3,topcorner:[0,0]})
}

const sprite_shoes_list = [none]
for (let i =0; i<height_list.length;i++){
    b= height_list[i];
    sprite_shoes_list.push({name: b, location: "outfit/shoes/"+b, colour: true, asymmetrical: false,rowNum: 3,topcorner:[0,0]})
}

const sprite_pants_list = [none]

for (let row =0; row<2;row++)
    for (let column =0; column<10;column++){
        if (row*10+column< pants_names.length){
            let colour = true;
            if  ([5,6,7].includes(column))//already coloured
                colour=false;
            sprite_pants_list.push({name: pants_names[row*10+column], location: "outfit/pants/pants", colour: colour, asymmetrical: false,rowNum: 3,topcorner:[192*column,688*row]});
        }
}

const sprite_shirt1_list = [none];
for (let column =0; column<13;column++)
    for (let row =0; row<19;row++){
        let current_num = 13*row+column;
        if (current_num <uncoloured_shirts_names.length)
            sprite_shirt1_list.push({name: uncoloured_shirts_names[current_num], location: "outfit/shirts/shirts", colour: true, asymmetrical: false,rowNum: 4,topcorner:[8*column,8*row]})
}
for (let column =0; column<16;column++)
    for (let row =0; row<19;row++){
        let current_num = 16*row+column;
        if (current_num <coloured_shirts_names.length)
            sprite_shirt1_list.push({name: coloured_shirts_names[current_num], location: "outfit/shirts/shirts", colour: false, asymmetrical: false,rowNum: 4,topcorner:[8*column,8*row]})
}

const sprite_shirt2_list = [none];
for (let column =0; column<16;column++)
    for (let row =0; row<2;row++){
        let current_num = 16*row+column;
        if (current_num <shirt_dec_names.length)
            sprite_shirt2_list.push({name: shirt_dec_names[current_num], location: "outfit/shirts/decorations/shirt_decs", colour: true, asymmetrical: false,rowNum: 4,topcorner:[8*column,8*row]})
}

const sprite_coat_list = [none];
for (let column =0; column<1;column++){
        if (column <coat_list.length)
            sprite_coat_list.push({name: coat_list[column+1], location: "outfit/coat/coat", colour: true, asymmetrical: false,rowNum: 3,topcorner:[16*column,0]})
}
const sprite_eyewear_list = [none]
for (let column =0; column<2;column++){ //add colour
    sprite_eyewear_list.push({name: eyewear_list[column+1], location: "accessories/eyewear/eyewear", colour: true, asymmetrical: false,rowNum: 2,topcorner:[16*column,0]})
}
for (let column =2; column<eyewear_list.length-1;column++){
    let asymm =  false;
    if (eyewear_list[column] == "eye-patch")
        asymm = true;    
    sprite_eyewear_list.push({name: eyewear_list[column+1], location: "accessories/eyewear/eyewear", colour: false, asymmetrical: asymm,rowNum: 2,topcorner:[16*column,0]})
}

const sprite_neckwear_list = [none]
for (let column =0; column<neckwear_names.length;column++){
    sprite_neckwear_list.push({name: neckwear_names[column], location: "accessories/neckwear/neckwear", colour: true, asymmetrical: false,rowNum: 2,topcorner:[16*column,0]})
}

const sprite_earrings_list = [none];
for (let column =0; column<2;column++)
    sprite_earrings_list.push({name: earrings_list_sprites[column], location: "accessories/earrings/earrings", colour: false, asymmetrical: false,rowNum: 2,topcorner:[16*column,0]})
sprite_earrings_list.push({name: earrings_list_sprites[2], location: "accessories/earrings/earrings", colour: true, asymmetrical: false,rowNum: 2,topcorner:[16*2,0]})
sprite_earrings_list.push({name: earrings_list_sprites[3], location: "accessories/earrings/earrings", colour: true, asymmetrical: true,rowNum: 2,topcorner:[16*3,0]})

const sprite_facialhair_list = [none]
for (let column =0; column<6;column++){
    sprite_facialhair_list.push({name: facial_hair_list[column+1], location: "hair/facialhair/facialhair", colour: true, asymmetrical: false,rowNum: 2,topcorner:[16*column,0]})
}

const sprite_hair_list = [none]
for (let row =0; row<7;row++)
    for (let column =0; column<8;column++){
        if (row*8+column< hairstyles_names.length)
            sprite_hair_list.push({name: hairstyles_names[row*8+column], location: "hair/hairstyles", colour: true, asymmetrical: false,rowNum: 3,topcorner:[16*column,96*row]})
}
for (let row =0; row<3;row++)
    for (let column =0; column<8;column++){
        if (row*8+column<hairstyles2_names.length)
            sprite_hair_list.push({name: hairstyles2_names[row*8+column], location: "hair/hairstyles2", colour: true, asymmetrical: false,rowNum: 3,topcorner:[16*column,128*row]})
}

const sprite_hat_list = [none]
for (let row =0; row<32;row++)
    for (let column =0; column<12;column++){
        let current_num = row*12+column;
        if (current_num< hat_names.length){
            let colour = false;
            if  ([].includes(column))//can be coloured
                colour=true;
            sprite_hat_list.push({name: hat_names[current_num], location: "outfit/hats/hats", colour: colour, asymmetrical: false,rowNum: 4,topcorner:[16*column,128*row]})

        }
}

const sprite_arms_list = []
for (let i =0; i<sprite_body_list.length;i++){
    b= sprite_body_list[i];
    sprite_arms_list.push({name: b, location: "body/"+b, colour: true, asymmetrical: false,rowNum: 3,topcorner:[96,0]})
}

const sprite_gloves_list = [none]
for (let i =0; i<height_list.length;i++){
    b= height_list[i];
    sprite_gloves_list.push({name: b, location: "outfit/gloves/"+b, colour: true, asymmetrical: false,rowNum: 3,topcorner:[0,0]})
}

const sprite_sleeves_list = [none]
for (let i =0; i<height_list.length;i++){
    b= height_list[i];
    sprite_sleeves_list.push({name: b, location: "outfit/sleeves/"+b, colour: true, asymmetrical: false,rowNum: 3,topcorner:[0,0]})
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
function add_sprite_object(name, list,name_list, colour_list,isWalk, bobs, heightOffset,dimensions, offset){
    sprite_objects.push({name: name,item_list: list, name_list: name_list, colour_list: colour_list, item: 0,  colour: 0, image: new Image(), isWalk: isWalk, bobs: bobs, asymmetrical: false, heightOffset: heightOffset, rowNum: 3, topcorner:[0,0],dimensions: dimensions, offset: offset});
}

add_sprite_object("Torso", sprite_torso_list,height_list, skin_colours,true, false, 0, [16,32],[0,0]);
add_sprite_object("Eyes", sprite_eyes_list,eyelash_list, eye_colours,true,false,1, [16,32],[0,0]);
add_sprite_object("Shoes", sprite_shoes_list,["None","Boots"], outfit_colours,true,false,0, [16,32],[0,0]);
add_sprite_object("Pants", sprite_pants_list,sprite_pants_list.map(nameOf), outfit_colours,true,false,0, [16,32],[0,0]);
add_sprite_object("Shirt1", sprite_shirt1_list,sprite_shirt1_list.map(nameOf),outfit_colours,false,true,1, [8,8],[4,15]);
add_sprite_object("Shirt2", sprite_shirt2_list,sprite_shirt2_list.map(nameOf),outfit_colours,false,true,1, [8,8],[4,15]);
add_sprite_object("Eyewear", sprite_eyewear_list,sprite_eyewear_list.map(nameOf),outfit_colours,false,true,1, [16,16],[0,2]);
add_sprite_object("Neckwear", sprite_neckwear_list,sprite_neckwear_list.map(nameOf), outfit_colours,false,true,1, [16,32],[0,2]);
add_sprite_object("Earrings", sprite_earrings_list,sprite_earrings_list.map(nameOf), outfit_colours,false,true,1, [16,16],[0,2]);
add_sprite_object("Coat", sprite_coat_list,sprite_coat_list.map(nameOf),outfit_colours,true,false,1, [16,32],[0,0]);
add_sprite_object("Facial_hair", sprite_facialhair_list,sprite_facialhair_list.map(nameOf), hair_colours,false,true,1, [16,16],[0,2]);
add_sprite_object("Hairstyle", sprite_hair_list,sprite_hair_list.map(nameOf), hair_colours,false,true, 1,[16,32],[0,0]);
add_sprite_object("Arms", sprite_arms_list,height_list, skin_colours,true,false,0, [16,32],[0,0]);
add_sprite_object("Gloves", sprite_gloves_list,["None","Mittens"], outfit_colours,true,false,0, [16,32],[0,0]);
add_sprite_object("Sleeves", sprite_sleeves_list,["None","Sleeves"], outfit_colours,true,false,0, [16,32],[0,0]);
add_sprite_object("Hat", sprite_hat_list,sprite_hat_list.map(nameOf), outfit_colours,false,true,1, [16,32],[0,0]);

function print_sprite_objects(){
    s = "height: "+height+"<br>";
    for (i = 0; i < sprite_objects.length; i += 1){
        b = sprite_objects[i];
        s+="name: "+b.name;
        //s+=" item_list: "+b.item_list.toString();
        //s+="  colour_list: "+b.colour_list.toString();
        //s+=" item: "+b.item;
        //s+=" colour: "+b.colour;
        s+=" heightOffset: "+b.heightOffset;
        s+=" src: "+b.image.src;
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
