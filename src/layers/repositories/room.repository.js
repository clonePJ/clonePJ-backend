const { Room, User } = require('../../models');

console.log('모델 불러와!');

class RoomRepository {
    constructor() {}

    postRoom = async (roomName, category, ownerUserId) => {
        try {
            const room = await Room.create({ roomName, category, ownerUserId });
            return room;
        } catch (err) {
            // console.log(err);
            throw err;
        }
    };

    getRoom = async () => {
        try {
            const allRoom = await Room.findAll({
                order: [['updatedAt', 'DESC']],
                attributes: ['roomId', 'roomName', 'category'],
            });

            return allRoom;
        } catch (err) {
            throw err;
        }
    };
}

module.exports = RoomRepository;
