// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
const cors = require('cors');
var app = express();
const db = require('./db');
var AFI;

db.query('SELECT * FROM AFI_MERCADO;')
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// API endpoint... 
app.get("/json", cors(),function(req, res) {
  db.query('SELECT * FROM AFI_MERCADO WHERE "FECHA" = (SELECT MAX("FECHA") FROM AFI_MERCADO)', (err, data) => {
    if (err) {
      console.log(err)
    }
    res.send(data.rows)
  })
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});