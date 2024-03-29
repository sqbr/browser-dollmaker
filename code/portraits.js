//generated by generate_images.py

const outfit_list_both = ["Neckwear","Neckwear2","Neckwear3","Eyewear","Earrings","Hat","Wheelchair",];
const outfit_list_complex = ["Shirt","Coat","Pants_top",];
const outfit_list_portOnly = [];
const outfit_list_spriteOnly = ["Pants","Shoes","Gloves",];
const outfit_list = outfit_list_both.concat(outfit_list_spriteOnly).concat(outfit_list_portOnly);
const body_list = ["Torso","Head","Lips","Complexion","Ears","Skull","Nose","Nose_front",];
const skin_list = ["Torso","Head","Lips","Complexion","Ears","Skull","Nose","Nose_front","Eyebrows","Mouth","Blush",];
const hair_list = ["Hair_back","Hair_front","Facial_hair",];
const expression_list = ["Eyes","Eyebrows","Mouth",];
const eye_expression_list_port = ["neutral","side","crescents","narrowed","happy","wide","shock","angry","angry side","sleepy","wink",];
const eye_type_list_port = ["androgynous","flat","long","catty","snake",];

const eye_colours = ["#000000","#AEB655","#14AC34","#20514C","#29B4C4","#008891","#2E9FF7","#3D2C64","#B200F1","#F39EFF","#FE023A","#D24525","#FF8F2B","#DB8200","#8E3300","#999999","#ffffff",];
const outfit_colours = ["#F8EABC","#FFE201","#FFCC98","#F7BE4F","#FF9F02","#73D080","#8CC54E","#56AA04","#277032","#4F8B20","#7CA838","#8C8A2D","#A6E7CD","#008186","#477BC8","#3C92ED","#1FDBFF","#2E4D91","#A46FE2","#9431C6","#BF2C92","#D361A7","#A01B54","#FF8B91","#E55773","#F0303C","#B71B00","#B24836","#8E4A17","#912D20","#820000","#630F0F","#FFFFFF","#A8ADAE","#777471","#4C4C56","#482B57","#000000",];
const skin_colours = ["#FFE7D6","#FFECD6","#FFD3A6","#FFDFA5","#F1A065","#F1B265","#DA773F","#DA874A","#B05934","#B96A2E","#853F27","#783F1A",];
const hair_colours = ["#FCE374","#F0B50A","#FE7423","#FF5565","#DF433C","#D16132","#641D00","#923D1F","#8B4910","#BB742E","#A59A9D","#E9E9E9","#391E47","#48356E","#4B261E","#5B483C","#5A5A7F","#602372","#000000",];

const colourlist_list = [];

const skinNum = 12; //how many skin colours there are
const eyeNum = 17; //how many eye colours there are
const hairNum = 19; //how many hair colours there are
const outfitNum = 38; //how many clothing colours there are
const full_body_list = body_list+hair_list;

