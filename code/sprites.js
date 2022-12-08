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

const pants_names = ["capris","shorts", "long dress", "short skirt", "pleated skirt", "Dinosaur Pants", "yellow grass skirt", "green grass skirt", "pantaloons", "tight pants", "baggy pants", "simple dress", "relaxed fit pants", "relaxed fit shorts"];

const shoes_names =["Boots","Flats","Flip-flops"];

const gloves_names = ["Mittens"];

const sleeves_names =["Sleeves"];

const coloured_shirts_names = ["Classic overalls", "Shirt", "Mint Blouse", "Dark Shirt", "Skull Shirt", "Light Blue Shirt","Tan Striped Shirt","Green Overalls",'"Good Grief" Shirt',"Aquamarine Shirt","Suit Top","Green Belted Shir","Lime Green Striped Shirt","Red Striped Shirt","Skeleton Shirt","Orange Shirt","Night Sky Shirt","Mayoral Suspenders","Brown Jacket","Sailor Shirt","Green Vest","Yellow and Green Shirt"]

const uncoloured_shirts_names = ["Striped Shirt","Tank Top (low neck)","Tank Top","Crop Tank Top (Low neck)", "Crop Tank Top","Bikini Top","80's Shirt (curvy)","Crop Top Shirt","???","Strapped Top","Button Down Shirt","Crop top", "Tube Top","muscle T", "checked","crop m","crop f","tshirt m","tshirt f","skull","face" ]

const shirt_dec_names = ["fish", "plaid", "", "","letterman", "skeleton", "", "star", "sports shoulders", "heart", "", "collar", "", "", "dot?", "dot?", "collar", "sailor under", "sailor over", "bandana", "Dark Highlight Shirt", "dots", "silky", "vest sleeves", "oily?", "vest","",""]

