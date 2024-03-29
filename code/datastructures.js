function setVariables(data_object){
    //transfer data from webpage/load file to internal javascript
    panelNum =data_object.panelNum; 

    current_imageType = data_object.current_imageType; //whether editing sprites or portraits
    currently_editing = data_object.currently_editing; //which element of editing list we are editing
    current_panel = data_object.current_panel;
    current_clothing = data_object.current_clothing;
    current_sprite_preset = data_object.current_sprite_preset;

    height = data_object.height;
    skinColour = data_object.current_skinColour;
    hairColour = data_object.current_hairColour;
    eyeColour = data_object.current_eyeColour;

    hairStyle = data_object.current_hair;
    current_Facialhair = data_object.current_Facialhair

    eye_type = data_object.current_eyeType;
    current_lips = data_object.current_lips;

    eye_expressions = data_object.eye_expressions; 

    current_wedding_clothes = data_object.current_wedding_clothes; 
    current_dance_clothes = data_object.current_dance_clothes;

    setValuelist("Eyebrows",data_object.eyebrow_expressions);
    setValuelist("Mouth",data_object.mouth_expressions);
    setValuelist("Blush",data_object.blush_expressions);

    setPortVariable(["Head"],data_object.current_head);
    setPortVariable(["Ears"],data_object.current_ears);
    setPortVariable(["Complexion"],data_object.current_complexion);
    setPortVariable(["Nose","Nose_front"],data_object.current_nose);

    for (let i = 0; i < menu_objects.length-1; i += 1){
        current_item = data_object.current_menu_objects[i].name; 
        if (current_item=="Shoes"){
            currentShoes = data_object.current_menu_objects[i].item;
            setSpriteColour(["Wheelchair_shoes"], data_object.current_menu_objects[i].colour1);
        }    
        else{
            if (current_item=="Gloves")
                currentGloves = data_object.current_menu_objects[i].item;
            else
                setClothing([current_item], data_object.current_menu_objects[i].item);
        }
        setClothingColour([current_item], data_object.current_menu_objects[i].colour1);
        setClothingColour2([current_item], data_object.current_menu_objects[i].colour2);
        if (sleeve_havers.indexOf(current_item)>-1){//this item has sleeves
            sleeve_list[sleeve_havers.indexOf(current_item)] = data_object.current_menu_objects[i].sleeves;
        }
    }


    //calculated from other variables
    let b;

    setSpriteVariable(["Arms","Torso"], height);
    
    setPortColour(skin_list, skinColour);
    setPortColour(hair_list, hairColour);
    setPortColour(["Stubble"], hairColour);
    setSpriteColour(["Hairstyle","Hairstyle_top", "Facial_hair"], hairColour);
    setBothColour(["Eyes"], eyeColour);
    setSpriteColour(["Torso","Arms","Head","Wheelchair_feet"], skinColour);
    setValuelist("Lips",data_object.mouth_expressions);

    b = findNameMatch(portrait_objects, "Lips");
    switch (current_lips){
        case 0:
        case 1:
            b.heightOffset = 2;
            break;
        case 2:
            b.heightOffset = 3;
            break;
        case 3:
            b.heightOffset = 5;
            break;
        case 4:
            b.heightOffset = 7;
            break;        

    }
        
    setSpecialSpriteColour(["Wedding","Flower dance"], skinColour);

    setClothing(["Hairstyle"],hairStyle);
    setClothingColour(["Hairstyle"],hairColour);
    if ([0,3].includes(hairStyle)){ //all bald hairstyles
        setSpriteVariable(["Head"], 0);
    }
    else{
        setSpriteVariable(["Head"], 1);
    } 

    if (current_Facialhair<facial_hair_list_port.length){
        setPortVariable(["Facial_hair"], current_Facialhair);
        setSpriteVariable(["Facial_hair"], current_Facialhair);
        setPortVariable(["Stubble"], 0);
        } 
    else{ //stubble
        setPortVariable(["Facial_hair"], 0);
        setSpriteVariable(["Facial_hair"], 0);
        setPortVariable(["Stubble"],1);
    }

    b = findNameMatch(sprite_objects, "Eyes");
    b.item = eye_type;
    b = findNameMatch(portrait_objects, "Eyes");
    for (let i = 0; i < 10; i += 1) {
        b.value_list[i] = eye_type*eye_expression_list_port.length + eye_expressions[i];
    }

    setSpriteVariable(["Shoes"], Math.max(0,2*currentShoes-1+height)); 
    setSpriteVariable(["Gloves"], Math.max(0,2*currentGloves-1+height));
    let sprite_obj = findNameMatch(sprite_objects, "Pants");
    let pants_obj = findNameMatch(sprite_obj.item_list, "trousers");
    pants_obj.location = "outfit/pants/longpants_"+height_list[height];

    let wheel_obj = findNameMatch(sprite_objects, "Wheelchair")
    let wheel_back_obj = findNameMatch(sprite_objects, "Wheelchair_back") 
    wheel_back_obj.item = wheel_obj.item
    wheel_back_obj.colour1 = wheel_obj.colour1
    wheel_back_obj.colour2 = wheel_obj.colour2

    if (wheel_obj.item>0){ //there's a wheelchair
        setSpriteVariable(["Wheelchair_feet"], 1);
        switch(currentShoes){
            case 0://no shoes
                setSpriteVariable(["Wheelchair_shoes"], 0);
                break;
            case 3:  //flip flops 
                setSpriteVariable(["Wheelchair_shoes"], 2); 
                break;
            default:    
                setSpriteVariable(["Wheelchair_shoes"], 1);
        }    
        setSpriteVariable(["Arms"], 2);  
        setSpriteVariable(["Gloves"], Math.max(0,3*currentGloves));  //0 if 0, 3 otherwise      

    }else{
        setSpriteVariable(["Wheelchair_feet"], 0);
        setSpriteVariable(["Wheelchair_shoes"], 0);

    }

    fixSpriteSources();
    fixPortSources();
    fixSpecialSpriteSources();

    drawCanvas();
}

