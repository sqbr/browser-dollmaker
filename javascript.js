/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        dropBtnClick()
    }
  }

function dropBtnClick(){
    var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }

}
var img_head = new Image();
var img_body = new Image();
img_head.src = "temp_images/sam_hair.png";
img_body.src = "temp_images/sam_face.png";

function canvasImgExperiment() {
        // declare all variables and functions
        var canvas = document.getElementById("portCanvas");
        var ctx = canvas.getContext("2d");
        
        for (row = 0; row < 3; row += 1) {
            ctx.drawImage(img_body, 0, row*256);
            ctx.drawImage(img_body, 256, row*256);
        }
        ctx.drawImage(img_head, 0, 0);
        //ctx.drawImage(img_head, 10, 10);
}
function exportCanvas(){
    var mycanvas = document.getElementById("portCanvas");
    var img = mycanvas.toDataURL("image/png;base64;");
    window.open(img,"","width=512,height=768");
}
window.onload = canvasImgExperiment;

// addbutton to cycle between colours
// then turn it into popup window
//then do all of body
//then add separatre windows for the different parts
//show: back, expression, front
//add save and load with text boxes

//https://github.com/ninique/Dollmaker-Script
//https://stackoverflow.com/questions/45187291/how-to-change-the-color-of-an-image-in-a-html5-canvas-without-changing-its-patte?rq=1
//https://stackoverflow.com/questions/24405245/html5-canvas-change-image-color
//https://stackoverflow.com/questions/9303757/how-to-change-color-of-an-image-using-jquery
//https://stackoverflow.com/questions/28301340/changing-image-colour-through-javascript
