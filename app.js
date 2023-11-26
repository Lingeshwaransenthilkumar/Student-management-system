const express=require("express");
const app=express();
const mysql=require("mysql")
const hbs=require("hbs");
const bodyParser = require("body-parser");
const dotenv=require("dotenv");
const path=require("path");



//! abstraction of database info
dotenv.config({
    path :"./.env",
});



//! used to read data objects from request 
//? in login syatem we use inbuild urlencoder in express
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());





//! static files
app.use(express.static("public"));

app.set("view engine","hbs");

/*
//*mysql
const con=mysql.createPool({
    connectionLimit:10,
    host:process.env.database_host,
    user:process.env.database_user,
    password:process.env.database_password,
    database:process.env.database
})
//* connnection testing
con.getConnection((err,connection)=>{
    if(err) throw err
    console.log("connection success");
})
/*
app.get("/",(req,res)=>{
    res.render("home");
})
*/
//!routes
const routes=require("./server/routes/students");
app.use('/',routes);





//! used to run on server
app.listen(5000,()=>{
    console.log("app is running on http://localhost:5000")
})