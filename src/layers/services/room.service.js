const RoomRepository = require('../repositories/room.repository');

class RoomService {
    roomRepository;

    constructor() {
        this.roomRepository = new RoomRepository();
    }

    postRoom = async (ownerUserId, roomName, category) => {
        return await this.roomRepository.postRoom(ownerUserId, roomName, category);
    };

    getRoom = async (req, res, next) => {
        res.send('getRoom도착!');
        return console.log('happy');
    };
    deleteRoom = async (req, res, next) => {
        res.send('deleteRoom도착!');
        return console.log('happy');
    };
}
module.exports = RoomService;
