$(document).ready(() => {
    //updates dashboard
    $.ajax({
        url: 'numbers/',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
                $('#clients_served').append("Patient Served:"+" "+data.service);
                $('#all_appointment').append("appointments:"+" "+data.appointment);
                $('#all_client').append("patients:"+" "+data.patient);
                $('#av_dentist').append("dentist:"+" "+data.dentist);
                $('#av_assistant').append("assistant:"+" "+data.assistant);
        }
    });

    //updates the CLINIC title
    $.ajax({
        url: 'title/',
        type: 'POST',
        dataType: 'json',
        success: (data) => {
            let location = data[0].location.toLowerCase();
            let name = data[0].name.toLowerCase();
            let level = data[0].category.toLowerCase();
            $('#title').html(location + " " + name + " " + "Dental Clinic" + " " + level);
        }

    });


    //search box change 
        $('#searched').keyup(() => {
        let data = {};
        data.searched = $('#searched').val();
        data.who = $('#who').val();
        console.log(data.searched);
        $.ajax({
            url: '/searching',
            type: 'GET',
            dataType: 'json',
            contentType: 'text',
            data: data,
            success: (result) => {
                $('#search_results').empty();
                for (row in result) {
                    let newDiv = document.createElement("div");
                    if (result[row].message == "empty") {
                        newDiv.append("type something to search");
                    } else {
                        newDiv.append(result[row].firstname);
                    }
                    $('#search_results').append(newDiv);
                }
            }
        });
    });

    //appointment form valiadation
    $('#closeModal').click(() => {
        if ($('#n1').val() != "" && $('#n2').val() != "" && $('#n3').val() != "" && $('#n4').val() != "") {
            $('#p1').css("left", "-1000px");
        }
    });

    //getting the data from the server for the appointments
    $('#btn3').click(() => {
        $('#default').css("display", "none");
        $('#f1').css("display", "none");
        $('#f2').css("display", "none");
        $('#f3').css("display", "none");
        $('.rappers').css("display", "none");

        $.ajax({
            url: 'appoint-view/',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                for (let row in data) {
                    let rapper = document.createElement("div");
                    rapper.setAttribute('class', 'rappers rappers1')
                    let date = data[row].app_date;
                    rapper.append(data[row].app_fullname + "    " + data[row].app_phone + "   " + date);
                    document.getElementById("D001").appendChild(rapper);
                }
            }
        });
    });


    //getting the patient record
    $('#btn4').click(() => {
        $('#default').css("display", "none");
        $('#f1').css("display", "none");
        $('#f2').css("display", "none");
        $('#f3').css("display", "none");
        $('.rappers').css("display", "none");
        $.ajax({
            url: 'patient/transaction/today-record/',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                if (data == "") {

                    $('#D001').append("No patient served !!");
                }
                let Total = 0;
                let clients_served = 0;

                for (row in data) {
                    Total = Total + data[row].cost;
                    clients_served++;

                    let rapper1 = document.createElement("div");
                    rapper1.setAttribute('class', 'rappers rappers2');
                    let div1 = document.createElement("div");
                    let div2 = document.createElement("div");
                    let div3 = document.createElement("div");
                    let div4 = document.createElement("div");
                    let div5 = document.createElement("div");
                    let div6 = document.createElement("div");

                    div1.setAttribute("class", "sub_rapper sub_patient_id")
                    div2.setAttribute("class", "sub_rapper sub_service_description")
                    div3.setAttribute("class", "sub_rapper sub_cost")
                    div4.setAttribute("class", "sub_rapper sub_service_date")
                    div5.setAttribute("class", "sub_rapper sub_service_time")
                    div6.setAttribute("class", "sub_rapper sub_patient_name")


                    div1.append("PatientId:" + " " + data[row].patient_id + " " + "serviceID:" + data[row].service_id);
                    div2.append("Description:" + data[row].service_description);
                    div3.append("Charge:" + data[row].cost);
                    div4.append("date:" + data[row].service_date);
                    div5.append("time:" + data[row].service_time);
                    div6.append("PatientName:" + " " + data[row].firstname + " " + data[row].lastname);

                    rapper1.appendChild(div6)
                    rapper1.appendChild(div1)
                    rapper1.appendChild(div2)
                    rapper1.appendChild(div3)
                    rapper1.appendChild(div4)
                    rapper1.appendChild(div5)

                    document.getElementById("D001").appendChild(rapper1);
                }

                $('#total').html("Total:" + "Ksh" + Total);

            }
        });
    });
    $('#clients_served').append(clients_served);

    //udate dentists and assistant fields
    $.ajax({
        url: 'dentist-view/',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            var Cdentist = document.getElementById("Cdentist");
            for (row in data) {
                Cdentist.options[Cdentist.options.length] = new Option(data[row].firstname + " " + data[row].lastname, data[row].firstname + " " + data[row].lastname);
            }
        }
    });

    //for assistants updates
    $.ajax({
        url: 'assistant-view/',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            var Cassistant = document.getElementById("Cassistant");
            for (row in data) {
                Cassistant.options[Cdentist.options.length] = new Option(data[row].firstname + " " + data[row].lastname, data[row].firstname + " " + data[row].lastname);
            }
        }
    });


    //changes the tooth position
    let tooth_position = document.getElementById("tooth_position");
    let toUpdate = document.getElementById("droplist2");
    //upper right tooth positions
    let upper_right = {
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
    let upper_left = {
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
    let lower_left = {
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
    let lower_right = {
        Ca41: 'ca 41',
        Ca42: 'ca 42',
        Ca43: 'ca 43',
        Ca44: 'ca 44',
        Ca45: 'ca 45',
        Ca46: 'ca 46',
        Ca47: 'ca 47',
        Ca48: 'ca 48'
    }
    let totoUpper_right = {
        Ca51: 'ca 51',
        Ca52: 'ca 52',
        Ca53: 'ca 53',
        Ca54: 'ca 54',
        Ca55: 'ca 55'
    }
    let totoUpper_left = {
        Ca61: 'ca 61',
        Ca62: 'ca 62',
        Ca63: 'ca 63',
        Ca64: 'ca 64',
        Ca65: 'ca 65'
    }
    let totoLower_left = {
        Ca71: 'ca 71',
        Ca72: 'ca 72',
        Ca73: 'ca 73',
        Ca74: 'ca 74',
        Ca75: 'ca 75'
    }
    let totoLower_right = {
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
    //change tooth types with tooth position
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

    //update the cost input boxes an service details
    $('#add_service').click(() => {
        let currentValue = $('#teeth_selected').val() + $('#droplist3').val()
        let cost = 0;
        let service = $('#droplist3').val();
        if (service == "extraction") {
            cost = 700.00;
            let fcost = Number($('#cost').val()) + cost;
            $('#cost').val(fcost);
        }
        if (service == "rootcanal") {
            cost = 2000.00;
            let fcost = Number($('#cost').val()) + cost;
            $('#cost').val(fcost);
        }
        if (service == "scaling") {
            cost = 3000.00;
            let fcost = Number($('#cost').val()) + cost;
            $('#cost').val(fcost);
        }
        if (service == "masking") {
            cost = 2000.00;
            let fcost = Number($('#cost').val()) + cost;
            $('#cost').val(fcost);
        }
        if (service == "filling") {
            cost = 2000.00;
            let fcost = Number($('#cost').val()) + cost;
            $('#cost').val(fcost);
        }
        if (service == "replacement") {
            cost = 2500.00;
            let fcost = Number($('#cost').val()) + cost;
            $('#cost').val(fcost);
        }
        if (service == "splinting") {
            cost = 3000.00;
            let fcost = Number($('#cost').val()) + cost;
            $('#cost').val(fcost);
        }
        if (service == "I&D") {
            cost = 1500.00;
            let fcost = Number($('#cost').val()) + cost;
            $('#cost').val(fcost);
        }
        if (service == "disimpaction") {
            cost = 1500.00;
            let fcost = Number($('#cost').val()) + cost;
            $('#cost').val(fcost);
        }
        if (service == "toothbuilding") {
            cost = 3000.00;
            let fcost = Number($('#cost').val()) + cost;
            $('#cost').val(fcost);
        }
        if (service == "drysocket") {
            cost = 1000.00;
            let fcost = Number($('#cost').val()) + cost;
            $('#cost').val(fcost);
        }
        let pa = document.createElement("div");
        pa.append(currentValue + toUpdate.value + " " + cost);
        $('#teeth_selected').append(pa);
        let initial = $('#service_description').val();
        $('#service_description').val(initial + " " + " [" + currentValue + toUpdate.value + "=" + cost + "]");

    });


    //hide and show forms
    $('#btn0').click(() => {
        $('#default').css("display", "block");
        $('#f1').css("display", "none");
        $('#f2').css("display", "none");
        $('#f3').css("display", "none");
        $('.rappers').css("display", "none");
    });

    $('#btn1').click(() => {
        $('#default').css("display", "none");
        $('#f1').css("display", "block");
        $('#f2').css("display", "none");
        $('#f3').css("display", "none");
        $('.rappers').css("display", "none");

        //get the last patient to be added to the table
        $.ajax({
            url: 'last-patient/',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                for (row in data) {
                    $('#last_patient').val(data[row].id);
                }
            }
        });
    });


    $('#btn2').click(() => {
        $('.rappers').css("display", "none");
        $('#default').css("display", "none");
        $('#f1').css("display", "none");
        $('#f3').css("display", "none");
        $('#f2').css("display", "block");
    });
    $('#search').click(() => {
        $('#f3').css("display", "block");
        $('.rappers').css("display", "none");
        $('#default').css("display", "none");
        $('#f1').css("display", "none");
        $('#f2').css("display", "none");
    });

    $('#btn6').click(() => {
        window.location.href = '/';
    });

    $('#btn7').click(() => {
        $('#section-two').css("background-color", "#282c34")
    });


});

