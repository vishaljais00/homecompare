const { urlencoded } = require('express');
const dotenv = require('dotenv');
const express = require('express')
const hbs = require('hbs')
const mysql = require('mysql')
const path = require('path')
const pageRoute = require('./routes/pages')
var bodyParser = require('body-parser'); 

var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 

dotenv.config({path: './.env'});
const port = process.env.PORT || 8000;

// accesing the template

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use('/static', express.static(path.join(__dirname, '/static'))) // accessing the public folder

// connecting to database

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE
});

db.connect((err)=>{

    if (err) {
        console.log(err);
    }
    else{
        console.log('My sql connection successfully')
    }
  
})


// Page router 

    app.use('/', require('./routes/pages'))
    app.use('/auth', require('./routes/auth'))


    // setting error pages

app.use((req, res, next) =>{

    var err = new Error('Page Not Found at my place');
    err.status = 404;
    next(err);
})

//  handeling errors
app.use((err, req, res, next) =>{

    res.status(err.status ||500);
    res.send(err.message)
})



app.listen(port, () => {

    console.log(`Server is strated on port ${port} ...`)
});