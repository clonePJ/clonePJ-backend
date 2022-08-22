const RoomRepository = require('../repositories/room.repository');

class RoomService {
    roomRepository;

    constructor() {
        this.roomRepository = new RoomRepository();
    }

    postRoom = async (ownerUserId, roomName, content, category) => {
        return await this.roomRepository.postRoom(ownerUserId, roomName, content, category);
    };

    getRoom = async (req, res, next) => {
        return await this.roomRepository.getRoom();
    };

    getCategoryRoom = async (category) => {
        return await this.roomRepository.getCategoryRoom(category);
    };

    deleteRoom = async (roomId) => {
        return await this.roomRepository.deleteRoom(roomId);
    };
}
module.exports = RoomService;
