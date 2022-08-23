const user = require('../../models/user');
const ChatRepository = require('../repositories/chat.repository');
const RoomRepository = require('../repositories/room.repository');

module.exports = class ChatService {
    chatRepository = new ChatRepository();
    roomRepository = new RoomRepository();

    errResponse = (status, message) => {
        return { status, success: false, message };
    };

    createChat = async (roomId, userId, content) => {
        const roomInfo = await this.roomRepository.getOneRoom(roomId);
        if (!roomInfo) return this.errResponse(400, '존재하지 않는 룸입니다.');
        if (!content) return this.errResponse(400, '내용이 비어 있습니다.');

        const createResult = await this.chatRepository.createChat(roomId, userId, content);
        if (!createResult) return this.errResponse(401, '잘못된 접근');

        const updateRoomResult = await this.roomRepository.updateLastChat(roomId, content);
        if (updateRoomResult === 0) return this.errResponse(401, '잘못된 접근');

        return { status: 201, success: true };
    };

    findRoomChat = async (roomId, userId) => {
        const roomInfo = await this.roomRepository.getOneRoom(roomId);
        if (!roomInfo) return this.errResponse(400, '존재하지 않는 룸입니다.');
        const roomData = {
            ownerUserId: roomInfo.ownerUserId,
            owner: userId === roomInfo.ownerUserId,
        };

        const chatList = await this.chatRepository.findAllChat(roomId);
        if (chatList == [])
            return { status: 200, success: true.valueOf, data: { roomData, chatData: [] } };
        const chatData = await chatList.map((c) => {
            return {
                chatId: c.chatId,
                nickname: c['User.nickname'],
                chatOwner: userId == c.userId,
                content: c.content,
                updatedAt: c.updatedAt,
            };
        });
        console.log(chatList);

        return {
            status: 200,
            success: true,
            data: { roomData, chatData },
        };
    };

    updateChat = async (chatId, userId, content) => {
        if (!content) return this.errResponse(400, '내용이 비어 있습니다.');

        const chatInfo = await this.chatRepository.findOneChat(chatId);
        if (!chatInfo) return this.errResponse(400, '존재하지 않는 채팅입니다.');
        if (chatInfo.userId !== userId) return this.errResponse(401, '작성자가 아닙니다.');
        if (chatInfo.content === content) return this.errResponse(400, '변경된 내용이 없습니다.');

        const updateResult = await this.chatRepository.updateChat(chatId, content);
        if (updateResult == [0]) return this.errResponse(401, '알 수 없는 에러');

        return {
            status: 201,
            success: true,
        };
    };

    deleteChat = async (chatId, userId) => {
        const chatInfo = await this.chatRepository.findOneChat(chatId);
        if (!chatInfo) return this.errResponse(400, '존재하지 않는 채팅입니다.');
        if (chatInfo.userId !== userId) return this.errResponse(401, '작성자가 아닙니다.');

        const deleteResult = await this.chatRepository.deleteChat(chatId);
        if (deleteResult == 0) return this.errResponse(401, '알 수 없는 에러');

        return {
            status: 200,
            success: true,
        };
    };
};
