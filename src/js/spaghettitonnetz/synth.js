//const NOTETOFREQ = {"C0":16.35,"C#0":17.32,"D0":18.35,"D#0":19.45,"E0":20.60,"F0":21.83,"F#0":23.12,"G0":24.50,"G#0":25.96,"A0":27.50,"A#0":29.14,"B0":30.87,"C1":32.70,"C#1":34.65,"D1":36.71,"D#1":38.89,"E1":41.20,"F1":43.65,"F#1":46.25,"G1":49.00,"G#1":51.91,"A1":55.00,"A#1":58.27,"B1":61.74,"C2":65.41,"C#2":69.30,"D2":73.42,"D#2":77.78,"E2":82.41,"F2":87.31,"F#2":92.50,"G2":98.00,"G#2":103.83,"A2":110.00,"A#2":116.54,"B2":123.47,"C3":130.81,"C#3":138.59,"D3":146.83,"D#3":155.56,"E3":164.81,"F3":174.61,"F#3":185.00,"G3":196.00,"G#3":207.65,"A3":220.00,"A#3":233.08,"B3":246.94,"C4":261.63,"C#4":277.18,"D4":293.66,"D#4":311.13,"E4":329.63,"F4":349.23,"F#4":369.99,"G4":392.00,"G#4":415.30,"A4":440.00,"A#4":466.16,"B4":493.88,"C5":523.25,"C#5":554.37,"D5":587.33,"D#5":622.25,"E5":659.25,"F5":698.46,"F#5":739.99,"G5":783.99,"G#5":830.61,"A5":880.00,"A#5":932.33,"B5":987.77,"C6":1046.50,"C#6":1108.73,"D6":1174.66,"D#6":1244.51,"E6":1318.51,"F6":1396.91,"F#6":1479.98,"G6":1567.98,"G#6":1661.22,"A6":1760.00,"A#6":1864.66,"B6":1975.53,"C7":2093.00,"C#7":2217.46,"D7":2349.32,"D#7":2489.02,"E7":2637.02,"F7":2793.83,"F#7":2959.96,"G7":3135.96,"G#7":3322.44,"A7":3520.00,"A#7":3729.31,"B7":3951.07,"C8":4186.01,"C#8":4434.92,"D8":4698.63,"D#8":4978.03,"E8":5274.04,"F8":5587.65,"F#8":5919.91,"G8":6271.93,"G#8":6644.88,"A8":7040.00,"A#8":7458.62,"B8":7902.13};
const NOTETOFREQ = {"C0":16.35,"C#0":17.32,"D0":18.35,"D#0":19.45,"E0":20.60,"F0":21.83,"F#0":23.12,"G0":24.50,"G#0":25.96,"A1":27.50,"A#1":29.14,"B1":30.87,"C1":32.70,"C#1":34.65,"D1":36.71,"D#1":38.89,"E1":41.20,"F1":43.65,"F#1":46.25,"G1":49.00,"G#1":51.91,"A2":55.00,"A#2":58.27,"B2":61.74,"C2":65.41,"C#2":69.30,"D2":73.42,"D#2":77.78,"E2":82.41,"F2":87.31,"F#2":92.50,"G2":98.00,"G#2":103.83,"A3":110.00,"A#3":116.54,"B3":123.47,"C3":130.81,"C#3":138.59,"D3":146.83,"D#3":155.56,"E3":164.81,"F3":174.61,"F#3":185.00,"G3":196.00,"G#3":207.65,"A4":220.00,"A#4":233.08,"B4":246.94,"C4":261.63,"C#4":277.18,"D4":293.66,"D#4":311.13,"E4":329.63,"F4":349.23,"F#4":369.99,"G4":392.00,"G#4":415.30,"A5":440.00,"A#5":466.16,"B5":493.88,"C5":523.25,"C#5":554.37,"D5":587.33,"D#5":622.25,"E5":659.25,"F5":698.46,"F#5":739.99,"G5":783.99,"G#5":830.61,"A6":880.00,"A#6":932.33,"B6":987.77,"C6":1046.50,"C#6":1108.73,"D6":1174.66,"D#6":1244.51,"E6":1318.51,"F6":1396.91,"F#6":1479.98,"G6":1567.98,"G#6":1661.22,"A7":1760.00,"A#7":1864.66,"B7":1975.53,"C7":2093.00,"C#7":2217.46,"D7":2349.32,"D#7":2489.02,"E7":2637.02,"F7":2793.83,"F#7":2959.96,"G7":3135.96,"G#7":3322.44,"A8":3520.00,"A#8":3729.31,"B8":3951.07,"C8":4186.01,"C#8":4434.92,"D8":4698.63,"D#8":4978.03,"E8":5274.04,"F8":5587.65,"F#8":5919.91,"G8":6271.93,"G#8":6644.88,"A9":7040.00,"A#9":7458.62,"B9":7902.13};

