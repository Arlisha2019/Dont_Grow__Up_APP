const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
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

app.use(cors())
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
  const { username, password, firstname, lastname, id } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    db.user.create({
      userId: id,
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

app.post('/login', (req, res) => {
  const { username, password} = req.body;
  console.log("User submitted: ", username, password);
  db.user.findOne(
    {
      where: { username: username}
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
            success: true,
            err: null,
            firstName: user.firstname,
            lastName: user.lastname,
            id: user.id,
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

app.post('/new_profile', (req, res) => {

  const { major, city, isProfileCompleted, salary, userId} = req.body;

  db.Profile.build({
    userId: userId,
    major: major,
    city: city,
    salary: salary,
    isProfileCompleted: true
  })
  .save()
  .then(update => {
    console.log('Look at ME' + update);
    res.json(update)
  })
})

app.post('/bank_acc', (req, res) => {

  const {userId, checkingBalance, savingsBalance, isCurrent, paycheck } = req.body;

  db.BankAccount.build({
    userId: userId,
    checkingBalance: checkingBalance,
    savingsBalance: savingsBalance,
    paycheck: paycheck,
    isCurrent: true
  })
  .save()
  .then(update => {
    console.log('Bank Account looking like' + update);
    res.json(update)
  })
})

app.post('/credit_card', (req, res) => {

  const { userId, isCurrent, paymentAmount, dueDate, balance, interestRate, availableBalance } = req.body;

  db.CreditCard.build({
    userId: userId,
    isCurrent: true,
    paymentAmount: paymentAmount,
    dueDate: dueDate,
    balance: balance,
    interestRate: interestRate,
    availableBalance: availableBalance
  })
  .save()
  .then(update => {
    console.log('Credit Cards now active' + update);
    res.json(update)
  })
})

app.post('/student_loan', (req, res) => {

    const { userId, isCurrent, paymentAmount, dueDate, balance, interestRate } = req.body;

    db.StudentLoans.build({
      userId: userId,
      isCurrent: true,
      paymentAmount: paymentAmount,
      dueDate: dueDate,
      balance: balance
    })
    .save()
    .then(update => {
      console.log('Student Loan now Active' + update);
      res.json(update)
    })
  })

app.post('/vehicle', (req, res) => {

  const { userId, isCurrent, paymentAmount, dueDate, balance, interestRate } = req.body;

  db.Vehicle.build({
    userId: userId,
    isCurrent: true,
    paymentAmount: paymentAmount,
    dueDate: dueDate,
    interestRate: interestRate,
    balance: balance
  })
  .save()
  .then(update => {
    console.log('Vehicle now Active' + update);
    res.json(update)
  })
})

app.post('/housing', (req, res) => {

  const { userId, isCurrent, rentAmount, dueDate } = req.body;

  db.Housing.build({
    userId: userId,
    isCurrent: true,
    rentAmount: rentAmount,
    dueDate: dueDate
  })
  .save()
  .then(update => {
    console.log('Housing now Active' + update);
    res.json(update)
  })
})

//Get Users List
app.get('/', (req, res) =>
  db.user.findAll()
    .then(user => {
      console.log(user)
      res.sendStatus(200)
    })
    .catch(err => console.log(err)));


// app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
//   console.log("Web Token Checked.")
//   res.send('You are authenticated'); //Sending some response when authenticated
// });
// app.Profiles.create('/new_profile' (req, res) => {
//   db.Profile.
// })

app.post('/profile/getinfo/:userId', (req, res) => {

  const userId = req.params.userId

  let profileInfo
  let accountInfo
  let returnedInfo

  console.log(req.body);

  db.Profile.findOne({
    where: {userId: userId}
  })
  .then(profile => {
    // profileInfo = {profile:profile}
    console.log(profile);
    res.json(profile)
  })
})

app.get('/bank_acc/info/:userId', (req, res) => {

  const userId = req.params.userId

  db.BankAccount.findOne({
    where: { userId: userId }
  })
  .then(bankAccount => {
    console.log(bankAccount);
    res.json(bankAccount)
  })
})

app.get('/creditCard/info/:userId', (req, res) => {

  const userId = req.params.userId

  db.CreditCard.findOne({
    where: { userId: userId}
  })
  .then(creditCard => {
    console.log(creditCard);
    res.json(creditCard)
  })
})

app.get('/studentLoan/info/:userId', (req, res) => {

  const userId = req.params.userId

  db.StudentLoans.findOne({
    where: { userId: userId}
  })
  .then(studentLoan => {
    console.log(studentLoan);
    res.json(studentLoan)
  })
})

app.get('/vehicle/info/:userId', (req, res) => {

  const userId = req.params.userId

  db.Vehicle.findOne({
    where: { userId: userId}
  })
  .then(vehicle => {
    console.log(vehicle);
    res.json(vehicle)
  })
})

app.get('/housing/info/:userId', (req, res) => {

  const userId = req.params.userId

  db.Housing.findOne({
    where: { userId: userId}
  })
  .then(housing => {
    console.log(housing);
    res.json(housing)
  })
})

app.post('/credit_card/update/:id', (req, res) => {

  const userId = req.params.userId
  const availableBalance = req.body.availableBalance

  db. CreditCard.findOne({
    where: { userId: userId }
  })
  .then(creditCard => {
    return creditCard.Attributes(availableBalance)
  })
  .then(updateCreditCard => {
    res.json(updateCreditCard)
  })
})

app.get('/register', (req, res) => {
  res.send('/register')
})

db.sequelize.sync().then(() => {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
})





module.exports = app;
