const ChatRepository = require('../repositories/chat.repository');

module.exports = class ChatService {
    chatRepository = new ChatRepository();

    errResponse = (status, message) => {
        return { status, message };
    };

    findAllLastChat = async (roomId) => {
        const chatList = await this.chatRepository.findAllChat(roomId);

        return { status: 200, data: { chatList } };
    };
};