const wheelchair_list_port = ["None",];
const hat_back_list_port = ["None","sunhat","wizard","night cap","broad hat","beanie","witch","helmet",];
const hair_back_list = ["None","shaggy medium","bob","locs bob","long wavy","curly pony","curly bob","spiky","twin braids","long locks","short spiky","bun","tufts","twintails","perm","long straight","neat bob","side braid","long curly","wavy bob","twin puffs","half up","straight pony low","straight pony high","curly pony high","generic",];
const coat_back_list_port = ["None","suit jacket","jacket","hoodie","open hoodie","leaves","chinese collar","cape collar","fur coat","letterman",];
const torso_list = ["medium",];
const shirt_sleeves_port = ["None","zilch","round","sharp",];
const shirt_sleeves_dec_list_port_full = ["None","None","None","None","None","plaid zilch","plaid round","plaid sharp","None","stripe zilch","stripe round","stripe sharp","None","None","None","None","None","stripe zilch","stripe round","stripe sharp",];
const shirt_list_port = ["None","button up","open shirt","tshirt","boatneck","strappy","chinese collar","turtleneck","low cut","v neck","thick strappy","halterneck","bodice","bodice sleeved",];
const shirt_dec_list_port = ["None","button_up_plaid","button_up_stripe","open shirt vest","v neck stripe",];
const neckwear_list_port = ["None","tie","beads","choker","scarf","bowtie","pendant","cravat","bandanna",];
const overshirt_sleeves_port = ["None","zilch","round","sharp",];
const overshirt_sleeves_dec_list_port_full = ["None","None","None","None","None","argyle zilch","argyle round","argyle sharp",];
const overshirt_list_port = ["None","v-neck","sweater","open sweater","suspenders","waistcoat",];
const overshirt_dec_list_port = ["None","argyle v-neck",];
const shirt_collar_list = ["None","button up","open shirt",];
const shirt_collar_dec_list_port = ["None","button_up_plaid",];
const neckwear_list_port2 = ["None","tie","beads","choker","scarf","bowtie","pendant","cravat","bandanna",];
const pants_top_list_port = ["None","overalls",];
const coat_sleeves_port = ["None","zilch","round","sharp",];
const coat_list_port = ["None","suit jacket","jacket","hoodie","open hoodie","leaves","chinese collar","cape collar","fur coat","letterman","cape",];
const coat_dec_list_port = ["None","cape","fur coat","letterman",];
const neckwear_list_port3 = ["None","tie","beads","choker","scarf","bowtie","pendant","cravat","bandanna",];
const ear_list = ["None","regular","pointy",];
const skull_list = ["regular",];
const hijab_list_port = ["None","hijab",];
const head_list = ["rectangular","pointed","square","medium","oval","round","jowly",];
const complexion_list = ["None","light wrinkles","wrinkles","mole","freckles",];
const stubble_list = ["None","rectangular","pointed","square","medium","oval","round","jowly",];
const blush_list = ["None","small","big",];
const nose_list = ["None","small","button","medium","broad","round","bulbous","pointed","hooked",];
const eyebrow_list = ["None","slightly downward","raised","flat sad","raised sad","angry","neutral","raised up","half raised","soft","slightly angry","raised soft",];
const eye_list = ["androgynous neutral","androgynous side","androgynous crescents","androgynous narrowed","androgynous happy","androgynous wide","androgynous shock","androgynous angry","androgynous angry side","androgynous sleepy","androgynous wink","flat neutral","flat side","flat crescents","flat narrowed","flat happy","flat wide","flat shock","flat angry","flat angry side","flat sleepy","flat wink","long neutral","long side","long crescents","long narrowed","long happy","long wide","long shock","long angry","long angry side","long sleepy","long wink","catty neutral","catty side","catty crescents","catty narrowed","catty happy","catty wide","catty shock","catty angry","catty angry side","catty sleepy","catty wink","snake neutral","snake side","snake crescents","snake narrowed","snake happy","snake wide","snake shock","snake angry","snake angry side","snake sleepy","snake wink",];
const mouth_list = ["toothy smile","grin","big smile","small laugh","wobbly smile","smile","slight smile","small smile","flat","small frown","wobbly frown","frown","pout","dubious","big frown","sneer","clenched","shock","ooh",];
const earrings_list_port = ["None","studs","single stud","single small hoop","small hoops","punk","drops","hoops","single hoop",];
const facial_hair_list_port = ["None","beard","moustache","big moustache","goatee","soul patch","fluffy goatee",];
const eyewear_list_port = ["None","glasses","square glasses","round glasses","sunglasses","eye-patch","coloured glasses",];
const hair_front_list = ["None","shaggy side","emo","princely","locs bun","long wavy","curly pixie","spiky","short side","smooth bangs","hi-top","afro","long locks","short spiky","centre part","tufts","perm","shaved","buzzcut","jodi","side braid","curly up","short","neat bob","morris","long curly","wavy bob","short back and sides","straight up","neat side",];
const hat_list_port = ["None","sunhat","cap","headphones","wizard","ribbon","night cap","broad hat","beanie","bowler","flower crown","soft cap","witch","helmet","turban","cowboy","ear muffs","headband","cat ears","bandanna","flower",];
const hat_dec_list_port = ["None","cap_joja","sunhat","night cap","broad hat","bowler","cowboy",];

add_portrait_object("Wheelchair",wheelchair_list_port,"outfit/wheelchair")
add_portrait_object("Hat_back",hat_back_list_port,"outfit/hat")
add_portrait_object("Hair_back",hair_back_list,"body/hair")
add_portrait_object("Coat_back",coat_back_list_port,"outfit/coat")
add_portrait_object("Torso",torso_list,"body")
add_portrait_object("Shirt_sleeves",shirt_sleeves_port,"outfit/shirt")
add_portrait_object("Shirt_sleeves_dec",shirt_sleeves_dec_list_port_full,"outfit/shirt")
add_portrait_object("Shirt",shirt_list_port,"outfit")
add_portrait_object("Shirt_dec",shirt_dec_list_port,"outfit/shirt")
add_portrait_object("Neckwear",neckwear_list_port,"outfit")
add_portrait_object("Overshirt_sleeves",overshirt_sleeves_port,"outfit/overshirt")
add_portrait_object("Overshirt_sleeves_dec",overshirt_sleeves_dec_list_port_full,"outfit/overshirt")
add_portrait_object("Overshirt",overshirt_list_port,"outfit")
add_portrait_object("Overshirt_dec",overshirt_dec_list_port,"outfit/overshirt")
add_portrait_object("Shirt_collar",shirt_collar_list,"outfit/shirt")
add_portrait_object("Shirt_collar_dec",shirt_collar_dec_list_port,"outfit/shirt")
add_portrait_object("Neckwear2",neckwear_list_port2,"outfit")
add_portrait_object("Pants_top",pants_top_list_port,"outfit")
add_portrait_object("Coat_sleeves",coat_sleeves_port,"outfit/coat")
add_portrait_object("Coat",coat_list_port,"outfit")
add_portrait_object("Coat_dec",coat_dec_list_port,"outfit/coat")
add_portrait_object("Neckwear3",neckwear_list_port3,"outfit")
add_portrait_object("Ears",ear_list,"body")
add_portrait_object("Skull",skull_list,"body")
add_portrait_object("Hijab",hijab_list_port,"outfit/hat")
add_portrait_object("Head",head_list,"body")
add_portrait_object("Complexion",complexion_list,"body")
add_portrait_object("Stubble",stubble_list,"body")
add_portrait_object("Blush",blush_list,"expression")
add_portrait_object("Nose",nose_list,"body")
add_portrait_object("Eyebrows",eyebrow_list,"expression")
add_portrait_object("Eyes",eye_list,"expression")
add_portrait_object("Mouth",mouth_list,"expression")
add_portrait_object("Lips",mouth_list,"expression")
add_portrait_object("Earrings",earrings_list_port,"outfit")
add_portrait_object("Facial_hair",facial_hair_list_port,"body/hair")
add_portrait_object("Nose_front",nose_list,"body")
add_portrait_object("Eyewear",eyewear_list_port,"outfit")
add_portrait_object("Hair_front",hair_front_list,"body/hair")
add_portrait_object("Hat",hat_list_port,"outfit")
add_portrait_object("Hat_dec",hat_dec_list_port,"outfit/hat")

