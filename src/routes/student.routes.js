const express = require("express");
const router = express.Router();
const studentController = require('../api/controllers/student.controller');
router.get('/',studentController.getAllStudent)
router.get('/:nim',studentController.getStudentByNim)
router.post('/',studentController.addStudent)
router.delete('/:nim',studentController.deleteStudent)
router.patch('/:nim',studentController.patchStudent)
module.exports=router