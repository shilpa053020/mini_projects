// Routes.js
const express = require("express");
const router = express.Router();
const { adminCreate, adminLogin, admindel } = require("./Controller");

router.post("/Signup", adminCreate);
router.post("/Login", adminLogin);
router.delete("delete",admindel)

module.exports = router;
