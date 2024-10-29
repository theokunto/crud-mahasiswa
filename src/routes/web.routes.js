const express = require("express");
const path = require("path");
const router = express.Router();
router.get('/',function (req, res) {
    res.sendFile(path.join(__dirname,'../view/login.html' ))
})
router.get('/dashboard',function (req, res) {
    res.sendFile(path.join(__dirname,'../view/dashboard.html' ))
})
router.get('/mahasiswa',function (req, res) {
    res.sendFile(path.join(__dirname,'../view/mahasiswa.html' ))
})
module.exports=router