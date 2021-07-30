const mysql =  require('mysql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE
});


exports.register = (req ,res )=> {


    const username  =  req.body.username;
    const email = req.body.email;
    const password =  req.body.password;
    const passwordConfirm =  req.body.repassword;

    db.query('SELECT email from users WHERE email = ?', [email], async(error, results)=>{

        if(error){
            console.log(error);
        }

        if(results.length>0){

            return res.render('signup' ,{

                message: ' That email is already in use'
            })

        }
        else if(!email){
                return res.render('signup' ,{

                    message: 'Enter email'
                })

            }
        else if( ! username){
                return res.render('signup', {
                    message: 'Enter User name'
                })
            }
        else if( password !== passwordConfirm){
                return res.render('signup', {
                    message: 'password do nat match'
                })
            }

        

            let hashedPassword =await bcrypt.hashSync(password,salt);

          db.query('INSERT INTO users SET ?', {username:username, email:email, password:hashedPassword}, (error,results)=>{

            if(error){
                console.log(error);
            } else {
                console.log(results);
                return res.render('signup', {
                    message: 'User registered'
                })
            }
          })



    });

}

// login hbs

// exports.login = (req, res ) => {

//     const email =  req.body.email
//     const password = req.body.password
//     let hashedPassword =await bcrypt.hashSync(password,8);

    
//     db.query('SELECT * from users where email = ? and password = ?',[email],[password], function(error, results){

//         if(results.length>0){
//             res.redirect('index')
//         }else{
//             res.redirect('login')
//         }
//         res.end();
//     })

//     // when login is success
//     app.get('/index',(req, res)=>{

//         res.sendFile(__dirname + '/index.hbs')
//     })


// }