//synth class, it uses p5.sound
class Synth {

    constructor() {
        this.polySynth = undefined;
        this.audioContext = undefined;
        this.enabled = false;
    }

    enable() {
        if (this.audioContext === undefined){
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            this.audioContext = new AudioContext();
            this.polySynth = new PolySynth(this.audioContext,8);
            this.polySynth.setVolume(0.3);
            this.polySynth.connect(this.audioContext.destination);
            this.enabled = true;
        } else {
            this.polySynth.connect(this.audioContext.destination);
            this.enabled = true;
        }
    }

    disable() {
        if (this.polySynth !== undefined) {
            this.polySynth.disconnect();
            this.enabled = false;
        }
    }

    playNote(note) {
        if (!this.enabled) return;
        this.polySynth.playNote(NOTETOFREQ[note]);
    }

    releaseNote(note) {
        if (!this.enabled) return;
        this.polySynth.releaseNote(NOTETOFREQ[note]);
    }

    releaseAll() { //TODO
        if (!this.enabled) return;
        let notes = Object.keys(this.polySynth.notes); //get notes
        for(let i = 0; i < notes.length; i++){
            this.polySynth.noteRelease(parseFloat(notes[i]));
        }
    }

    setAdsr(attack,decay,sustain,release) {
        this.polySynth.setAdsr(attack,decay,sustain,release);
    }

    setFilterType(type) {
        if (!this.enabled) return;
        this.polySynth.setFilterType(type);
    }
    setFilterQ(value) {
        if (!this.enabled) return;
        this.polySynth.setFilterQ(value);
    }
    setFilterGain(value) {
        if (!this.enabled) return;
        this.polySynth.setFilterGain(value);
    }
    setFilterFrequency(value) {
        if (!this.enabled) return;
        this.polySynth.setFilterFrequency(value);
    }
    setFilterGain(value) {
        if (!this.enabled) return;
        this.polySynth.setFilterGain(value);
    }
    setVolume(gain){
        if (!this.enabled) return;
        this.polySynth.setVolume(gain);
    }
    setWave(type) {
        if (!this.enabled) return;
        this.polySynth.setWave(type);
    }

}


class MonoSynth {

    constructor (audioContext) {
        this.audioContext = audioContext;
        this.osc = this.audioContext.createOscillator();
        this.osc.type = "sine";
        this.frequency = 440;
        this.osc.frequency.value = this.frequency;
    
        this.adsrGain = this.audioContext.createGain();
        this.adsrGain.gain.value = 0.0;
        this.adsr = [50,25,0.75,250];
    
        this.filter = this.audioContext.createBiquadFilter();
        this.filter.type = "lowpass";
        this.filter.frequency.value = 8000;
        this.filter.Q.value = 1;
        this.filter.gain.value = 1;
    
        this.gain = this.audioContext.createGain();
        this.gain.gain.value = 1.0;
    
        this.osc.start();
        this.osc.connect(this.adsrGain);
        this.adsrGain.connect(this.filter);
        this.filter.connect(this.gain);
    }

    connect(audioNode) {
        this.gain.connect(audioNode);
    }

    disconnect() {
        this.gain.disconnect();
    }

    setVolume(gain){
        this.gain.gain.value = gain;
    }

    playNote(freq) {
        this.frequency = freq;
        this.osc.frequency.value = freq;
        this.adsrGain.gain.cancelScheduledValues(this.audioContext.currentTime);
        this.adsrGain.gain.setValueAtTime(0,this.audioContext.currentTime);
        this.adsrGain.gain.linearRampToValueAtTime(1.0,this.audioContext.currentTime+this.adsr[0]/1000);
        setTimeout(function(audioContext,gainNode,value,time){
            gainNode.gain.linearRampToValueAtTime(value,audioContext.currentTime+time/1000);  
        },this.adsr[0],this.audioContext,this.adsrGain,this.adsr[2],this.adsr[1]);
    }
    releaseNote() {
        this.adsrGain.gain.cancelScheduledValues(this.audioContext.currentTime);
        this.adsrGain.gain.setValueAtTime(this.adsrGain.gain.value,this.audioContext.currentTime);
        this.adsrGain.gain.linearRampToValueAtTime(0,this.audioContext.currentTime+this.adsr[3]/1000);
    }

