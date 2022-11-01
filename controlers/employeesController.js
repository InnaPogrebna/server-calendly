var generalResponse = require('../routes/response.js');
var employeesService = require('../services/employeesService.js');
const jwt = require("jsonwebtoken");
class EmployeesController {

  async addEmployees(req, res) {
    // const { first_name, last_name, login, password } = req.body;
    console.log('addEmpl', req.body)
    let checkToken = false;
    try {
      checkToken = jwt.verify(req.body.token, process.env.JWT_KEY);
    } catch (e) { console.log(e) }

    var obj = generalResponse.responseBody();
    if (checkToken) {
          obj.error = false;
    obj.message = 'employees done';
    obj.data = await employeesService.addEmployees(req.body);
    res.status(generalResponse.responseStatus.success).json(obj);
    } else {
      obj.error = true;
      obj.message = 'error token';
      res.status(generalResponse.responseStatus.notAuth).json(obj);
    }
  }

  async removeEmployees(req, res) {
    // console.log('removeEmpl', req.body);
    // var checkToken = await jwt.verify(req.body.token, process.env.JWT_KEY);

    let checkToken = false;
    try {
      checkToken = jwt.verify(req.body.token, process.env.JWT_KEY);
    } catch (e) { console.log(e)}
    //const checkToken = await this.getCheckToken(req.body.token)
    // console.log('reqToken', checkToken)
    var obj = generalResponse.responseBody();

    if (checkToken) {
      obj.error = false;
      obj.message = 'employees removed';
      obj.data = await employeesService.removeEmployees(req.body);
      res.status(generalResponse.responseStatus.success).json(obj);
    } else {
      obj.error = true;
      obj.message = 'error token';
      res.status(generalResponse.responseStatus.notAuth).json(obj);
    }
  }

  async updateEmployees(req, res) {
    console.log('reqUpdate', req.body)

    let checkToken = false;
    try {
      checkToken = jwt.verify(req.body.token, process.env.JWT_KEY);
    } catch (e) { console.log(e) }
    var obj = generalResponse.responseBody();

    if (checkToken) {
      obj.error = false;
      obj.message = 'employees updated';
      obj.data = await employeesService.updateEmployees(req.body);
      res.status(generalResponse.responseStatus.success).json(obj);
    } else {
      obj.error = true;
      obj.message = 'error token';
      res.status(generalResponse.responseStatus.notAuth).json(obj);
    }
  }

  // async getCheckToken(token) {
  //   let checkToken = false;
  //   try {
  //     checkToken = jwt.verify(token, process.env.JWT_KEY);
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   return checkToken;
  // }

}

module.exports = new EmployeesController();