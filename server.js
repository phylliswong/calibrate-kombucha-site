/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable no-path-concat */
/* eslint-disable prefer-destructuring */
require('dotenv').config();
const express = require('express');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const Email = require('./models/email');

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.DOMAIN,
  },
};
const app = express();

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

/* ************************
        MIDDLEWARE
************************ */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('default')); // display each request in the console
// parse application/json
app.use(bodyParser.json());


// ======= API calls =======
app.get('/', (req, res) => {
  res.render('index');
});

// SHOW email form
app.get('/email', (req, res) => {
  res.render('email');
});

app.get('/thanks', (req, res) => {
  res.render('index');
});

app.get('/unsub-thanks', (req, res) => {
  res.render('unsub-thanks.html');
});

// CREATE a new email
app.post('/email/new', (req, res) => {
  console.log('Request: ', req.body);

  const data = {
    from: req.body.from,
    subject: req.body.subject,
    text: req.body.content,
  };

  nodemailerMailgun.sendMail({
    from: req.body.from,
    to: 'info@calibratekombucha.com',
    subject: req.body.subject,
    template: {
      name: 'email.hbs',
      engine: 'handlebars',
      context: data,
    },
  }).then((info) => {
    console.log('Response: ', info);
    res.redirect('/');
  }).catch((err) => {
    console.log('Error sending email: ', err.message);
  });
});

// JOIN email list
app.post('/subscribe', (req, res) => {
  const data = {
    from: req.body.from,
    subject: "You've Got a New Subscriber to Your Website!",
    text: 'Please subscribe me to your list',
  };

  nodemailerMailgun.sendMail({
    from: req.body.from,
    to: 'info@calibratekombucha.com',
    subject: data.subject,
    template: {
      name: 'thanks.hbs',
      engine: 'handlebars',
      context: data,
    },
  }).then((info) => {
    console.log('Response: ', info);
    const email = new Email();
    email.emailAdress = req.body.from;
    email.save()
      .then((savedEmail) => {
        // FIXME: change this to redirect to a route and serve up the index.html
        console.log('Saved email', savedEmail);
        res.redirect('/');
      }).catch((error) => { console.log('Error saving email', error.message); });
  }).catch((err) => {
    console.log('Error: ', err);
  });
});

// UNJOIN email from list
app.post('/unsubscribe', (req, res) => {
  const data = {
    from: req.body.from,
    subject: 'UNSUBSCRIBE',
    text: 'Please unsubscribe me from your list',
  };

  nodemailerMailgun.sendMail({
    from: req.body.from,
    to: 'info@calibratekombucha.com',
    subject: data.subject,
    template: {
      name: 'email.hbs',
      engine: 'handlebars',
      context: data,
    },
  }).then((info) => {
    // Delete
    Email.findByIdAndRemove(req.params.id, req.body)
      .then((removedEmail) => {
        res.redirect('/');
      }).catch((err) => {
        console.log(`Error: ${err.message}`);
      });
  });
});

// DATABASE
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true },
  () => { console.log('Connected to Calibrate Kombucha Database'); },
);

// SEVER
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
