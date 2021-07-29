const express = require('express');
const router = express.Router();

const app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true })); 



// get index page

router.get('/', (req,res,next) =>{
    res.render('index.hbs',
    {
        title: "Home Compare"
    })

})

router.get('/index.hbs', (req,res,next) =>{
    res.render('index.hbs')

})
router.get('/display.hbs', (req,res,next) =>{
    res.render('display.hbs');

})
router.get('/postpage.hbs', (req,res,next) =>{
    res.render('postpage.hbs');

})
router.get('/login.hbs', (req,res,next) =>{
    res.render('login.hbs');

})
router.get('/signup.hbs', (req,res,next) =>{
    res.render('signup.hbs');

})

// // post login data
// router.post('/login.hbs', (req, res, next) => {


//     res.json(req.body);

// });

// // post register data

// router.post('/signup.hbs', (req,res,next) =>{
//     res.json(req.body);
    
// })




module.exports =router