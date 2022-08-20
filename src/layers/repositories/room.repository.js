const { Room, User } = require('../../models');

console.log('모델 불러와!');

class RoomRepository {
    constructor() {}

    postRoom = async (ownerUserId, roomName, category) => {
        try {
            const room = await Room.create({ ownerUserId, roomName, category });
            return room;
        } catch (err) {
            // console.log(err);
            throw err;
        }
    };
}

module.exports = RoomRepository;
