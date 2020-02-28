function showPopup(name) {    
    document.getElementById("graybackgrounddiv").style.display = "block";
    document.getElementById(name).style.display = "block";
}

function closePopup(name) {
    document.getElementById("graybackgrounddiv").style.display = "none";
    document.getElementById(name).style.display = "none";
}