const express = require('express');
const chatRouter = express.Router();

const ChatController = require('../controllers/chat.controller');
const chatController = new ChatController();

const auth = require('../middlewares/auth.middleware');

// http://localhost:3000/api/chat

chatRouter
    .route('/:roomId')
    .get(auth, chatController.findRoomChatList)
    .post(auth, chatController.createNewChat);

chatRouter
    .route('/:chatId')
    .delete(auth, chatController.deleteChat)
    .put(auth, chatController.updateChat);

module.exports = chatRouter;
