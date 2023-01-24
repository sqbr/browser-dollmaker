from __future__ import print_function
import sys
import math
from PIL import Image
from PIL import ImageEnhance
import glob

# python generate_images.py

body_list = ["Torso", "Head", "Lips","Complexion","Ears", "Skull", "Nose","Nose_front"]
expression_list = ["Eyes","Eyebrows", "Mouth"]
outfit_list_complex = ["Shirt","Coat","Pants_top"]
outfit_list_portOnly = []
outfit_list_spriteOnly = ["Pants","Shoes","Gloves"]
outfit_list_both = ["Neckwear","Neckwear2","Neckwear3","Eyewear","Earrings", "Hat","Wheelchair"]
outfit_list = outfit_list_both+ outfit_list_portOnly+ outfit_list_spriteOnly

no_render_list = ["Neckwear2","Neckwear3"]

skin_list = body_list + ["Eyebrows", "Mouth","Blush"]

#Only in portraits
hair_list = ["Hair_back", "Hair_front","Facial_hair"]

hair_front_list = ["None", "shaggy side","emo","princely","locs bun","long wavy","curly pixie","spiky","short side","smooth bangs","hi-top","afro","long locks","short spiky","centre part","tufts","perm","shaved","buzzcut","jodi","side braid","curly up","short","neat bob","morris","long curly","wavy bob","short back and sides","straight up","neat side"]
hair_back_list = ["None", "shaggy medium","bob","locs bob","long wavy","curly pony","curly bob","spiky","twin braids","long locks","short spiky","bun","tufts","twintails","perm","long straight","neat bob","side braid","long curly","wavy bob","twin puffs","half up","straight pony low","straight pony high","curly pony high","generic"]

torso_list = ["medium"]
head_list =["rectangular","pointed","square","medium","oval","round","jowly",]
complexion_list =["None","light wrinkles","wrinkles","mole","freckles"]
ear_list =["None","regular","pointy"]
skull_list =["regular"]
nose_list =["None","small","button", "medium", "broad","round","bulbous","pointed","hooked"]
eyebrow_list = ["None", "slightly downward","raised","flat sad","raised sad","angry","neutral","raised up","half raised","soft","slightly angry","raised soft"]
eye_expression_list_port = ["neutral","side","crescents","narrowed","happy","wide","shock","angry","angry side","sleepy","wink"]
eye_type_list_port = ["androgynous","flat","long","catty","snake"]

eye_list = []
for type in eye_type_list_port:
    for exp in eye_expression_list_port:
        eye_list.append(type+ " "+exp)

mouth_list = ["toothy smile","grin","big smile", "small laugh","wobbly smile","smile","slight smile","small smile", "flat","small frown","wobbly frown","frown","pout","dubious", "big frown", "sneer","clenched","shock","ooh",]
lip_list = ["No Shadow","Thin","Medium", "Thick","Thicker"]
no_lip_list = ["grin","clenched","shock"]

blush_list = ["None","small","big"]

#The same for sprites and portraits
facial_hair_list_port = ["None", "beard", "moustache", "big moustache", "goatee", "soul patch", "fluffy goatee", ]
facial_hair_list_sprite = facial_hair_list_port
facial_hair_list_menu = facial_hair_list_port  +["stubble"] #stubble must be at end!
stubble_list = ["None"]+ head_list

#stuff with sleeves and collars
sleeve_names_port = ["None", "zilch","round","sharp"]

def addSleeves(listname):
    output = []
    for l in listname:
        for s in sleeve_names_port:
            if l =="None" or s=="None":
                output.append("None")
            else:    
                output.append(l+" "+s)
    return output        

shirt_collar_list = ["None","button up","open shirt"]
shirt_dec_list_port = ["None","button_up_plaid","button_up_stripe","open shirt vest","v neck stripe"]
shirt_collar_dec_list_port = ["None","button_up_plaid"]
shirt_sleeves_dec_list_port = ["None","plaid","stripe","None","stripe"]
shirt_list_port = shirt_collar_list +["tshirt","boatneck","strappy","chinese collar","turtleneck","low cut","v neck","thick strappy","halterneck","bodice","bodice sleeved"]
shirt_sleeve_list_port = [x for x in shirt_list_port if not x in ["strappy","None","thick strappy","halterneck","bodice"]] #items with sleeves

overshirt_dec_list_port = ["None","argyle v-neck",]
overshirt_sleeves_dec_list_port = ["None","argyle"]
overshirt_list_port = ["None","v-neck","sweater","open sweater","suspenders","waistcoat"]
overshirt_list_sprite = ["None", "loose shirt","waistcoat","cardigan","suspenders","v-neck"]
overshirt_sleeve_list_port = [x for x in overshirt_list_port if not x in ["None","suspenders"]] #items with sleeves 

