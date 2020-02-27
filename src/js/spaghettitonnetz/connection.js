//Connection class: it needs the reference of the two notes
function Connection(note1, note2) {

    this.note1 = note1;
    this.note2 = note2;

    //tells if the connection is active
    this.isActive = false;
    this.isGhost = false;

    //update the status
    this.update = function () {
        let oldActive = this.isActive;
        this.isActive = this.note1.isActive && this.note2.isActive;
        if (!this.isActive && oldActive){
            this.isGhost = true;
            minimalGrid.ghostQueue.push([this,millis()]);
        }
    }

    //draws the note to custom graphics buffer when called
    this.draw = function (gb) {
        if (this.isActive)
            gb.stroke(colorActiveConn);
        else if (this.isGhost)
            gb.stroke(colorGhostConn);
        else 
            gb.stroke(colorConn);
        gb.line(note1.x*scl,note1.y*scl,note2.x*scl,note2.y*scl);
    };

}