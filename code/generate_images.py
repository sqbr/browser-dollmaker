from __future__ import print_function
import sys
import math
from PIL import Image
from PIL import ImageEnhance
import glob

# python generate_images.py

body_list = ["Torso", "Head", "Complexion","Ears", "Nose"]
expression_list = ["Eyes","Eyebrows", "Mouth"]
outfit_list= ["Shirt", "Accessory", "Coat", "Eyewear", "Hat"]

skin_list = ["Torso", "Head","Eyebrows","Ears"]
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
eyes_list = ["medium"]
mouth_list = ["flat"]

shirt_list = ["none", "shirt"]
accessory_list = ["none","choker"]
coat_list = ["none","cardigan"]
eyewear_list = ["none","half"]
hat_list = ["none","straw"]

skin_colours =["#FFCC00","#00FFFF"]
clothing_colours = ["#FFCC00","#00FFFF"]

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

def listname(list):
    # return the string of the list's name
    if list ==outfit_list:
        return "outfit_list"
    if list ==outfit_list:
        return "outfit_list"    

def list_string(listname, list):
    # Creates a string to define a list for generated.js
    s = "const "+listname + " = ["
    for l in list:
        s+="\""+l+"\","
    s+="];\n"
    return s

def write_variables():
    # Write all the shared variables into generated.js
    content = open("generated.js","w")
    content.write("//generated by generate_images.py\n\n")
    content.write(list_string("outfit_list", outfit_list))
    content.write(list_string("body_list", body_list))
    content.write(list_string("expression_list", expression_list))
    content.write("\n")
    content.write(list_string("skin_list", skin_list))
    content.write(list_string("hair_list", hair_list))
    content.write("\n")
    content.write(list_string("head_list", head_list))
    content.write(list_string("torso_list", torso_list))
    content.write(list_string("eyebrow_list", eyebrow_list))
    content.write(list_string("shirt_list", shirt_list))
    content.write("\n")
    content.write("const skinNum = "+str(len(skin_colours))+"; //how many skin colours there are\n")
    content.close()

def process_list(item_list, colour_list):
    colour_list = skin_colours
    for c in range(len(colour_list)):
        loc = "../images/body/hair/hair_front"
        for item in item_list:
            if item!="none":
                process_image(item, loc, c, colour_list)


def process_all():
    process_list(hair_front_list, skin_colours)

write_variables()
process_all()