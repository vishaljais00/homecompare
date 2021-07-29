const mysql =  require('mysql')


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE
})
.on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });


