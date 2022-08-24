const express = require('express');
const chatRouter = express.Router();

const ChatController = require('../controllers/chat.controller');
const chatController = new ChatController();

const auth = require('../middlewares/auth.middleware');

// http://localhost:3000/api/chat

chatRouter
    .route('/:roomId')
    .get(auth, chatController.findRoomChatList) // roomId에 해당하는 채팅 리스트 반환
    .post(auth, chatController.createNewChat); // roomId에 해당하는 채팅 생성

chatRouter
    .route('/:chatId')
    .delete(auth, chatController.deleteChat) // 특정 chatId (채팅) 삭제
    .put(auth, chatController.updateChat); // 특정 chatId (채팅) 수정

module.exports = chatRouter;
