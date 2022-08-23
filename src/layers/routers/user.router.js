const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const rejectMiddleware = require('../middlewares/reject.middleware');
const userController = new UserController();
//const signMiddleware = require('../middlewares/auth.middleware')

//router.use(signMiddleware);
router.post('/dup/email', userController.checkEmailDup)
router.post('/signup', userController.signup)
router.post('/test', rejectMiddleware)
router.post('/login', userController.signin)
module.exports = router;
