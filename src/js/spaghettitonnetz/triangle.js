//Triangle class: it needs the reference of the two notes
function Tri(note1, note2, note3) {

    this.note1 = note1;
    this.note2 = note2;
    this.note3 = note3;

    //tells if the connection is active
    this.isActive = false;
    this.isGhost = false;

    //update the status
    this.update = function () {
        let oldActive = this.isActive;
        this.isActive = this.note1.isActive && this.note2.isActive && this.note3.isActive;
        if (!this.isActive && oldActive){
            this.isGhost = true;
            minimalGrid.ghostQueue.push([this,millis()]);
        }
    }

    //draws the note to custom graphics buffer when called
    this.draw = function (gb) {
        if (this.isActive){
            gb.fillStyle=colorActiveTri;
        } else if (this.isGhost) {
            gb.fillStyle=colorGhostTri;
        }
        if(this.isActive || this.isGhost){
            gb.beginPath();
            gb.moveTo(note1.x*scl,note1.y*scl);
            gb.lineTo(note2.x*scl,note2.y*scl);
            gb.lineTo(note3.x*scl,note3.y*scl);
            gb.lineTo(note1.x*scl,note1.y*scl);
            gb.fill();
        }
    };

}