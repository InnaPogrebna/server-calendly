var generalResponse = require('../routes/response.js');
var authService = require('../services/authService.js');
class authController {

  async register(req, res) {
    const { newUsername, newPassword } = req.body;
    var obj = generalResponse.responseBody();
    obj.error = false;
    obj.message = 'done';
    obj.data = await authService.register(newUsername,newPassword);
    res.status(generalResponse.responseStatus.success).json(obj);
  }

  async login(req, res) {
    const { username, password } = req.body;
    var obj = generalResponse.responseBody();
    obj.error = false;
    obj.message = 'Auth done';
    obj.data = await authService.login(username, password);
    res.status(generalResponse.responseStatus.success).json(obj);
  }
}

module.exports = new authController();