require("handlebars")

let express = require('express');
var path = require('path');
let app = express();
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://cluster0-hysdx.mongodb.net/test");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastNameName: String
});

var User = mongoose.model("User", nameSchema);

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res) => {
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

app.listen(3000, () => {
    console.log('app listening on port 3000');
});

