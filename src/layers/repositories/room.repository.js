const { Room } = require('../../models');

console.log('모델 불러와!');

class RoomRepository {
    constructor() {}

    postRoom = async (ownerUserId, roomName, content, category) => {
        try {
            const room = await Room.create({ ownerUserId, roomName, content, category });
            return room;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    getRoom = async () => {
        try {
            const allRoom = await Room.findAll({
                attributes: ['roomId', 'roomName', 'category', 'content'],
                order: [['updatedAt', 'DESC']],
            });

            return allRoom;
        } catch (err) {
            throw err;
        }
    };

    getOneRoom = async (roomId) => {
        try {
            const room = await Room.findByPk(roomId);
            return room;
        } catch (err) {
            console.log(err);
            return;
        }
    };

    getCategoryRoom = async (category) => {
        try {
            const getCategoryRoom = await Room.findAll({
                where: { category },
                order: [['updatedAt', 'DESC']],
                attributes: ['roomId', 'roomName', 'category', 'content'],
            });
            return getCategoryRoom;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    updateLastChat = async (roomId, lastChat) => {
        try {
            const updateInfo = await Room.update({ lastChat }, { where: roomId });
            return updateInfo;
        } catch (err) {
            console.log(err);
            return;
        }
    };

    deleteRoom = async (roomId) => {
        try {
            const deleteRoom = await Room.destroy({
                where: { roomId },
            });
            return deleteRoom;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}

module.exports = RoomRepository;
