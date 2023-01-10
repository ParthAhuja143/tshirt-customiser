import './App.css';
import { batman, bgImage } from './assets';
import { fabric } from 'fabric'
import { useEffect, useRef, useState } from 'react';
import { InputLabel, Select, MenuItem, Button, Container, Stack, Grid, Paper } from '@mui/material'

function App() {
  const [canvas, setCanvas] = useState(null);
  const fileInput = useRef();
  
  const initCanvas = () => (
    new fabric.Canvas('canvas', {
    })
  )

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const [bgcolor, setbgcolor] = useState('');

  function updateTshirtImage(imageURL){
    // If the user doesn't pick an option of the Select, clear the canvas
    if(!imageURL){
        canvas.clear();
    }

    // Create a new image that can be used in Fabric with the URL
    fabric.Image.fromURL(imageURL, function(img) {
        // Define the image as background image of the Canvas
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            // Scale the image to the canvas size
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height
        });
    });
  }


    // Update the TShirt color according to the selected color by the user
    const changeTshirtColor = function(e){
      setbgcolor(e.target.value)
    }

    const changeTshirtDesign = function(e){
      updateTshirtImage(e.target.value);
    }

    // When the user clicks on upload a custom picture
    const handleChange = function(e){
      var reader = new FileReader();
      
      reader.onloadend = (event) => {
          var imgObj = new Image();
          imgObj.src = event.target.result;
          // When the picture loads, create the image in Fabric.js
          imgObj.onload = function () {
              var img = new fabric.Image(imgObj);
              console.log(img)
              img.scaleToHeight(300);
              img.scaleToWidth(300); 
              canvas.centerObject(img);
              canvas.add(img).setActiveObject(img).renderAll();
          };
      };

      // If the user selected a picture, load it
      if(e.target.files[0]){
          reader.readAsDataURL(e.target.files[0]);
      }
    };

  return (
    <Grid container spacing={2} className="App" fixed style={{padding: '2rem'}}>
      <Grid item xs={4}>
        <Paper elevation={3} id="tshirt-div" style={{
          backgroundColor: bgcolor === '' ? "inherit" : bgcolor,
        }}>
          <img id="tshirt-backgroundpicture" src={bgImage}/>
          <div id="drawingArea" className="drawing-area">					
              <div className="canvas-container">
                  <canvas id="canvas" width="200" height="400"></canvas>
              </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel id="tshirt-design" style={{width: "50%"}}>T-Shirt Design:</InputLabel>
            <Select style={{width: "100%"}} labelId="tshirt-design" id="tshirt-design" onChange={changeTshirtDesign} defaultValue="" label="Select Design">
                <MenuItem value="">Select one of our designs ...</MenuItem>
                <MenuItem value={batman}>Batman</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="tshirt-color">T-Shirt Color:</InputLabel>
            <Select style={{width: "100%"}} labelId="tshirt-color" id="tshirt-color" onChange={changeTshirtColor} label="Select Color">
                <MenuItem value="#fff">White</MenuItem>
                <MenuItem value="#000">Black</MenuItem>
                <MenuItem value="#f00">Red</MenuItem>
                <MenuItem value="#008000">Green</MenuItem>
                <MenuItem value="#ff0">Yellow</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="tshirt-custompicture">
            Upload your own design
            </InputLabel>
            <Button
              variant="contained" 
              color="primary" 
              onClick={()=>fileInput.current.click()}
            >
              upload file
            </Button>
            <input 
              ref={fileInput} 
              type="file" 
              style={{ display: 'none' }} 
              id="tshirt-custompicture"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
