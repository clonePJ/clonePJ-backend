const express = require('express');
const chatRouter = express.Router();

const ChatController = require('../controllers/chat.controller');
const chatController = new ChatController();

// http://localhost:3000/api/chat

chatRouter.route('/:roomId').get(chatController.chatListOfRoomId);
// .post(chatController);
// chatRouter.delete('/:chatId', chatController);

module.exports = chatRouter;
