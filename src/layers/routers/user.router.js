const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();
//const signMiddleware = require('../middlewares/sign.middleware')

//router.use(signMiddleware);
router.post('/dup/email', userController.checkEmailDup)

module.exports = router;
