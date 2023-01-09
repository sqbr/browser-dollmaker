from __future__ import print_function
import sys
import math
from PIL import Image
from PIL import ImageEnhance
import glob

# python generate_images.py

body_list = ["Torso", "Head", "Complexion","Ears", "Nose","Nose_front"]
expression_list = ["Eyes","Eyebrows", "Mouth"]
outfit_list_complex = ["Shirt","Coat","Pants_top"]
outfit_list_portOnly = []
outfit_list_spriteOnly = ["Pants","Shoes","Gloves"]
outfit_list_both = ["Neckwear","Neckwear2","Neckwear3","Eyewear","Earrings", "Hat"]
outfit_list = outfit_list_both+ outfit_list_portOnly+ outfit_list_spriteOnly

skin_list = body_list + ["Eyebrows", "Mouth","Blush"]

#Only in portraits
hair_list = ["Hair_back", "Hair_front","Facial_hair"]

hair_front_list = ["None", "shaggy side","emo","princely","locs bun","long wavy","curly pixie","spiky","short side","smooth bangs","hi-top","afro","long locks","short spiky","centre part","tufts","perm","shaved","buzzcut","jodi","side braid","curly up","short","neat bob","morris","long curly","wavy bob","short back and sides","straight up","neat side"]
hair_back_list = ["None", "shaggy medium","bob","locs bob","long wavy","curly pony","curly bob","spiky","twin braids","long locks","short spiky","bun","tufts","twintails","perm","updo","long straight","neat bob","side braid","long curly","wavy bob","twin puffs","half up","straight pony low","straight pony high","curly pony high"]

torso_list = ["medium"]
head_list =["rectangular","pointed","square","medium","oval","round","jowly",]
complexion_list =["None","light wrinkles","wrinkles"]
ears_list =["regular"]
nose_list =["None","small","button", "medium", "broad","round","bulbous","pointed","hooked"]
eyebrow_list = ["None", "slightly downward","raised","flat sad","raised sad","angry","neutral","raised up","half raised","soft","slightly angry","raised soft"]
eye_expression_list_port = ["neutral","side","crescents","narrowed","happy","wide","shock","angry","angry side","sleepy",]
eye_type_list_port = ["androgynous","flat","long"]

eye_list = []
for type in eye_type_list_port:
    for exp in eye_expression_list_port:
        eye_list.append(type+ " "+exp)

mouth_list = ["toothy smile","grin","small laugh","wobbly smile","smile","slight smile","small smile", "flat","small frown","wobbly frown","frown","pout","sneer","clenched","shock","ooh",]

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
shirt_list_port = shirt_collar_list +["tshirt","boatneck","strappy","chinese collar","turtleneck","low cut","v neck"]
shirt_sleeve_list_port = [x for x in shirt_list_port if not x in ["strappy","None"]] #items with sleeves

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

#hats

hat_back_list_port = ["None","sunhat","wizard","night cap","broad hat","beanie","witch","helmet"]
hat_dec_list_port = ["None", "cap_joja","cap_joja2","sunhat","night cap","broad hat","bowler","witch"]
hat_list_port = ["None","sunhat", "cap", "headphones", "wizard","ribbon","night cap","broad hat","beanie","bowler","flower crown","soft cap","witch","helmet","turban"]
hat_list_sprite = ["cowboy hat", "Bowler", "Top hat", "sombrero", "straw hat", "official cap", "blue bonnet", "Chapeau", "Skeleton mask", "Goblin Mask", "Chicken Mask", "Earmuffs", "Delicate Bow", "Tropiclip", "Butterfly Bow", "Hunter's Cap", "Trucker Hat", "Sailor's Cap", "Good Ol' Cap", "Fedora", "Cool Cap", "Lucky Bow", "Polka Bow", "Gnome's Cap", "Eye Patch", "Santa Hat", "Tiara", "Hard Hat", "Sou'wester", "Daisy", "Watermelon Band", "Mouse Ears", "Cat Ears", "Cowgal Hat", "Cowpoke Hat", "Archer's Cap", "Panda Hat", "Blue Cowboy Hat", "Red Cowboy Hat", "Cone Hat", "Living Hat", "Emily's Magic Hat", "Mushroom Cap", "Dinosaur Hat", "Totem Mask", "Logo Cap", "Dwarf Helm", "Fashion Hat", "Pumpkin Mask", "Hair Bone", "knight", "","red kerchief", "grey beanie", "red beanie", "black with feather", "", "", "", "", "wizard", "chef", "pirate", "", "", "turban", "", "gold mask", "spinner", "veil", "flat black", "witch",]
hat_colour_names = ["top hat", "earmuffs", "flower","clip","bow","cap","backwards cap", "big bow", "cat ears", "flat cap", "wide hat", "cowboy hat", "hood", "beanie", "ribbed beanie", "turban", "hijab", "headphones","wizard","sunhat","night cap","flower crown","bowler","fedora","helmet","witches hat"]

