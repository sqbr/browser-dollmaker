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
outfit_list_both = ["Neckwear","Eyewear","Earrings", "Hat"]
outfit_list = outfit_list_both+ outfit_list_portOnly+ outfit_list_spriteOnly

skin_list = body_list + ["Eyebrows", "Mouth","Blush"]

#Only in portraits
hair_list = ["Hair_back", "Hair_middle","Hair_front","Facial_hair"]

hair_front_list = ["none", "shaggy side","emo","princely","locs bun","long wavy","curly pixie","spiky","short side","smooth bangs","hi-top","afro","long locks","short spiky","centre part","tufts",]
hair_middle_list = ["none","tendrils"]
hair_back_list = ["none", "shaggy medium","bob","locs bob","long wavy","curly pony","curly bob","spiky","twin braids","long locks","short spiky","bun","tufts","twintails"]

torso_list = ["medium"]
head_list =["rectangular","pointed","square","medium","oval","round","jowly",]
complexion_list =["none","light wrinkles","wrinkles"]
ears_list =["regular"]
nose_list =["none","button", "medium", "broad","round","pointed"]
eyebrow_list = ["none", "slightly downward","raised","flat sad","raised sad","angry","neutral","raised up"]
eye_list = ["medium","crescents","medium side","medium narrowed","medium angry","big crescents","sleepy"]
mouth_list = ["flat","smile","frown","small frown","slight smile","small laugh","wobbly smile"]

blush_list = ["none","small"]
#backs

coat_back_list_port = ["none","suit jacket","jacket","hoodie","open hoodie","leaves"]
hat_back_list_port = ["none","sunhat","wizard"]

back_list_port = [["Hat", hat_back_list_port],["Coat", coat_back_list_port] ]

coat_back_list_sprite = ["none"]

back_list_sprite = [["Coat", coat_back_list_sprite] ]

#extras
shirt_collar_list = ["none","button up","open shirt"]
hat_dec_list_port = ["none", "cap_joja","cap_joja2","sunhat"]
shirt_dec_list_port = ["none","button_up_plaid","button_up_stripe","open shirt vest"]
shirt_collar_dec_list_port = ["none","button_up_plaid"]

#The same for sprites and portraits
facial_hair_list_port = ["none", "beard", "moustache", "big moustache", "goatee", "soul patch", "fluffy goatee", ]
facial_hair_list_sprite = facial_hair_list_port
facial_hair_list_menu = facial_hair_list_port  +["stubble"] #stubble must be at end!
stubble_list = ["none"]+ head_list

#Different for portraits and sprites
hat_list_port = ["none","sunhat", "cap", "headphones", "wizard","ribbon"]
hat_list_menu = hat_list_port 
hat_list_sprite = ["cowboy hat", "Bowler", "Top hat", "sombrero", "straw hat", "official cap", "blue bonnet", "Chapeau", "Skeleton mask", "Goblin Mask", "Chicken Mask", "Earmuffs", "Delicate Bow", "Tropiclip", "Butterfly Bow", "Hunter's Cap", "Trucker Hat", "Sailor's Cap", "Good Ol' Cap", "Fedora", "Cool Cap", "Lucky Bow", "Polka Bow", "Gnome's Cap", "Eye Patch", "Santa Hat", "Tiara", "Hard Hat", "Sou'wester", "Daisy", "Watermelon Band", "Mouse Ears", "Cat Ears", "Cowgal Hat", "Cowpoke Hat", "Archer's Cap", "Panda Hat", "Blue Cowboy Hat", "Red Cowboy Hat", "Cone Hat", "Living Hat", "Emily's Magic Hat", "Mushroom Cap", "Dinosaur Hat", "Totem Mask", "Logo Cap", "Dwarf Helm", "Fashion Hat", "Pumpkin Mask", "Hair Bone", "knight", "","red kerchief", "grey beanie", "red beanie", "black with feather", "", "", "", "", "wizard", "chef", "pirate", "", "", "turban", "", "gold mask", "spinner", "veil", "flat black", "witch",]
hat_colour_names = ["top hat", "earmuffs", "flower","clip","bow","cap","backwards cap", "big bow", "cat ears", "flat cap", "wide hat", "cowboy hat", "hood", "beanie", "ribbed beanie", "turban", "hijab", "headphones","wizard","sunhat"]

shirt_list_port = shirt_collar_list +["tshirt","vest","boatneck","strappy"]

overshirt_list_port = ["none"]
overshirt_list_sprite = ["none", "loose shirt","waistcoat","cardigan","suspenders"]

neckwear_list_port = ["none","tie","beads"]
neckwear_list_sprite = ["none", "bandana", "necklace", "bow-tie", "tie", "choker","beads"]
neckwear_list_menu = neckwear_list_port

