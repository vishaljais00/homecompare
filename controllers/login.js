const {validationResult} = require('express-validator');
const mysql =  require('mysql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE
});


//login user

exports.login = async (req,res,next) => {



    var email = req.body.email;
    var password = req.body.password;
    

    // statement to query the user’s password
    var login_query = "SELECT * from users where email = ?";

    db.query('SELECT email from users where email = ? ',[email], function(error, result){

        if(error){
            console.log(error);
        }

        if(result.length<0){

            return res.render('login' ,{

                message: 'pls enter your email'
            })

        }
        else if(!email){
                return res.render('login' ,{

                    message: 'Enter email'
                })

            }
        else if(!password){

            return res.render('login' ,{

                message: 'Enter password'
            })
        }


        db.query(login_query, [email], async(err, results)=>{
               
            if(err) throw err;

            if(results.length && bcrypt.compareSync(password, results[0].password)){

                return res.render('index')
            }
            else{  
            return res.render('login' ,{

                message: 'pasword does not match'
            })
            }
            
         });   
   
    })

}

   

    









// function hasAccess(result){
//     if (result) {

//         return res.render('display');
//       console.log("Access Granted!");
//     }
//     else {
//         return res.render('login' ,{

//             message: 'Access Denied'
//         })
//       console.log("Access Denied!");
//     }
//   }
  
//   // query database for user's password
//   db.query(statement, values, function(err, res) {
//     if (err) throw err;
//     else {
//       var hash = res.rows[0].password;
//       // compare hash and password
//       bcrypt.compareSync(password, hash, function(err, result) {
//         // execute code to test for access and login
//         hasAccess(result);
//       });
//     }
//   });

















// const errors = validationResult(req);

//     if(!errors.isEmpty()){
//         return res.status(422).json({ errors: errors.array() });
//     }

//     try{

    
//     const email = req.body.email;
//     const password =  req.body.password;

//         const [row] = await db.execute(
//             "SELECT * FROM `users` WHERE `email`=?",
//             [email]
//           );

//         if (row.length === 0) {
//             return res.render('signup', {
//                     message: 'Invalid email address.',
//                 })
//         }

//         const passMatch = await bcrypt.compareSync(password, row[0].password);
//         if(!passMatch){
//             return res.render('signup', {
//                 message: 'Invalid password.',
//             })
//         }

//         const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

//         return res.json({
//             token:theToken
//         });

//     }
//     catch(err){
//         next(err);
//     }