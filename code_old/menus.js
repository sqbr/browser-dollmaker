/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropFunction(id) {
    document.getElementById(id).classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        dropBtnClose()
    }
  }

function dropBtnClose(){
    let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
}

function exportCanvas(){ //broken
    let mycanvas = document.getElementById("exportCanvas");
    let img = mycanvas.toDataURL();
    //window.open(img,"","width="+canvas_width+",height="+canvas_height);
    //const a = document.createElement("a");
    //a.href = img;
    //a.setAttribute("download", "SketchDownload");
    //a.click();
}

function download() {
  //from https://stackoverflow.com/questions/13405129/create-and-save-a-file-with-javascript
  var data = "";
  var filename = "dollmaker_save.json";
  var type = "";

  var menu_objects_save = [];
  for(let i = 0; i < menu_objects.length; i++){
    m = menu_objects[i];
    menu_objects_save.push({name: m.name, item:m.item,colour: m.colour,colour2: m.colour2})
  }
  var portrait_objects_save = [];
  for(let i = 0; i < portrait_objects.length; i++){
    m = portrait_objects[i];
    portrait_objects_save.push({name: m.name, value_list:m.value_list,colour: m.colour,colour2: m.colour2})
  }
  var sprite_objects_save = [];
  for(let i = 0; i < sprite_objects.length; i++){
    m = sprite_objects[i];
    sprite_objects_save.push({name: m.name, item:m.item,colour: m.colour,colour2: m.colour2})
  }

  var special_sprite_objects_save = [];
  for(let i = 0; i < special_sprite_objects.length; i++){
    m = special_sprite_objects[i];
    special_sprite_objects_save.push({name: m.name, item:m.item,colour: m.colour,colour2: m.colour2})
  }

  var load_variables = {
    ImageType: current_imageType, height: height, eye_type: eye_type, sleeve_list: sleeve_list, currentShoes: currentShoes,currentGloves: currentGloves, current_wedding_clothes: current_wedding_clothes, current_dance_clothes: current_dance_clothes, current_gender: current_gender,
    menu_objects_save: menu_objects_save,  portrait_objects_save: portrait_objects_save, sprite_objects_save: sprite_objects_save,special_sprite_objects_save: special_sprite_objects_save
  }    
  
  data = JSON.stringify(load_variables);
  var file = new Blob([data], {type: type});
  if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
      var a = document.createElement("a"),
              url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
      }, 0); 
  }
}

//https://stackoverflow.com/questions/13709482/how-to-read-text-file-in-javascript

var reader; //GLOBAL File Reader object for demo purpose only

    /**
     * Check for the various File API support.
     */
    function checkFileAPI() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            reader = new FileReader();
            return true; 
        } else {
            alert('The File APIs are not fully supported by your browser. Fallback required.');
            return false;
        }
    }

    /**
     * read text input
     */
    function readText(filePath) {
        var output = ""; //placeholder for text output
        if(filePath.files && filePath.files[0]) {           
            reader.onload = function (e) {
                output = e.target.result;
                loadContents(output);
            };//end onload()
            reader.readAsText(filePath.files[0]);
        }//end if html5 filelist support
        else if(ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
            try {
                reader = new ActiveXObject("Scripting.FileSystemObject");
                var file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
                output = file.ReadAll(); //text contents of file
                file.Close(); //close file "input stream"
                loadContents(output);
            } catch (e) {
                if (e.number == -2146827859) {
                    alert('Unable to access local files due to browser security settings. ' + 
                     'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' + 
                     'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"'); 
                }
            }       
        }
        else { //this is where you could fallback to Java Applet, Flash or similar
            return false;
        }       
        return true;
    }   

    /**
     * load user selected file
     */
    function loadContents(txt) {
      var load_object = JSON.parse(txt);
      var menu_objects_load = load_object.menu_objects_save;
      var portrait_objects_load = load_object.portrait_objects_save;
      var sprite_objects_load = load_object.sprite_objects_save;
      var special_sprite_objects_load = load_object.special_sprite_objects_save;
      //document.getElementById("test").innerHTML = temp_object.toString();
      for(let i = 0; i < portrait_objects.length; i++){
          var oldm =portrait_objects[i]; 
          var newm = portrait_objects_load[i];
          oldm.colour = newm.colour;
          oldm.colour2 = newm.colour2;
          oldm.value_list = newm.value_list;
      }
      for(let i = 0; i < sprite_objects.length; i++){
        var oldm =sprite_objects[i]; 
        var newm = sprite_objects_load[i];
        oldm.colour = newm.colour;
        oldm.colour2 = newm.colour2;
        oldm.item = newm.item;   
      } 
      for(let i = 0; i < special_sprite_objects.length; i++){
        var oldm =special_sprite_objects[i]; 
        var newm = special_sprite_objects_load[i];
        oldm.colour = newm.colour;
        oldm.colour2 = newm.colour2;
        oldm.item = newm.item;   
      } 
      for(let i = 0; i < menu_objects.length; i++){
        var oldm =menu_objects[i]; 
        var newm = menu_objects_load[i];
        oldm.colour = newm.colour;
        oldm.colour2 = newm.colour2;
        oldm.item = newm.item;    
      }  

      currentShoes = load_object.currentShoes;
      currentGloves= load_object.currentGloves;
      sleeve_list = load_object.sleeve_list;
      current_wedding_clothes =  load_object.current_wedding_clothes;
      current_dance_clothes= load_object.current_dance_clothes;
      current_gender= load_object.current_gender;

      setImageType([], load_object.ImageType)
      setEyeType([],load_object.eye_type)
      setHeight([],load_object.height);

      setHair([],findNameMatch(menu_objects_load, "Hairstyle").item);

      setMenu([],currently_editing);

    }   