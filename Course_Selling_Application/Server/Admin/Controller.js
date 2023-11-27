const admin = require("./Model");
const jwt = require("jsonwebtoken")

const sceretkey = "FreshKite"

const adminCreate = async (req, res) => {
    try {
        const check = await admin.findOne({ adminName: req.body.adminName });

        if (check) {
            return res.status(404).json(`Already exists ${check}`);
        }

        const newAdmin = new admin({
            adminName: req.body.adminName,
            password: req.body.password,
        });
        const token = await jwt.sign({ adminName: req.body.adminName },sceretkey)

        await newAdmin.save();
        res.status(201).json(`${req.body.adminName} created successfully`,token);
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
    
};

const adminLogin = async (req,res) => {
    try{
        const check = await admin.findOne({adminName:req.body.adminName})
        if(!check){
            res.status(404).json("AdminName does not exists")
        }
        const pwdcheck = await admin.findOne({password:req.body.password})
        if(!pwdcheck){
            res.status(404).json("Password wrong")
        }
        res.status(200).json("Done verified")
    }catch(error){
        console.error("Error creating admin:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}

const admindel = async (req,res) => {
    try{
        const dele = await admin.findOneAndDelete({adminName:req.body.adminName})
        if(dele){
            res.status(405).json(`deleted ${req.body.adminName} `)
        }
    }catch(error){
        console.error("Error creating admin:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
        
    

module.exports = {adminCreate,adminLogin,admindel}
