//import packages 
import Express  from "express";
import cors from "cors"
import mysql from "mysql2" 
import db from "./dbconfig.js";
//storing express in app variable
const app = Express();
app.use(Express.json());
app.use(cors());
//route
import route from "./Routes/routes.js"


app.use("/option",route) 

 
//connect to mysql database
const connection = mysql.createConnection(db);
connection.connect((err)=>{ 
      if(err){
           console.log(err,"connection to database fail");
      }
      console.log("Connected to MySQL database");
})

//telling to express to listen to this port number 
app.listen (5000,() =>{
      console.log("server listening to port number 5000");
})


  