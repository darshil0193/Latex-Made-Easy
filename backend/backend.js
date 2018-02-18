'use strict';

let express = require('express');
let path = require('path');
let app = express();
let MongoClient = require('mongodb').MongoClient;
let uri = "mongodb+srv://admin:admin@latex-made-easy-xpqdu.mongodb.net/latex-made-easy-db";

let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('SUCCESS');
});

app.post('/registerUser', (req, res) => {
  let username = req.body.username.toLowerCase();
  let password = req.body.password;
  let email = req.body.email.toLowerCase();
  MongoClient.connect(uri, (err, client) => {
    const collection = client.db('latex-made-easy-db').collection('users');
    collection.findOne({username: username}, (err, item) => {
      if (item !== null) {
        client.close();
        res.status(400).send('Username already taken.');
      } else {
        collection.findOne({email: email}, (err, item) => {
          if(item !== null){
            client.close();
            res.status(400).send('EmailId already used');
          }
          else{
            collection.insert({username: username, password: password, email: email}, (err, item) => {
              client.close();
              if(err === null) {
                res.status(200).send('Added to the database');
              } else {
                res.status(400).send('Error adding to database');
              }
            });
          }
        });
      }
    });
  });
});

app.post('/logInUser', (req, res) => {
  let username = req.body.username.toLowerCase();
  let password = req.body.password;
  MongoClient.connect(uri, (err, client) => {
    const collection = client.db('latex-made-easy-db').collection('users');
    collection.findOne({username: username}, (err, item) => {
      client.close();
      if(item !== null) {
        if(item.password === password){
          res.status(200).send('User can login');
        }
        else{
          res.status(200).send('Password is incorrect');
        }
      } else {
        res.status(400).send('No such user exists');
      }
    });
  });
});

app.listen(3000, () => {
  console.log('app listening on port 3000');
});
