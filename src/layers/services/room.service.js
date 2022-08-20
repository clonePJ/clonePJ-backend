const RoomRepository = require('../repositories/room.repository');

class RoomService {
    roomRepository;

    constructor() {
        this.roomRepository = new RoomRepository();
    }

    postRoom = async (roomName, category, ownerUserId) => {
        return await this.roomRepository.postRoom(roomName, category, ownerUserId);
    };

    getRoom = async (req, res, next) => {
        return await this.roomRepository.getRoom();
    };
    deleteRoom = async (req, res, next) => {
        res.send('deleteRoom도착!');
        return console.log('happy');
    };
}
module.exports = RoomService;
