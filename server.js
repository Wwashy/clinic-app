let express = require('express')
let bodyparser = require('body-parser');
let mysql = require('mysql');

let route = express();

route.set('port',(process.env.PORT || 4000));


route.use(express.static('public'));
route.use(bodyparser.urlencoded({ extended: true }))

//====================> creates connection to the database
//mysql://b06a5a9cc3bfb2:3a7c6e6c@us-cdbr-iron-east-01.cleardb.net/heroku_7185d4f190fa775?reconnect=true
let connection = mysql.createPool({
    connectionLimit: 100,
    host: 'us-cdbr-iron-east-01.cleardb.net' ,//'localhost',
    user: 'b06a5a9cc3bfb2',//'webwalkeR',
    password: '3a7c6e6c',//'Hellen@1999',
    database: 'heroku_7185d4f190fa775' ,//'clinic',
    debug: false,
    multipleStatements: true
});
connection.getConnection(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('connected successfully');
        sendData();
        getData();
    }
});

//gets the routing
getRoute();
function getRoute(params) {
    route.get('/', function (req, res) {
        //loads login page for directions
        res.sendFile(__dirname + '/login.html');
    });
    //gets the login details of the user and authenticate
    var user = false;
    var passcode = false;

    route.post('/login', (req, res) => {
        if (req.body.user != "" && req.body.password != "") {
            if (req.body.user == "admin" && req.body.password == "1234") {
                //serves the dashboard
                user = true;
                passcode = true;
                res.redirect('/dash');
            } else if (req.body.user == "admin" && req.body.password == "0000") {
                user = true;
                passcode = true;
                res.redirect('/admin');
            } else {
                res.sendFile(__dirname + '/login.html');
            }
        } else {
            res.send("Authentication failed:EMPTY");
        }
    });


    route.get('/dash', (req, res) => {
        if (user == true && passcode == true) {
            res.sendFile(__dirname + '/dash.html')
        } else {
            res.send("error");
        }
    });
    route.get('/admin', (req, res) => {
        if (user == true && passcode == true) {
            res.sendFile(__dirname + '/clinicinfo.html');
        } else {
            res.send("error");
        }
    });



    route.get('/welcome', function (req, res) {
        res.sendFile(__dirname + '/welcome.html');
    });
    route.get('/contact', function (req, res) {
        res.sendFile(__dirname + '/contact.html')
    })
    route.get('/login', (req, res) => {
        res.sendFile(__dirname + '/login.html')
    });

}
function sendData() {
    //searchingt the individual
    route.get('/searching', (req, res) => {
        if (req.query.searched == '') {
            res.send([{ message: "empty" }]);
            console.log("type something to search");
        } else {
            if (req.query.who == "patient") {
                var sql = "SELECT * FROM patient WHERE firstname LIKE '%" + req.query.searched + "%' OR phone LIKE '%" + req.query.searched + "%';"
            }
            if (req.query.who == "dentist") {
                var sql = "SELECT * FROM dentist WHERE firstname LIKE '%" + req.query.searched + "%';"
            }
            if (req.query.who == 'assistant') {
                var sql = "SELECT * FROM assistant WHERE firstname LIKE '%" + req.query.searched + "%';"
            }
            connection.query(sql, (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        }
    })

    //updates all the title depending on the clinic
    route.post('/title', (req, res) => {
        let sql = "SELECT * FROM clinicinformation;"
        connection.query(sql, (err, result) => {
            res.send(result);
        });
    });
    //messages
    route.post('/message', (req, res) => {
        let sql = "INSERT INTO feed(feed_name,feed_mail,feed_text) VALUES('" + req.body.client_name + "','" + req.body.client_email + "','" + req.body.message + "')";
        connection.query(sql, (err) => {
            if (err) throw erro;
            res.sendFile(__dirname + '/contact.html');
        });
    });

    //sends the service data and the patient id
    route.post('/submit_service', (req, res) => {
        let today = new Date();
        let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let sql = "INSERT INTO service \
        (patient_id,\
        service,\
        tooth_position,\
        tooth_name,\
        service_description,\
        cost,\
        cdentist,\
        cassistant,\
        service_date,\
        service_time)\
        VALUES(\
        '"+ req.body.patient_id + "',\
        '"+ req.body.service + "',\
        '"+ req.body.tooth_position + "',\
        '"+ req.body.tooth_name + "',\
        '"+ req.body.service_description + "',\
        '"+ req.body.cost + "',\
        '"+ req.body.cdentist + "',\
        '"+ req.body.cassistant + "',\
        '"+ date + "',\
        '"+ time + "');";

        connection.query(sql, (err) => {
            if (err) throw err;
            console.log('sent!');
            res.sendFile(__dirname + '/dash.html');
        });
    });
    //sends the patient information to the database
    route.post('/submit_patient', function (req, res) {
        let sql = "INSERT INTO patient (firstname,lastname,sirname,dob,email,phone,residence,gender) VALUES('" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.sirname + "','" + req.body.date + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.residence + "','" + req.body.gender + "')";
        connection.query(sql, function (err) {
            if (err) {
                throw err;
            } else {
                console.log('data inserted successfully');
                res.sendFile(__dirname + '/dash.html');
            }

        })

    });

    //sends the dentist information to the server
    route.post('/submit_dentist', function (req, res) {
        let sql = "INSERT INTO dentist (firstname,lastname,sirname,dob,email,phone,residence,account,gender,national_id) VALUES('" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.sirname + "','" + req.body.dob + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.residence + "','" + req.body.account + "','" + req.body.gender + "','" + req.body.national + "');";
        connection.query(sql, function (err) {
            if (err) {
                throw err;
            } else {
                console.log('data inserted successfully');
                res.sendFile(__dirname + '/clinicInfo.html')
                //connection.end();
            }
        })


    });

    //sends the assistants information to the server
    route.post('/submit_assistant', function (req, res) {
        let sql = "INSERT INTO assistant (firstname,lastname,sirname,dob,email,phone,residence,account,gender,national_id) VALUES('" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.sirname + "','" + req.body.dob + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.residence + "','" + req.body.account + "','" + req.body.gender + "','" + req.body.national + "');";
        connection.query(sql, function (err) {
            if (err) {
                throw err;
            } else {
                console.log('data inserted successfully');
                res.sendFile(__dirname + '/clinicInfo.html');
            }
        })

    });
    //sends the clinic informtaion
    route.post('/submit_about', function (req, res) {
        let sql = "INSERT INTO clinicinformation (name,category,location)\
         VALUES('" + req.body.name + "','" + req.body.category + "','" + req.body.location + "');";
        connection.query(sql, function (err) {
            if (err) {
                throw err
            } else {
                console.log('submitted successfullly');
                res.sendFile(__dirname + '/clinicInfo.html')
                //connection.end();
            }
        })
    });

    //send appointments
    route.post('/appointment', (req, res) => {
        let sql = "INSERT  INTO appointment (app_fullname,app_phone,app_date) VALUES('" + req.body.fullname + "','" + req.body.phone + "','" + req.body.day + "');";
        connection.query(sql, (err) => {
            if (err) {
                throw err;
            } else {
                console.log("submitted");
                res.sendFile(__dirname + '/dash.html');
            }
        });
    });


}
function getData() {
    //counts all personnel
    route.get('/numbers', (req, res) => {
        let sql = "SELECT COUNT(*) AS NumberOfpatient FROM patient;\
        SELECT COUNT(*) AS NumberOfservice FROM service;\
        SELECT COUNT(*) AS NumberOfdentist FROM dentist;\
        SELECT COUNT(*) AS NumberOfassistant FROM assistant;\
        SELECT COUNT(*) AS NumberOfappointment FROM appointment;"
        connection.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result[0][0].NumberOfpatient);
            console.log(result[1][0].NumberOfservice);
            console.log(result[2][0].NumberOfdentist);
            console.log(result[3][0].NumberOfassistant);
            console.log(result[4][0].NumberOfappointment);
            let data = {
                patient: result[0][0].NumberOfpatient,
                service: result[1][0].NumberOfservice,
                dentist: result[2][0].NumberOfdentist,
                assistant: result[3][0].NumberOfassistant,
                appointment: result[4][0].NumberOfappointment
            }
            res.send(data);
        });
    });
    //===============retrieve Record====================>
    route.get('/patient-record', function (req, res) {
        let sql = "SELECT id,firstname,lastname,email,phone,residence FROM patient"
        connection.query(sql, function (err, result) {
            if (err) throw err;
            res.send(result);
        })
    });

    //render appointments of the employees
    route.get('/appoint-view', function (req, res) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let sql = "SELECT * FROM appointment WHERE app_date = '" + date + "' ;";
        connection.query(sql, (err, result, fields) => {
            res.send(result);
        })

    });
    // get the dentists available
    route.get('/dentist-view', (req, res) => {
        let sql = "SELECT * FROM dentist;"
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });
    //get the assistants available
    route.get('/assistant-view', (req, res) => {
        let sql = "SELECT * FROM assistant;"
        connection.query(sql, (err, result, fields) => {
            res.send(result);
        });
    });
    //get the daily transaction
    route.get('/patient/transaction/today-record', (req, res) => {
        //let sql ="joint sql query from to tables"
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let sql = "SELECT patient.firstname,patient.lastname,patient_id,service.service_id,\
        service.service_description,service.cost,service.service_date,service.service_time\
         FROM patient,service WHERE service.service_date ='"+ date + "' AND patient.id = service.patient_id ";
        connection.query(sql, (err, result, fields) => {
            res.send(result);
            console.log(result);
        });
    })
    //gets the last patient in table patient
    route.get('/last-patient', (req, res) => {
        let sql = "SELECT id FROM patient where id =(SELECT MAX(id) FROM patient);"
        connection.query(sql, (err, result) => {
            res.send(result);
        })
    });
}

route.on('listening', () => {
    console.log('listening');
});
route.listen(route.get('port'), (err) => {
    if (err) throw err;
    console.log('listenning to port 4000',route.get('port'));
});