function showPopup(name) {    
    document.getElementById("graybackgrounddiv").style.display = "block";
    document.getElementById(name).style.display = "block";
    disableWheel = true;
}

function closePopup(name) {
    document.getElementById("graybackgrounddiv").style.display = "none";
    document.getElementById(name).style.display = "none";
    disableWheel = false;
}

function uiSoundCheckbox() {
    let checked = document.getElementById("soundCheckbox").checked;
    if (checked) synth.enable();
    else synth.disable();
}

function uiMidiCheckbox() {
    let checkBox = document.getElementById("midiCheckbox");
    if (midi.supported){
        let checked = checkBox.checked;
        if (checked) midi.enable();
        else midi.disable();
    } else {
        checkBox.checked = false;
    }
}

function comboMidiClear() {
    let combo = document.getElementById("comboMidi");
    let length = combo.options.length;
    for (let i = length-1; i >= 0; i--) {
        combo.options[i] = null;
    }
}

function comboMidiAdd(value) {
    let combo = document.getElementById("comboMidi");
    let option = document.createElement("option");
    option.text = value;
    option.value = value;
    try {
        combo.add(option, null);
    }catch(error) {
        ;
    }
}

function comboMidiGet() {
    let combo = document.getElementById("comboMidi");
    return combo.options[combo.selectedIndex].value;
}

function comboSelectChange(value) {
    synth.setWave(value);
}

function sliderFrequencyChange(value) {
    synth.setFilterFrequency(value);
    document.getElementById("filterFreqDiv").innerHTML=value;
}
function sliderQChange(value) {
    synth.setFilterQ(value);
    document.getElementById("filterQDiv").innerHTML=value;
}
function sliderFilterGainChange(value) {
    synth.setFilterGain(value);
    document.getElementById("filterGainDiv").innerHTML=value;
}
function comboFilterChange(value){
    synth.setFilterType(value);
}
function sliderADSRAttack(value){
    synth.setAdsr(value,undefined,undefined,undefined);
    document.getElementById("adsrAttackDiv").innerHTML=value;
}
function sliderADSRDecay(value){
    synth.setAdsr(undefined,value,undefined,undefined);
    document.getElementById("adsrDecayDiv").innerHTML=value;
}
function sliderADSRSustain(value){
    synth.setAdsr(undefined,undefined,value,undefined);
    document.getElementById("adsrSustainDiv").innerHTML=value;
}
function sliderADSRRelease(value){
    synth.setAdsr(undefined,undefined,undefined,value);
    document.getElementById("adsrReleaseDiv").innerHTML=value;
}
function sliderVolumeChange(value){
    synth.setVolume(value);
    document.getElementById("volumeRangeDiv").innerHTML=value;
}
function zoomUi(value) {
    zoomGrid(value);
}