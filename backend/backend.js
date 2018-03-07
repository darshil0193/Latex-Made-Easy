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
let nodemailer = require('nodemailer');
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

let getChapterLatex = (json) => {
  let chapterJson = {'chapter': {}, 'sections':[]};
  chapterJson['chapter']['name'] = json['name'];
  chapterJson['chapter']['introduction'] = json['introduction'];
  let data = json['data'];
  let curSec = {};
  let sectionFound = false;
  let tableLatex = '';
  for(let index in data){
    let curItem = data[index];
    if (curItem['type'] == 'section'){
      sectionFound = true;
      if (Object.keys(curSec).length != 0)
        chapterJson['sections'].push(curSec);
      curSec = {};
      curSec['name'] = curItem['name'];
      curSec['text'] = curItem['text'];
    }

    else if(curItem['type'] == 'table'){
      tableLatex = getTableLatex(curItem);
      if(sectionFound){
        curSec['text'] +=  tableLatex;
      }else{
        chapterJson['chapter']['introduction'] += tableLatex;
      }
      tableLatex = '';
    }

  }
  if(Object.keys(curSec).length != 0){
    chapterJson['sections'].push(curSec);
  }

  console.log('-----------------------------------------')
  console.log(chapterJson);


}

let getTableLatex = (json) => {
  let source = fs.readFileSync(path.resolve('backend/latex-handlers/table.html'), 'utf8');
  let template = hb.compile(source);
  let templateLatex = template(json);
  return templateLatex;
}

let getChaptersLatex = (json) => {
  let templateLatex = '';
  for(var chapter in json['chapters']){
    templateLatex += getChapterLatex(json['chapters'][chapter]);
  }
}

let getLatex = (json) => {
  //let json = JSON.parse(fs.readFileSync('backend/sample-jsons/maindump.json', 'utf8'));
  let latexCode = '';
  let templateLatex = '';
  for (let key in json) {
    if(key == 'chapters') {
      templateLatex = getChaptersLatex(json['chapters']);
    }
    else{
      let filename = key + '.html';
      let source = fs.readFileSync(path.resolve('backend/latex-handlers/' + filename), 'utf8');
      let template = hb.compile(source);
      templateLatex = template(json[key]);
    }
    if(!_.isEmpty(templateLatex)) {
      latexCode += templateLatex + '\r\n';
    }
  }
  // console.log(latexCode);
  return latexCode;
};

app.post('/getLatex', (req, res) => {
  currentUser = req.body.currentUser;
  delete req.body.currentUser;
  let json = req.body;
  let latexCode = getLatex(json);

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

app.post('/sendEmail', (req, res) => {
  let username = req.body.username.toLowerCase();
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'latex.made.easy.mailer@gmail.com',
      pass: 'LatexMadeEasyMailer'
    }
  });


  MongoClient.connect(uri, (err, client) => {
    const collection = client.db('latex-made-easy-db').collection('users');
    collection.findOne({username: username}, (err, item) => {
      client.close();
      if (item !== null) {
        let mailOptions = {
          from: 'latex.made.easy.mailer@gmail.com',
          to: item.email,
          subject: 'Password For Latex Made Easy',
          html: 'Your password for Latex Made Easy is: "<b>' + item.password + '</b>"'
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            res.status(400).send({error: 'EMAIL_NOT_SENT', err: error, email: item.email});
          } else {
            res.status(200).send({email: item.email});
          }
        });
      } else {
        res.status(400).send({error: 'USER_INCORRECT'});
      }
    });
  });
});

app.listen(port, () => {
  console.log('app listening on port ' + port);
});