coat_sleeves_dec_list_port = ["None"]
coat_dec_back_list_port = ["None","fur coat","letterman"]
coat_back_list_port = ["None","suit jacket","jacket","hoodie","open hoodie","leaves","chinese collar","cape collar","fur coat","letterman"]
coat_back_list_sprite = ["None","cape","cape collar"]
coat_list_port = coat_back_list_port+["cape"]
coat_list_sprite = ["None","short coat","cape","closed","closed low cut","closed hoodie","jacket","open hoodie","leaves","vest","open", ]
coat_sleeve_list_port = [x for x in coat_list_port if not x in ["leaves","cape","cape collar","None"]] #items with sleeves
coat_list_menu = coat_list_port
coat_dec_list_port = ["None", "cape","fur coat","letterman"]

wheelchair_list_port = ["None"]
wheelchair_list_sprite = ["manual","hospital"]
#hats

hat_back_list_port = ["None","sunhat","wizard","night cap","broad hat","beanie","witch","helmet"]
hat_dec_list_port = ["None", "cap_joja","sunhat","night cap","broad hat","bowler","cowboy"]
hat_list_port = ["None","sunhat", "cap", "headphones", "wizard","ribbon","night cap","broad hat","beanie","bowler","flower crown","soft cap","witch","helmet","turban","cowboy", "ear muffs","headband","cat ears","bandanna","flower"]
#hat_list_sprite = ["cowboy hat", "Bowler", "Top hat", "sombrero", "straw hat", "official cap", "blue bonnet", "Chapeau", "Skeleton mask", "Goblin Mask", "Chicken Mask", "Earmuffs", "Delicate Bow", "Tropiclip", "Butterfly Bow", "Hunter's Cap", "Trucker Hat", "Sailor's Cap", "Good Ol' Cap", "Fedora", "Cool Cap", "Lucky Bow", "Polka Bow", "Gnome's Cap", "Eye Patch", "Santa Hat", "Tiara", "Hard Hat", "Sou'wester", "Daisy", "Watermelon Band", "Mouse Ears", "Cat Ears", "Cowgal Hat", "Cowpoke Hat", "Archer's Cap", "Panda Hat", "Blue Cowboy Hat", "Red Cowboy Hat", "Cone Hat", "Living Hat", "Emily's Magic Hat", "Mushroom Cap", "Dinosaur Hat", "Totem Mask", "Logo Cap", "Dwarf Helm", "Fashion Hat", "Pumpkin Mask", "Hair Bone", "knight", "","red kerchief", "grey beanie", "red beanie", "black with feather", "", "", "", "", "wizard", "chef", "pirate", "", "", "turban", "", "gold mask", "spinner", "veil", "flat black", "witch",]
hat_list_sprite = ["top hat", "earmuffs", "flower","clip","bow","cap","backwards cap", "big bow", "cat ears", "flat cap", "wide hat", "cowboy hat", "hood", "beanie", "ribbed beanie", "turban", "hijab", "headphones","wizard","sunhat","night cap","flower crown","bowler","fedora","helmet","witches hat", "ear muffs","head band","bandanna"]

hijab_list_port = ["None","hijab"]
#Different for portraits and sprites

neckwear_list_port = ["None","tie","beads","choker","scarf","bowtie","pendant","cravat","bandanna"]
neckwear_list_sprite = ["None", "bandana", "necklace", "bow-tie", "tie", "choker","beads","scarf","pendant"]
neckwear_list_menu = neckwear_list_port

eyewear_list_port = ["None", "glasses", "square glasses", "round glasses", "sunglasses", "eye-patch","coloured glasses"]
eyewear_list_sprite = eyewear_list_port
eyewear_list_menu = eyewear_list_port

earrings_list_port = ["None", "studs","single stud","single small hoop","small hoops","punk","drops","hoops","single hoop",]
earrings_list_sprite = ["drops","hoops", "studs", "single stud","single hoop"]
earrings_list_menu = earrings_list_port

pants_top_list_port = ["None","overalls"]

#Combos
back_list_port = [["Hat", hat_back_list_port],["Coat", coat_back_list_port] ]
back_list_sprite = [["Coat", coat_back_list_sprite] ]
front_list_sprite = [["Coat", coat_back_list_sprite] ]

#special
wedding_clothes_list = ["suit","dress"]

#colours
skin_regular =["#FFE7D6","#FFECD6","#FFD3A6","#FFDFA5","#F1A065","#F1B265","#DA773F","#DA874A","#B05934","#B96A2E","#853F27","#783F1A"]
skin_weird = ["#C3FFFA","#9BB681","#41AD60","#000000"]
skin_colours =skin_regular + skin_weird

