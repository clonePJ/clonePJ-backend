const { response } = require('express');
const ChatService = require('../services/chat.service');

module.exports = class ChatController {
    chatService = new ChatService();

    chatListOfRoomId = async (req, res) => {
        const { roomId } = req.params;
        // const { userId } = res.locals;
        const userId = 0;

        const response = await this.chatService.findAllLastChat(roomId);
        res.status(response.status).json(response.data);
    };
};
