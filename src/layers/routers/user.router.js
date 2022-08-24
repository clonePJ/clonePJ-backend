const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

const rejectMiddleware = require('../middlewares/reject.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/signup', rejectMiddleware, userController.signup);
router.post('/login', rejectMiddleware, userController.signin);
router.delete('/quit', authMiddleware, userController.quit);
module.exports = router;