const hat_dec_sprite_list = ["top hat", "earmuffs", "flower","clip","cap 1","cap 2","backwards cap", "big bow", "cat ears", "flat cap", "wide hat", "cowboy hat", "hood", "beanie", "ribbed beanie", "turban", "hijab", "headphones","wizard"]
/*
Name: String.
location: String. Where the file is, stopping before the _[colour].png
colour: Boolean. whether this image has colour variants
asymmetrical: Boolean. If true, the left facing version is left blank.
rowNum: How many rows this sprite has
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
for (let j =0; j<shoes_names.length;j++){
    for (let i =0; i<height_list.length;i++){
        let h= height_list[i];
        let s = shoes_names[j];
        sprite_shoes_list.push({name: h+"_"+s, location: "outfit/shoes/"+h+"_"+s.toLowerCase().replace("-",""), colour: true, asymmetrical: false,rowNum: 3,topcorner:[0,0]})
    }
}

const sprite_pants_list = [none]
sprite_pants_list.push({name: "briefs", location: "outfit/pants/briefs", colour: true, asymmetrical: false,rowNum: 3,topcorner:[0,0]});
sprite_pants_list.push({name: "trousers", location: "outfit/pants/longpants", colour: true, asymmetrical: false,rowNum: 3,topcorner:[0,0]});
for (let row =0; row<2;row++)
    for (let column =0; column<10;column++){
        if (row*10+column< pants_names.length){
            let colour = true;
            if  ([5,6,7].includes(column))//already coloured
                colour=false;
            sprite_pants_list.push({name: pants_names[row*10+column], location: "outfit/pants/pants", colour: colour, asymmetrical: false,rowNum: 3,topcorner:[192*column,688*row]});
        }
}

const sprite_pants_top_list = [none];
sprite_pants_top_list.push({name: "high waist", location: "outfit/shirts/decorations/shirt decs", colour: true, asymmetrical: false,rowNum: 4,topcorner:[8*3,0]});
sprite_pants_top_list.push({name: "overalls", location: "outfit/shirts/decorations/shirt decs", colour: true, asymmetrical: false,rowNum: 4,topcorner:[8*12,32]});

const sprite_shirt1_list = [none];
for (let row =0; row<2;row++)
    for (let column =0; column<14;column++){
        let current_num = 14*row+column;
        if (current_num <uncoloured_shirts_names.length)
            sprite_shirt1_list.push({name: uncoloured_shirts_names[current_num]+row+","+column, location: "outfit/shirts/shirts", colour: true, asymmetrical: false,rowNum: 4,topcorner:[8*column,32*row]})
}
for (let column =0; column<16;column++)
    for (let row =0; row<19;row++){
        let current_num = 16*row+column;
        if (current_num <coloured_shirts_names.length)
            sprite_shirt1_list.push({name: coloured_shirts_names[current_num], location: "outfit/shirts/shirts", colour: false, asymmetrical: false,rowNum: 4,topcorner:[8*column,32*row]})
}

const sprite_shirt2_list = [none];
for (let row =0; row<2;row++)
    for (let column =0; column<16;column++){
        let current_num = 16*row+column;
        if (current_num <shirt_dec_names.length)
            sprite_shirt2_list.push({name: shirt_dec_names[current_num], location: "outfit/shirts/decorations/shirt decs", colour: true, asymmetrical: false,rowNum: 4,topcorner:[8*column,32*row]})
}

const sprite_shirt_dec_list = [none];
for (let row =0; row<2;row++)
    for (let column =0; column<16;column++){
        let current_num = 16*row+column;
        if (current_num <shirt_dec_names.length)
            sprite_shirt_dec_list.push({name: shirt_dec_names[current_num], location: "outfit/shirts/decorations/shirt decs", colour: true, asymmetrical: false,rowNum: 4,topcorner:[8*column,32*row]})
}

const sprite_coat_list = [none];
for (let column =0; column<8;column++){
        if (column <coat_list_sprite.length)
            sprite_coat_list.push({name: coat_list_sprite[column+1], location: "outfit/coat/coat", colour: true, asymmetrical: false,rowNum: 3,topcorner:[16*column,0]})
}

const sprite_coat_back_list = [none];
for (let column =0; column<1;column++){
        if (column <coat_list_sprite.length)
            sprite_coat_back_list.push({name: coat_list_sprite[column+1], location: "outfit/coat/coat_back", colour: true, asymmetrical: false,rowNum: 3,topcorner:[16*column,0]})
}
const sprite_eyewear_list = [none]
for (let column =0; column<2;column++){ //add colour
    sprite_eyewear_list.push({name: eyewear_list_sprite[column+1], location: "accessories/eyewear/eyewear", colour: true, asymmetrical: false,rowNum: 2,topcorner:[16*column,0]})
}
for (let column =2; column<eyewear_list_sprite.length-1;column++){
    let asymm =  false;
    if (eyewear_list_sprite[column] == "eye-patch")
        asymm = true;    
    sprite_eyewear_list.push({name: eyewear_list_sprite[column+1], location: "accessories/eyewear/eyewear", colour: false, asymmetrical: asymm,rowNum: 2,topcorner:[16*column,0]})
}

const sprite_neckwear_list = [none]
for (let column =0; column<neckwear_list_sprite.length;column++){
    sprite_neckwear_list.push({name: neckwear_list_sprite[column], location: "accessories/neckwear/neckwear", colour: true, asymmetrical: false,rowNum: 2,topcorner:[16*column,0]})
}

const sprite_earrings_list = [none];
for (let column =0; column<2;column++)
    sprite_earrings_list.push({name: earrings_list_sprite[column], location: "accessories/earrings/earrings", colour: false, asymmetrical: false,rowNum: 2,topcorner:[16*column,0]})
sprite_earrings_list.push({name: earrings_list_sprite[2], location: "accessories/earrings/earrings", colour: true, asymmetrical: false,rowNum: 2,topcorner:[16*2,0]})
sprite_earrings_list.push({name: earrings_list_sprite[3], location: "accessories/earrings/earrings", colour: true, asymmetrical: true,rowNum: 2,topcorner:[16*3,0]})

const sprite_facialhair_list = [none]
for (let column =0; column<6;column++){
    sprite_facialhair_list.push({name: facial_hair_list_sprite[column+1], location: "hair/facialhair/facialhair", colour: true, asymmetrical: false,rowNum: 2,topcorner:[16*column,0]})
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
for (let row =0; row<8;row++)
    for (let column =0; column<12;column++){
        let current_num = row*12+column;
        if (current_num< hat_list_sprite.length){
            sprite_hat_list.push({name: hat_list_sprite[current_num], location: "outfit/hats/hats", colour: false, asymmetrical: false,rowNum: 4,topcorner:[16*column,128*row]})
        }
}
for (let row =0; row<2;row++)
    for (let column =0; column<12;column++){
        let current_num = row*12+column;
        if (current_num< hat_colour_names.length){
            sprite_hat_list.push({name: hat_colour_names[current_num], location: "outfit/hats/hats_colour", colour: true, asymmetrical: false,rowNum: 4,topcorner:[16*column,128*row]})
        }
}

const sprite_hat_dec_list = [none]
for (let row =0; row<2;row++)
    for (let column =0; column<12;column++){
        let current_num = row*12+column;
        if (current_num< hat_dec_sprite_list.length){
            sprite_hat_dec_list.push({name: hat_dec_sprite_list[current_num], location: "outfit/hats/hats_dec", colour: true, asymmetrical: false,rowNum: 4,topcorner:[16*column,128*row]})
        }
}

const sprite_arms_list = []
for (let i =0; i<height_list.length;i++){
    h= height_list[i];
    sprite_arms_list.push({name: "arms_"+h, location: "body/"+"arms_"+h, colour: true, asymmetrical: false,rowNum: 3,topcorner:[0,0]})
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
item_list: list of objects as above
colour_list: list of strings describing whsat colour it can be
item: index of item_list describing current item
colour: index of colour_list describing current item's colour
colour2: index of colour_list describing current item's secondary colour
image: an image
iswalk: does it have separate sprites for each part of walk cycle
bobs: does it bob up and down (not relevant is isWalk)
heightOffset: how many pixels to shift downwards for shorter bodies
dimensions: how big is the sprite
topcorner: coordinates of the top corner of the looking down standing still sprite
*/
function add_sprite_object(name, list,name_list, colour_list,isWalk, bobs, heightOffset,dimensions, offset){
    sprite_objects.push({name: name,item_list: list, name_list: name_list, colour_list: colour_list, item: 0,  colour: 0, colour2: 0, image: new Image(), isWalk: isWalk, bobs: bobs, asymmetrical: false, heightOffset: heightOffset, rowNum: 3, topcorner:[0,0],dimensions: dimensions, offset: offset});
}