document.addEventListener('alpine:init', () => {
    Alpine.data('dropdown', (titleInput = "",buttonNameInput = "",valueNameInput = "",listNameInput = "[]") => ({
      valueName: valueNameInput, //the value being set
      listName: listNameInput,//the list iut's being chosen from
      title: titleInput, //the name for this choice used in the webpage
      buttonName: buttonNameInput,//extra name info for the button

      dropbtn: {
        //Sets a variable in a list using a dropdown
          ['x-html']() {
            output = "";
            id = '"drop'+this.title+'"'
            if (this.title!="")
                output += '<label for='+id+'>'+this.title+'</label>: ';   
            output +='<button id='+id+' class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" x-text="'+'\''+this.buttonName+'\'+niceString('+this.listName+"[$store.alpineData."+this.valueName+"])"+'"></button>';
            output +='<ul class="dropdown-menu"> <template x-for=" (preset, index) in '+ this.listName+'">'; 
            output +='<li><button class="dropdown-item" x-on:click="$store.alpineData.'+this.valueName+'=index;setVariables(Alpine.store(\'alpineData\'));" x-text="niceString(preset)"></a></li>'; 
            output +='</template></ul>'
            return output 
          },
      },
      colourbtn: {
        //Sets a colour using the colour picker
        ['x-html']() {
            id = '"drop'+this.title+'"'
            output = '<label for='+id+'>'+this.title+'</label>: ';   
            output += '<input id='+id+' type="color" :value ="$store.alpineData.'+this.valueName+'"  @input="$store.alpineData.'+this.valueName+'=$event.target.value;setVariables(Alpine.store(\'alpineData\'));" :aria-label="colour_desc($store.alpineData.'+this.valueName+')"/>'
            return output 
            },
        },
  }))
  //data used by the Alpine components on the webpage
  Alpine.store('alpineData', {

    dark_theme: true,
    panelNum : 6,
    current_imageType : 0,
    currently_editing : 0,
    current_panel : 0,
    current_clothing : 0,
    current_sprite_preset : 0,

    current_skinColour: "#F9AE89",
    current_eyeColour: "#31AE2A",
    current_hairColour: "#893C3E",

    height : 0,
    current_complexion: 0,

    current_head :3,
    current_ears :1,
    current_lips: 2,
    current_hair :11,
    current_Facialhair : 0,
    current_nose :3,
    current_eyeType : 0,

    eyebrow_expressions : [6,2,3,1,4,5,6,6,6,6],
    eye_expressions : [0,2,1,0,3,4,0,0,0,0],
    mouth_expressions : [5,1,10,0,4,11,5,5,5,5],
    blush_expressions : [0,0,0,0,1,0,0,0,0,0],

    current_menu_objects : [
    {name: 'Hat', item: 0, colour1: "#FEFF00",colour2: outfit_colours[0], sleeves: 0},
    {name: 'Neckwear', item: 0, colour1: "#46FF00",colour2: outfit_colours[2], sleeves: 0},
    {name: 'Eyewear', item: 0, colour1: "#00FF43",colour2: outfit_colours[4], sleeves: 0},
    {name: 'Earrings', item: 0, colour1: "#00FFC5",colour2: outfit_colours[6], sleeves: 0},
    {name: 'Shirt', item: 6, colour1: "#9DF989",colour2: outfit_colours[8], sleeves: 0},
    {name: 'Overshirt', item: 0, colour1: "#0018FF",colour2: outfit_colours[10], sleeves: 0},
    {name: 'Coat', item: 0, colour1: "#C200FF",colour2: outfit_colours[12], sleeves: 0},
    {name: 'Pants', item: 2, colour1: "#036BB9",colour2: outfit_colours[14], sleeves: 0},
    {name: 'Shoes', item: 1, colour1: "#5B2010",colour2: outfit_colours[16], sleeves: 0},
    {name: 'Gloves', item: 0, colour1: "#9DF989",colour2: outfit_colours[18], sleeves: 0},
    {name: 'Wheelchair', item: 0, colour1: "#FEFF00",colour2: outfit_colours[0], sleeves: 0},
    ],

    current_wedding_clothes : 0,
    current_dance_clothes : 0,
    fixAlpine() { //make the alpine components match the variables used by the javascript
        for(let i = 0; i < menu_objects.length-1; i++){
            m = menu_objects[i];
            var sleeves = 0;
            var item = m.item;
            if (m.name =="Shoes")
              item=currentShoes;
            if (m.name =="Gloves")
              item=currentGloves;  
            if (sleeve_havers.indexOf(m.name)>-1)//this item has sleeves
              sleeves = sleeve_list[sleeve_havers.indexOf(m.name)] ; 
        
            this.current_menu_objects[i]={name: m.name, item:item,colour1: m.colour1,colour2: m.colour2, sleeves: sleeves};
          }
        
            this.height= height;
            this.current_eyeType= eye_type;
            this.current_wedding_clothes= current_wedding_clothes;
            this.current_dance_clothes= current_dance_clothes;
            this.current_skinColour= findNameMatch(sprite_objects,"Head").colour1;
            this.current_eyeColour= findNameMatch(sprite_objects,"Eyes").colour1;
            this.current_hairColour= findNameMatch(sprite_objects,"Hairstyle").colour1;
            this.current_complexion= findNameMatch(portrait_objects,"Complexion").value_list[0];
            this.current_head= findNameMatch(portrait_objects,"Head").value_list[0];
            this.current_ears= findNameMatch(portrait_objects,"Ears").value_list[0];
            this.current_lips= current_lips;
            this.current_nose= findNameMatch(portrait_objects,"Nose").value_list[0];
            this.eye_expressions = eye_expressions;
            this.eyebrow_expressions = findNameMatch(portrait_objects,"Eyebrows").value_list;
            this.mouth_expressions = findNameMatch(portrait_objects,"Mouth").value_list;
            this.blush_expressions = findNameMatch(portrait_objects,"Blush").value_list;
            this.current_hair= findNameMatch(menu_objects,"Hairstyle").item;
            this.current_Facialhair =current_Facialhair;
            
    },

    randomiseBodyColouring(){
        //randomise the skin/eye/hair colour
        this.current_skinColour = randomElement(skin_colours);
        this.current_hairColour = randomElement(hair_colours);
        this.current_eyeColour = randomElement(eye_colours);
    },
    randomiseFeatures(gender){
        //randomise the nose/head/hairstyle etc
        // gender: 0 =androgynous, 1 =masculine, 2=feminine
        possible_hair = gendered_lists[menu_objects.length-1][gender];
        this.current_hair =  randomElement(possible_hair);

        switch(gender){
            case 0: //androgynous
                this.current_Facialhair = randomIndex(facial_hair_list_menu,0.75);
                this.current_eyeType = randomElement([0,1,2]);
                this.current_head = randomIndex(head_list,0);
                break;
            case 1: //man
                this.current_head = randomElement([0,1,2,3,6]);
                this.current_Facialhair = randomIndex(facial_hair_list_menu,0.75);
                this.current_eyeType = randomElement([0,1]);
                break;
            case 2: //woman
                this.current_head = randomElement([3,4,5,6]);
                this.current_Facialhair = 0;
                this.current_eyeType = randomElement([0,2]);
                
        }

        if (Math.random()>0.9)//weirder eyes happen rarely
            this.current_eyeType = randomElement([3,4]);
            
        this.current_head = randomIndex(head_list,0);
        
        this.current_nose = Math.max(1,randomIndex(nose_list,0));
        this.current_lips = randomIndex(lip_list,0);
        if (Math.random()< 0.9)
            this.current_ears = 1;
        else
            this.current_ears = Math.max(1,randomIndex(ear_list,0));  
        
        this.current_complexion = randomIndex(complexion_list,0.3);
        this.height = randomIndex([0,1],0);
    },
    randomiseClothingColour(){
        //randomise all clothing colours
        for(let i = 0; i < menu_objects.length-1; i++){
            this.current_menu_objects[i].colour1 = randomElement(outfit_colours);
            this.current_menu_objects[i].colour2 = randomElement(outfit_colours);
        }

    },
    randomiseClothingValue(gender){
        //set all clothing values including sleeve length
        // gender: 0 =androgynous, 1 =masculine, 2=feminine
        for(let i = 0; i < menu_objects.length-1; i++){
            let obj = menu_objects[i]
            possible_values = gendered_lists[i][gender];

            if (["Shoes","Pants","Shirt"].includes(obj.name)) 
                bias = 0;
            else {
                if (["Wheelchair"].includes(obj.name)){
                    bias = 0.9
                } else{
                    bias = 0.6;
                } 
            }   
            this.current_menu_objects[i].item = possible_values[randomIndex(possible_values,bias)];   
            this.current_menu_objects[i].sleeves = randomIndex([0,1,2],0);
        }
        switch(gender){
            case 0: //androgynous
                this.current_wedding_clothes= randomIndex([0,1,2],0);
                if (this.current_wedding_clothes ==0)
                    this.current_dance_clothes= randomIndex([0,1],0);
                else    
                    this.current_dance_clothes= this.current_wedding_clothes -1;
                break;
            case 1: //man
                this.current_wedding_clothes= 2;
                this.current_dance_clothes= 1;
                break;
            case 2: //woman
                this.current_wedding_clothes= 1;
                this.current_dance_clothes= 0;
                
        }
        
    },
    randomiseAll(){
        this.randomiseBodyColouring();
        this.randomiseFeatures(0);
        this.randomiseClothingColour();
        this.randomiseClothingValue(0);
    },
    randomiseMan(){
        this.randomiseBodyColouring();
        this.randomiseFeatures(1);
        this.randomiseClothingColour();
        this.randomiseClothingValue(1);
        
    },
    randomiseWoman(){
        this.randomiseBodyColouring();
        this.randomiseFeatures(2);
        this.randomiseClothingColour();
        this.randomiseClothingValue(2);

    },
    
})
  })

