//generated by generate_images.py

const outfit_list_both = ["Neckwear","Eyewear","Earrings","Hat",];
const outfit_list_complex = ["Shirt","Coat","Pants_top",];
const outfit_list_portOnly = [];
const outfit_list_spriteOnly = ["Pants","Shoes","Gloves",];
const outfit_list = outfit_list_both.concat(outfit_list_spriteOnly).concat(outfit_list_portOnly);
const body_list = ["Torso","Head","Complexion","Ears","Nose","Nose_front",];
const skin_list = ["Torso","Head","Complexion","Ears","Nose","Nose_front","Eyebrows","Mouth","Blush",];
const hair_list = ["Hair_back","Hair_middle","Hair_front","Facial_hair",];
const expression_list = ["Eyes","Eyebrows","Mouth",];

const eye_colours = ["#000000","#2E9FF7","#B25DF6","#1B8EF6","#469951","#F0B50A",];
const outfit_yellow = ["#FFE201","#FF9F02","#FFDBB6","#F7BE4F",];
const outfit_green = ["#73D080","#4F8B20","#8CC54E","#277032","#56AA04","#7CA838",];
const outfit_blue = ["#477BC8","#3C92ED","#1FDBFF","#2E4D91",];
const outfit_purple = ["#BF2C92","#D361A7","#A46FE2","#9431C6",];
const outfit_red = ["#F0303C","#B71B00","#E55773",];
const outfit_brown = ["#B24836","#912D20","#820000","#630F0F",];
const outfit_grey = ["#FFFFFF","#777471","#4C4C56","#482B57","#000000",];
const outfit_colours = outfit_yellow.concat(outfit_green,outfit_blue,outfit_purple,outfit_red,outfit_brown,outfit_grey,);
const skin_regular = ["#FFE7D6","#FFD3A6","#FFD3A6","#FFDFA5","#F1A065","#DA773F","#DA874A","#B05934","#B96A2E","#853F27","#783F1A",];
const skin_weird = ["#C3FFFA","#41AD60","#000000","#9BB681",];
const skin_colours = skin_regular.concat(skin_weird,);
const hair_weird = ["#7034ED","#B25DF6","#1B8EF6","#53C7FB","#469951",];
const hair_grey = ["#A59A9D","#E9E9E9",];
const hair_blonde = ["#FCE374","#F0B50A",];
const hair_red = ["#FE7423","#FF5565","#DF433C","#D16132",];
const hair_brown = ["#641D00","#923D1F","#8B4910","#BB742E",];
const hair_black = ["#391E47","#48356E","#4B261E","#5B483C","#5A5A7F","#602372","#000000",];
const hair_colours = hair_blonde.concat(hair_red,hair_brown,hair_black,hair_weird,hair_grey,);

const colourlist_list = [["yellow",outfit_yellow],["green",outfit_green],["blue",outfit_blue],["purple",outfit_purple],["red",outfit_red],["brown",outfit_brown],["grey",outfit_grey],["regular",skin_regular],["weird",skin_weird],["blonde",hair_blonde],["red",hair_red],["brown",hair_brown],["black",hair_black],["weird",hair_weird],["grey",hair_grey],];

const skinNum = 15; //how many skin colours there are
const eyeNum = 6; //how many eye colours there are
const hairNum = 24; //how many hair colours there are
const outfitNum = 30; //how many clothing colours there are
const full_body_list = body_list+hair_list;

