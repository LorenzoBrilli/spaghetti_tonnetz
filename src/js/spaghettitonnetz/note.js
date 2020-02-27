//Note class: it needs tha value of the note and the position
function Note(value, x, y) {

    this.value = value;
    this.x = x;
    this.y = y;

    //tells if the note is active or ghost
    this.isActive = false;
    this.isGhost = false;

    //update note state and eventually set ghost
    this.update = function (isActive) {
        if (this.isActive && !isActive){
            minimalGrid.ghostQueue.push([this,millis()]);
            this.isGhost = true;
        } else if (this.isActive) this.isGhost = false;
        this.isActive = isActive;
    }

    //draws the note to custom graphics buffer when called
    this.draw = function (gb) {
        gb.stroke(colorConn);
        if (this.isActive){
            gb.fill(colorActiveNote);
        }
        else if (this.isGhost) {
            gb.fill(colorGhostNote);
        }
        else{
            gb.fill(colorNote);
        }
        gb.circle(x*scl,y*scl,scl*100);       
        if (this.isActive){
            gb.fill(colorActiveText);
        }
        else if (this.isGhost) {
            gb.fill(colorGhostText);
        }
        else{
            gb.fill(colorText);
        }
        gb.noStroke();
        gb.textSize(scl*42);
        gb.text(value, x*scl-scl*1, scl*y-scl*7);
    };

}