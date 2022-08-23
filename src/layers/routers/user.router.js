const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

const rejectMiddleware = require('../middlewares/reject.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
//const signMiddleware = require('../middlewares/auth.middleware')

//router.use(signMiddleware);
router.post('/signup', rejectMiddleware, userController.signup);
router.post('/test', rejectMiddleware);
router.post('/login', rejectMiddleware, userController.signin);
router.post('/quit', authMiddleware, userController.quit);
module.exports = router;
