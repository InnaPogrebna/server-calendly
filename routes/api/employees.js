const { Router } = require('express');
const router = Router();

const employeesController = require('../../controlers/employeesController.js');
router.post("/addEmployees", employeesController.addEmployees);
router.post("/removeEmployees", employeesController.removeEmployees);
router.post("/updateEmployees", employeesController.updateEmployees);
module.exports = router;