hijab_list_port = ["None","hijab"]
#Different for portraits and sprites

neckwear_list_port = ["None","tie","beads","choker","scarf","bowtie","pendant","cravat"]
neckwear_list_sprite = ["None", "bandana", "necklace", "bow-tie", "tie", "choker","beads","scarf","pendant"]
neckwear_list_menu = neckwear_list_port

eyewear_list_port = ["None", "glasses", "square glasses", "round glasses", "sunglasses", "eye-patch","coloured glasses"]
eyewear_list_sprite = eyewear_list_port
eyewear_list_menu = eyewear_list_port

earrings_list_port = ["None", "studs","single stud","single small hoop","small hoops","punk","drops","hoops","single hoop",]
earrings_list_sprite = ["None", "drops","hoops", "studs", "single stud","single hoop"]
earrings_list_menu = earrings_list_port

pants_top_list_port = ["None","overalls"]

#Combos
back_list_port = [["Hat", hat_back_list_port],["Coat", coat_back_list_port] ]
back_list_sprite = [["Coat", coat_back_list_sprite] ]
front_list_sprite = [["Coat", coat_back_list_sprite] ]

#special
wedding_clothes_list = ["suit","dress"]

#colours
skin_regular =["#FFE7D6","#FFD3A6","#FFDFA5","#F1B265","#F1A065","#DA773F","#DA874A","#B05934","#B96A2E","#853F27","#783F1A"]
skin_weird = ["#C3FFFA","#41AD60","#000000","#9BB681"]
skin_colours =skin_regular + skin_weird

outfit_yellow = ["#FFE201","#FF9F02","#FFDBB6","#F7BE4F"]
outfit_green = ["#73D080","#4F8B20","#8CC54E","#277032","#56AA04","#7CA838"]
outfit_blue = ["#477BC8","#3C92ED","#1FDBFF","#2E4D91"]
outfit_purple = ["#BF2C92","#D361A7","#A46FE2","#9431C6"]
outfit_red = ["#F0303C","#B71B00","#E55773"]
outfit_brown = ["#B24836","#912D20","#820000","#630F0F"]
outfit_grey = ["#FFFFFF","#777471","#4C4C56","#482B57","#000000"]

outfit_colours = outfit_yellow+outfit_green+outfit_blue+outfit_purple +outfit_red +outfit_brown +outfit_grey
eye_colours = ["#000000","#AEB655","#14AC34","#20514C","#29B4C4","#008891","#2E9FF7","#3D2C64","#B200F1","#F39EFF","#E55773","#D24525","#FF8F2B","#DB8200","#8E3300","#999999","#ffffff"]
hair_weird = ["#7034ED","#B25DF6","#1B8EF6", "#53C7FB","#469951"]
hair_grey = ["#A59A9D", "#E9E9E9",]
hair_blonde = ["#FCE374", "#F0B50A",]
hair_brown = ["#641D00","#923D1F", "#8B4910", "#BB742E",]
hair_black = ["#391E47", "#48356E","#4B261E", "#5B483C","#5A5A7F", "#602372","#000000"]
hair_red = ["#FE7423","#FF5565", "#DF433C","#D16132"]

hair_colours = hair_blonde + hair_red+ hair_brown+ hair_black+ hair_weird + hair_grey

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

