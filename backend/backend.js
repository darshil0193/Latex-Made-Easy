'use strict';
let express = require('express');
let path = require('path');
let fs = require('fs');
let hb = require('handlebars');
let app = express();
let MongoClient = require('mongodb').MongoClient;
let uri = 'mongodb+srv://admin:admin@latex-made-easy-xpqdu.mongodb.net/latex-made-easy-db';
let _ = require('lodash'); // jshint ignore:line
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
    return ({
      error: 'PASS_LENGTH'
    });
  } else if (password.includes(' ')) {
    return ({
      error: 'PASS_SPACE'
    });
  } else if (password.includes('//') || password.includes('/*') || password.includes('*/')) {
    return ({
      error: 'PASS_CHARS'
    });
  } else {
    return ({
      error: ''
    });
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
              collection.insert({username: username, password: password, email: email, latex: '', latexJson: {}}, (err) => {
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
          res.status(200).send({data: 'User logged in successfully', latexJson: item.latexJson});
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

let addLatexToDb = (latexCode, latexJson) => {
  MongoClient.connect(uri, (err, client) => {
    const collection = client.db('latex-made-easy-db').collection('users');
    collection.update({username: currentUser}, {
      $set: {latex: latexCode, latexJson: latexJson}
    });
  });
};

hb.registerHelper('addDataToChapters', (chapters) => {
  let chapterNumber = chapters.data.index;
  let chapter = chapters.data.root.chapters[chapterNumber];
  let chapterLatex = '';
  let source = '';
    _.each(chapter.data, (moduleInChapter) => {
      if(_.isEqual(moduleInChapter.type, 'section')) {
        source = fs.readFileSync(path.resolve('backend/latex-handlers/section.html'), 'utf8');
      } else if(_.isEqual(moduleInChapter.type, 'paragraph')) {
        source = fs.readFileSync(path.resolve('backend/latex-handlers/paragraph.html'), 'utf8');
      } else if(_.isEqual(moduleInChapter.type, 'list')) {
        source = fs.readFileSync(path.resolve('backend/latex-handlers/list.html'), 'utf8');
      } else if(_.isEqual(moduleInChapter.type, 'table')) {
        source = fs.readFileSync(path.resolve('backend/latex-handlers/table.html'), 'utf8');
      }
      let template = hb.compile(source);
      chapterLatex += template(moduleInChapter);
    });
  return(chapterLatex.split('& \\').join('\\'));
});

let updateMainJson = (mainJson, key, templateLatex) => {
  mainJson['add' + _.startCase(key)] = templateLatex;
};

let getLatex = (json) => {
  //let json = JSON.parse(fs.readFileSync('backend/sample-jsons/maindump.json', 'utf8'));
  let mainJson = {};
  let latexCode = '';
  for (let key in json) {
    let filename = key + '.html';
    let source = fs.readFileSync(path.resolve('backend/latex-handlers/' + filename), 'utf8');
    let template = hb.compile(source);
    let templateLatex = template(json[key]);
    updateMainJson(mainJson, key, templateLatex);
    if (!_.isEmpty(templateLatex)) {
      latexCode += templateLatex + '\r\n';
    }
  }

  let mainSource = fs.readFileSync(path.resolve('backend/latex-handlers/main.html'), 'utf8');
  let mainTemplate = hb.compile(mainSource);
  let mainLatex = mainTemplate(mainJson);
  return mainLatex;
};

app.post('/getLatex', (req, res) => {
  currentUser = req.body.currentUser;
  delete req.body.currentUser;
  let json = req.body;
  let latexCode = getLatex(json);

  addLatexToDb(latexCode, json);

  if (!fs.existsSync(__dirname + '/download-data/' + currentUser)){
    fs.mkdirSync(__dirname + '/download-data/' + currentUser);
  }


  fs.writeFile(__dirname + '/download-data/' + currentUser + '/latex_file_' + currentUser + '.tex', latexCode, 'utf8', (err) => {
    if (err) {
      throw err;
    }

    console.log('The file was successfully saved');
  });

  fs.createReadStream(__dirname + '/download-data/class_file.cls').pipe(fs.createWriteStream(__dirname + '/download-data/' + currentUser + '/class_file_' + currentUser + '.cls'));
  fs.createReadStream(__dirname + '/download-data/ncsu.png').pipe(fs.createWriteStream(__dirname + '/download-data/' + currentUser + '/ncsu_' + currentUser + '.png'));

  let output = fs.createWriteStream(__dirname + '/download-data/' + currentUser + '/all_files_' + currentUser + '.zip');
  let archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    res.download(__dirname + '/download-data/' + currentUser + '/all_files_' + currentUser + '.zip');
  });

  output.on('end', function() {
    console.log('Data has been drained');
  });

  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
      console.log(err);
    } else {
      // throw error
      throw err;
    }
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);

  archive.file(__dirname + '/download-data/' + currentUser + '/latex_file_' + currentUser + '.tex', {name: 'latex_file.tex'});
  archive.file(__dirname + '/download-data/' + currentUser + '/class_file_' + currentUser + '.cls', {name: 'class_file.cls'});
  archive.file(__dirname + '/download-data/' + currentUser + '/ncsu_' + currentUser + '.png', {name: 'ncsu.png'});
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

        transporter.sendMail(mailOptions, function(error) {
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
