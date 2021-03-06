require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const { format } = require('timeago.js')


//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

//Middelwaers
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

//Routes 
app.use(require('./routes/Images'));

// run server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});
