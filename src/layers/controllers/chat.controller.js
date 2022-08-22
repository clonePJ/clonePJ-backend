const ChatService = require('../services/chat.service');

module.exports = class ChatController {
    chatService = new ChatService();

    sendResponse = (res, status, success, extra) => {
        if (extra && success) return res.status(status).json({ success, data: extra });
        else if (extra) return res.status(status).json({ success, message: extra });
        else return res.status(status).json({ success });
    };

    createNewChat = async (req, res) => {
        const { roomId } = req.params;
        const { userId } = res.locals;
        const { content } = req.body;

        try {
            await joi
                .object({
                    roomId: joi.number().required(),
                    userId: joi.number().required(),
                    content: joi.string().required(),
                })
                .validateAsync({ roomId, userId, content });
        } catch (err) {
            return this.sendResponse(res, 400, false, '입력한 형식이 맞지 않습니다.');
        }

        const response = await this.chatService.createChat(roomId, userId, content);
        const r = response;
        return this.sendResponse(res, r.status, r.success, r.success ? null : r.message);
    };

    findRoomChatList = async (req, res) => {
        const { roomId } = req.params;
        const { userId } = res.locals;

        try {
            await joi
                .object({
                    roomId: joi.number().required(),
                    userId: joi.number().required(),
                })
                .validateAsync({ roomId, userId });
        } catch (err) {
            return this.sendResponse(res, 400, false, '입력한 형식이 맞지 않습니다.');
        }

        const response = await this.chatService.findRoomChat(roomId, userId);
        const r = response;
        return this.sendResponse(res, r.status, r.success, r.success ? r.data : r.message);
    };

    updateChat = async (req, res) => {
        const { chatId } = req.params;
        const { userId } = res.locals;
        const { content } = req.body;

        try {
            await joi
                .object({
                    chatId: joi.number().required(),
                    userId: joi.number().required(),
                    content: joi.string().required(),
                })
                .validateAsync({ chatId, userId, content });
        } catch (err) {
            return this.sendResponse(res, 400, false, '입력한 형식이 맞지 않습니다.');
        }

        const response = await this.chatService.updateChat(chatId, userId, content);
        const r = response;
        return this.sendResponse(res, r.status, r.success, r.success ? null : r.message);
    };

    deleteChat = async (req, res) => {
        const { chatId } = req.params;
        const { userId } = res.locals;

        try {
            await joi
                .object({
                    chatId: joi.number().required(),
                    userId: joi.number().required(),
                })
                .validateAsync({ roomId, userId });
        } catch (err) {
            return this.sendResponse(res, 400, false, '입력한 형식이 맞지 않습니다.');
        }

        const response = await this.chatService.deleteChat(chatId, userId);
        const r = response;
        return this.sendResponse(res, r.status, r.success, r.success ? null : r.message);
    };
};
