const { Chat, User } = require('../../models');

module.exports = class ChatRepository {
    createChat = async (roomId, userId, content) => {
        try {
            const success = await Chat.create({ roomId, userId, content });
            return success;
        } catch (err) {
            console.log(err);
            return;
        }
    };

    findAllChat = async (roomId) => {
        const list = await Chat.findAll({
            where: { roomId },
            include: [
                {
                    model: User,
                    attributes: ['nickname'],
                },
            ],
            raw: true,
        });
        return list;
    };

    findOneChat = async (chatId) => {
        const chat = await Chat.findOne({ where: { chatId } });
        return chat;
    };

    updateChat = async (chatId, content) => {
        const success = await Chat.update({ content }, { where: { chatId } });
        return success;
    };

    deleteChat = async (chatId) => {
        const success = await Chat.destroy({ where: { chatId } });
        return success;
    };
};
