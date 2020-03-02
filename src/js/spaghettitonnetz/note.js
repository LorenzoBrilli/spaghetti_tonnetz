//Note class: it needs tha value of the note and the position
class Note {

    constructor(value, x, y) {
        this.value = value;
        this.x = x;
        this.y = y;
    
        //tells if the note is active or ghost
        this.isActive = false;
        this.isGhost = false;
    }

    //update note state and eventually set ghost
    update(isActive) {
        if (this.isActive && !isActive){
            minimalGrid.ghostQueue.push([this,millis()]);
            this.isGhost = true;
        } else if (this.isActive) this.isGhost = false;
        this.isActive = isActive;
    }

    //draws the note to custom graphics buffer when called
    draw(gb) {
        if (this.isActive){
            gb.fillStyle = colorActiveNote;
        }
        else if (this.isGhost) {
            gb.fillStyle = colorGhostNote;
        }
        else{
            gb.fillStyle = colorNote;
        }
        gb.strokeStyle = colorConn;
        gb.beginPath();
        gb.arc(this.x*scl,this.y*scl,scl*50,0,Math.PI*2,false);
        gb.fill();
        gb.stroke();       
        if (this.isActive){
            gb.fillStyle = colorActiveText;
        }
        else if (this.isGhost) {
            gb.fillStyle = colorGhostText;
        }
        else{
            gb.fillStyle = colorText;
        }
        gb.font = ''+scl*42+'px customFont';
        gb.textAlign = 'center';
        gb.textBaseline = 'middle';
        gb.fillText(this.value, this.x*scl, scl*this.y);
    };

}