const lip_list = ["No Shadow","Thin","Medium","Thick","Thicker",];
const no_lip_list = ["grin","clenched","shock",];
const facial_hair_list_sprite = ["None","beard","moustache","big moustache","goatee","soul patch","fluffy goatee",];
const facial_hair_list_menu = ["None","beard","moustache","big moustache","goatee","soul patch","fluffy goatee","stubble",];
const wheelchair_list_sprite = ["manual","hospital",];
const hat_list_sprite = ["top hat","earmuffs","flower","clip","bow","cap","backwards cap","big bow","cat ears","flat cap","wide hat","cowboy hat","hood","beanie","ribbed beanie","turban","hijab","headphones","wizard","sunhat","night cap","flower crown","bowler","fedora","helmet","witches hat","ear muffs","head band","bandanna",];
const neckwear_list_sprite = ["None","bandana","necklace","bow-tie","tie","choker","beads","scarf","pendant",];
const neckwear_list_menu = ["None","tie","beads","choker","scarf","bowtie","pendant","cravat","bandanna",];
const coat_list_sprite = ["None","short coat","cape","closed","closed low cut","closed hoodie","jacket","open hoodie","leaves","vest","open",];
const overshirt_list_sprite = ["None","short coat","cape","closed","closed low cut","closed hoodie","jacket","open hoodie","leaves","vest","open",];
const coat_list_menu = ["None","suit jacket","jacket","hoodie","open hoodie","leaves","chinese collar","cape collar","fur coat","letterman","cape",];
const coat_dec_back_list_port = ["None","fur coat","letterman",];
const eyewear_list_sprite = ["None","glasses","square glasses","round glasses","sunglasses","eye-patch","coloured glasses",];
const eyewear_list_menu = ["None","glasses","square glasses","round glasses","sunglasses","eye-patch","coloured glasses",];
const earrings_list_sprite = ["drops","hoops","studs","single stud","single hoop",];
const earrings_list_menu = ["None","studs","single stud","single small hoop","small hoops","punk","drops","hoops","single hoop",];
const back_list_port = [["Hat", hat_back_list_port],["Coat", coat_back_list_port] ]
const shirt_sleeve_list_port = ["button up","open shirt","tshirt","boatneck","chinese collar","turtleneck","low cut","v neck","bodice sleeved",];
const shirt_sleeves_dec_list_port = ["None","plaid","stripe","None","stripe",];
const overshirt_sleeve_list_port = ["v-neck","sweater","open sweater","waistcoat",];
const overshirt_sleeves_dec_list_port = ["None","argyle",];
const coat_sleeve_list_port = ["suit jacket","jacket","hoodie","open hoodie","chinese collar","fur coat","letterman",];
const coat_sleeves_dec_list_port = ["None",];
const sleeve_list_port = [{name: "Shirt", sleeves_list: shirt_sleeve_list_port,dec_list: shirt_sleeves_dec_list_port, sharp_sleeves: ["button up","open shirt"]},{name: "Overshirt", sleeves_list: overshirt_sleeve_list_port,dec_list:overshirt_sleeves_dec_list_port,sharp_sleeves: []},{name: "Coat", sleeves_list: coat_sleeve_list_port,dec_list:coat_sleeves_dec_list_port,sharp_sleeves: ["suit jacket","jacket"]} ];
const coat_back_list_sprite = ["None","cape","cape collar",];
const back_list_sprite = [["Coat", coat_back_list_sprite]];
const front_list_sprite = [["Coat", coat_back_list_sprite] ];