outfit_yellow = ["#F8EABC","#FFE201","#FFCC98","#F7BE4F","#FF9F02"]
outfit_green = ["#73D080","#8CC54E","#56AA04","#277032","#4F8B20","#7CA838","#8C8A2D"]
outfit_blue = ["#A6E7CD", "#008186", "#477BC8","#3C92ED","#1FDBFF","#2E4D91"]
outfit_purple = ["#A46FE2","#9431C6", "#BF2C92","#D361A7","#A01B54"]
outfit_red = ["#FF8B91", "#E55773", "#F0303C","#B71B00",]
outfit_brown = ["#B24836","#8E4A17","#912D20","#820000","#630F0F"]
outfit_grey = ["#FFFFFF","#A8ADAE", "#777471","#4C4C56","#482B57","#000000"]

outfit_colours = outfit_yellow+outfit_green+outfit_blue+outfit_purple +outfit_red +outfit_brown +outfit_grey
eye_colours = ["#000000","#AEB655","#14AC34","#20514C","#29B4C4","#008891","#2E9FF7","#3D2C64","#B200F1","#F39EFF","#FE023A","#D24525","#FF8F2B","#DB8200","#8E3300","#999999","#ffffff"]
hair_weird = ["#7034ED","#B25DF6","#1B8EF6", "#53C7FB","#469951"]
hair_grey = ["#A59A9D", "#E9E9E9",]
hair_blonde = ["#FCE374", "#F0B50A",]
hair_brown = ["#641D00","#923D1F", "#8B4910", "#BB742E",]
hair_black = ["#391E47", "#48356E","#4B261E", "#5B483C","#5A5A7F", "#602372","#000000"]
hair_red = ["#FE7423","#FF5565", "#DF433C","#D16132"]

hair_colours = hair_blonde + hair_red+ hair_brown+ hair_grey+ hair_black+ hair_weird

#Object stuff


closet = [] # list of objects containing information about items of clothing etc

class ClothingItem:

    # name: string describing item type, eg "hat"
    # item_list: list of strings with names of items, eg hat_list as defined elsewhere
    # location: string describing where the image files are,
    #           eg "clothes" because hat images are stored in the folder clothes/hat

    def __init__(self,name,item_list,listname, location):
        self.name =  name
        self.item_list = item_list
        self.listname = listname
        self.location = location

def add_portrait_object(name, item_list,listname, location):
    # Add an item type to the closet
    global  closet
    closet.append(ClothingItem(name, item_list, listname, location))    

# Not automatically shown
# add_portrait_object("cheeks", cheeks_list, "cheeks_list", "face")

# #Behind eyes
# shown_start = len(closet) # where the visible items start

add_portrait_object("Wheelchair", wheelchair_list_port,"wheelchair_list_port", "outfit/wheelchair")
add_portrait_object("Hat_back", hat_back_list_port,"hat_back_list_port", "outfit/hat")
add_portrait_object("Hair_back", hair_back_list, "hair_back_list","body/hair")
add_portrait_object("Coat_back", coat_back_list_port, "coat_back_list_port","outfit/coat")
#add_portrait_object("Coat_dec_back", coat_dec_back_list_port, "coat_dec_back_list_port","outfit/coat")


add_portrait_object("Torso", torso_list, "torso_list", "body")

# In front of torso
add_portrait_object("Shirt_sleeves", sleeve_names_port,"shirt_sleeves_port", "outfit/shirt")
add_portrait_object("Shirt_sleeves_dec", addSleeves(shirt_sleeves_dec_list_port),"shirt_sleeves_dec_list_port_full", "outfit/shirt")
add_portrait_object("Shirt", shirt_list_port,"shirt_list_port", "outfit")
add_portrait_object("Shirt_dec", shirt_dec_list_port,"shirt_dec_list_port", "outfit/shirt")
add_portrait_object("Neckwear", neckwear_list_port,"neckwear_list_port", "outfit")
add_portrait_object("Overshirt_sleeves", sleeve_names_port,"overshirt_sleeves_port", "outfit/overshirt")
add_portrait_object("Overshirt_sleeves_dec", addSleeves(overshirt_sleeves_dec_list_port),"overshirt_sleeves_dec_list_port_full", "outfit/overshirt")
add_portrait_object("Overshirt", overshirt_list_port,"overshirt_list_port", "outfit")
add_portrait_object("Overshirt_dec", overshirt_dec_list_port,"overshirt_dec_list_port", "outfit/overshirt")

add_portrait_object("Shirt_collar", shirt_collar_list,"shirt_collar_list", "outfit/shirt")
add_portrait_object("Shirt_collar_dec", shirt_collar_dec_list_port,"shirt_collar_dec_list_port", "outfit/shirt")
add_portrait_object("Neckwear2", neckwear_list_port,"neckwear_list_port2", "outfit")

