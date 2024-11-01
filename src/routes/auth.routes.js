const express = require("express");
const router = express.Router();
const authController = require('../api/controllers/auth.controller')
router.post('/login',authController.login)
router.get('/checkAuth',authController.getLog)
router.get('/logout',authController.logout)
module.exports=router