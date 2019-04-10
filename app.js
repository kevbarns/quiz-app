require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport     = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// run the code inside the "passport-setup.js"
require("./config/passport-setup.js");

mongoose
  .connect('mongodb://localhost/quiz-app', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: "ca^khT8KYd,G69C7R9(;^atb?h>FTW6664pqEFUKs3",
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.locals.title = 'Quizz Generator';

const index = require('./routes/index.js');
app.use('/', index);

const authentification = require("./routes/authentification-route.js");
app.use("/", authentification);

const dashboard = require("./routes/dashboard-route.js");
app.use("/", dashboard);

const frontoffice = require("./routes/frontoffice-route.js");
app.use("/", frontoffice);

module.exports = app;
