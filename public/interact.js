//sidebar events
function showSidebar() {
    document.getElementById("sidebar").style.left = "0px";
    document.getElementById("close").innerHTML = "X";

}
function closeSidebar() {
    document.getElementById("sidebar").style.left = "-300px";
}
function showFOMS(btn) {
    const container0 = document.getElementById("default");
    const container1 = document.getElementById("f1");
    const container2 = document.getElementById("f2");
    const container3 = document.getElementById("f3");

    if (btn == "btn0") {
        container0.style.display = "block";
        container1.style.display = "none";
        container2.style.display = "none";
        container3.style.display = "none";
    } else if (btn == "btn1" || btn == "next") {
        container0.style.display = "none";
        container1.style.display = "block";
        container2.style.display = "none";
        container3.style.display = "none";

    } else if (btn == "btn2") {
        container0.style.display = "none";
        container1.style.display = "none";
        container2.style.display = "block";
        container3.style.display = "none";

    }
    else if (btn == "btn3") {

        container3.style.display = "block";
        container2.style.display = "none";
        container1.style.display = "none";
        container0.style.display = "none";
    } else {
        container0.style.display = "none";
        container2.style.display = "none";
        container1.style.display = "none";
        container3.style.display = "none";
    }
}
//header properties
setInterval(() => {
    document.getElementById("time-box").innerHTML = Date();
    setInterval(() => {
        document.getElementById("appointmentButton").style.transition = "2s";
        document.getElementById("appointmentButton").style.transform = "rotateY(360deg)";
    }, 1000);


}, 1000);

function callAppointment() {

    var appointmentPop = document.getElementById("p1");
    appointmentPop.style.left = "100px";
    appointmentPop.style.transform = "scale(1.1)";
    appointmentPop.style.transform = "rotateY(360deg)";
}
function closeModal() {
    document.getElementById("p1").style.left = "-1000px"
}
// calculate price
function getcharge(params) {
    const treatment = String(document.getElementById("droplist3").value);
    if (treatment == "rootcanal") {
        document.getElementById("cost").innerText = 2000;
    } else {

    }
}
//login 
function login() {
    const main_login = document.getElementById("main_login");
    const textBox1_username = String(document.getElementById("textBox1_username").value);
    const textBox2_password = String(document.getElementById("textBox2_password").value);
    const login_button = document.getElementById("login_button");
    //login_button.addEventlistener('click', () => {
        if (textBox1_username != "" & textBox2_password != "") {
            if (textBox1_username == "washy" && textBox2_password == "1234") {
                window.location.href = "clinicInfo"
            } else {
                var mssg = document.createTextNode("wrong password or username");
                var mssgbox = document.createElement("div");
                mssgbox.appendChild(mssg);
                //alert("Wrong password or username")
                main_login.appendChild(mssgbox);
            }
        } else {
            alert("Please fill all the fields");
        }
   // });
}

