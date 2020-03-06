// ---------------------------- MAIN SKETCH ----------------------

function preload() {
  try{
    let fl = document.fonts.check('1em customFont');
    if (fl) setup();
    else setTimeout(preload,10);
  } catch (ex) {
    setTimeout(setup,300); //hopefully wait for font loading
  }
}

function setup() {

  dpr = window.devicePixelRatio || 1;

  // get canvas 
  cnv = document.getElementById("myCanvas");
  ctx = cnv.getContext("2d");
  ctx.canvas.width = window.innerWidth*dpr;
  ctx.canvas.height = window.innerHeight*dpr;
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

  cancelAnimationFrame(timer);
  timer = requestAnimationFrame(draw);
}

//draw a grid of minimal grid using the graphics buffer
function drawAllOLD(){
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

  dpr = window.devicePixelRatio || 1;
  //resize canvas on window resize
  ctx.canvas.width = window.innerWidth*dpr;
  ctx.canvas.height = window.innerHeight*dpr;
  minimalGrid.redrawRequired = true;
}

function mouseWheel(event) {
  if (disableWheel) return;
  if (event.deltaY>0) zoomGrid(1.05);
  else zoomGrid(0.95);
  return false; //returning false block page scrolling
}

function zoomGrid(value) {
  //increment or decrement scale according to direction, limit if necessary
  if (value > 1 && scl < 5){
    scl *= value;
    minimalGrid.redrawRequired = true;
  }
  else if (value < 1 && scl > 0.1){
    scl *=value;
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
  return Date.now();
}

preload();