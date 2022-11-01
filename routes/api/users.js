const { Router } = require('express');
const router = Router();

const userController = require('../../controlers/userController');
router.get("/getUserInfo", userController.getUserInfo);
// router.get("/getZoomInfo", userController.getZoomInfo);
module.exports = router;