    setWave(type) {
        this.osc.type = type;
    }

    setAdsr(attack,delay,sustain,release) {
        this.adsr[0] = attack;
        this.adsr[1] = delay;
        this.adsr[2] = sustain;
        this.adsr[3] = release;
    }

    setFilterType(type) {
        this.filter.type = type;
    }
    setFilterQ(value) {
        this.filter.Q.value = value;
    }
    setFilterFrequency(value) {
        this.filter.frequency.value = value;
    }
    setFilterGain(value) {
        this.filter.gain.value = value;
    }
}

class PolySynth {
    
    constructor(audioContext, voices) {

        this.audioContext = audioContext;
        this.synths = [];
        this.state = [];
        this.voices = voices;
    
        this.gain = this.audioContext.createGain();
        this.gain.gain.value = 1.0;
    
        this.filterType = "lowpass";
        this.filterQ = 1;
        this.filterFrequency = 8000;
        this.filterGain = 1;
    
        this.adsr = [50,25,0.75,250];
    
        for (let i = 0; i < this.voices; i++) {
            this.synths.push(new MonoSynth(this.audioContext));
            this.synths[i].connect(this.gain);
            this.state.push([this.synths[i],false,0.0,0.0,0.0])
        }
    
        this.setAdsr(this.adsr[0],this.adsr[1],this.adsr[2],this.adsr[3]);
        this.setFilterType(this.filterType);
        this.setFilterQ(this.filterQ);
        this.setFilterGain(this.filterGain);
        this.setFilterFrequency(this.filterFrequency);
    
    }

    connect(audioNode) {
        this.gain.connect(audioNode);
    }

    disconnect() {
        this.gain.disconnect();
    }

    setVolume(gain){
        for (let i = 0; i < this.voices; i++) this.synths[i].setVolume(gain);
    }
    
    setWave(type) {
        for (let i = 0; i < this.voices; i++) this.synths[i].setWave(type);
    }

    playNote(freq) {
        let number = -1;
        let first = this.audioContext.currentTime;
        for (let i = 0; i < this.voices; i++) {
            if (!this.state[i][1] && this.state[i][4] < first){
                number = i;
                first = this.state[i][4];
            }
        }
        if (number < 0){
            for (let i = 0; i < this.voices; i++) {
                if (this.state[i][3] < first){
                    number = i;
                    first = this.state[i][3];
                }
            }
        }
        if (number >= 0) this.playNoteOnSynth(number,freq);
    }

    playNoteOnSynth(number, freq) { 
        this.state[number][1] = true;
        this.state[number][2] = freq;
        this.state[number][3] = this.audioContext.currentTime;
        this.state[number][0].playNote(freq);
    }

    releaseNote(freq) {
        for (let i = 0; i < this.voices; i++) {
            if (this.state[i][1] && this.state[i][2] === freq){
                this.state[i][1] = false;
                this.state[i][0].releaseNote();
                this.state[i][4] = this.audioContext.currentTime;
            }
        }
    }
    
    setAdsr(attack,decay,sustain,release) {
        if (attack !== undefined) this.adsr[0] = attack;
        if (decay !== undefined) this.adsr[1] = decay;
        if (sustain !== undefined) this.adsr[2] = sustain;
        if (release !== undefined) this.adsr[3] = release;
        for (let i = 0; i < this.voices; i++) this.synths[i].setAdsr(this.adsr[0],this.adsr[1],this.adsr[2],this.adsr[3]);
    }

    setFilterType(type) {
        this.filterType = type;
        for (let i = 0; i < this.voices; i++) this.synths[i].setFilterType(type);
    }
    setFilterQ(value) {
        this.filterQ = value;
        for (let i = 0; i < this.voices; i++) this.synths[i].setFilterQ(value);
    }
    setFilterFrequency(value) {
        this.filterFrequency = value;
        for (let i = 0; i < this.voices; i++) this.synths[i].setFilterFrequency(value);
    }
    setFilterGain(value) {
        this.filterGain = value;
        for (let i = 0; i < this.voices; i++) this.synths[i].setFilterGain(value);
    }

}