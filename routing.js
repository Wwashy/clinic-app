var express = require('express')
var bodyparser = require('body-parser');
var mysql = require('mysql');

var route = express();

route.use(express.static('public'));
route.use(bodyparser.urlencoded({ extended: false }))
route.set('view engine', 'ejs');

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
    res.sendFile(__dirname + '/contact.html');
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

route.listen(4000);