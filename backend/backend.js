'use strict';

let express = require('express');
let path = require('path');
let fs = require('fs');
let hb = require('handlebars');
let app = express();
let MongoClient = require('mongodb').MongoClient;
let uri = "mongodb+srv://admin:admin@latex-made-easy-xpqdu.mongodb.net/latex-made-easy-db";
let _ = require('lodash');

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

let passwordCheck = (password) => {
  if(password.length < 8) {
    return {
      error: 'PASS_LENGTH'
    }
  } else if(password.includes(' ')){
    return {
      error: 'PASS_SPACE'
    }
  } else if(password.includes('//') || password.includes('/*') || password.includes('*/')){
    return {
      error: 'PASS_CHARS'
    }
  } else{
    return {
      error: ''
    }
  }
};

app.post('/registerUser', (req, res) => {
  let username = req.body.username.toLowerCase();
  let password = req.body.password;
  let email = req.body.email.toLowerCase();

  MongoClient.connect(uri, (err, client) => {
    const collection = client.db('latex-made-easy-db').collection('users');
    collection.findOne({username: username}, (err, item) => {
      if (item !== null) {
        client.close();
        res.status(409).send({error: 'UNAME_TAKEN'});
      } else {
        collection.findOne({email: email}, (err, item) => {
          if(item !== null){
            client.close();
            res.status(409).send({error: 'EMAIL_USED'});
          } else{
            let passCheck = passwordCheck(password);
            if(_.isEmpty(passCheck.error)) {
              collection.insert({username: username, password: password, email: email}, (err, item) => {
                client.close();
                if (err === null) {
                  res.status(200).send({data: 'Added to the database'});
                } else {
                  res.status(400).send({error: 'Error adding to database'});
                }
              });
            } else{
              res.status(400).send(passCheck);
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
          res.status(200).send({data: 'User logged in successfully'});
        }
        else{
          res.status(400).send({error: 'PASS_INCORRECT'});
        }
      } else {
        res.status(400).send({error: 'USER_INCORRECT'});
      }
    });
  });
});

app.post('/getLatex', (req, res) => {
        let json = req.body;
        let latexCode = '';
        for (let key in json){
          let filename = key + '.html';
          let source = fs.readFileSync(path.resolve('backend/latex-handlers/'+filename), 'utf8');
          let template = hb.compile(source);
          latexCode += template(json[key]);
        }
        res.status(200).send(latexCode);
});

app.listen(3000, () => {
    console.log('app listening on port 3000');
});
