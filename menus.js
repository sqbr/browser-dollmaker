/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        dropBtnClose()
    }
  }

function dropBtnClose(){
    var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }

}
function exportCanvas(){
    var mycanvas = document.getElementById("portCanvas");
    var img = mycanvas.toDataURL("image/png;base64;");
    window.open(img,"","width=512,height=768");
}