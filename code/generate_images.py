from __future__ import print_function
import sys
import math
from PIL import Image
from PIL import ImageEnhance
import glob

# python generate_images.py

skin_list = ["Torso", "Head"]
clothes_list = ["Shirt"]

skin_colours =["#FFCC00","#00FFFF"]


## general data functions  
def list_directory(directory,pattern):
    #lists every element of a directory matching the pattern
    return [path.split("/").pop() for path in glob.glob(directory+pattern)]
  
def sort(l):
    # a terrible sorting algorithm
    for i in range(len(l)):
        min_idx = i
        for j in range(i+1, len(l)):
            if l[min_idx] > l[j]:
                min_idx = j
                  
        # Swap the found minimum element with 
        # the first element        
        l[i], l[min_idx] = l[min_idx], l[i]   
    return l     
    
def remove_list(list1,list2):
    #list1 minus any elements of list2
    new_list = []
    for l in list1:
        if not l in list2:
            new_list.append(l)
    return new_list  

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

def colour_this(pixel, colour):
    oldr = pixel[0]
    oldg = pixel[1]
    oldb = pixel[2]
    new_colour = hex_to_rgba(colour)
    r = 0
    g = 255
    b = oldb
    return (r, g, b, pixel[3])


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

process_image("round", "../images/body/head", 0, skin_colours)