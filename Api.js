    //  Shapes button action code is this
    function shape_Drawings() {
        var x = document.getElementById("demo");
        x.style.display = "block";
  
      }
    
      

//-----------------------------------------------------------------------------------------------



  // JavaScript code for drawing app

   // drawing and undo button code
   window.onload = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
   
    var colorInput = document.getElementById('color');
    var brushSizeInput = document.getElementById('brush-size');

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);




    var isDrawing = false;

    function startDrawing(event) {
      isDrawing = true;
        context.beginPath();
        context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        
        // Save the current canvas state
        saveCanvasState();
    }
  
    function draw(event) {
        if (isDrawing) {
            context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
            context.strokeStyle = colorInput.value;
            context.lineWidth = brushSizeInput.value;
            context.lineCap = 'round';
            context.stroke();
            
            // Save the current canvas state
            saveCanvasState();
        }
    }
    
    function stopDrawing() {
      isDrawing = false;
    }
    
    //-------------------------------------------------------------------------------------

    var drawingStates = [];
    function saveCanvasState() {
        drawingStates.push(context.getImageData(0, 0, canvas.width, canvas.height));
    }
    //----------------------------------------------------------------------------------------

    //   Zoom-in and zoom-out code start here

// Get zoom buttons
var zoomInButton = document.getElementById('zoom-in-button');
var zoomOutButton = document.getElementById('zoom-out-button');

// Adding event listeners for zoom buttons
zoomInButton.addEventListener('click', zoomIn);
zoomOutButton.addEventListener('click', zoomOut);


// Initialize zoom level
var zoomLevel = 1;

// Function for zoom in
function zoomIn() {
  if (zoomLevel < 1.3) {
    zoomLevel += 0.1; 
    updateCanvasTransform();
  }
}

// Function for zoom out
function zoomOut() {
    if (zoomLevel > 0.5) { // Ensure you don't zoom out too much
        zoomLevel -= 0.1; 
        updateCanvasTransform();
    }
}

// Function for update canvas transform (scale)
function updateCanvasTransform() {
    canvas.style.transform = `scale(${zoomLevel})`;
}

//   Zoom-in and zoom-out code end here

   //------------------------------------------------------------------------------------------

  //  Clear canvas  code start here 
  var clearButton = document.getElementById('clear-button');
  clearButton.addEventListener('click', clearCanvas);

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawingStates = [];
    }
    

//------------------------------------------------------------------------------------------

  //  Sava Drawing  sheet code start here    
  var saveButton = document.getElementById('save-button');
      saveButton.addEventListener('click', saveDrawing);


    function saveDrawing() {
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = image;
        link.click();
    }
    
//------------------------------------------------------------------------------------------


  //  Undo Button Function code start here
  var undoButton = document.getElementById('undo-button');
    undoButton.addEventListener('click', undoDrawing);


    function undoDrawing() {
      if (drawingStates.length > 0) {
          drawingStates.pop(); 
  
         
          if (drawingStates.length > 0) {
              drawingStates.forEach(function (imageData) {
                  context.putImageData(imageData, 0, 0);
              });
          }
      }
  }
  
  };
          
  
  //------------------------------------------------------------------------------------------

  
  
  

       /*  color fill in background script start here */
       
      function colorFill() {
        const randomColor = getRandomColor();
        canvas.style.backgroundColor = randomColor;
      }
      
    
      function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      