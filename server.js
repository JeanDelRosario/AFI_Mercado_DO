// server.js
// where your node app starts

// init project
var express = require('express');
const cors = require('cors');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var AFI;



// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// API endpoint... 
app.get("/json", cors(),function(req, res) {
  mongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true } ,function(err, con) {
  
  con.db('AFI').collection('MercadoLast').find({}).toArray(function(err, data){
    res.json(data);
  })
});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});