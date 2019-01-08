const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const PORT = process.env.PORT || 3000;
var app = express();

// Requiring our models for syncing
var db = require('./models');

const Sequelize = require('sequelize');

const data = new Sequelize("postgres://localhost:5432/finappdb")

data.authenticate()
  .then(() => console.log('database connected............'))
  .catch(err => console.log('Error: ' + err))


/*========= Here we want to let the server know that we should expect and allow a header with the content-type of 'Authorization' ============*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

/*========= This is the typical node server setup so we can be able to parse the requests/responses coming in and out of the server ============*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/*========= Here we will set up an express jsonwebtoken middleware(simply required for express to properly utilize the token for requests) You MUST instantiate this with the same secret that will be sent to the client ============*/
const jwtMW = exjwt({
  secret: 'I love the mess'
});

app.post('/register', (req, res) => {
  const { username, password, firstname, lastname } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    db.user.create({
      username: username,
      password: hash,
      firstname: firstname,
      lastname: lastname
    }).then((result) => {
      console.log("User created: ", result);
      res.json("user created!");
    })
  });
})

/* This is SUPER important! This is the route that the client will be passing the entered credentials for verification to. If the credentials match, then the server sends back a json response with a valid json web token for the client to use for identification. */
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("User submitted: ", username, password);

  db.user.findOne(
    {
      where: { username: username }
    })
    .then((user) => {
      console.log("User Found: ", user);
      if (user === null) {
        res.json(false);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          console.log("Valid!");
          let token = jwt.sign({ username: user.username }, 'I love the mess', { expiresIn: 129600 }); // Signing the token
          res.json({
            sucess: true,
            err: null,
            token
          });
        }
        else {
          console.log("Entered Password and Hash do not match!");
          res.status(401).json({
            sucess: false,
            token: null,
            err: 'Entered Password and Hash do not match!'
          });
        }
      });
    })
});
//Get Users List
app.get('/', (req, res) =>
  db.user.findAll()
    .then(user => {
      console.log(user)
      res.sendStatus(200)
    })
    .catch(err => console.log(err)));

// app.get('/add', (req, res) => {
//   const data = {
//     firstname: 'Arnold',
//     lastname: 'Hayles',
//     username: 'Arnold2019',
//     password: '12345678'
//   }
//   let { firstname, lastname, username, password } = data
//
//   db.user.create({
//     firstname,
//     lastname,
//     username,
//     password
//   })
//     .then(user => res.redirect('/'))
//     .catch(err => console.log(err))
//
// })

// app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
//   console.log("Web Token Checked.")
//   res.send('You are authenticated'); //Sending some response when authenticated
// });

db.sequelize.sync().then(() => {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
})

app.get('/register', (req, res) => {
  res.send('/register')
})



module.exports = app;