function niceString(input){
    //the text to put in a button
    let output = input.toString();
    output = output.replace("_", " ");
    return output.charAt(0).toUpperCase()+output.slice(1)

}

function oldX(obj, column){
    //return the X coordinate of the column of the original image
    let xgap = 0;
    if (obj.isWalk){
        if (findNameMatch(sprite_objects, "Wheelchair").item==0 || !["Torso","Shoes","Pants"].includes(obj.name)) //there isn't a wheelchair
            xgap = obj.dimensions[0];
    }
    return obj.topcorner[0]+column*xgap;
}

function oldY(obj, row){
    //return the Y coordinate of the row of the original image
    return obj.topcorner[1]+row*obj.dimensions[1];
}

function newX(obj, row, column){
    //return the X coordinate of the column of the new image
    let gap = 0;
    return 16*column+obj.offset[0]+gap;
}

function newY(obj, row,column){
    //return the Y coordinate of the row of the new image
    let bob = 0;
    if (findNameMatch(sprite_objects, "Wheelchair").item>0){ //there is a wheelchair 
        if (["Torso","Shoes","Pants"].includes(obj.name))
            bob = -1 
        return row*32+obj.offset[1]+bob;
    }
    else{    
        if (obj.bobs){
            bob =column%2;
            if (row == 2)
                bob-=1;
        }
        if ((obj.name.includes("Hairstyle")) && [1,3].includes(row))
            bob-=1;        
        return row*32+obj.offset[1]+bob+(1-height)*obj.heightOffset;
    }    
}

