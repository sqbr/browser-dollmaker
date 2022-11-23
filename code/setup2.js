let sprite_body_list = ["male","female","male_bald", "female_bald"]

/*
Name: String.
location: String. Where the file is, stopping before the _[colour].png
colour: Boolean. whether this image has colour variants
topcorner: coordinates of the top corner of the looking down standing still sprite
*/

let sprite_torso_list = []
for (let i =0; i<sprite_body_list.length;i++){
    b= sprite_body_list[i];
    sprite_torso_list.push({name: b, location: "body/farmer_"+b, colour: true, topcorner:(0,0)})
}

const sprite_objects =[];

function add_sprite_object(name, list,colour_list,isWalk){
    sprite_objects.push({name: name,item_list: list, colour_list: colour_list, item: 0,  colour: 0, image: new Image(), isWalk: isWalk, topcorner:(0,0)});
}

add_sprite_object("Torso", sprite_torso_list,skin_colours,true);

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
