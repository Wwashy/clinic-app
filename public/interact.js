window.onload.requestFullscreen();
//sidebar events
function showSidebar() {
    document.getElementById("sidebar").style.left = "0px";
    document.getElementById("close").innerHTML ="X";
    
}
function closeSidebar() {
    document.getElementById("sidebar").style.left = "-300px";
}
document.getElementsByTagName("header").addEventListener("focus",
function showbars(params) {
    document.getElementsByTagName("h1").style.display ="block";
})
//toggle menu
function showFOMS(btn) {
    if (btn=="btn1") {
        document.getElementById("f1").style.display ="block";
        document.getElementById("f2").style.display ="none";
        document.getElementById("f3").style.display ="none";
        document.getElementById("default").style.display ="none";
        
    } else if(btn=="btn2") {
        document.getElementById("f2").style.display ="block";
        document.getElementById("f1").style.display ="none";
        document.getElementById("f3").style.display ="none";
        document.getElementById("default").style.display ="none";
    }else if(btn=="btn3"){
        document.getElementById("f3").style.display ="block";
        document.getElementById("f2").style.display ="none";
        document.getElementById("f1").style.display ="none";
        document.getElementById("default").style.display ="none";
    }
    else{
        document.getElementById("default").style.display ="block";
        document.getElementById("f2").style.display ="none";
        document.getElementById("f1").style.display ="none";
        document.getElementById("f3").style.display ="none";
    }
}

/*document.getElementById("close").addEventListener('click',closeSidebar);
document.getElementById("menu").addEventListener('click',showSidebar);
document.querySelectorAll(".largeBtn").addEventListener("click",showFOMS());*/

//update the NAME
function changeClinic() {
    var value=document.getElementById("trigname").value;
    document.getElementsById("clinicName").innerHTML=value;
    }