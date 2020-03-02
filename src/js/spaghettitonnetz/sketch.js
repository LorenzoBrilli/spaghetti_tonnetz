// ---------------------------- MAIN SKETCH ----------------------

function preload() {
    //load font
    fontRegular = loadFont('assets/Montserrat-Regular.ttf');
}

function setup() {

  // get canvas 
  cnv = document.getElementById("myCanvas");
  ctx = cnv.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  window.addEventListener("resize", windowResized);
  cnv.addEventListener("wheel", mouseWheel);
  window.addEventListener("keydown",keyPressed);
  window.addEventListener("keyup",keyReleased);
  

  // get offscreen canvas
  offCnv = document.getElementById("offCanvas");
  offCtx = offCnv.getContext("2d");

  //create minimal grid object
  minimalGrid = new MinimalGrid(offCtx);

  //synth object
  synth = new Synth();

  //midi object
  midi = new Midi();

  draw();

}

function draw() {

  //update ghost notes
  minimalGrid.updateGhost();
  //if update needed update the grid
  if (minimalGrid.updateRequired) minimalGrid.update();
  //if draw needed draw all
  if (minimalGrid.redrawRequired) drawAll();

  myMillis += 25; //update millis by frameTime
  setTimeout(draw,25); //50fps->1000ms/50=25ms
}

//draw a grid of minimal grid using the graphics buffer
function drawAll(){
  //render minimal grid to custom graphics buffer
  minimalGrid.drawBuffer();
  //set backgound
  ctx.fillStyle = colorBG;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //translate to middle of screen
  ctx.save();
  ctx.translate(ctx.canvas.width/2-50*scl,ctx.canvas.height/2-50*scl);
  let offx, offy;
  for (let y = -30; y < 30; y++){
    for (let x = -30; x < 30; x++){
      //calcluate offset from center
      offx = y*300*scl+x*1000*scl;
      offy = y*519*scl+x*346*scl;
      //only if visible
      if (offx > 0- ctx.canvas.width/2 - 1300*scl && offy > 0 - ctx.canvas.height/2 - 650*scl && offx < ctx.canvas.width/2 + 100*scl && offy < ctx.canvas.height/2 + 100*scl){
        ctx.save(); //save state
        ctx.translate(offx,offy);
        //draw the minimal grid
        ctx.drawImage(minimalGrid.gb.canvas,0,0);
        ctx.restore(); //restore state
      }
    }
  }
  ctx.restore();
}

//window resized p5 event calls this funciton automatically
function windowResized() {
  //resize canvas on window resize
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  minimalGrid.redrawRequired = true;
}

function mouseWheel(event) {
  if (disableWheel) return;
  zoomGrid(event.deltaY);
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
function keyPressed(event) {
  if (!event.repeat && conversionKeyMidi[event.keyCode] !== undefined){
    synth.playMidiNote(conversionKeyMidi[event.keyCode]);
    minimalGrid.updateNote(conversionKeyboard[event.keyCode],true);
  }
}
function keyReleased(event) {
  if (conversionKeyMidi[event.keyCode] !== undefined){
    synth.releaseMidiNote(conversionKeyMidi[event.keyCode]);
    minimalGrid.updateNote(conversionKeyboard[event.keyCode],false);
  }
}

function millis() {
  return myMillis;
}

setup();