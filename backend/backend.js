'use strict';

let express = require('express');
var path = require('path');
let app = express();
let mongoose = require("mongoose");
let hb = require('handlebars');
var fs = require('fs');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://admin:admin@latex-made-easy-xpqdu.mongodb.net/latex-made-easy-db");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastNameName: String
});

var User = mongoose.model("User", nameSchema);

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

app.post('/addToDB', (req, res) => {
    var myData = new User(req.body);

    myData.save().then((item) => {
        console.log(item);
        res.send("item saved to database");
    }).catch((err) => {
        console.log(err);
        res.status(400).send('unable to save to database');
    });
});

app.get('/get-latex', (req, res) => {
    fs.readFile(path.resolve('backend/latex-handlers/acknowledge.html'), 'utf-8', function(error, source) {
        hb.registerHelper('acknowledge', function() {
            return('dummy acknowledgement'); // TODO: parse the JSON
        });

        var template = hb.compile(source);
        var html = template();
        console.log(html);
    });
});

app.listen(3000, () => {
    console.log('app listening on port 3000');
});