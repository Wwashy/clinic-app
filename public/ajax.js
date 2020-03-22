$(document).ready(() => {
    $('#btn3').click(() => {
        $.ajax({
            url: 'appoint-view/',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                $('#D001').html("APPOINTMENTS")
                var hr = document.createElement("hr");
                $('#D001').append(hr)
                for (let row in data) {
                    var rapper = document.createElement("div");
                    rapper.setAttribute('class', 'rappers')
                    rapper.append(data[row].app_fullname + "    " + data[row].app_phone + "   " + data[row].app_date);
                    document.getElementById("D001").appendChild(rapper);
                }
            }
        });
    });
    //changes the tooth position
    var tooth_position = document.getElementById("tooth_position");
    var toUpdate = document.getElementById("droplist2");
    //upper right tooth positions
    var upper_right = {
        Ca11: 'ca 11',
        Ca12: 'ca 12',
        Ca13: 'ca 13',
        Ca14: 'ca 14',
        Ca15: 'ca 15',
        Ca16: 'ca 16',
        Ca17: 'ca 17',
        Ca18: 'ca 18'
    }
    //upper_left tooth_positions
    var upper_left = {
        Ca21: 'ca 21',
        Ca22: 'ca 22',
        Ca23: 'ca 23',
        Ca24: 'ca 24',
        Ca25: 'ca 25',
        Ca26: 'ca 26',
        Ca27: 'ca 27',
        Ca28: 'ca 28'
    }
    //lower left tooth th positions
    var lower_left = {
        Ca31: 'ca 31',
        Ca32: 'ca 32',
        Ca33: 'ca 33',
        Ca34: 'ca 34',
        Ca35: 'ca 35',
        Ca36: 'ca 36',
        Ca37: 'ca 37',
        Ca38: 'ca 38'
    }
    // lower right tooth positions
    var lower_right = {
       Ca41: 'ca 41',
       Ca42: 'ca 42',
       Ca43: 'ca 43',
       Ca44: 'ca 44',
       Ca45: 'ca 45',
       Ca46: 'ca 46',
       Ca47: 'ca 47',
       Ca48: 'ca 48'
    }
    var totoUpper_right = {
        Ca51: 'ca 51',
        Ca52: 'ca 52',
        Ca53: 'ca 53',
        Ca54: 'ca 54',
        Ca55: 'ca 55'
    }
    var totoUpper_left = {
        Ca61: 'ca 61',
        Ca62: 'ca 62',
        Ca63: 'ca 63',
        Ca64: 'ca 64',
        Ca65: 'ca 65'
    }
    var totoLower_left = {
        Ca71: 'ca 71',
        Ca72: 'ca 72',
        Ca73: 'ca 73',
        Ca74: 'ca 74',
        Ca75: 'ca 75'
    }
    var totoLower_right = {
        Ca81: 'ca 81',
        Ca82: 'ca 82',
        Ca83: 'ca 83',
        Ca84: 'ca 84',
        Ca85: 'ca 85'
    }


    //default tooth values
    for (index in upper_right) {
        toUpdate.options[toUpdate.options.length] = new Option(upper_right[index], index);
    }
    $('#tooth_position').change(() => {
        if (tooth_position.value == "upper_right") {
            toUpdate.options.length = 0;
            for (index in upper_right) {
                toUpdate.options[toUpdate.options.length] = new Option(upper_right[index], index);
            }
        } else if (tooth_position.value == "upper_left") {
            toUpdate.options.length = 0;
            for (index in upper_left) {
                toUpdate.options[toUpdate.options.length] = new Option(upper_left[index], index);
            }
        } else if (tooth_position.value == "lower_left") {
            toUpdate.options.length = 0;
            for (index in lower_left) {
                toUpdate.options[toUpdate.options.length] = new Option(lower_left[index], index);
            }
        } else if (tooth_position.value == "lower_right") {
            toUpdate.options.length = 0;
            for (index in lower_right) {
                toUpdate.options[toUpdate.options.length] = new Option(lower_right[index], index);
            }
        } else if (tooth_position.value == "totoUpper_right") {
            toUpdate.options.length = 0;
            for (index in totoUpper_right) {
                toUpdate.options[toUpdate.options.length] = new Option(totoUpper_right[index], index);
            }
        } else if (tooth_position.value == "totoUpper_left") {
            toUpdate.options.length = 0;
            for (index in totoUpper_left) {
                toUpdate.options[toUpdate.options.length] = new Option(totoUpper_left[index], index);
            }
        } else if (tooth_position.value == "totoLower_left") {
            toUpdate.options.length = 0;
            for (index in totoLower_left) {
                toUpdate.options[toUpdate.options.length] = new Option(totoUpper_left[index], index);
            }
        } else {
            toUpdate.options.length = 0;
            for (index in totoLower_right) {
                toUpdate.options[toUpdate.options.length] = new Option(totoUpper_left[index], index);
            }
        }
    });
    $(toUpdate).change(()=>{
        var currentValue = $('#teeth_selected').val() + $('#droplist3').val()
        $('#teeth_selected').val(currentValue+" "+toUpdate.value)
    });
    //$('#teeth_selected').change(()=>{
    //    var teeth_selected = $('#teeth_selected').val().split(' ');
    //    alert(teeth_selected.length);
    //});
    $('#btn_save').click(()=>{
        var P_id = $('#patient_id').val();
        var P_rx = $('#teeth_selected').val();
        $('#cost').val("PatientID:"+P_id+"<br>"+"Rx:"+ P_rx);
    });
});

