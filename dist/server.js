"use strict";
// server.js
// where your node app starts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// init project
require('dotenv').config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var db_1 = require("./db");
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var port = 3000;
// http://expressjs.com/en/starter/static-files.html
app.use(express_1.default.static('public'));
app.use(express_1.default.static('dist/public'));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(path_1.default.join(__dirname + '/../views/index.html'));
});
// API endpoint... 
app.get("/json", cors_1.default(), function (req, res) {
    db_1.queryDatabase('SELECT * FROM AFI_MERCADO WHERE "FECHA" = (SELECT MAX("FECHA") FROM AFI_MERCADO)', function (err, data) {
        if (err) {
            console.log(err);
        }
        res.send(data.rows);
    });
});
// listen for requests :)
var listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + port);
});
