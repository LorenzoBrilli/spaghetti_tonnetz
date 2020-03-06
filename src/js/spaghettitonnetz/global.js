// ------------- GLOBAL VARIABLES --------------

var scl = 0.75; //scale variable

var customFont; //custom font

var minimalGrid; //minimal grid

var ghostQueue = [];
var ghostTimeout = 1000;

var synth;
var midi;

//canvas and context
var cnv; var ctx;
var offCnv; var offCtx;
var dpr = 1; //device pixel ratio
var timer = null; //handle requestAnimation

//conversion from keyboard to ascii to notes
var conversionKeyboard = {
    "65" : "C",
    "87" : "C#",
    "83" : "D",
    "69" : "D#",
    "68" : "E",
    "70" : "F",
    "84" : "F#",
    "71" : "G",
    "89" : "G#",
    "72" : "A",
    "85" : "A#",
    "74" : "B",
    "75" : "C"
};
//conversion from keyboard to ascii to  notes with octave
var conversionKeyMidi = {
    "65" : 60,
    "87" : 61,
    "83" : 62,
    "69" : 63,
    "68" : 64,
    "70" : 65,
    "84" : 66,
    "71" : 67,
    "89" : 68,
    "72" : 69,
    "85" : 70,
    "74" : 71,
    "75" : 72
};

//colors
var colorBG = "#ecf0f1";
var colorText = "#7f8c8d";
var colorActiveText = "#ecf0f1";
var colorGhostText = "#ecf0f1";
var colorNote = "#ecf0f1";
var colorActiveNote = "#c0392b";
var colorGhostNote = "#95a5a6";
var colorConn = "#bdc3c7";
var colorActiveConn = "#d35400";
var colorGhostConn = "#95a5a6";
var colorActiveTri = "#f39c12";
var colorGhostTri = "#bdc3c7";

var disableWheel = false;