add_sprite_object("Coat_back", sprite_coat_back_list,sprite_coat_back_list.map(nameOf),outfit_colours,false,true,1, [16,32],[0,0]);
add_sprite_object("Torso", sprite_torso_list,height_list, skin_colours,true, false, 0, [16,32],[0,0]);
add_sprite_object("Eyes", sprite_eyes_list,eyelash_list, eye_colours,true,false,1, [16,32],[0,0]);
add_sprite_object("Shoes", sprite_shoes_list,["None"].concat(shoes_names), outfit_colours,true,false,0, [16,32],[0,0]);
add_sprite_object("Pants", sprite_pants_list,sprite_pants_list.map(nameOf), outfit_colours,true,false,0, [16,32],[0,0]);
add_sprite_object("Shirt1", sprite_shirt1_list,sprite_shirt1_list.map(nameOf),outfit_colours,false,true,1, [8,8],[4,15]);
add_sprite_object("Shirt2", sprite_shirt2_list,sprite_shirt2_list.map(nameOf),outfit_colours,false,true,1, [8,8],[4,15]);
add_sprite_object("Shirt_dec", sprite_shirt_dec_list,sprite_shirt_dec_list.map(nameOf),outfit_colours,false,true,1, [8,8],[4,15]);
add_sprite_object("Pants top", sprite_pants_top_list,sprite_pants_top_list.map(nameOf), outfit_colours,false,true,1, [8,8],[4,15]);
add_sprite_object("Eyewear", sprite_eyewear_list,sprite_eyewear_list.map(nameOf),outfit_colours,false,true,1, [16,16],[0,2]);
add_sprite_object("Neckwear", sprite_neckwear_list,sprite_neckwear_list.map(nameOf), outfit_colours,false,true,1, [16,32],[0,2]);
add_sprite_object("Earrings", sprite_earrings_list,sprite_earrings_list.map(nameOf), outfit_colours,false,true,1, [16,16],[0,2]);
add_sprite_object("Coat", sprite_coat_list,sprite_coat_list.map(nameOf),outfit_colours,false,true,1, [16,32],[0,0]);
add_sprite_object("Facial_hair", sprite_facialhair_list,sprite_facialhair_list.map(nameOf), hair_colours,false,true,1, [16,16],[0,2]);
add_sprite_object("Hairstyle", sprite_hair_list,sprite_hair_list.map(nameOf), hair_colours,false,true, 1,[16,32],[0,0]);
add_sprite_object("Arms", sprite_arms_list,height_list, skin_colours,true,false,0, [16,32],[0,0]);
add_sprite_object("Gloves", sprite_gloves_list,["None"].concat(gloves_names), outfit_colours,true,false,0, [16,32],[0,0]);
add_sprite_object("Shirt_sleeves", sprite_sleeves_list,["None"].concat(sleeves_names), outfit_colours,true,false,0, [16,32],[0,0]);
add_sprite_object("Coat_sleeves", sprite_sleeves_list,["None"].concat(sleeves_names), outfit_colours,true,false,0, [16,32],[0,0]);
add_sprite_object("Hairstyle_top", sprite_hair_list,sprite_hair_list.map(nameOf), hair_colours,false,true, 1,[16,32],[0,0]);
add_sprite_object("Hat", sprite_hat_list,sprite_hat_list.map(nameOf), outfit_colours,false,true,1, [16,32],[0,0]);
add_sprite_object("Hat_dec", sprite_hat_dec_list,sprite_hat_dec_list.map(nameOf), outfit_colours,false,true,1, [16,32],[0,0]);

function print_sprite_objects(){
    let s = "";
    for (i = 0; i < sprite_objects.length; i += 1){
        let b = sprite_objects[i];
        s+="name: "+b.name;
        /*s+=" item_list: "
        for (j = 0; j < b.item_list.length; j += 1)
            s+=(b.item_list[j]).name+", ";*/
        //s+="  colour_list: "+b.colour_list.toString();
        s+=" item: "+b.item;
        s+="Current item :"+(b.item_list[b.item]).name
        //s+=" colour: "+b.colour;
        //s+=" heightOffset: "+b.heightOffset;
        s+=" top corner: "+b.topcorner;
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
