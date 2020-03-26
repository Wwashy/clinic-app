let express = require('express')
let bodyparser = require('body-parser');
let mysql = require('mysql');
//let todatabase = require('./todatabase.js');
//let path = require('./routes')

let route = express();


route.use(express.static('public'));
route.use(bodyparser.urlencoded({ extended: true }))

//gets the routing
getRoute();
function getRoute(params) {
    route.get('/clinicInfo', function (req, res) {
        res.sendFile(__dirname + '/clinicInfo.html');
    });
    route.get('/welcome', function (req, res) {
        res.sendFile(__dirname + '/welcome.html');
    });
    route.get('/dash', function (req, res) {
        res.sendFile(__dirname + '/dash.html');
    });
    route.get('/patient', function (req, res) {
        res.sendFile(__dirname + '/patient.html');
    });
    route.get('/service', function (req, res) {
        res.sendFile(__dirname + '/service.html');
    });
    route.get('/search', function (req, res) {
        res.sendFile(__dirname + '/search.html');
    });
    route.get('/schedules', function (req, res) {
        res.sendFile(__dirname + '/schedules.html');
    });
    route.get('/contact', function (req, res) {
        res.sendFile(__dirname + '/contact.html')
    })
    route.get('/login', (req, res) => {
        res.sendFile(__dirname + '/login.html')
    });

}
//====================> creates connection to the database
let connection = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clinicsystem',
    debug: false
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

function sendData() {

//sends the service data and the patient id
    route.post('/submit_service',(req,res)=>{
        let today = new Date();
        let date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
        let time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
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
        '"+ req.body.patient_id +"',\
        '"+ req.body.service +"',\
        '"+ req.body.tooth_position +"',\
        '"+ req.body.tooth_name +"',\
        '"+ req.body.service_description +"',\
        '"+ req.body.cost +"',\
        '"+req.body.cdentist+"',\
        '"+req.body.cassistant+"',\
        '"+date+"',\
        '"+time+"');";

        connection.query(sql,(err)=>{
            if (err) throw err;
            console.log('sent!');
            res.sendFile(__dirname+'/dash.html');
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
                res.sendFile(__dirname+'/climicInfo.html')
                //connection.end();
            }
        })


    });

    //sends the assistants information to the server
    route.post('/submit_assistant', function (req, res) {
        let sql = "INSERT INTO assistant(firstname,lastname,sirname,dob,email,phone,residence,account,gender,national_id) VALUES('" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.sirname + "','" + req.body.dob + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.residence + "','" + req.body.account + "','" + req.body.gender + "','" + req.body.national + "');";
        connection.query(sql, function (err) {
            if (err) {
                throw err;
            } else {
                console.log('data inserted successfully');
                res.end("inserted successfully");
                res.redirect('/clinicInfo.html');
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
                document.getElementById("D001").innerHTML = "submitted succesfully";
                console.log('submitted successfullly');
                res.redirect('/clinicInfo.html')
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
                res.sendFile(__dirname+ '/dash.html');
            }
        });
    });
    

}
function getData() {
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
        let sql = "SELECT * FROM appointment ;";
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
        connection.query(sql, (err, result,fields) => {
            res.send(result);
        });
    });
    //get the daily transaction
    route.get('/patient/transaction/today-record',(req,res)=>{
        //let sql ="joint sql query from to tables"
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();           
        let sql = "SELECT patient_id,service_description,cost,service_date,service_time FROM service WHERE service_date ='"+date+"'";
        connection.query(sql,(err,result,fields)=>{
            res.send(result);
        });
    })
    route.get('/last-patient',(req,res)=>{
        let sql = "SELECT id FROM patient where id =(SELECT MAX(id) FROM patient);"
        connection.query(sql,(err,result)=>{
            res.send(result);
        })
    });

}


route.listen(3000);