const hair_back_list = ["none","shaggy medium","bob","locs bob","long wavy","curly pony","curly bob","spiky","twin braids","long locks","short spiky","bun","tufts","twintails","perm",];
const coat_back_list_port = ["none","suit jacket","jacket","hoodie","open hoodie","leaves","chinese collar",];
const hat_back_list_port = ["none","sunhat","wizard","night cap","broad hat","beanie",];
const ears_list = ["regular",];
const torso_list = ["medium",];
const head_list = ["rectangular","pointed","square","medium","oval","round","jowly",];
const complexion_list = ["none","light wrinkles","wrinkles",];
const stubble_list = ["none","rectangular","pointed","square","medium","oval","round","jowly",];
const blush_list = ["none","small",];
const nose_list = ["none","button","medium","broad","round","pointed",];
const eyebrow_list = ["none","slightly downward","raised","flat sad","raised sad","angry","neutral","raised up",];
const eye_list = ["medium","crescents","medium side","medium narrowed","medium angry","big crescents","sleepy",];
const mouth_list = ["flat","smile","frown","small frown","slight smile","small laugh","wobbly smile",];
const earrings_list_port = ["none","studs","single stud","single small hoop","small hoops","punk","drops","hoops","single hoop",];
const shirt_list_port = ["none","button up","open shirt","tshirt","boatneck","strappy","chinese collar","turtleneck",];
const shirt_dec_list_port = ["none","button_up_plaid","button_up_stripe","open shirt vest",];
const neckwear_list_port = ["none","tie","beads","choker","scarf","bowtie",];
const overshirt_sleeves_port = ["none","zilch","round","sharp",];
const overshirt_sleeves_dec_list_port_full = ["none","none","none","none","none","argyle zilch","argyle round","argyle sharp",];
const overshirt_list_port = ["none","v-neck","sweater","open sweater",];
const overshirt_dec_list_port = ["none","argyle v-neck",];
const shirt_collar_list = ["none","button up","open shirt",];
const shirt_collar_dec_list_port = ["none","button_up_plaid",];
const pants_top_list_port = ["none","overalls",];
const coat_list_port = ["none","suit jacket","jacket","hoodie","open hoodie","leaves","chinese collar",];
const coat_sleeves_port = ["none","zilch","round","sharp",];
const facial_hair_list_port = ["none","beard","moustache","big moustache","goatee","soul patch","fluffy goatee",];
const eyewear_list_port = ["none","glasses","square glasses","round glasses","sunglasses","eye-patch","coloured glasses",];
const hair_middle_list = ["none","tendrils",];
const hair_front_list = ["none","shaggy side","emo","princely","locs bun","long wavy","curly pixie","spiky","short side","smooth bangs","hi-top","afro","long locks","short spiky","centre part","tufts","perm","shaved",];
const hat_list_port = ["none","sunhat","cap","headphones","wizard","ribbon","night cap","broad hat","beanie","bowler","flower crown",];
const hat_dec_list_port = ["none","cap_joja","cap_joja2","sunhat","night cap","broad hat","bowler",];

add_portrait_object("Hair_back",hair_back_list,"body/hair")
add_portrait_object("Coat_back",coat_back_list_port,"outfit/coat")
add_portrait_object("Hat_back",hat_back_list_port,"outfit/hat")
add_portrait_object("Ears",ears_list,"body")
add_portrait_object("Torso",torso_list,"body")
add_portrait_object("Head",head_list,"body")
add_portrait_object("Complexion",complexion_list,"body")
add_portrait_object("Stubble",stubble_list,"body")
add_portrait_object("Blush",blush_list,"expression")
add_portrait_object("Nose",nose_list,"body")
add_portrait_object("Eyebrows",eyebrow_list,"expression")
add_portrait_object("Eyes",eye_list,"expression")
add_portrait_object("Mouth",mouth_list,"expression")
add_portrait_object("Earrings",earrings_list_port,"outfit")
add_portrait_object("Shirt",shirt_list_port,"outfit")
add_portrait_object("Shirt_dec",shirt_dec_list_port,"outfit/shirt")
add_portrait_object("Neckwear",neckwear_list_port,"outfit")
add_portrait_object("Overshirt_sleeves",overshirt_sleeves_port,"outfit/overshirt")
add_portrait_object("Overshirt_sleeves_dec",overshirt_sleeves_dec_list_port_full,"outfit/overshirt")
add_portrait_object("Overshirt",overshirt_list_port,"outfit")
add_portrait_object("Overshirt_dec",overshirt_dec_list_port,"outfit/overshirt")
add_portrait_object("Shirt_collar",shirt_collar_list,"outfit/shirt")
add_portrait_object("Shirt_collar_dec",shirt_collar_dec_list_port,"outfit/shirt")
add_portrait_object("Pants_top",pants_top_list_port,"outfit")
add_portrait_object("Coat",coat_list_port,"outfit")
add_portrait_object("Coat_sleeves",coat_sleeves_port,"outfit/coat")
add_portrait_object("Facial_hair",facial_hair_list_port,"body/hair")
add_portrait_object("Nose_front",nose_list,"body")
add_portrait_object("Eyewear",eyewear_list_port,"outfit")
add_portrait_object("Hair_middle",hair_middle_list,"body/hair")
add_portrait_object("Hair_front",hair_front_list,"body/hair")
add_portrait_object("Hat",hat_list_port,"outfit")
add_portrait_object("Hat_dec",hat_dec_list_port,"outfit/hat")

