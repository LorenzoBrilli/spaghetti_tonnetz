//midi class
function Midi() {

    this.supported = WebMidi.supported;
    this.selectedDevice = "";

    this.enable = function () {
        if (!this.supported || WebMidi.enabled) return false;
        this.selectedDevice = comboMidiGet();
        let name = this.selectedDevice;
        if (name === "NO MIDI INPUT") return false;
        WebMidi.enable(function (err) {
            let input = WebMidi.getInputByName(comboMidiGet());
            input.addListener('noteon', "all",
                function (e) {
                    let oct = e.note.octave;
                    if (e.note.name == "A" || e.note.name == "A#" || e.note.name == "B") oct++;
                    synth.playNote(""+ e.note.name + oct);
                    minimalGrid.updateNote(e.note.name,true);
                }
            );
            input.addListener('noteoff', "all",
                function (e) {
                    let oct = e.note.octave;
                    if (e.note.name == "A" || e.note.name == "A#" || e.note.name == "B") oct++;
                    synth.releaseNote(""+ e.note.name + oct);
                    minimalGrid.updateNote(e.note.name,false);
                }
            );
        });
    }

    this.disable = function () {
        if (!this.supported) return false;
        try {
            let input = WebMidi.getInputByName(this.selectedDevice)
            input.removeListener();
            WebMidi.disable();
        } catch (error) {
            
        }
    }

    this.refreshInput = function () {
        if (WebMidi.enabled) return;
        WebMidi.enable(function (err) {
            comboMidiClear();
            if (WebMidi.inputs.length > 0){
                for(let i = 0; i < WebMidi.inputs.length; i++) {
                    comboMidiAdd(WebMidi.inputs[i].name);
                }
            } else {
                comboMidiAdd("NO MIDI INPUT");
            }
            WebMidi.disable();
        });
    }

    if (this.supported) this.refreshInput(); //refresh inputs at creation
    else {
        console.log("WebMidi not supported");
    }

}