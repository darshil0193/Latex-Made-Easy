'use strict';

let express = require('express');
let path = require('path');
let fs = require('fs');
let hb = require('handlebars');
let app = express();
let MongoClient = require('mongodb').MongoClient;
let uri = "mongodb+srv://admin:admin@latex-made-easy-xpqdu.mongodb.net/latex-made-easy-db";
let _ = require('lodash');
let archiver = require('archiver');
let currentUser = '';

let bodyParser = require('body-parser');

let port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');
  next();
});

app.get('/', (req, res) => {
  res.send('SUCCESS');
});

let passwordCheck = (password) => {
  if (password.length < 8) {
    return {
      error: 'PASS_LENGTH'
    }
  } else if (password.includes(' ')) {
    return {
      error: 'PASS_SPACE'
    }
  } else if (password.includes('//') || password.includes('/*') || password.includes('*/')) {
    return {
      error: 'PASS_CHARS'
    }
  } else {
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
          if (item !== null) {
            client.close();
            res.status(409).send({error: 'EMAIL_USED'});
          } else {
            let passCheck = passwordCheck(password);
            if (_.isEmpty(passCheck.error)) {
              collection.insert({username: username, password: password, email: email}, (err, item) => {
                client.close();
                if (err === null) {
                  res.status(200).send({data: 'Added to the database'});
                } else {
                  res.status(400).send({error: 'Error adding to database'});
                }
              });
            } else {
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
      if (item !== null) {
        if (item.password === password) {
          res.status(200).send({data: 'User logged in successfully'});
        }
        else {
          res.status(400).send({error: 'PASS_INCORRECT'});
        }
      } else {
        res.status(400).send({error: 'USER_INCORRECT'});
      }
    });
  });
});

app.post('/getLatex', (req, res) => {
  currentUser = req.body.currentUser;
  delete req.body.currentUser;
  let json = req.body;
  let latexCode = '';
  for (let key in json) {
    let filename = key + '.html';
    let source = fs.readFileSync(path.resolve('backend/latex-handlers/' + filename), 'utf8');
    let template = hb.compile(source);
    let templateLatex = template(json[key]);
    if(!_.isEmpty(templateLatex)) {
      latexCode += templateLatex + '\r\n';
    }
  }

  fs.writeFile(__dirname + '/latex_file.tex', latexCode, 'utf8', (err) => {
    if (err) throw err;
    console.log('The file was successfully saved');
  });

  let output = fs.createWriteStream(__dirname + '/all_files_' + currentUser + '.zip');
  let archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    res.download(__dirname + '/all_files_' + currentUser + '.zip');
  });

  output.on('end', function() {
    console.log('Data has been drained');
  });

  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);


  archive.file(__dirname + '/latex_file.tex', {name: 'latex_file.tex'});
  archive.file(__dirname + '/class_file.cls', {name: 'class_file.cls'});
  archive.finalize();
});

app.listen(port, () => {
  console.log('app listening on port ' + port);
});
