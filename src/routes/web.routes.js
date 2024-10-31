const express = require("express");
const path = require("path");
const router = express.Router();

router.get('/',function (req, res) {
    res.sendFile(path.join(__dirname,'../../public/login.html' ))
})
router.get('/student',function (req, res) {
    res.sendFile(path.join(__dirname,'../../public/student.html' ))
})
module.exports=router