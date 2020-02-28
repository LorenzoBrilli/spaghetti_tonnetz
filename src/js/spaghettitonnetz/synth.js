//synth class, it uses p5.sound
function Synth() {

    this.polySynth = undefined;


    this.enable = function () {
        if (this.polySynth === undefined){
            this.polySynth = new p5.PolySynth();
        }
    }

    this.disable = function () {
        if (this.polySynth !== undefined) {
            this.polySynth.dispose();
            this.polySynth = undefined;
        }
    }

    this.playNote = function (note) {
        if (this.polySynth === undefined) return;
        this.polySynth.noteAttack(note,0.5);
    }

    this.releaseNote = function (note) {
        if (this.polySynth === undefined) return;
        this.polySynth.noteRelease(note);
    }

    this.releaseAll = function () {
        if (this.polySynth === undefined) return;
        let notes = Object.keys(this.polySynth.notes); //get notes
        for(let i = 0; i < notes.length; i++){
            this.polySynth.noteRelease(parseFloat(notes[i]));
        }
    }

}
