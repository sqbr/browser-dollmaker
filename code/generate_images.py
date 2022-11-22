from __future__ import print_function
import sys
import math
from PIL import Image
from PIL import ImageEnhance
import glob

# python generate_images.py

body_list = ["Torso", "Head", "Complexion","Ears", "Nose"]
expression_list = ["Eyes","Eyebrows", "Mouth"]
outfit_list= ["Shirt", "Neckwear", "Coat", "Eyewear", "Hat"]

skin_list = body_list + ["Eyebrows", "Mouth"]
hair_list = ["Hair_back", "Hair_middle","Hair_front","Facial_hair"]

hair_front_list = ["none", "emo"]
hair_middle_list = ["none", "sidepart"]
hair_back_list = ["none", "short"]
facial_hair_list = ["none","mo"]

torso_list = ["medium"]
head_list =["medium","round"]
complexion_list =["none","wrinkles"]
ears_list =["regular"]
nose_list =["none","medium"]

eyebrow_list = ["none", "flat_thick"]
eye_list = ["medium"]
mouth_list = ["flat"]

shirt_list = ["none", "shirt"]
neckwear_list = ["none","choker"]
coat_back_list = ["none","cardigan"]
coat_list = ["none","cardigan"]
eyewear_list = ["none","half"]
hat_list = ["none","straw"]
hat_back_list = ["none","straw"]

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
eye_colours = ["#000000","#B25DF6","#1B8EF6","#469951","#F0B50A",]
hair_weird = ["#7034ED","#B25DF6","#1B8EF6", "#53C7FB","#469951"]
hair_grey = ["#A59A9D", "#E9E9E9",]
hair_blonde = ["#FCE374", "#F0B50A",]
hair_brown = ["#641D00","#923D1F", "#8B4910", "#BB742E",]
hair_black = ["#48356E","#4B261E", "#5B483C","#5A5A7F", "#602372","#000000"]
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

def add_item(name, item_list,listname, location):
    # Add an item type to the closet
    global  closet
    closet.append(ClothingItem(name, item_list, listname, location))


# Not automatically shown
# add_item("cheeks", cheeks_list, "cheeks_list", "face")

# #Behind eyes
# shown_start = len(closet) # where the visible items start

add_item("Coat_back", coat_back_list, "coat_back_list","outfit/coat")
add_item("Hat_back", hat_back_list,"hat_back_list", "outfit/hat")
add_item("Hair_back", hair_back_list, "hair_back_list","body/hair")
add_item("Ears", ears_list,"ears_list", "body")
add_item("Torso", torso_list, "torso_list", "body")
add_item("Head", head_list, "head_list", "body")

add_item("Complexion", complexion_list,"complexion_list", "body")
add_item("Nose", nose_list,"nose_list", "body")

add_item("Eyebrows", eyebrow_list,"eyebrow_list", "expression")
add_item("Eyes", eye_list,"eye_list", "expression")
add_item("Mouth", mouth_list,"mouth_list", "expression")

# In front of face
add_item("Neckwear", neckwear_list,"neckwear_list", "outfit")
add_item("Shirt", shirt_list,"shirt_list", "outfit")
add_item("Coat", coat_list,"coat_list", "outfit")

add_item("Facial_hair", facial_hair_list,"facial_hair_list", "body/hair")
add_item("Eyewear", eyewear_list,"eyewear_list", "outfit")
add_item("Hair_middle", hair_middle_list,"hair_middle_list", "body/hair")

add_item("Hair_front", hair_front_list,"hair_front_list", "body/hair")
add_item("Hat", hat_list,"hat_list", "outfit")
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

def shading(colour, shadow, r ):
    return (1-r)*colour + r*colour*shadow/255

def colour_this(pixel, colour):
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


def process_image(name, location, colour,colour_list):
    image_string = location+"/"+name+"_base.png"
    save_string = location+"/"+name+"_"+str(colour)+".png"
    img = Image.open(image_string) 
    Adata = img.load()       
    for y in range(img.size[1]):
        for x in range(img.size[0]):
            if Adata[x, y][3] !=0:
                Adata[x, y] = colour_this(Adata[x, y], colour_list[colour])  
    img.save(save_string)                   

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

def write_variables():
    # Write all the shared variables into generated.js

    content = open("generated.js","w")
    content.write("//generated by generate_images.py\n\n")
    content.write(list_string("outfit_list", outfit_list))
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
        content.write(name_string(c))
    content.write("\n")
    for c in closet:
        content.write("add_item(\""+c.name+"\","+ c.listname+")\n")
    content.write("\n")
    
    content.close()

def process_list(obj):
    if obj.name in skin_list:
        colour_list = skin_colours
    elif obj.name =="Eyes":
        colour_list = eye_colours
    elif obj.name in hair_list:
        colour_list = hair_colours        
    else:
        colour_list = outfit_colours
    loc = "../images/"+obj.location + "/"+(obj.name).lower()   
    for c in range(len(colour_list)):
        for item in obj.item_list:
            if item!="none":
                process_image(item, loc, c, colour_list)


def process_all_images():
    for c in closet:
        process_list(c)

write_variables()
#process_all_images()