var express = require('express')
var bodyparser = require('body-parser');
var mysql = require('mysql');
//var todatabase = require('./todatabase.js');
//var path = require('./routes')

var route = express();


route.use(express.static('public'));
route.use(bodyparser.urlencoded({ extended: false }))
route.set('view engine', 'ejs');

//gets the routing
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
route.get('/search', function (req, res) {
    res.sendFile(__dirname + '/search.html');
});
route.get('/schedules', function (req, res) {
    res.sendFile(__dirname + '/schedules.html');
});




//====================> creates connection to the database
var connection = mysql.createPool({
    connectionLimit:100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clinicsystem',
    debug:false
});
connection.getConnection(function (err) {
    if (err) {throw err;
    }else{
        console.log('connected successfully');
        sendData();
    }    
});

function sendData () {


    //sends the patient information to the database
    route.post('/submit_patient', function (req, res) {
        var sql = "INSERT INTO patient (firstname,lastname,sirname,dob,email,phone,residence,gender) VALUES('" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.sirname + "','" + req.body.date + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.residence + "','" + req.body.gender + "')";
        connection.query(sql, function (err) {
            if (err) {
                throw err;
            } else {
                console.log('data inserted successfully');
                res.end("inserted successfully")
                connection.end();
            }
            
        })
       
    });

    //sends the dentist information to the server
    route.post('/submit_dentist', function (req, res) {
        var sql = "INSERT INTO dentist (firstname,lastname,sirname,dob,email,phone,residence,account,gender,national_id) VALUES('" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.sirname + "','" + req.body.dob + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.residence + "','" + req.body.account + "','" + req.body.gender + "','" + req.body.national + "');";
        connection.query(sql, function (err) {
            if (err) {
                throw err;
            } else {
                console.log('data inserted successfully');
                res.end("inserted successfully");
                connection.end();
            }
        })


    });

    //sends the assistants information to the server
    route.post('/submit_assistant', function (req, res) {
        var sql = "INSERT INTO dentist (firstname,lastname,sirname,dob,email,phone,residence,account,gender,national_id) VALUES('" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.sirname + "','" + req.body.dob + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.residence + "','" + req.body.account + "','" + req.body.gender + "','" + req.body.national + "');";
        connection.query(sql, function (err) {
            if (err) {
                throw err;
            } else {
                console.log('data inserted successfully');
                res.end("inserted successfully");
                connection.end()
            }
        })

    });

}

route.listen(3000);