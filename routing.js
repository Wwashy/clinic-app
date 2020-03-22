var express = require('express')
var bodyparser = require('body-parser');
var mysql = require('mysql');
//var todatabase = require('./todatabase.js');
//var path = require('./routes')

var route = express();


route.use(express.static('public'));
route.use(bodyparser.urlencoded({ extended: true }))
route.set('view engine', 'ejs');

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
var connection = mysql.createPool({
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


    //sends the patient information to the database
    route.post('/submit_patient', function (req, res) {
        var sql = "INSERT INTO patient (firstname,lastname,sirname,dob,email,phone,residence,gender) VALUES('" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.sirname + "','" + req.body.date + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.residence + "','" + req.body.gender + "')";
        connection.query(sql, function (err) {
            if (err) {
                throw err;
            } else {
                console.log('data inserted successfully');
                res.redirect('/dash.html')
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
                res.redirect('/clinicInfo.html')
                //connection.end();
            }
        })


    });

    //sends the assistants information to the server
    route.post('/submit_assistant', function (req, res) {
        var sql = "INSERT INTO assistant(firstname,lastname,sirname,dob,email,phone,residence,account,gender,national_id) VALUES('" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.sirname + "','" + req.body.dob + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.residence + "','" + req.body.account + "','" + req.body.gender + "','" + req.body.national + "');";
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
        var sql = "INSERT INTO clinicinformation (name,category,location)\
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
        var sql = "INSERT  INTO appointment (app_fullname,app_phone,app_date) VALUES('" + req.body.fullname + "','" + req.body.phone + "','" + req.body.day + "');";
        connection.query(sql, (err) => {
            if (err) {
                throw err;
            } else {
                console.log("submitted");
                res.write("submitted successfully");
            }
        });
    });

}
function getData() {
    //===============retrieve Record====================>
    route.get('/patient-record', function (req, res) {
        var sql = "SELECT id,firstname,lastname,email,phone,residence FROM patient"
        connection.query(sql, function (err, result) {
            if (err) throw err;
            res.send(result);

 /*           res.render('service',
                () => {
                    res.write('<head><link rel="stylesheet" href="style.css"></head><header><a href="dash"><button class="close" style="float: left;">back</button></a><h1>Dental clinic</h1></header><main><table>');
                    //  for (var row in result[0]) {
                    res.write('<tr>')
                    for (var column in result[row = 0]) {
                        res.write('<th><label>' + column + '</label></th>');
                    }
                    res.write('</tr>')
                    //   }


                    for (var row in result) {
                        res.write('<tr>');
                        for (var column in result[row]) {
                            res.write('<td><label>' + result[row][column] + '</label></td>');
                        }
                        res.write('</tr>');
                    }
                    res.end('</table></main>');
                }
            );*/
        })
    });

    //render appointments of the employees
    route.get('/appoint-view', function (req, res) {
        var sql = "SELECT * FROM appointment ;";
        connection.query(sql, (err, result,fields) => {
                 res.send(result);
             
//the below code create
            /* if (err) { throw err; } else {
                 res.write('<head><link rel="stylesheet" href="style.css"></head><header><a href="dash"><button class="close" style="float: left;">back</button></a><h1>Dental clinic</h1></header><main><table>');
                 //write the head of the table
                 res.write('<tr>')
                 for (var column in result[0]) {
                       res.write('<th><label>' + column + '</label></th>');      
                 }
                 res.write('</tr>')
 
                 //populates the table cells with data
                 for(var row in result){
                     res.write('<tr>');
                     for( var column in result[row]){
                         res.write('<td><label>'+result[row][column] + '</label></td>');
                     }
                     res.write('</tr>');
                 }
                 res.write('</tr>')
               
                 res.write('</main>');
             }*/
        })

    });

}


route.listen(3000);