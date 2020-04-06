//sidebar events
function showSidebar() {
    document.getElementById("sidebar").style.left = "0px";
    document.getElementById("close").innerHTML = "X";
}
function closeSidebar() {
    document.getElementById("sidebar").style.left = "-300px";
}
//pop up boxes
function openquitBox(element) {
    document.getElementById(element).style.display = "block";
}
function cancel(element) {
    document.getElementById(element).style.display = "none"
}
function redirect(url, element) {
    document.getElementById(element).style.display = "none"
    window.location.href = url;
}

//header properties
setInterval(() => {
    let today = new Date();
    let day = today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate();
    let time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    document.getElementById("time-box").innerText= "Date:["+day+"]"+" "+"Time:["+time+"]";
}, 1000);

//pops the appointment box
function callAppointment() {

    var appointmentPop = document.getElementById("p1");
    appointmentPop.style.left = "15%";
    appointmentPop.style.transform = "scale(1.1)";
    document.getElementById("section-one").style.opacity = "1"

}
function closeModal() {
    document.getElementById("p1").style.left = "-1000px"
}




