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