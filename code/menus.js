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

function download(data, filename, type) {
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