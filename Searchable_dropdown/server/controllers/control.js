import mysql from "mysql2"
import db from "../dbconfig.js"
const database = mysql.createConnection(db)

const getAllUsers = (req,res) =>{
      const get = "SELECT * FROM searchable_dropdown.country_name"
      database.query(get, (error,result)=>{
        if (error) {
            console.log(error);
            res.send(error)
          }else{
        
            res.send(result);
            console.log('result',result);
          }
       
      });
}

const createUser = (req,res) =>{
    const{country} =  req.body;
    console.log(country);
    const sqlInsert =
      "INSERT INTO  country_name(country) VALUES (?)";
    database.query(sqlInsert, [country], (error, result) => {
      if (error) {
        console.log(error);
      }else{
        console.log("creation")
        res.send(result);
      }
    });
}
 
export {getAllUsers,createUser}

  
