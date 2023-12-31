var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./models/Account');
passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function (user){

      // if (err) { return done(err); }
      //
       if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      } 
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
    .catch(function(err){
      return done(err)
    });
  })
)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var peacockRouter = require('./routes/peacock');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var peacock = require("./models/peacock");
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,{useNewUrlParser: true,useUnifiedTopology: true});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Get the default connection
var db = mongoose.connection;
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/peacock', peacockRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);

async function recreateDB(){
  // Delete everything
  await peacock.deleteMany();
  let instance1 = new
  peacock({peacock_color:"blue", peacock_breed:'Pavo cristatus peacock',peacock_price:2500});
  let instance2 = new
  peacock({peacock_color:"white", peacock_breed:'white peafowl',peacock_price:7500});
  let instance3 = new
  peacock({peacock_color:"green", peacock_breed:'Green Peafowl',peacock_price:8000});
  instance1.save().then(doc=>{
  console.log("First object saved")}
  ).catch(err=>{
  console.error(err)
  });
  instance2.save().then(doc=>{
    console.log("Second object saved")}
    ).catch(err=>{
    console.error(err)
    });
    instance3.save().then(doc=>{
      console.log("Third object saved")}
      ).catch(err=>{
      console.error(err)
      });
  }
  let reseed = true;
  if (reseed) {recreateDB();}

// passport config
// Use the existing connection
// The peacock model
//var peacock =require('./models/peacock');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