add_portrait_object("Pants_top", pants_top_list_port,"pants_top_list_port", "outfit")
add_portrait_object("Coat_sleeves", sleeve_names_port,"coat_sleeves_port", "outfit/coat")
add_portrait_object("Coat", coat_list_port,"coat_list_port", "outfit")
add_portrait_object("Coat_dec", coat_dec_list_port,"coat_dec_list_port", "outfit/coat")
add_portrait_object("Neckwear3", neckwear_list_port,"neckwear_list_port3", "outfit")

add_portrait_object("Ears", ear_list,"ear_list", "body")
add_portrait_object("Skull", skull_list,"skull_list", "body")
add_portrait_object("Hijab", hijab_list_port,"hijab_list_port", "outfit/hat")
add_portrait_object("Head", head_list, "head_list", "body")

add_portrait_object("Complexion", complexion_list,"complexion_list", "body")
add_portrait_object("Stubble", stubble_list, "stubble_list", "body")
add_portrait_object("Blush", blush_list,"blush_list", "expression")
add_portrait_object("Nose", nose_list,"nose_list", "body")

add_portrait_object("Eyebrows", eyebrow_list,"eyebrow_list", "expression")
add_portrait_object("Eyes", eye_list,"eye_list", "expression")
add_portrait_object("Mouth", mouth_list,"mouth_list", "expression")
add_portrait_object("Lips", mouth_list, "mouth_list", "expression")

add_portrait_object("Earrings", earrings_list_port,"earrings_list_port", "outfit")
add_portrait_object("Facial_hair", facial_hair_list_port,"facial_hair_list_port", "body/hair")
add_portrait_object("Nose_front", nose_list,"nose_list", "body")
add_portrait_object("Eyewear", eyewear_list_port,"eyewear_list_port", "outfit")
#add_portrait_object("Hair_middle", hair_middle_list,"hair_middle_list", "body/hair")

add_portrait_object("Hair_front", hair_front_list,"hair_front_list", "body/hair")
add_portrait_object("Hat", hat_list_port,"hat_list_port", "outfit")
add_portrait_object("Hat_dec", hat_dec_list_port,"hat_dec_list_port", "outfit/hat")

sprite_body_list = ["tall","short","tall_bald", "short_bald"]

# colour functions

shadow_types = ["red", "yellow","green","aqua","blue","purple"]

def hex_to_rgba(value):
    #### Return (red, green, blue, 255) for the color given as #rrggbb or #rgb.
    value = value.lstrip('#')
    lv = len(value)
    if lv ==6:
        return tuple([int(value[i:i + 2], 16) for i in range(0, 6, 2)]+ [255])
    else:    
        return tuple([(int(value[i], 16)*17) for i in range(0, 3)] + [255])

def rgb_to_hex(red, green, blue):
    # Return color as #rrggbb for the given color values.
    return '#%02x%02x%02x' % (red, green, blue)   

def luminance(p):
    return (0.299*p[0] + 0.587*p[1] + 0.114*p[2])   

def saturation(p):
    M = max(p)
    m = min(p)
    d = (M - m)/255
    L = (M + m)/510 
    if L ==0:
        return 0
    else:    
        X = 1 - abs(2*L-1)
        if X == 0:
            return 0
        return d/X     

def hue(p):
    #returns an angle between 0 and 360
    R = p[0]
    G = p[1]
    B = p[2]
    if R==G and R==B:
        return 0
    elif (R>=G) and G >=B:
        return 60*(G-B)/float(R-B)
    elif G>R and R>= B:
        return 60*(2-(R-B)/float(G-B))
    elif G>=B and B> R:
        return 60*(2+(B-R)/float(G-R))
    elif B>G and G> R:
        return 60*(4-(G-R)/float(B-R))   
    elif B>R and R>= G:
        return 60*(4+(R-G)/float(B-G))   
    else:
        return 60*(6-(B-G)/float(R-G))  
    

def shading(colour, shadow, r ):
    return (1-r)*colour + r*colour*shadow/255

def HSL_to_RGB(h,s,l):

    C = (255-abs(2*l-255)*s)
    m = l-0.5*C
    if h <60:
        X = C*h/60.0
        R = C
        G = X
        B = 0
    elif h<120:
        X = C*(120-h)/60.0
        R = X
        G = C
        B = 0
    elif h<180:
        X = C*(h-120)/60.0
        R = 0
        G = C
        B = X
    elif h<240:
        X = C*(240-h)/60.0
        R = 0
        G = X
        B = C  
    elif h<300:
        X = C*(h-240)/60.0
        R = X
        G = 0
        B = C
    else:
        X = C*(360-h)/60.0
        R = C
        G = 0
        B = X
    return [int(R+m), int(G+m), int(B+m)]

def hair_highlight(pixel, highlight):
    p = [pixel[0],pixel[1],pixel[2]]
    l = luminance(p)/255
    if l <0.7:
        r=0
    else:
        r = l-0.7 
        
    return (highlight[0],highlight[1],highlight[2], int(pixel[3]*r))

