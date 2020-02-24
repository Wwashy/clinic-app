var express = require('express');

var app = express();
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/welcome',function(req,res) {
    res.sendFile(__dirname + '/welcome.html');
});
app.get('dash',function(req,res) {
    res.sendFile(__dirname + '/dash.html');
});
app.get('/patient',function(req,res) {
    res.sendFile(__dirname + '/patient.html');
});
app.get('/schedule',function(req,res) {
    res.sendFile(__dirname + '/contact.html');
});
app.get('/service',function(req,res) {
    res.sendFile(__dirname + '/contact.html');
});
app.get('/search',function(req,res) {
    res.sendFile(__dirname + '/search.html');
});
app.get('/clinicInfo',function(req,res) {
    res.sendFile(__dirname + '/clinicInfo.html');
});


app.listen(3000);