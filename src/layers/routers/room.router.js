const { Router, application } = require('express');
const roomRouter = Router();

const RoomController = require('../controllers/room.controller');
const roomController = new RoomController();

const auth = require('../middlewares/auth.middleware');

roomRouter.post('/', auth, roomController.postRoom);
roomRouter.get('/', auth, roomController.getRoom);
roomRouter.delete('/:roomId', auth, roomController.deleteRoom);

module.exports = roomRouter;
