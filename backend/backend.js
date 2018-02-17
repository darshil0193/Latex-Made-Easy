'use strict';

let express = require('express');
var path = require('path');
let app = express();
let MongoClient = require('mongodb').MongoClient;
let uri = "mongodb+srv://admin:admin@latex-made-easy-xpqdu.mongodb.net/latex-made-easy-db";

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('SUCCESS');
});

app.post('/addToDB', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  MongoClient.connect(uri, function(err, client) {
    const collection = client.db('latex-made-easy-db').collection('users');
    collection.findOne({username: username}, function(err, item) {
      if(item !== null) {
        client.close();
        res.status(400).send('User already exists');
      } else {
        collection.insert({username: username, password: password}, function(err, item){
          client.close();
          if(err === null) {
            res.status(200).send('Added to the database');
          } else {
            res.status(400).send('Error adding to database');
          }
        });
      }
    });
  });
});

app.post('/checkStatus', (req, res) => {
  let username = req.body.username;
  MongoClient.connect(uri, function(err, client) {
    const collection = client.db('latex-made-easy-db').collection('users');
    collection.findOne({username: username}, function(err, item){
      client.close();
      if(item !== null) {
        res.status(200).send('User can login');
      } else {
        res.status(400).send('No such user exists');
      }
    });
  });
});

app.listen(3000, () => {
    console.log('app listening on port 3000');
});
