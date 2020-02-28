var express = require('express')
var bodyparser = require('body-parser');
var mysql = require('mysql');

var route = express();

route.use(express.static('public'));
route.use(bodyparser.urlencoded({ extended: false }))
route.set('view engine', 'ejs');

//creates connection to the database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clinicsystem'
});
connection.connect(function (err) {
    if (err) throw err;
    console.log('connected successfully');
});


//sends the patient information to the database
route.post('/submit_patient', function (req, res) {
    var sql = "INSERT INTO patient (firstname,lastname,sirname,dob,email,phone,residence,gender) VALUES('" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.sirname + "','" + req.body.date + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.residence + "','" + req.body.gender + "')";
    connection.query(sql, function (err) {
        if (err) {
            throw err;
        } else {
            console.log('data inserted successfully');
            res.end("inserted successfully")
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
        }
    })

});


connection.end();