def hair_shadow(pixel,shadow1,edge):
    p = [pixel[0],pixel[1],pixel[2]]
    l = luminance(p)/255
    if l >0.7:
        return (0,0,0,0)
    elif l>0.6:
        r=1
    elif l>0.2:
        r = 2.5*l -0.5 #creates smooth transition between darker edge and lighter shadow1
    elif l>0.1:
        r=0
    else: #pure black
        return (0,0,0,pixel[3])

    for i in range(3):
        p[i] = int(r*shadow1[i] + (1-r)*edge[i] )
        
    return (p[0],p[1],p[2], int(pixel[3]*(1-l/0.7)))

def red_shadow(pixel,shadow1,edge):
    p = [pixel[0],pixel[1],pixel[2]]
    l = luminance(p)/255
    if l >0.9:
        return (0,0,0,0)
    elif l>0.7:
        r=1
    elif l>0.2:
        r = 2*l -0.4 #creates smooth transition between darker edge and lighter shadow1
    elif l>0.1:
        r=0
    else: #pure black
        return (0,0,0,pixel[3])

    for i in range(3):
        p[i] = int(r*shadow1[i] + (1-r)*edge[i] )
        
    return (p[0],p[1],p[2], int(pixel[3]*(1-l)))

def shadow_colours(colour_name):
    if colour_name=="red": 
        return [hex_to_rgba("#830016"),hex_to_rgba("#560055")]
    elif colour_name=="yellow": #yellow
        return [hex_to_rgba("#008100"),hex_to_rgba("#00561F")]
    elif colour_name=="green": #yellow-green
        return [hex_to_rgba("#024B64"),hex_to_rgba("#0C2C7E")]
    elif colour_name=="aqua": #aqua
        return [hex_to_rgba("#024B64"),hex_to_rgba("#0C2C7E")]
    elif colour_name=="blue": #blue
        return [hex_to_rgba("#270096"),hex_to_rgba("#270096")]
    else: #purple
        return [hex_to_rgba("#1B0C7E"),hex_to_rgba("#1B0C7E")]


def process_image(name, location,type):
    image_string = "../images/bases/"+location+"/"+name+"_base.png"
    if type == "noshadow":
        save_string = "../images/"+location+"/"+name+"_noshadow"
    else:    
        save_string = "../images/"+location+"/"+name

    img_original = Image.open(image_string) 
    original_data = img_original.load() 
    
    save_string_base = save_string +"_base.png"
    img_base = Image.new("RGBA", (img_original.size[0], img_original.size[1]))
    base_data = img_base.load() 

    save_string_overlay = save_string+"_overlay.png"
    img_overlay = Image.new("RGBA", (img_original.size[0], img_original.size[1]))
    overlay_data = img_overlay.load()

    save_string_highlight = save_string+"_highlight.png"
    img_highlight = Image.new("RGBA", (img_original.size[0], img_original.size[1]))
    highlight_data = img_highlight.load() 

    port_highlight = hex_to_rgba("#FFF7CA")

    black_luminance = 13 #luminance level that's treated as black

    for colour in shadow_types:
        save_string_multiply = save_string+"_multiply_"+colour+".png"
        img_multiply = Image.new("RGBA", (img_original.size[0], img_original.size[1]))
        multiply_data = img_multiply.load()  

        for y in range(img_base.size[1]):
            for x in range(img_base.size[0]):
                if original_data[x, y][3] !=0:
                    pixel = original_data[x, y]
                    p = [pixel[0],pixel[1],pixel[2]]
                    [shadow1,edge] = shadow_colours(colour)
                    if luminance(p) < black_luminance: # black
                        multiply_data[x, y] = (0,0,0,pixel[3])
                    else:     
                        if type in ["portrait","noshadow"]:
                            if p == [0,0,255] and type!="noshadow":  #shadow
                                multiply_data[x, y] = (shadow1[0],shadow1[1],shadow1[2],int(pixel[3]*0.36))   
                        else:
                            if hue(p)==0:
                                if (type =="hair"):  
                                    multiply_data[x, y] = hair_shadow(pixel,shadow1,edge) 
                                else:    
                                    multiply_data[x, y] = red_shadow(pixel,shadow1,edge) 

        img_multiply.save(save_string_multiply) 

    for y in range(img_base.size[1]):
        for x in range(img_base.size[0]):
            if original_data[x, y][3] !=0:
                pixel = original_data[x, y]
                p = [pixel[0],pixel[1],pixel[2]]
                lum = luminance(p)

                if type in ["portrait","noshadow"]:
                    if p == [0,0,255]:
                        if type!="noshadow":  #shadow
                            base_data[x, y] = (100,100,100,pixel[3])           
                    elif p == [0,255,0]:  #highlight
                        base_data[x, y] = (100,100,100,pixel[3])       
                        highlight_data[x, y] = (port_highlight[0],port_highlight[1],port_highlight[2],int(pixel[3]*0.5))     
                    elif p == [255, 0, 0]: #just base colour
                        base_data[x, y] = (100,100,100,pixel[3])    
                    elif lum>black_luminance:
                        overlay_data[x, y] = pixel    

                else:
                    if hue(p)==0:
                        if (type =="hair"):  
                            base_data[x, y] = (100,100,100,pixel[3])  
                            highlight_data[x, y] = hair_highlight(pixel,port_highlight) 
                        elif p ==[255,255,255]: #white
                            overlay_data[x, y] = pixel   
                        else:
                            base_data[x, y] = (100,100,100,pixel[3])            
                    else:
                        overlay_data[x, y] = pixel  
                        

    img_base.save(save_string_base) 
    img_overlay.save(save_string_overlay)   
    img_highlight.save(save_string_highlight)
                         