coat_list_port = coat_back_list_port
coat_list_sprite = ["none","short coat","cape","closed","closed low cut","closed hoodie","jacket","open hoodie","leaves"]
coat_list_menu = coat_list_port

eyewear_list_port = ["none", "glasses", "square glasses", "round glasses", "sunglasses", "eye-patch"]
eyewear_list_sprite = eyewear_list_port
eyewear_list_menu = eyewear_list_port

earrings_list_port = ["none", "studs","single stud","single small hoop","small hoops","punk","drops","hoops","single hoop",]
earrings_list_sprite = ["none", "drops","hoops", "studs", "single stud"]
earrings_list_menu = earrings_list_port

pants_top_list_port = ["none","overalls"]

#colours
skin_regular =["#FFE7D6","#FFD3A6","#FFD3A6","#FFDFA5","#F1A065","#DA773F","#DA874A","#B05934","#B96A2E","#853F27","#783F1A"]
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
eye_colours = ["#000000","#2E9FF7","#B25DF6","#1B8EF6","#469951","#F0B50A",]
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

add_portrait_object("Coat_back", coat_back_list_port, "coat_back_list_port","outfit/coat")
add_portrait_object("Hat_back", hat_back_list_port,"hat_back_list_port", "outfit/hat")
add_portrait_object("Hair_back", hair_back_list, "hair_back_list","body/hair")
add_portrait_object("Ears", ears_list,"ears_list", "body")
add_portrait_object("Torso", torso_list, "torso_list", "body")
add_portrait_object("Head", head_list, "head_list", "body")

add_portrait_object("Complexion", complexion_list,"complexion_list", "body")
add_portrait_object("Stubble", stubble_list, "stubble_list", "body")
add_portrait_object("Blush", blush_list,"blush_list", "expression")
add_portrait_object("Nose", nose_list,"nose_list", "body")

add_portrait_object("Eyebrows", eyebrow_list,"eyebrow_list", "expression")
add_portrait_object("Eyes", eye_list,"eye_list", "expression")
add_portrait_object("Mouth", mouth_list,"mouth_list", "expression")

# In front of face
add_portrait_object("Earrings", earrings_list_port,"earrings_list_port", "outfit")
add_portrait_object("Shirt", shirt_list_port,"shirt_list_port", "outfit")
add_portrait_object("Shirt_dec", shirt_dec_list_port,"shirt_dec_list_port", "outfit/shirt")
add_portrait_object("Overshirt", overshirt_list_port,"overshirt_list_port", "outfit")
add_portrait_object("Neckwear", neckwear_list_port,"neckwear_list_port", "outfit")
add_portrait_object("Shirt_collar", shirt_collar_list,"shirt_collar_list", "outfit/shirt")
add_portrait_object("Shirt_collar_dec", shirt_collar_dec_list_port,"shirt_collar_dec_list_port", "outfit/shirt")
add_portrait_object("Pants_top", pants_top_list_port,"pants_top_list_port", "outfit")
add_portrait_object("Coat", coat_list_port,"coat_list_port", "outfit")

add_portrait_object("Facial_hair", facial_hair_list_port,"facial_hair_list_port", "body/hair")
add_portrait_object("Nose_front", nose_list,"nose_list", "body")
add_portrait_object("Eyewear", eyewear_list_port,"eyewear_list_port", "outfit")
add_portrait_object("Hair_middle", hair_middle_list,"hair_middle_list", "body/hair")

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

def colour_this_grey(pixel, colour):
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

