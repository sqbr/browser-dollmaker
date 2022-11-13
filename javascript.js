


function canvasImgExperiment() {
        // declare all variables and functions
        var canvas = document.getElementById("portCanvas");
        var ctx = canvas.getContext("2d");
        var img_head = new Image();
        var img_body = new Image();
        img_head.src = "spritecreator_images/temp/pink_head.png";
        img_body.src = "spritecreator_images/temp/green_body.png";
        //ctx.drawImage(img_body, 10, 10);
        ctx.drawImage(img_head, 10, 10);
}
function exportCanvas(){
    var mycanvas = document.getElementById("portCanvas");
    var img = mycanvas.toDataURL("image/png;base64;");
    window.open(img,"","width=700,height=700");
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
