const { Chat, Room } = require('../../models');

module.exports = class ChatRepository {
    findAllChat = async (roomId) => {
        const List = await Chat.findAll({
            where: { roomId },
            include: [
                {
                    model: User,
                    attributes: ['nickname'],
                },
            ],
            raw: true,
        });
    };
};
