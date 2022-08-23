const { Room } = require('../../models');

class RoomRepository {
    constructor() {}

    postRoom = async (ownerUserId, roomName, content, category) => {
        const room = await Room.create({ ownerUserId, roomName, content, category });
        return room;
    };

    getRoom = async () => {
        const allRoom = await Room.findAll({
            attributes: ['roomId', 'roomName', 'category', 'content'],
            order: [['updatedAt', 'DESC']],
        });

        return allRoom;
    };

    getOneRoom = async (roomId) => {
        const room = await Room.findByPk(roomId);
        return room;
    };

    getCategoryRoom = async (category) => {
        const getCategoryRoom = await Room.findAll({
            where: { category },
            order: [['updatedAt', 'DESC']],
            attributes: ['roomId', 'roomName', 'category', 'content'],
        });
        return getCategoryRoom;
    };

    updateLastChat = async (roomId, lastChat) => {
        const updateInfo = await Room.update({ lastChat }, { where: roomId });
        return updateInfo;
    };

    deleteRoom = async (roomId, ownerUserId) => {
        const deleteRoom = await Room.destroy({
            where: { roomId },
        });
        console.log('deleteRoom', deleteRoom);
        return deleteRoom;
    };
}

module.exports = RoomRepository;
