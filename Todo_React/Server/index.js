//import modules 
import express from "express"
import mongo from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
//confifuring dotenv variable local
dotenv.config();
//storing express in app variable
const app = express();
//telling express to use json format
app.use(express.json())
app.use(cors())
//connection to database
const connect = async()=>{
    try{
        await mongo.connect(process.env.Mongo);
        console.log("Connected to database");
    }catch(err){
        console.log("error while connection to database",err);
    }
}

// tell to express listen to 1000 port number 
app.listen(1000,()=>{
    connect();
    console.log("server is listening to port number 1000");
})
//schema for todo 
const todoCollection = new mongo.Schema({
    title:String,
    description:String
})
//creating a model in database by using schema
const collection = mongo.model("todo",todoCollection)

//post method to create todo
app.post("/todo", async(req,res)=>{ 
    try{
    const data = {title:req.body.title,description:req.body.description}
    const create = new collection(data);
    await create.save();
    console.log("created successfully");
    res.status(200).json(create);
    }catch(err){
        console.log("error while created data");
        res.status(400).json("error",err)
    }
})

//get  method to get all todo
app.get("/todo",async(req,res)=>{
    try{
        const data = await collection.find();
        res.status(200).json(data)
        console.log("data",data);
    }catch(err){
        console.log("error while getting data");
        res.status(400).json(err)
    }
})

// delete method to delete a particular todo
app.delete("/todo/:id",async(req,res)=>{
    try{ 
        console.log("iddelete",req.params.id);
        await collection.findByIdAndDelete(req.params.id)
        res.status(200).json('deleted successfully')
    }
    catch(err){
        console.log("error while deleting data");
        res.status(400).json("error",err)
    }
}) 

//put method to update a paraticular todo 
app.put("/todo/:id",async(req,res)=>{ 
    try{
        const id = req.params.id
        const data = {title:req.body.title,description:req.body.description}
        console.log("id",id,data,"data");
        const update = await collection.findByIdAndUpdate(id,data,{new:true})
        if(!update){
            res.status(400).json("Unable to update")
        }else{
            res.status(200).json(update)
        }
    }catch(err){
        console.log("error while updating data");
        res.status(400).json("error",err)  
    }
})