const facial_hair_list_sprite = ["none","beard","moustache","big moustache","goatee","soul patch","fluffy goatee",];
const facial_hair_list_menu = ["none","beard","moustache","big moustache","goatee","soul patch","fluffy goatee","stubble",];
const hat_list_sprite = ["cowboy hat","Bowler","Top hat","sombrero","straw hat","official cap","blue bonnet","Chapeau","Skeleton mask","Goblin Mask","Chicken Mask","Earmuffs","Delicate Bow","Tropiclip","Butterfly Bow","Hunter's Cap","Trucker Hat","Sailor's Cap","Good Ol' Cap","Fedora","Cool Cap","Lucky Bow","Polka Bow","Gnome's Cap","Eye Patch","Santa Hat","Tiara","Hard Hat","Sou'wester","Daisy","Watermelon Band","Mouse Ears","Cat Ears","Cowgal Hat","Cowpoke Hat","Archer's Cap","Panda Hat","Blue Cowboy Hat","Red Cowboy Hat","Cone Hat","Living Hat","Emily's Magic Hat","Mushroom Cap","Dinosaur Hat","Totem Mask","Logo Cap","Dwarf Helm","Fashion Hat","Pumpkin Mask","Hair Bone","knight","","red kerchief","grey beanie","red beanie","black with feather","","","","","wizard","chef","pirate","","","turban","","gold mask","spinner","veil","flat black","witch",];
const hat_colour_names = ["top hat","earmuffs","flower","clip","bow","cap","backwards cap","big bow","cat ears","flat cap","wide hat","cowboy hat","hood","beanie","ribbed beanie","turban","hijab","headphones","wizard","sunhat","night cap","flower crown","bowler","fedora",];
const neckwear_list_sprite = ["none","bandana","necklace","bow-tie","tie","choker","beads",];
const neckwear_list_menu = ["none","tie","beads","choker","scarf","bowtie",];
const coat_list_sprite = ["none","short coat","cape","closed","closed low cut","closed hoodie","jacket","open hoodie","leaves","vest",];
const coat_list_menu = ["none","suit jacket","jacket","hoodie","open hoodie","leaves","chinese collar",];
const eyewear_list_sprite = ["none","glasses","square glasses","round glasses","sunglasses","eye-patch","coloured glasses",];
const eyewear_list_menu = ["none","glasses","square glasses","round glasses","sunglasses","eye-patch","coloured glasses",];
const earrings_list_sprite = ["none","drops","hoops","studs","single stud",];
const earrings_list_menu = ["none","studs","single stud","single small hoop","small hoops","punk","drops","hoops","single hoop",];
const back_list_port = [["Hat", hat_back_list_port],["Coat", coat_back_list_port] ]
const shirt_sleeve_list_port = ["button up","open shirt","tshirt","boatneck","chinese collar","turtleneck",];
const shirt_sleeves_dec_list_port = ["none",];
const overshirt_sleeve_list_port = ["v-neck","sweater","open sweater",];
const overshirt_sleeves_dec_list_port = ["none","argyle",];
const coat_sleeve_list_port = ["suit jacket","jacket","hoodie","open hoodie","chinese collar",];
const coat_sleeves_dec_list_port = ["none",];
const sleeve_list_port = [{name: "Shirt", sleeves_list: shirt_sleeve_list_port,dec_list: shirt_sleeves_dec_list_port, sharp_sleeves: []},{name: "Overshirt", sleeves_list: overshirt_sleeve_list_port,dec_list:overshirt_sleeves_dec_list_port,sharp_sleeves: []},{name: "Coat", sleeves_list: coat_sleeve_list_port,dec_list:coat_sleeves_dec_list_port,sharp_sleeves: ["suit jacket","jacket"]} ];
const coat_back_list_sprite = ["none",];
const back_list_sprite = [["Coat", coat_back_list_sprite] ];

