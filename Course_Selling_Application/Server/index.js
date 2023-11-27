//import 
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const port = 1000;
const adminRoute = require("./Admin/Routes")
app.use(express.json())
app.use("/Admin",adminRoute)

//Connection url
const url = "mongodb+srv://admin:admin@cluster0.uwuq6dx.mongodb.net/?retryWrites=true&w=majority"

//Connecting to database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Database");
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Error While Connecting to Database", err);
    });