def flipImage():
    image_string = "../images/bases/sprites/outfit/pants/pants_base.png"
    save_string = "../images/bases/sprites/temp.png"
    original_meta_row_height = 688
    original_meta_col_width = 192
    new_meta_col_width = 64
    num_meta_rows = 2
    num_meta_cols = 10
    num_cols_inside =4 #four for walk sprites, 1 otherwise
    new_col_width = 16

    im_old = Image.open(image_string) 
    im_new = Image.new("RGBA", (num_meta_cols*new_meta_col_width, num_meta_rows*128))
    for meta_row in range(num_meta_rows):
        for meta_column in range(num_meta_cols):
            #rows 1 and 2
            region = im_old.crop((original_meta_col_width*meta_column, meta_row*original_meta_row_height,new_meta_col_width+original_meta_col_width*meta_column,meta_row*original_meta_row_height+64))
            im_new.paste(region,(new_meta_col_width*meta_column, meta_row*128,new_meta_col_width*meta_column+new_meta_col_width,meta_row*128+64))

            #row 3
            for column in range(num_cols_inside):
                for x in range(new_col_width):
                    region = im_old.crop((original_meta_col_width*meta_column+column*new_col_width+x, meta_row*original_meta_row_height+32,original_meta_col_width*meta_column+column*new_col_width+x+1,meta_row*original_meta_row_height+64))
                    im_new.paste(region,(new_meta_col_width*meta_column+new_col_width+column*new_col_width-x, meta_row*128+64, new_meta_col_width*meta_column+new_col_width+column*new_col_width-x+1,meta_row*128+96))

            # #row 4
            region = im_old.crop((original_meta_col_width*meta_column, meta_row*original_meta_row_height+64,new_meta_col_width+original_meta_col_width*meta_column,meta_row*original_meta_row_height+96))
            im_new.paste(region,(new_meta_col_width*meta_column, meta_row*128+96,new_meta_col_width*meta_column+new_meta_col_width,meta_row*128+128))
                
    im_new.save(save_string)            

def list_string(listname, list):
    # Creates a string to define a list for generated.js
    s = "const "+listname + " = ["
    for l in list:
        s+="\""+l+"\","
    s+="];\n"
    return s

def name_string(obj):
    s = "const "+obj.listname + " = ["
    for l in obj.item_list:
        s+="\""+l+"\","
    s+="];\n"
    return s    

colourlist_list_string = "const colourlist_list = ["

def colour_list_add(list_name, sublists):
    global colourlist_list_string
    sublist_names = sublists.split("+")
    for l in sublist_names:
        colourlist_list_string+="[\""+l.split("_")[1]+"\","+l+"],"
    s = "const "+list_name+" = " + sublist_names[0]+".concat("
    for l in sublist_names[1:]:
        s+=l+","
    return s+ ");\n"  

def write_temp():
    content = open("temp.js","w")
    for i in range(len(hat_list_sprite)):
        content.write("[\""+hat_list_sprite[i]+"\",["+str(i+1)+"],["+str(i+73)+"]], \n")    
    content.close()


