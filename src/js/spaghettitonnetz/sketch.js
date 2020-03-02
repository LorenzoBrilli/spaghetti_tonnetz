// ---------------------------- MAIN SKETCH ----------------------

function preload() {
    //load font
    fontRegular = loadFont('assets/Montserrat-Regular.ttf');
}

function setup() {

  // create canvas
  var cnv = createCanvas(windowWidth, windowHeight);
  // set framerate to 30 fps
  frameRate(30);
  //set display to block for fullscreen without scrollbars
  cnv.style('display', 'block');
  //create minimal grid object
  minimalGrid = new MinimalGrid();

  //synth object
  synth = new Synth();

  //midi object
  midi = new Midi();

}

function draw() {
  //update ghost notes
  minimalGrid.updateGhost();
  //if update needed update the grid
  if (minimalGrid.updateRequired) minimalGrid.update();
  //if draw needed draw all
  if (minimalGrid.redrawRequired) drawAll();
}

//draw a grid of minimal grid using the graphics buffer
function drawAll(){
  //render minimal grid to custom graphics buffer
  minimalGrid.drawBuffer();
  //set backgound
  background(colorBG);
  //translate to middle of screen
  translate(windowWidth/2-50*scl,windowHeight/2-50*scl);
  let offx, offy;
  for (let y = -30; y < 30; y++){
    for (let x = -30; x < 30; x++){
      //calcluate offset from center
      offx = y*300*scl+x*1000*scl;
      offy = y*519*scl+x*346*scl;
      //only if visible
      if (offx > 0- windowWidth/2 - 1300*scl && offy > 0 - windowHeight/2 - 650*scl && offx < windowWidth/2 + 100*scl && offy < windowHeight/2 + 100*scl){
        push(); //save state
        translate(offx,offy);
        //draw the minimal grid
        image(minimalGrid.gb,0,0);
        pop(); //restore state
      }
    }
  }
}

//window resized p5 event calls this funciton automatically
function windowResized() {
  //resize canvas on window resize
  resizeCanvas(windowWidth, windowHeight);
  minimalGrid.redrawRequired = true;
}

function mouseWheel(event) {
  if (disableWheel) return;
  zoomGrid(event.delta);
  return false; //returning false block page scrolling
}

function zoomGrid(value) {
  //increment or decrement scale according to direction, limit if necessary
  if (value > 0 && scl < 5){
    scl *= 1.02;
    minimalGrid.redrawRequired = true;
  }
  else if (value < 0 && scl > 0.1){
    scl *= 0.98;
    minimalGrid.redrawRequired = true;
  }
}

//handle key pressed and released
function keyPressed() {
  if (conversionOctKeyboard[keyCode] !== undefined){
    synth.playNote(conversionOctKeyboard[keyCode]);
    minimalGrid.updateNote(conversionKeyboard[keyCode],true);
  }
}
function keyReleased() {
  if (conversionOctKeyboard[keyCode] !== undefined){
    synth.releaseNote(conversionOctKeyboard[keyCode]);
    minimalGrid.updateNote(conversionKeyboard[keyCode],false);
  }
}
