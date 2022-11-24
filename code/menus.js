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
    let img = mycanvas.toDataURL("image/png;base64;");
    window.open(img,"","width="+canvas_width+",height="+canvas_height);
}