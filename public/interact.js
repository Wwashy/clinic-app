//elements

 
//sidebar events
function showSidebar() {
    document.getElementById("sidebar").style.left = "0px";
    document.getElementById("close").innerHTML ="X";
    
}
function closeSidebar() {
    document.getElementById("sidebar").style.left = "-300px";
}
function closeModal() {
    document.getElementById("f3").style.left = "-1000px"
}

/*document.getElementsByTagName("header").addEventListener("focus",
function showbars(params) {
    document.getElementsByTagName("h1").style.display ="block";
})*/
//toggle menu
function showFOMS(btn) {
    const container0 = document.getElementById("default");
const container1=document.getElementById("f1");
const container2=document.getElementById("f2");
const container3=document.getElementById("f3");  
    
    if (btn=="btn0") {
        container0.style.display ="block";
        container1.style.display ="none";
        container2.style.display ="none";
        container3.style.display ="none";   
    } else if(btn=="btn1" || btn=="next") {
        container0.style.display ="none";
        container1.style.display ="block";
        container2.style.display ="none";
        container3.style.display ="none";
        
    }else if(btn=="btn2"){
        container0.style.display ="none";
        container1.style.display ="none";
        container2.style.display ="block";
        container3.style.display ="none";     
        
    }
    else if (btn=="btn3") {
        
        container3.style.display ="block";
        container2.style.display ="none";
        container1.style.display ="none";
        container0.style.display ="none";
    } else {        
        container0.style.display ="none";
        container2.style.display ="none";
        container1.style.display ="none";
        container3.style.display ="none";
    }
}
//header properties
setInterval(()=> {
    document.getElementById("time-box").innerHTML = Date();
    setInterval(()=>{
        document.getElementById("appointmentButton").style.transition = "2s";
   document.getElementById("appointmentButton").style.transform = "rotateY(360deg)";
    },1000); 
   
        
},1000);
function callAppointment() {
    var appointmentPop= document.getElementById("f3");    
    appointmentPop.style.left = "200px";
    appointmentPop.style.transform ="scale(1.1)";
    appointmentPop.style.transform ="rotateY(360deg)";
}

// calculate price
function getcharge(params) {
   const treatment =document.getElementById("droplist3").value;
   const cost =document.getElementById("cost").value;
   if (treatment == "rootcanal") {
       cost = 2000;
   } else {
       
   }
}

