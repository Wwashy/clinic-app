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
    closeSidebar();
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
    document.getElementById("time-box").innerHTML = Date();
    //setInterval(() => {
    document.getElementById("appointmentButton").style.transition = "2s";
    document.getElementById("appointmentButton").style.transform = "rotateY(360deg)";
    //}, 1000);


}, 1000);
//pops the appointment box
function callAppointment() {

    var appointmentPop = document.getElementById("p1");
    appointmentPop.style.left = "15%";
    appointmentPop.style.transform = "scale(1.1)";
}
function closeModal() {
    document.getElementById("p1").style.left = "-1000px"
}

//shows the password
function showPassword() {
    const checkbox1 = document.getElementById("checkbox1").value;
    if (checkbox1 == "true") {
        textBox2_password.setAttribute("type", "text")
    } else {
        textBox2_password.setAttribute("type", "password")
    }
}

//login 
function login() {
    const login_container = document.getElementById("login-container");
    const textBox1_username = document.getElementById("textBox1_username");
    const textBox2_password = document.getElementById("textBox2_password");
    //const login_button = document.getElementById("login_button");
    //login_button.addEventlistener('click', () => {
    if (textBox1_username != "" & textBox2_password != "") {
        if (textBox1_username.value == "washy" && textBox2_password.value == "1234") {
            window.location.href = "clinicInfo"
        } else {
            var mssg = document.createTextNode("wrong password or username");
            var mssgbox = document.createElement("div");
            mssgbox.appendChild(mssg)
            //alert("Wrong password or username")
            login_container.appendChild(mssgbox);
        }
    }
    else {
        alert("Please fill all the fields");
    }
    // });
}
//dark them

function switchDarkmode() {
    //let all = ;
    darken(document.getElementById("section-two"));
    darken(document.getElementsByClassName("largeBtn"));
    //darken(document.getElementById("main"));
    // darken(document.getElementById("main"));
    // darken(document.getElementById("main"));

}
function darken(element) {
    element.style.backgroundColor = "#363434";
    element.style.color = "white";
    // const children = element.children
    // children.style.color ="white"
}



