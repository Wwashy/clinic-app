
var httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange=getData;


httpRequest.open('GET', 'routing?t='+ Math.random(), true); 
httpRequest.send();

function getData() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        //alert(httpRequest.responseText);
        //var data = httpRequest.responseText;
        
        $(document).ready(()=>{
            document.getElementById("list").innerHTML = httpRequest.responseText;
        });
    }
}