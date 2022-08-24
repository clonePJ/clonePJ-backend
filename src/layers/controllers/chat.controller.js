const ChatService = require('../services/chat.service');

module.exports = class ChatController {
    chatService = new ChatService();

    // response 형식 메소드 : 코드 길어짐 방지 = 코드 축약
    sendResponse = (res, status, success, extra) => {
        if (extra && success) return res.status(status).json({ success, data: extra });
        else if (extra) return res.status(status).json({ success, message: extra });
        else return res.status(status).json({ success });
    };

    createNewChat = async (req, res) => {
        const strRoomId = req.params.roomId; // params에서 꺼낸 값은 Type : string
        const roomId = +strRoomId; // 따라서 Type : number 변환
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