function drawCanvas() {
    //draw the preview and export canvases
    canvas = document.getElementById("exportCanvas");
    ctx = canvas.getContext("2d");
    canvas_preview = document.getElementById("previewCanvas");
    ctx_preview = canvas_preview.getContext("2d");

    //preview canvas
    canvas_preview.width = canvas_preview.width; //clears
    //document.getElementById("closet").innerHTML = print_portrait_objects();
    let hair = findNameMatch(sprite_objects, "Hairstyle");
    for (let i = 0; i < sprite_objects.length; i += 1){ //sprite preview
        let b = sprite_objects[i];
        if (b.base_image.src !=""){ 
            if (b.name =="Wheelchair" && b.item!=0){//clear legs
                ctx_preview.clearRect(64, 100, 64, 40); 
            }
            for (let column = 0; column < 2; column += 1) //column 1-2
                if(b.name !="Hairstyle_top" || column >0)
                    draw_coloured_sprite(b, ctx_preview, b.colour1, oldX(b,0), oldY(b,column),b.dimensions[0],b.dimensions[1],4*newX(b,0,column),4*newY(b,0,column),b.dimensions[0]*4,b.dimensions[1]*4);
            draw_coloured_sprite(b, ctx_preview, b.colour1, oldX(b,0), oldY(b,3),b.dimensions[0],b.dimensions[1],4*newX(b,2,2),4*(newY(b,2,2)-64),b.dimensions[0]*4,b.dimensions[1]*4);
        }        
    }
    //portrait preview
    ctx_preview.drawImage(portrait_back, 256, 0);
    for (let i = 0; i < portrait_objects.length; i += 1){
        let b = portrait_objects[i];
        if (b.item_list[b.value_list[current_panel]] !="None"){ 
            draw_coloured_port(b,current_panel,b.colour1,ctx_preview, 0,-getOffset(b.name)-b.heightOffset,256, 0);
        }
    }
    //main canvas
    if (current_imageType==0){ //portrait
        let numrows;
        let numcols;
        if (panelNum ==1){
            numcols = 1;
        }else{
            numcols = 2;
        }
        if (panelNum%2 == 1){
            numrows = (panelNum+1)/2;
        }else{
            numrows = panelNum/2;
        }
        canvas.height = panel_width*numrows;
        canvas.width =  panel_width*numcols;
        let ctx = canvas.getContext("2d");
        
        for (let row = 0; row < numrows; row += 1) {
            for (let column = 0; column < numcols; column += 1) {
                if (row*2+column < panelNum){
                    let xpos = panel_width*column;
                    let ypos = panel_width*row;
                    for (let i = 0; i < portrait_objects.length; i += 1){
                        let b = portrait_objects[i];
                        if (b.item_list[b.value_list[row*2+column]] !="None"){ 
                            draw_coloured_port(b,row*2+column,b.colour1,ctx, 0,-getOffset(b.name)-b.heightOffset, xpos, ypos);
                        }
                    }
                }
            }
        }
    } else{ //sprites
        canvas.width =  64;
        if (current_sprite_preset == 0)
            canvas.height = 128;
        else    
            canvas.height = 416;
        
        //document.getElementById("closet").innerHTML = print_sprite_objects();
        //sourceX, sourceY, sourceWidth, sourceHeight, destWidth and destHeight   
        for (let i = 0; i < sprite_objects.length; i += 1){
            let b = sprite_objects[i];
            if (b.base_image.src !=""){ 
                if (b.name =="Wheelchair" && b.item!=0){//clear legs
                    ctx.clearRect(0, 56, 64, 7); 
                    ctx.clearRect(0, 121, 64, 7); 

                }
                for (let row = 0; row < 2; row += 1){//rows 1,2   
                    for (let column = 0; column < 2; column += 1)
                        if(b.name !="Hairstyle_top" || column >0)
                            draw_coloured_sprite(b, ctx, b.colour1, oldX(b,column), oldY(b,row),b.dimensions[0],b.dimensions[1],newX(b,row,column), newY(b,row,column),b.dimensions[0],b.dimensions[1]);//column 1
                    draw_coloured_sprite(b, ctx, b.colour1,oldX(b,0), oldY(b,row),b.dimensions[0],b.dimensions[1],newX(b,row, 2), newY(b,row,2),b.dimensions[0],b.dimensions[1]); //column 3  
                    draw_coloured_sprite(b, ctx, b.colour1, oldX(b,2), oldY(b,row),b.dimensions[0],b.dimensions[1],newX(b,row,3), newY(b,row,3),b.dimensions[0],b.dimensions[1]); //column 4              
                }
                if (b.rowNum==4){ //don't have to flip
                        for (let column = 0; column < 2; column += 1){
                            draw_coloured_sprite(b, ctx, b.colour1, oldX(b,column), oldY(b,3),b.dimensions[0],b.dimensions[1],newX(b,2,column), newY(b,2,column),b.dimensions[0],b.dimensions[1]);//ROW 3
                            draw_coloured_sprite(b, ctx, b.colour1, oldX(b,column), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,column), newY(b,3,column),b.dimensions[0],b.dimensions[1]);//ROW 4
                        }
                        draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,3),b.dimensions[0],b.dimensions[1],newX(b,2,2), newY(b,2,2),b.dimensions[0],b.dimensions[1]); //column 3 row 3 
                        draw_coloured_sprite(b, ctx, b.colour1, oldX(b,2), oldY(b,3),b.dimensions[0],b.dimensions[1],newX(b,2,3), newY(b,2,3),b.dimensions[0],b.dimensions[1]); //column 4  row 3 
                        draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,2), newY(b,3,2),b.dimensions[0],b.dimensions[1]); //column 3 row 4 
                        draw_coloured_sprite(b, ctx, b.colour1, oldX(b,2), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,3), newY(b,3,3),b.dimensions[0],b.dimensions[1]); //column 4  row 4             
    
                }
                
            }
        }  
        if (current_sprite_preset >0){
            var wedding_height = 288;
            var dance_height = 320;
            var sleeping_height = 256
            if (current_gender ==1){//male love interest
                wedding_height = 384;
                dance_height = 352;
            }
            let noWeddingOutfit = (findNameMatch(special_sprite_objects,"Wedding").item==0);
            //heads behind clothes

            for (let i = 0; i < sprite_objects.length; i += 1){
                let b = sprite_objects[i];
                if (b.base_image.src !=""){ 
                    if (sprite_special_list.includes(b.name) || noWeddingOutfit){
                        if (b.name=="Wheelchair"){
                            ctx.clearRect(15, wedding_height-40, 64, 7); 
                            ctx.clearRect(30, wedding_height-40, 64, 7); 
                        }
                        //wedding  
                        let wedding_offset =0;
                        if (sprite_special_list.includes(b.name) && b.name!="Wheelchair_back")
                            wedding_offset =1;
                        if (b.name =="Wheelchair" && b.item!=0){//clear legs
                            ctx.clearRect(16, 24+wedding_height, 48, 7); 
                        }    
                        draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0), newY(b,0,0)+wedding_height,b.dimensions[0],b.dimensions[1]);//facing forward
                        draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,0)+15, newY(b,3,0)+wedding_height-96+wedding_offset,b.dimensions[0],b.dimensions[1]); //sideways not kissing
                        if (b.name =="Eyes")
                            ctx.drawImage(closed_eyes_image, 36, 24,12,12,32, wedding_height+4,12,12);
                        else{  //sideways, kissing 
                            if (b.name=="Arms" || b.name.includes("sleeves")|| b.name=="Gloves")   //shonky 'reaching forward' arm
                                draw_coloured_sprite(b, ctx, b.colour1, oldX(b,2), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,0)+29, newY(b,3,0)+wedding_height-96,b.dimensions[0],b.dimensions[1]);
                            else
                                draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,0)+30, newY(b,3,0)+wedding_height-96+wedding_offset,b.dimensions[0],b.dimensions[1]);
                        }
                    }
                    //sleeping/kissing
                    if (b.name =="Wheelchair" && b.item!=0){//clear legs
                        ctx.clearRect(0, sleeping_height+25, 16, 7); 
                    }  
                    if (b.name =="Eyes")
                        ctx.drawImage(closed_eyes_image, 36, 24,12,12,-1, sleeping_height+3,12,12);
                    else { 
                        if (b.name=="Arms" || b.name.includes("sleeves")|| b.name=="Gloves")  //shonky 'reaching forward' arm
                            draw_coloured_sprite(b, ctx, b.colour1, oldX(b,2), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,0)-4, newY(b,3,0)+sleeping_height-96,b.dimensions[0],b.dimensions[1]);
                        else
                            draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,2),b.dimensions[0],b.dimensions[1],newX(b,3,0)-3, newY(b,3,0)+sleeping_height-96,b.dimensions[0],b.dimensions[1]);
                    }    
                    if (sprite_special_list.includes(b.name)){    
                        if (current_gender==0){
                            //female 
                            //dance heads
                            let dance_offset = 1;   
                            if (b.name =="Wheelchair_back")
                                dance_offset = 0;
                                
                            for (let column = 0; column < 2; column++)
                                draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0)+column*16, newY(b,0,0)+dance_height,b.dimensions[0],b.dimensions[1]);
                            draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0)+2*16-1, newY(b,0,0)+dance_height,b.dimensions[0],b.dimensions[1]);    
                            draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0)+3*16, newY(b,0,0)+dance_height+dance_offset,b.dimensions[0],b.dimensions[1]);  
                            for (let column = 0; column < 2; column++)
                                draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0)+column*16, newY(b,0,0)+dance_height+32+dance_offset,b.dimensions[0],b.dimensions[1]);  
                            draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0)+2*16, newY(b,0,0)+dance_height+32,b.dimensions[0],b.dimensions[1]);  
                            draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,0),b.dimensions[0],b.dimensions[1],newX(b,0,0)+3*16, newY(b,0,0)+dance_height+32+dance_offset,b.dimensions[0],b.dimensions[1]);  
                        } 
                    }
                }
            }
            for (let i = 0; i < special_sprite_objects.length; i += 1){
                let b = special_sprite_objects[i];
                if (b.base_image.src !=""){ 
                    draw_coloured_sprite(b, ctx, b.colour1, 0, 0,b.dimensions[0],b.dimensions[1],0, b.heightOffset,b.dimensions[0],b.dimensions[1]);
                }
            }

            //heads in front of clothes

            for (let i = 0; i < sprite_objects.length; i += 1){
                let b = sprite_objects[i];
                if (b.base_image.src !=""){ 
                    if (sprite_special_list.includes(b.name)|| b.name =="Wheelchair"){
                        if (current_gender ==1){
                            //male 
                            //dance heads
                            dance_offset = 1;  
                            if (findNameMatch(sprite_objects, "Wheelchair").item>0) //there is a wheelchair    
                                dance_offset = 0;  
                            draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,3),b.dimensions[0],b.dimensions[1],newX(b,2,0), newY(b,2,0)+dance_height-64,b.dimensions[0],b.dimensions[1]);
                            for (let column = 1; column < 4; column++)
                                draw_coloured_sprite(b, ctx, b.colour1, oldX(b,0), oldY(b,3),b.dimensions[0],b.dimensions[1],newX(b,2,0)+column*16, newY(b,2,0)+dance_height-64+dance_offset,b.dimensions[0],b.dimensions[1]);  
                        }   
                    }
                }
            }
            
        }
    }
}

