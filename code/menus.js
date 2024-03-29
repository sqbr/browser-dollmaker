function download() {
  //download values of all variables that define current character into a json file
  //from https://stackoverflow.com/questions/13405129/create-and-save-a-file-with-javascript
  var data = "";
  var filename = "dollmaker_save.json";
  var type = "";

  var current_menu_objects = [];
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

    current_menu_objects.push({name: m.name, item:item,colour1: m.colour1,colour2: m.colour2, sleeves: sleeves})
  }

  var load_variables = {
    panelNum: panelNum, current_imageType: current_imageType, current_panel: current_panel, height: height, current_eyeType: eye_type, current_wedding_clothes: current_wedding_clothes, current_dance_clothes: current_dance_clothes,
    current_skinColour: findNameMatch(sprite_objects,"Head").colour1,current_eyeColour: findNameMatch(sprite_objects,"Eyes").colour1,current_hairColour: findNameMatch(sprite_objects,"Hairstyle").colour1,
    current_complexion: findNameMatch(portrait_objects,"Complexion").value_list[0],current_head: findNameMatch(portrait_objects,"Head").value_list[0],current_ears: findNameMatch(portrait_objects,"Ears").value_list[0], current_lips: current_lips,current_nose: findNameMatch(portrait_objects,"Nose").value_list[0],
    eye_expressions : eye_expressions, eyebrow_expressions : findNameMatch(portrait_objects,"Eyebrows").value_list,mouth_expressions : findNameMatch(portrait_objects,"Mouth").value_list,blush_expressions : findNameMatch(portrait_objects,"Blush").value_list,
    current_hair: findNameMatch(menu_objects, "Hairstyle").item,current_Facialhair :current_Facialhair, 
    current_menu_objects: current_menu_objects, 
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
    function readText(filePath,data_object) {
        var output = ""; //placeholder for text output
        reader.onload = function (e) {
            output = e.target.result;
            loadContents(output,data_object);
          };//end onload()
        reader.readAsText(filePath);
        return true;
    }  
    
    function setColour(input_string){

    }

    /**
     * load user selected file
     */
    function loadContents(txt,data_object) {
      var load_object = JSON.parse(txt);
      data_object = load_object;
      setVariables(load_object);
      Alpine.store('alpineData').fixAlpine();

    }   