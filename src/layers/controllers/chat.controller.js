const ChatService = require('../services/chat.service');

module.exports = class ChatController {
    chatService = new ChatService();

    sendResponse = (res, status, success, extra) => {
        if (extra && success) return res.status(status).json({ success, data: extra });
        else if (extra) return res.status(status).json({ success, message: extra });
        else return res.status(status).json({ success });
    };

    createNewChat = async (req, res) => {
        const strRoomId = req.params.roomId;
        const roomId = +strRoomId;
        console.log(roomId);
        const { userId } = res.locals;
        const { content } = req.body;

        const response = await this.chatService.createChat(roomId, userId, content);
        const r = response;
        return this.sendResponse(res, r.status, r.success, r.success ? null : r.message);
    };

    findRoomChatList = async (req, res) => {
        const strRoomId = req.params.roomId;
        const roomId = +strRoomId;
        const { userId } = res.locals;

        const response = await this.chatService.findRoomChat(roomId, userId);
        const r = response;
        return this.sendResponse(res, r.status, r.success, r.success ? r.data : r.message);
    };

    updateChat = async (req, res) => {
        const strChatId = req.params.chatId;
        const chatId = +strChatId;
        const { userId } = res.locals;
        const { content } = req.body;

        const response = await this.chatService.updateChat(chatId, userId, content);
        const r = response;
        return this.sendResponse(res, r.status, r.success, r.success ? null : r.message);
    };

    deleteChat = async (req, res) => {
        const strChatId = req.params.chatId;
        const chatId = +strChatId;
        const { userId } = res.locals;

        const response = await this.chatService.deleteChat(chatId, userId);
        const r = response;
        return this.sendResponse(res, r.status, r.success, r.success ? null : r.message);
    };
};
