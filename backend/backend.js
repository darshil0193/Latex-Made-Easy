'use strict';

let express = require('express');
let path = require('path');
let fs = require('fs');
let hb = require('handlebars');
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

function authentication(password) {
  if(password.length<8){
    return [false,'Make sure password length is greater than or equal to 8'];
  }
  else if(password.includes(' ')){
    return [false,'Make sure password doesnot contain spaces'];
  }
  else if(password.includes('//')){
    return [false, 'Make sure password doesnot contain //'];
  }
  else if(password.includes('/*')){
    return [false, 'Make sure password doesnot contain /*'];
  }
  else if(password.includes('*/')){
    return [false, 'Make sure password doesnot contain */'];
  }
  else{
    return [true, ""];
  }
}

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
            var auth=authentication(password);
            var returntype=auth[0];
            var string = auth[1];
            if(returntype) {
              collection.insert({username: username, password: password, email: email}, (err, item) => {
                client.close();
                if (err === null) {
                  res.status(200).send('Added to the database');
                } else {
                  res.status(400).send('Error adding to database');
                }
              });
            }
            else{
              res.status(400).send(string);
            }
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

app.post('/getLatex', (req, res) => {
        var json = req.body;
        var latexCode = '';
        for (var key in json){
          var filename = key + '.html';
          var source = fs.readFileSync(path.resolve('backend/latex-handlers/'+filename), 'utf8');
          var data = json[key];
          var template = hb.compile(source);
          var curLatex = template(data);
          latexCode += curLatex;
        }
        console.log(latexCode);
});

app.listen(3000, () => {
    console.log('app listening on port 3000');
});
