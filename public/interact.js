
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
    
    if (btn=="btn0") {
        document.getElementById("default").style.display ="block";
        document.getElementById("f1").style.display ="none";
        document.getElementById("f2").style.display ="none";
        document.getElementById("f3").style.display ="none";   
    } else if(btn=="btn1" || btn=="next") {
        document.getElementById("default").style.display ="none";
        document.getElementById("f1").style.display ="block";
        document.getElementById("f2").style.display ="none";
        document.getElementById("f3").style.display ="none";
        
    }else if(btn=="btn2"){
        document.getElementById("default").style.display ="none";
        document.getElementById("f1").style.display ="none";
        document.getElementById("f2").style.display ="block";
        document.getElementById("f3").style.display ="none";     
        
    }
    else if (btn=="btn3") {
        
        document.getElementById("f3").style.display ="block";
        document.getElementById("f2").style.display ="none";
        document.getElementById("f1").style.display ="none";
        document.getElementById("default").style.display ="none";
    } else {        
        document.getElementById("default").style.display ="none";
        document.getElementById("f2").style.display ="none";
        document.getElementById("f1").style.display ="none";
        document.getElementById("f3").style.display ="none";
    }
}
//header properties
setInterval(
function getDate() {
    document.getElementById("time-box").innerHTML = new Date(year);
},1000);

// calculate price
function getcharge(params) {
   const treatment =document.getElementById("droplist3").value;
   const cost =document.getElementById("cost").value;
   if (treatment == "rootcanal") {
       cost = 2000;
   } else {
       
   }
}
window.onload = getcharge();