def write_variables():
    # Write all the shared variables into generated.js

    content = open("portraits.js","w")
    content.write("//generated by generate_images.py\n\n")
    content.write(list_string("outfit_list_both", outfit_list_both))
    content.write(list_string("outfit_list_complex", outfit_list_complex))
    content.write(list_string("outfit_list_portOnly", outfit_list_portOnly))
    content.write(list_string("outfit_list_spriteOnly", outfit_list_spriteOnly))
    content.write("const outfit_list = outfit_list_both.concat(outfit_list_spriteOnly).concat(outfit_list_portOnly);\n")
    content.write(list_string("body_list", body_list))
    content.write(list_string("skin_list", skin_list))
    content.write(list_string("hair_list", hair_list))
    content.write(list_string("expression_list", expression_list))
    content.write(list_string("eye_expression_list_port", eye_expression_list_port))
    content.write(list_string("eye_type_list_port", eye_type_list_port))
    content.write("\n")
    content.write(list_string("eye_colours", eye_colours))
    content.write(list_string("outfit_colours", outfit_colours))
    content.write(list_string("skin_colours", skin_colours))
    content.write(list_string("hair_colours",hair_colours))
    content.write("\n")
    content.write(colourlist_list_string+"];\n")
    content.write("\n")
    content.write("const skinNum = "+str(len(skin_colours))+"; //how many skin colours there are\n")
    content.write("const eyeNum = "+str(len(eye_colours))+"; //how many eye colours there are\n")
    content.write("const hairNum = "+str(len(hair_colours))+"; //how many hair colours there are\n")
    content.write("const outfitNum = "+str(len(outfit_colours))+"; //how many clothing colours there are\n")
    content.write("const full_body_list = body_list+hair_list;\n")
    content.write("\n")
    for c in closet:
        if not (c.name in ["Nose_front","Lips"]):
            content.write(name_string(c))
    content.write("\n")
    for c in closet:
        content.write("add_portrait_object(\""+c.name+"\","+ c.listname+",\""+c.location+"\")\n")
    content.write("\n")    
    content.write(list_string("lip_list", lip_list))
    content.write(list_string("no_lip_list", no_lip_list))
    content.write(list_string("facial_hair_list_sprite", facial_hair_list_sprite))
    content.write(list_string("facial_hair_list_menu", facial_hair_list_menu))
    content.write(list_string("wheelchair_list_sprite", wheelchair_list_sprite))
    content.write(list_string("hat_list_sprite", hat_list_sprite))
    content.write(list_string("neckwear_list_sprite", neckwear_list_sprite))
    content.write(list_string("neckwear_list_menu", neckwear_list_menu))
    content.write(list_string("coat_list_sprite", coat_list_sprite))
    content.write(list_string("overshirt_list_sprite", coat_list_sprite))
    content.write(list_string("coat_list_menu", coat_list_menu))
    content.write(list_string("coat_dec_back_list_port", coat_dec_back_list_port))
    content.write(list_string("eyewear_list_sprite", eyewear_list_sprite))
    content.write(list_string("eyewear_list_menu", eyewear_list_menu))
    content.write(list_string("earrings_list_sprite", earrings_list_sprite))
    content.write(list_string("earrings_list_menu", earrings_list_menu))
    content.write("const back_list_port = [[\"Hat\", hat_back_list_port],[\"Coat\", coat_back_list_port] ]\n")
    content.write(list_string("shirt_sleeve_list_port", shirt_sleeve_list_port))
    content.write(list_string("shirt_sleeves_dec_list_port", shirt_sleeves_dec_list_port))
    content.write(list_string("overshirt_sleeve_list_port", overshirt_sleeve_list_port))
    content.write(list_string("overshirt_sleeves_dec_list_port", overshirt_sleeves_dec_list_port))
    content.write(list_string("coat_sleeve_list_port", coat_sleeve_list_port))
    content.write(list_string("coat_sleeves_dec_list_port", coat_sleeves_dec_list_port))
    content.write("const sleeve_list_port = [{name: \"Shirt\", sleeves_list: shirt_sleeve_list_port,dec_list: shirt_sleeves_dec_list_port, sharp_sleeves: [\"button up\",\"open shirt\"]},{name: \"Overshirt\", sleeves_list: overshirt_sleeve_list_port,dec_list:overshirt_sleeves_dec_list_port,sharp_sleeves: []},{name: \"Coat\", sleeves_list: coat_sleeve_list_port,dec_list:coat_sleeves_dec_list_port,sharp_sleeves: [\"suit jacket\",\"jacket\"]} ];\n")
    content.write(list_string("coat_back_list_sprite", coat_back_list_sprite))
    content.write("const back_list_sprite = [[\"Coat\", coat_back_list_sprite]];\n")
    content.write("const front_list_sprite = [[\"Coat\", coat_back_list_sprite] ];\n")
    content.write("\n")
    
    content.close()

def process_portrait_part(obj):
    if obj.name == "Nose_front":
        loc = "portraits/"+obj.location + "/nose"    
    else:       
        loc = "portraits/"+obj.location + "/"+(obj.name).lower()   
    for item in obj.item_list:
        if not ((obj.name == "Eyes" and item.find("wink")>0)):     
            if item!="None":
                print(obj.name+" "+item)
                if obj.name == "Nose_front":
                    process_image(item, loc,"noshadow")
                else:    
                    process_image(item, loc,"portrait")

