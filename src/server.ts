// server.js
// where your node app starts

// init project
require('dotenv').config();
import express, {Express, Request, Response} from 'express'
import cors from 'cors';
import {queryDatabase} from './db';
import path from 'path';

var app : Express = express();

const port : number = 3000;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('dist/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req: Request, res: Response) : void {
  res.sendFile(path.join(__dirname + '/../views/index.html'));
});


// API endpoint... 
app.get("/json", cors(), function(req: Request, res: Response) : void {
  queryDatabase('SELECT * FROM AFI_MERCADO WHERE "FECHA" = (SELECT MAX("FECHA") FROM AFI_MERCADO)', (err, data) => {
    if (err) {
      console.log(err)
    }
    res.send(data.rows)
  })
});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});