add_portrait_object("Hair_back", hair_back_list, "hair_back_list","body/hair")
add_portrait_object("Coat_back", coat_back_list_port, "coat_back_list_port","outfit/coat")
#add_portrait_object("Coat_dec_back", coat_dec_back_list_port, "coat_dec_back_list_port","outfit/coat")
add_portrait_object("Hat_back", hat_back_list_port,"hat_back_list_port", "outfit/hat")

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

add_portrait_object("Ears", ears_list,"ears_list", "body")
add_portrait_object("Hijab", hijab_list_port,"hijab_list_port", "outfit/hat")
add_portrait_object("Head", head_list, "head_list", "body")

add_portrait_object("Complexion", complexion_list,"complexion_list", "body")
add_portrait_object("Stubble", stubble_list, "stubble_list", "body")
add_portrait_object("Blush", blush_list,"blush_list", "expression")
add_portrait_object("Nose", nose_list,"nose_list", "body")

add_portrait_object("Eyebrows", eyebrow_list,"eyebrow_list", "expression")
add_portrait_object("Eyes", eye_list,"eye_list", "expression")
add_portrait_object("Mouth", mouth_list,"mouth_list", "expression")

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

def blushcolour(skincolour):
            # Given a colour string, returns the appropriate blush colour
            # Not very reliable
        new_colour = hex_to_rgba(skincolour)
        # H = hue(c)
        # S = saturation(c)
        # V = luminance(c)

        # newH = H - 0.06
        # newS = max(min(1.42 *S, 1),0.6)
        # newV = min (0.77*S + 0.57* V, 1)
        # colour = HSL_to_RGB(newH, newS, newV)

        shadow = hex_to_rgba("#FF0462")
        colour = [0,0,0]
        r = 0.3 #opacity of shadow
        for i in range(3): #multiply
           colour[i] = int((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255)   
        return colour

def colour_this(pixel, colour):
    p = [pixel[0],pixel[1],pixel[2]]
    new_colour = hex_to_rgba(colour)
    if p == [255,0,0]:
        for i in range(3):
            p[i] = new_colour[i] 
    elif p == [0,0,111]: #edge
        shadow = hex_to_rgba("#22252E")
        r = 0.7 #opacity of shadow
        for i in range(3): #multiply
           p[i] = int((1-r)*new_colour[i] + r*shadow[i])                 
    elif p == [0,0,255]: #shading
        shadow = hex_to_rgba("#1f3066")
        r = 0.3 #opacity of shadow
        for i in range(3): #multiply
           p[i] = int((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255)    
    elif p == [0,255,0]: #highlight
        highlight = hex_to_rgba("#f9f4ca")
        r = 0.5 #opacity of highlight
        for i in range(3): #screen
           p[i] = int((1-r)*new_colour[i] + r*(255 - (255-new_colour[i])*(255-highlight[i])/255))    
    return (p[0],p[1],p[2],pixel[3])

def colour_this_eyes(pixel, colour):
    p = [pixel[0],pixel[1],pixel[2]]
    new_colour = hex_to_rgba(colour)
    if p == [255,0,0]:
        for i in range(3):
            p[i] = new_colour[i]      
    elif p == [0,0,255]: #shading
        shadow = hex_to_rgba("#1f3066")
        r = 0.3 #opacity of shadow
        for i in range(3): #multiply
           p[i] = int((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255)    
    elif p == [0,255,0]: #highlight
        highlight = hex_to_rgba("#f9f4ca")
        r = 0.5 #opacity of highlight
        for i in range(3): #screen
           p[i] = int((1-r)*new_colour[i] + r*(255 - (255-new_colour[i])*(255-highlight[i])/255))    
    return (p[0],p[1],p[2],pixel[3])


def colour_this_blush(pixel, colour):
    p = [pixel[0],pixel[1],pixel[2]]
    new_colour = blushcolour(colour)
    if p == [255,0,0]:
        for i in range(3):
            p[i] = new_colour[i]      
    elif p == [0,0,255]: #shading
        shadow = hex_to_rgba("#FF0428")
        r = 0.3 #opacity of shadow
        for i in range(3): #multiply
           p[i] = int((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255)    
    elif p == [0,255,0]: #highlight
        highlight = hex_to_rgba("#f9f4ca")
        r = 0.5 #opacity of highlight
        for i in range(3): #screen
           p[i] = int((1-r)*new_colour[i] + r*(255 - (255-new_colour[i])*(255-highlight[i])/255))    
    return (p[0],p[1],p[2],pixel[3])


def colour_this_noshadow(pixel, colour):
    p = [pixel[0],pixel[1],pixel[2]]
    alpha = pixel[3]
    new_colour = hex_to_rgba(colour)
    if p == [255,0,0]:
        for i in range(3):
            p[i] = new_colour[i]      
    elif p == [0,0,255]: #shading
        alpha = 0
    elif p == [0,255,0]: #highlight
        highlight = hex_to_rgba("#f9f4ca")
        r = 0.5 #opacity of highlight
        for i in range(3): #screen
           p[i] = int((1-r)*new_colour[i] + r*(255 - (255-new_colour[i])*(255-highlight[i])/255))    
    return (p[0],p[1],p[2],alpha)


def colour_this_skin(pixel, colour):
    p = [pixel[0],pixel[1],pixel[2]]
    new_colour = hex_to_rgba(colour)
    if p == [249,174,137]: #base skin colour
        for i in range(3):
            p[i] = new_colour[i]      
    elif p == [255,217,186]: #highlight
        highlight = hex_to_rgba("#f9f4ca")
        r = 0.5 #opacity of highlight
        for i in range(3): #screen
           p[i] = int((1-r)*new_colour[i] + r*(255 - (255-new_colour[i])*(255-highlight[i])/255))              
    elif p == [224,107,101]: #shading
        shadow = hex_to_rgba("#830016")
        r = 0.3 #opacity of shadow
        for i in range(3): #multiply
           p[i] = int((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255)   
    elif p == [166,54,80]: #shading 2
        shadow = hex_to_rgba("#6D0036")
        r = 0.5 #opacity of shadow
        for i in range(3): #multiply
           p[i] = int((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255)     
    elif p == [142,31,12]: #shading 3
        shadow = hex_to_rgba("#760031")
        r = 0.7 #opacity of shadow
        for i in range(3): #multiply
           p[i] = int((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255) 
    elif p == [112,23,24]: #shading 4
        shadow = hex_to_rgba("#760031")
        r = 0.7 #opacity of shadow
        for i in range(3): #multiply
           p[i] = int((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255)                               
    elif p == [107,0,58]: #edge
        shadow = hex_to_rgba("#560055")
        r = 0.8 #opacity of shadow
        for i in range(3): #multiply
           p[i] = int((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255)   
    elif p == [74,12,6]: #edge2
        shadow = hex_to_rgba("#370030")
        r = 0.85 #opacity of shadow
        for i in range(3): #multiply
           p[i] = int((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255)           
    return (p[0],p[1],p[2],pixel[3])    

def colour_this_hair(pixel, colour):
    p = [pixel[0],pixel[1],pixel[2]]
    new_colour = hex_to_rgba(colour)
    highlight = hex_to_rgba("#f9f4ca")
    shadow1 = hex_to_rgba("#830016")
    shadow2 = hex_to_rgba("#2D0037")
    
    l = luminance(p)/255 #opacity of shadow
    if l <0.65:
        r = l/0.65
        for i in range(3): #multiply
            p[i] = int(r*new_colour[i] + (1-r)*new_colour[i]*(r*shadow1[i]+(1-r)*shadow2[i])/255)    
    else:
        r = (l-0.65)
        for i in range(3): #screen
           p[i] = int((1-r)*new_colour[i] + r*(255 - (255-new_colour[i])*(255-highlight[i])/255))    
       
    return (p[0],p[1],p[2],pixel[3]) 

def colour_this_grey(pixel, colour):
    p = [pixel[0],pixel[1],pixel[2]]
    new_colour = hex_to_rgba(colour)
    shadow = hex_to_rgba("#5C3C83")
    
    l = luminance(p) #opacity of shadow
    s = saturation(p)
    h =  hue(p)

    if l ==255:
        for i in range(3):
            p[i] = new_colour[i]
        return (p[0],p[1],p[2],pixel[3])      

    shadow1 = new_colour  
    if h <60: #red-orange
        shadow2 = hex_to_rgba("#4B0019")
    elif h<120: #yellow
        shadow2 = hex_to_rgba("#004B13")
    elif h<180: #yellow-green
        shadow2 = hex_to_rgba("#00264B")
    elif h<240: #aqua
        shadow2 = hex_to_rgba("#00024B")
    elif h<300: #blue
        shadow2 = hex_to_rgba("#00024B")
    else: #purple
        shadow2 = hex_to_rgba("#34004B")

    if s==0:
        shadow1 = hex_to_rgba("#6862BB")     
        shadow2 = hex_to_rgba("#2B276A")     
    if (l <3):
        r=1
    else:
        r = 0.8*l/255 + 0.2
    for i in range(3): #multiply
        p[i] = p[i] = int(r*new_colour[i] + (1-r)*new_colour[i]*(r*shadow1[i]+(1-r)*shadow2[i])/255)    
       
    return (p[0],p[1],p[2],pixel[3]) 

def colour_this_skin_grey(pixel, colour):  
    p = [pixel[0],pixel[1],pixel[2]]
    new_colour = hex_to_rgba(colour)
    shadow1 = hex_to_rgba("#5C3C83")
    shadow2 = hex_to_rgba("#181632")   

    if p in [[249,174,137],[255,217,186],[224,107,101],[166,54,80],[142,31,12],[112,23,24],[107,0,58],[74,12,6]]:

        # if p == [249,174,137]: #base skin colour
        #     for i in range(3):
        #         p[i] = new_colour[i]
        #         return (p[0],p[1],p[2],pixel[3])    
        return colour_this_grey(pixel, colour) 
        
        l_top = luminance(hex_to_rgba("#F9AE89"))
        l_bottom = luminance(hex_to_rgba("#420024"))
        
        l = luminance(p)/255 #(luminance(p)-l_bottom)/(l_top-l_bottom) 
        if (l <0.1):
            r=1
        else:
            r = 0.8*l + 0.2
        for i in range(3): #multiply
            p[i] = int(r*new_colour[i] + (1-r)*new_colour[i]*(r*shadow1[i]+(1-r)*shadow2[i])/255)    
        
    return (p[0],p[1],p[2],pixel[3]) 


def process_image(name, location, colour,colour_list,type):
    image_string = "../images/bases/"+location+"/"+name+"_base.png"
    save_string = "../images/"+location+"/"+name+"_"+str(colour)+".png"
    img = Image.open(image_string) 
    Adata = img.load()       
    for y in range(img.size[1]):
        for x in range(img.size[0]):
            if Adata[x, y][3] !=0:
                if type == "skin":
                    Adata[x, y] = colour_this_skin(Adata[x, y], colour_list[colour]) 
                elif type == "hair":
                    Adata[x, y] = colour_this_hair(Adata[x, y], colour_list[colour])     
                elif type == "skin_grey":
                    Adata[x, y] = colour_this_skin_grey(Adata[x, y], colour_list[colour]) 
                elif type =="blue":   
                    Adata[x, y] = colour_this_grey(Adata[x, y], colour_list[colour])          
                elif type =="grey":   
                    Adata[x, y] = colour_this_grey(Adata[x, y], colour_list[colour]) 
                elif type =="eyes":   
                    Adata[x, y] = colour_this_eyes(Adata[x, y], colour_list[colour])     
                elif type =="blush":   
                    Adata[x, y] = colour_this_blush(Adata[x, y], colour_list[colour])       
                else:    
                    Adata[x, y] = colour_this(Adata[x, y], colour_list[colour])
    img.save(save_string)    
    if location =="portraits/body/nose":
        image_string = "../images/bases/"+location+"/"+name+"_base.png"
        save_string = "../images/"+location+"/"+name+"_noshadow_"+str(colour)+".png"
        img = Image.open(image_string) 
        Adata = img.load()       
        for y in range(img.size[1]):
            for x in range(img.size[0]):
                if Adata[x, y][3] !=0:
                    Adata[x, y] = colour_this_noshadow(Adata[x, y], colour_list[colour])  
        img.save(save_string)        

def trimhats():
    image_string = "../images/bases/sprites/hats/hats_original.png"
    save_string = "../images/bases/sprites/hats/hats.png"
    im_old = Image.open(image_string) 
    im_new = Image.new("RGBA", (12*16, 32*32))
    for row in range(32):
        for column in range(12):
            region = im_old.crop((column*20+2, row*20+3,column*20+18,row*20+20))
            im_new.paste(region,(column*16, row*32, column*16+16,row*32+17))
    im_new.save(save_string)  

def fliphair():
    image_string = "../images/bases/sprites/hair/hairstyles_base.png"
    save_string = "../images/bases/sprites/hair/temp.png"
    im_old = Image.open(image_string) 
    im_new = Image.new("RGBA", (128, 896))
    for meta_row in range(7):
        #rows 1 and 2
        region = im_old.crop((0, meta_row*96,128,meta_row*96+64))
        im_new.paste(region,(0, meta_row*128,128,meta_row*128+64))

        #row 3
        for column in range(8):
            for x in range(16):
                region = im_old.crop((column*16+x, meta_row*96+32,column*16+x+1,meta_row*96+64))
                im_new.paste(region,(column*16+16-x, meta_row*128+64, column*16+17-x,meta_row*128+96))

        #row 4
        region = im_old.crop((0, meta_row*96+64,128,meta_row*96+96))
        im_new.paste(region,(0, meta_row*128+96,128,meta_row*128+128))
            
    im_new.save(save_string)   

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

def make_coat():
    image_string = "../images/bases/sprites/outfit/shirts/decorations/shirt decs_base.png"
    save_string = "../images/bases/temp.png"
    im_old = Image.open(image_string) 
    im_new = Image.new("RGBA", (16*4, 32*4))
    for column in range(4):
        for row in range(3):
            oldx = 32+8*row
            if row ==2:
                oldx = 32+8*3
            region = im_old.crop((88, oldx,88+8,oldx+8))
            x = column*16 +4
            y = row*32 +15  
            im_new.paste(region,(x, y, x+8,y+8))
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
        content.write("[\""+hat_list_sprite[i]+"\",[1],["+str(i+1)+"]], \n")
    for i in range(len(hat_colour_names)):
        content.write("[\""+hat_colour_names[i]+"\",["+str(i+1)+"],["+str(i+73)+"]], \n")    
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
    content.write(list_string("outfit_yellow", outfit_yellow))
    content.write(list_string("outfit_green", outfit_green))
    content.write(list_string("outfit_blue", outfit_blue))
    content.write(list_string("outfit_purple", outfit_purple))
    content.write(list_string("outfit_red", outfit_red))
    content.write(list_string("outfit_brown", outfit_brown))
    content.write(list_string("outfit_grey", outfit_grey))
    content.write(colour_list_add("outfit_colours", "outfit_yellow+outfit_green+outfit_blue+outfit_purple+outfit_red+outfit_brown+outfit_grey"))
    content.write(list_string("skin_regular", skin_regular))
    content.write(list_string("skin_weird", skin_weird))
    content.write(colour_list_add("skin_colours", "skin_regular+skin_weird"))
    content.write(list_string("hair_weird", hair_weird))
    content.write(list_string("hair_grey", hair_grey))
    content.write(list_string("hair_blonde", hair_blonde))
    content.write(list_string("hair_red", hair_red))
    content.write(list_string("hair_brown", hair_brown))
    content.write(list_string("hair_black", hair_black))
    content.write(colour_list_add("hair_colours","hair_blonde+hair_red+hair_brown+hair_black+hair_weird+hair_grey"))
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
        if c.name!="Nose_front":
            content.write(name_string(c))
    content.write("\n")
    for c in closet:
        content.write("add_portrait_object(\""+c.name+"\","+ c.listname+",\""+c.location+"\")\n")
    content.write("\n")    
    content.write(list_string("facial_hair_list_sprite", facial_hair_list_sprite))
    content.write(list_string("facial_hair_list_menu", facial_hair_list_menu))
    content.write(list_string("hat_list_sprite", hat_list_sprite))
    content.write(list_string("hat_colour_names", hat_colour_names))
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
    content.write("const back_list_sprite = [[\"Coat\", coat_back_list_sprite] ];\n")
    content.write("const front_list_sprite = [[\"Coat\", coat_back_list_sprite] ];\n")
    content.write("\n")
    
    content.close()

def process_portrait_part(obj):
    if obj.name in skin_list:
        colour_list = skin_colours
    elif obj.name =="Eyes":
        colour_list = eye_colours
    elif obj.name in hair_list:
        colour_list = hair_colours        
    else:
        colour_list = outfit_colours
    if obj.name == "Nose_front":
        loc = "portraits/"+obj.location + "/nose"   
    else:       
        loc = "portraits/"+obj.location + "/"+(obj.name).lower()   
    for c in range(len(colour_list)):
        for item in obj.item_list:
            if obj.name == "Blush":
                if item!="None":
                    process_image(item, loc, c, colour_list,"blush")
            else:        
                if item!="None":
                    process_image(item, loc, c, colour_list,"portrait")


def process_all_portraits():
    for c in closet:
        process_portrait_part(c)

def process_body_sprites():
    for c in range(len(skin_colours)):
        process_image("head", "sprites/body/", c, skin_colours,"skin")
        for h in ["short","tall"]: 
            process_image(h, "sprites/body", c, skin_colours,"skin")   
            process_image("arms_"+h, "sprites/body", c, skin_colours,"skin")
            for w in wedding_clothes_list:
                process_image(w+"_"+h, "sprites/wedding", c, skin_colours,"skin") 
                for g in ["female","male"]:
                    process_image(g+"_"+w+"_"+h, "sprites/flower dance", c, skin_colours,"skin") 

    for c in range(len(hair_colours)):  
         process_image("hairstyles", "sprites/hair", c, hair_colours,"hair")
         process_image("hairstyles2", "sprites/hair", c, hair_colours,"hair")
         #process_image("facialhair", "sprites/hair/facialhair", c, hair_colours,"hair")
    for c in range(len(eye_colours)): 
        process_image("eyes", "sprites/body", c, eye_colours,"eyes") 
        

def process_outfit_sprites():
    for c in range(len(outfit_colours)): 
        process_image("eyewear", "sprites/accessories/eyewear", c, outfit_colours,"skin_grey") 
        process_image("hats_colour", "sprites/outfit/hats", c, outfit_colours,"skin_grey")
        process_image("hats_dec", "sprites/outfit/hats", c, outfit_colours,"skin_grey")
        #process_image("pants", "sprites/outfit/pants", c, outfit_colours,"blue")
        #process_image("pants_top", "sprites/outfit/pants_top", c, outfit_colours,"skin_grey")
        #process_image("briefs", "sprites/outfit/pants", c, outfit_colours,"blue")
        process_image("shirts", "sprites/outfit/shirts", c, outfit_colours,"grey")
        #process_image("shirt decs", "sprites/outfit/shirts/decorations", c, outfit_colours,"grey")
        process_image("overshirt", "sprites/outfit/overshirt", c, outfit_colours,"grey")
        process_image("coat", "sprites/outfit/coat", c, outfit_colours,"skin_grey")
        process_image("coat_dec", "sprites/outfit/coat", c, outfit_colours,"skin_grey")
        process_image("coat_back", "sprites/outfit/coat", c, outfit_colours,"skin_grey")
        process_image("neckwear", "sprites/accessories/neckwear", c, outfit_colours,"grey")
        process_image("earrings", "sprites/accessories/earrings", c, outfit_colours,"")
        for height in ["short","tall"]:
            process_image("longpants_"+height, "sprites/outfit/pants", c, outfit_colours,"blue")
            #for shoetype in ["boots","flats","flipflops"]:
            #    process_image(height+"_"+shoetype, "sprites/outfit/shoes", c, outfit_colours,"grey") 
            #process_image(height, "sprites/outfit/gloves", c, outfit_colours,"grey")
            #for sleevetype in ["short","long"]:
            #    process_image(height+"_"+sleevetype, "sprites/outfit/sleeves", c, outfit_colours,"grey") 

write_temp()
write_variables()

process_body_sprites()
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
    if c.name in [""]:
        process_portrait_part(c)
#process_all_portraits()
#make_coat()