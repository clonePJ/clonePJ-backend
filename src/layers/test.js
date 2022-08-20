require('dotenv/config');
const env = process.env;

const { User, Room, Chat } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = class test {
    getAll = async (req, res) => {
        const users = await User.findAll();
        const rooms = await Room.findAll();
        const chats = await Chat.findAll();
        res.status(200).json({ users, rooms, chats });
    };

    createUser = async (req, res) => {
        const { email, nickname, password, birth } = req.body;
        const user = await User.create({ email, nickname, password, birth });
        res.status(201).json({ user });
    };
    deleteUser = async (req, res) => {
        const { userId } = req.body;
        const success = await User.destroy({ where: { userId } });
        res.status(200).json({ success });
    };

    createRoom = async (req, res) => {
        const { ownerUserId, category, lastChat } = req.body;
        const room = await Room.create({ ownerUserId, category, lastChat });
        res.status(201).json({ room });
    };
    deleteRoom = async (req, res) => {
        const { roomId } = req.body;
        const success = await Room.destroy({ where: { roomId } });
        res.status(200).json({ success });
    };

    createChat = async (req, res) => {
        const { roomId, userId, content } = req.body;
        const chat = await Chat.create({ roomId, userId, content });
        res.status(201).json({ chat });
    };
    deleteChat = async (req, res) => {
        const { chatId } = req.body;
        const success = await Chat.destroy({ where: { chatId } });
        res.status(200).json({ success });
    };

    login = async (req, res) => {
        const { userId } = req.body;
        const token = jwt.sign({ userId }, env.TOKEN_SECRET, {
            algorithm: env.TOKEN_OPTION_ALGORITHM,
            expiresIn: env.TOKEN_OPTION_EXPIRESIN,
        });
        res.status(200).json({ token, meg: '2시간' });
    };
};
