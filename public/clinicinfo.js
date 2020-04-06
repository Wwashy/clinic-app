$(document).ready(() => {

    $('#btn9').click(() => {
        $('#f5').css("display", "block");
        $('#f6').css("display", "none");
        $('#f7').css("display", "none");
        $('#default').css("display", "none");
    });

    $('#btn10').click(() => {
        $('#f6').css("display", "block");
        $('#f5').css("display", "none");
        $('#f7').css("display", "none");
        $('#default').css("display", "none");
    });
    
    $('#btn11').click(() => {
        $('#f7').css("display", "block");
        $('#f5').css("display", "none");
        $('#f6').css("display", "none");
        $('#default').css("display", "none");
    });

        //udate dentists and assistant fields
        $.ajax({
            url: 'dentist-view/',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                for (row in data) {
                    let holder = document.createElement("div");
                    holder.append(data[row].id + " " + data[row].firstname + " " + data[row].lastname);
                    $('#dentist_availbale').html(holder);
                }
            }
        });

        //for assistants updates
        $.ajax({
            url: 'assistant-view/',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                for (row in data) {
                    let holder = document.createElement("div");
                    holder.append(data[row].id + " " + data[row].firstname + " " + data[row].lastname);
                    $('#assistant_availbale').html(holder);
                }
            }
        });
        $.ajax({
            url:'romove/',
            type: 'POST',
            dataType:'json',
            success:(data)=>{
                
            }
        });
    

});