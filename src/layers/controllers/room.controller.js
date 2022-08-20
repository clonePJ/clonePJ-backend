const { RoboMaker } = require('aws-sdk');
const express = require('express');

const RoomService = require('../services/room.service');

class RoomController {
    roomService;

    constructor() {
        this.roomService = new RoomService();
    }

    postRoom = async (req, res, next) => {
        const ownerUserId = 1;
        const { roomName, category } = req.body;
        console.log({ roomName, category });
        // joi 추가
        try {
            const result = await this.roomService.postRoom(ownerUserId, roomName, category);
            return res.status(200).json({ result });
        } catch (err) {
            console.log(err);
            throw err;
        }
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

module.exports = RoomController;