def makeWinks():
    layer_list = ["base","highlight","overlay"]
    for colour in shadow_types:
        layer_list.append("multiply_"+colour)
    for eye_type in eye_type_list_port:
        for layer in layer_list:
            loc = "../images/portraits/expression/eyes/"+eye_type+" "
            save_string = loc+"wink_"+layer+".png"
            im_happy = Image.open(loc+"happy_"+layer+".png") 
            im_wink = Image.new("RGBA", (256, 268))
            region = im_happy.crop((0,0,125,268))
            im_wink.paste(region,(0,0,125,268))
            im_happy = Image.open(loc+"crescents_"+layer+".png") 
            region = im_happy.crop((126,0,256,268))
            im_wink.paste(region,(126,0,256,268))
            im_wink.save(save_string)

def makeStubble():
    loc = "../images/bases/portraits/body/"
    for head in head_list:
        save_string = loc+"stubble/"+head+"_base.png"
        img_mask = Image.open(loc+"head/"+head+"_base.png")
        img_stubble = Image.open(loc+"hair/facial_hair/stubble_base.png")
        img_stubble =Image.composite(img_stubble, img_mask, img_mask) 
        img_stubble.save(save_string)

def process_all_portraits():
    for c in closet:
        if not (c.name in no_render_list):
            process_portrait_part(c)
    makeWinks() 
    makeStubble()    

def process_body_sprites():
    process_image("head", "sprites/body/","skin")
    for h in ["short","tall"]: 
        process_image(h, "sprites/body","skin")   
        process_image("arms_"+h, "sprites/body","skin")
        for w in wedding_clothes_list:
            process_image(w+"_"+h, "sprites/wedding","skin") 
            for g in ["female","male"]:
                process_image(g+"_"+w+"_"+h, "sprites/flower dance","skin") 
 
    process_image("hairstyles", "sprites/hair","hair")
    process_image("hairstyles2", "sprites/hair","hair")
    process_image("facialhair", "sprites/hair/facialhair","red")
    process_image("eyes", "sprites/body","red") 
        

def process_outfit_sprites():
    process_image("arms", "sprites/outfit/wheelchair","red") 
    process_image("sleeves_long", "sprites/outfit/wheelchair","red") 
    process_image("sleeves_short", "sprites/outfit/wheelchair","red") 
    process_image("gloves", "sprites/outfit/wheelchair","red") 
    process_image("feet", "sprites/outfit/wheelchair","red") 
    process_image("flipflops", "sprites/outfit/wheelchair","red") 
    for type in wheelchair_list_sprite:
        process_image(type+"_back", "sprites/outfit/wheelchair","red") 
        process_image(type, "sprites/outfit/wheelchair","red") 
    process_image("eyewear", "sprites/accessories/eyewear","red") 
    process_image("hats", "sprites/outfit/hats","red")
    process_image("hats_dec", "sprites/outfit/hats","red")
    process_image("pants", "sprites/outfit/pants", "red")
    process_image("pants_top", "sprites/outfit/pants_top","red")
    process_image("briefs", "sprites/outfit/pants","red")
    process_image("shirts", "sprites/outfit/shirts","red")
    process_image("shirt decs", "sprites/outfit/shirts/decorations","red")
    process_image("overshirt", "sprites/outfit/overshirt","red")
    process_image("coat", "sprites/outfit/coat","red")
    process_image("coat_dec", "sprites/outfit/coat", "red")
    process_image("coat_back", "sprites/outfit/coat", "red")
    process_image("neckwear", "sprites/accessories/neckwear","red")
    process_image("earrings", "sprites/accessories/earrings","red")
    for height in ["short","tall"]:
            process_image("longpants_"+height, "sprites/outfit/pants","red")
            for shoetype in ["boots","flats","flipflops"]:
                process_image(height+"_"+shoetype, "sprites/outfit/shoes","red") 
            process_image(height, "sprites/outfit/gloves","red")
            for sleevetype in ["short","long"]:
                process_image(height+"_"+sleevetype, "sprites/outfit/sleeves","red") 

write_temp()
write_variables()

#process_body_sprites()
process_outfit_sprites()

#flipImage()

#["Hair_front","Hair_back"]:
# []:
#["Hat","Hat_back","Hat_dec"]:
# ["Shirt_collar", "Shirt" ,"Shirt_dec","Shirt_collar_dec","Shirt_sleeves","Shirt_sleeves_dec"]:
#["Coat","Coat_back","Coat_dec","Coat_dec_back","Coat_sleeves"]:
#["Overshirt","Overshirt_dec","Overshirt_sleeves","Overshirt_sleeves_dec"]:
#["Eyes","Mouth","Eyebrows"]:
# "Neckwear"


for c in closet:
    if c.name in []:
        process_portrait_part(c)
#makeWinks()
#makeStubble() 
       
#process_all_portraits()
#make_coat()