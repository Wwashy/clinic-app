$(document).ready(()=>{

    $('#btn0').click(() => {
        $('#default').css("display", "block");
        $('#f1').css("display", "none");
        $('#f2').css("display", "none");
        $('#f3').css("display", "none");
        $('.rappers').css("display", "none");
        hideSidebar();
    });
    $('#btn1').click(() => {
        $('#default').css("display", "none");
        $('#f1').css("display", "block");
        $('#f2').css("display", "none");
        $('#f3').css("display", "none");
        $('.rappers').css("display", "none");
        hideSidebar();
    });

    $('#btn2').click(() => {
        $('.rappers').css("display", "none");
        $('#default').css("display", "none");
        $('#f1').css("display", "none");
        $('#f3').css("display", "none");
        $('#f2').css("display", "block");
        hideSidebar();
    });

    $('#btn3').click(() => {
        $('#default').css("display", "none");
        $('#f1').css("display", "none");
        $('#f2').css("display", "none");
        $('#f3').css("display", "none");
        $('.rappers').css("display", "none");
        hideSidebar();
    });

    $('#btn4').click(() => {
        $('#default').css("display", "none");
        $('#f1').css("display", "none");
        $('#f2').css("display", "none");
        $('#f3').css("display", "none");
        $('.rappers').css("display", "none");
        hideSidebar();
    });

    $('#search').click(() => {
        $('#f3').css("display", "block");
        $('.rappers').css("display", "none");
        $('#default').css("display", "none");
        $('#f1').css("display", "none");
        $('#f2').css("display", "none");
        hideSidebar();
    });

    $('#btn6').click(() => {
        window.location.href = '/';
    });

    $('#btn7').click(() => {
        $('#section-two').css("background-color", "black")
        hideSidebar();
    });

    function hideSidebar() {
        var mq = window.matchMedia("(max-width:600px)");
        if (mq.matches) {
            $('#dash_section1').css("left","-10000px");            
        }
    }


});