function setup(){
    
    document.getElementById('download').addEventListener('click', function(e) {
        // from https://fjolt.com/article/html-canvas-save-as-image
        canvas = document.getElementById("exportCanvas");
        // Convert our canvas to a data URL
        let canvasUrl = canvas.toDataURL();
        // Create an anchor, and set the href value to our data URL
        const createEl = document.createElement('a');
        createEl.href = canvasUrl;
    
        // This is the name of our downloaded file
        createEl.download = "dollmaker image";
    
        // Click the download button, causing a download, and then remove it
        createEl.click();
        createEl.remove();
    })
    checkFileAPI();
    Alpine.store('alpineData').randomiseBodyColouring();
    Alpine.store('alpineData').randomiseFeatures(0);
    Alpine.store('alpineData').randomiseClothingColour();
    Alpine.store('alpineData').randomiseClothingValue(0);

    //fix variables
    setVariables(Alpine.store('alpineData'));
    Alpine.store('alpineData').fixAlpine();
    
    drawCanvas();
}
let portrait_back = new Image();
portrait_back.src = "images/portrait_back.png";
const off_canvas = new OffscreenCanvas(256, 268);
const off_ctx = off_canvas.getContext("2d");
window.onload = setup;
var game = setInterval(drawCanvas, 500);//Update canvas every 100 miliseconds


//Some useful posts:
//https://github.com/ninique/Dollmaker-Script
//https://stackoverflow.com/questions/45187291/how-to-change-the-color-of-an-image-in-a-html5-canvas-without-changing-its-patte?rq=1
//https://stackoverflow.com/questions/24405245/html5-canvas-change-image-color
//https://stackoverflow.com/questions/9303757/how-to-change-color-of-an-image-using-jquery
//https://stackoverflow.com/questions/28301340/changing-image-colour-through-javascript
//https://stackoverflow.com/questions/32784387/javascript-canvas-not-redrawing
