var generalResponse = require('../routes/response.js');
var userService = require('../services/userService.js');
// var employeesService = require('../services/employeesService.js');

class userController {

  async getUserInfo(req, res) {
    var obj = generalResponse.responseBody();
    if(typeof req.userInfo !== "undefined"){
      var obj = generalResponse.responseBody();
      obj.error = false;
      obj.message = 'done';
      obj.token = req.userInfo
      console.log('obj.token', obj.token)
      obj.data = await userService.getUserInfo(req.userInfo.userId);
      res.status(generalResponse.responseStatus.success).json(obj);
    }else{
      obj.error = true;
      obj.message = 'not auth';
      res.status(generalResponse.responseStatus.notAuth).json(obj);
    }
  }

  async getZoomInfo(req, res) {
    var obj = generalResponse.responseBody();
    //obj.data = await userService.getZoomInfo(req);
    console.log('obj', obj, req)
  //return {data: obj.data}
  }
}

module.exports = new userController();