// ------------- GLOBAL VARIABLES --------------

var scl = 0.75; //scale variable

var customFont; //custom font

var minimalGrid; //minimal grid

var ghostQueue = [];
var ghostTimeout = 1000;

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
var conversionOctKeyboard = {
    "65" : "C4",
    "87" : "C#4",
    "83" : "D4",
    "69" : "D#4",
    "68" : "E4",
    "70" : "F4",
    "84" : "F#4",
    "71" : "G4",
    "89" : "G#4",
    "72" : "A5",
    "85" : "A#5",
    "74" : "B5",
    "75" : "C5"
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