def colour_this_blue(pixel, colour):
    p = [pixel[0],pixel[1],pixel[2]]
    new_colour = hex_to_rgba(colour)
    if p == [255,253,252]: #base skin colour
        for i in range(3):
            p[i] = new_colour[i]      
    elif p == [176,180,193]: #shading
        shadow = hex_to_rgba("#830016")
        r = 0.3 #opacity of shadow
        for i in range(3): #multiply
           p[i] = int((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255)   
    elif p == [110,113,121]: #shading 2
        shadow = hex_to_rgba("#6D0036")
        r = 0.5 #opacity of shadow
        for i in range(3): #multiply
           p[i] = int((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255)           
    elif p == [42,42,57]: #edge
        shadow = hex_to_rgba("#560055")
        r = 0.8 #opacity of shadow
        for i in range(3): #multiply
           p[i] = int((1-r)*new_colour[i] + r*new_colour[i]*shadow[i]/255)           
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
                elif type =="grey":   
                    Adata[x, y] = colour_this_grey(Adata[x, y], colour_list[colour]) 
                elif type =="eyes":   
                    Adata[x, y] = colour_this_eyes(Adata[x, y], colour_list[colour])     
                elif type =="blue":   
                    Adata[x, y] = colour_this_grey(Adata[x, y], colour_list[colour]) 
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
        content.write("[\""+hat_colour_names[i]+"\",[1],["+str(i+73)+"]], \n")    
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
    content.write(list_string("hat_list_menu", hat_list_menu))
    content.write(list_string("neckwear_list_sprite", neckwear_list_sprite))
    content.write(list_string("neckwear_list_menu", neckwear_list_menu))
    content.write(list_string("coat_list_sprite", coat_list_sprite))
    content.write(list_string("coat_list_menu", coat_list_menu))
    content.write(list_string("eyewear_list_sprite", eyewear_list_sprite))
    content.write(list_string("eyewear_list_menu", eyewear_list_menu))
    content.write(list_string("earrings_list_sprite", earrings_list_sprite))
    content.write(list_string("earrings_list_menu", earrings_list_menu))
    content.write("const back_list_port = [[\"Hat\", hat_back_list_port],[\"Coat\", coat_back_list_port] ]\n")
    content.write(list_string("coat_back_list_sprite", coat_back_list_sprite))
    content.write("const back_list_sprite = [[\"Coat\", coat_back_list_sprite] ]\n")
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
                if item!="none":
                    process_image(item, loc, c, colour_list,"blush")
            else:        
                if item!="none":
                    process_image(item, loc, c, colour_list,"portrait")


def process_all_portraits():
    for c in closet:
        process_portrait_part(c)

def process_body_sprites():
    #for c in range(len(skin_colours)):
    #    for b in sprite_body_list:
    #        process_image(b, "sprites/body/", c, skin_colours,"skin")
    #    for h in ["short","tall"]:    
    #        process_image("arms_"+h, "sprites/body", c, skin_colours,"skin")
    for c in range(len(hair_colours)):  
         process_image("hairstyles", "sprites/hair", c, hair_colours,"grey")
    #     process_image("hairstyles2", "sprites/hair", c, hair_colours,"grey")
         process_image("facialhair", "sprites/hair/facialhair", c, hair_colours,"grey")
    #for c in range(len(eye_colours)):  
    #     process_image("short", "sprites/body/eyes", c, eye_colours,"eyes") 
    #     process_image("long", "sprites/body/eyes", c, eye_colours,"eyes")  

def process_outfit_sprites():
    for c in range(len(outfit_colours)): 
        #process_image("eyewear", "sprites/accessories/eyewear", c, outfit_colours,"skin") 
        #process_image("hats_colour", "sprites/outfit/hats", c, outfit_colours,"skin")
        #process_image("hats_dec", "sprites/outfit/hats", c, outfit_colours,"skin")
    #    process_image("pants", "sprites/outfit/pants", c, outfit_colours,"blue")
        #process_image("pants_top", "sprites/outfit/pants_top", c, outfit_colours,"skin")
        #process_image("briefs", "sprites/outfit/pants", c, outfit_colours,"blue")
        #process_image("shirts", "sprites/outfit/shirts", c, outfit_colours,"grey")
        #process_image("overshirt", "sprites/outfit/overshirt", c, outfit_colours,"grey")
        #process_image("shirt decs", "sprites/outfit/shirts/decorations", c, outfit_colours,"grey")
        process_image("coat", "sprites/outfit/coat", c, outfit_colours,"grey")
        #process_image("coat_back", "sprites/outfit/coat", c, outfit_colours,"skin")
        #process_image("neckwear", "sprites/accessories/neckwear", c, outfit_colours,"grey")
        #process_image("earrings", "sprites/accessories/earrings", c, outfit_colours,"")
        #for height in ["short","tall"]:
        #        process_image("longpants_"+height, "sprites/outfit/pants", c, outfit_colours,"blue")
        #    for shoetype in ["boots","flats","flipflops"]:
        #        process_image(height+"_"+shoetype, "sprites/outfit/shoes", c, outfit_colours,"grey") 
        #    process_image(height, "sprites/outfit/gloves", c, outfit_colours,"grey")
            #for sleevetype in ["short","long"]:
                #process_image(height+"_"+sleevetype, "sprites/outfit/sleeves", c, outfit_colours,"grey") 
          


write_temp()
write_variables()

process_body_sprites()
process_outfit_sprites()

#["Hair_front","Hair_middle","Hair_back"]:
# []:
# ["Shirt_collar", "Shirt" ,"Shirt_dec","Shirt_collar_dec"]:
#["Coat","Coat_back"]:


for c in closet:
    if c.name in ["Hat"]:
        process_portrait_part(c)
#process_all_portraits()
#make_coat()