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
  var filename = "dollmaker";
  var type = "";

  var clothes = [];
  for(let i = 0; i < sprite_clothes.length; i++){
    clothes.push({name: sprite_clothes[i], item:findNameMatch(sprite_objects,sprite_clothes[i]).item,colour: findNameMatch(sprite_objects,sprite_clothes[i]).colour,colour2: findNameMatch(sprite_objects,sprite_clothes[i]).colour2})
  }

  var load_variables = {
    ImageType: current_imageType, height: height, SkinColour: findNameMatch(portrait_objects,"Torso").colour, EyeColour: findNameMatch(portrait_objects,"Eyes").colour, HairColour: findNameMatch(portrait_objects,"Hair_front").colour, Facial_hair: findNameMatch(portrait_objects,"Facial_hair").colour, Hair: findNameMatch(portrait_objects,"Facial_hair").value_list[0],Nose: findNameMatch(portrait_objects,"Nose").value_list[0], Head: findNameMatch(portrait_objects,"Head").value_list[0], EyeType: eye_type, 
    clothes: clothes,  
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
        var el = document.getElementById('test'); 
        el.innerHTML = txt; //display output in DOM
    }   