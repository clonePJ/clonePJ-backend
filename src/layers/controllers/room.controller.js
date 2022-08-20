const { RoboMaker } = require('aws-sdk');
const express = require('express');
const joi = require('joi');

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
            await joi
                .object({
                    ownerUserId: joi.number().required(),
                    roomName: joi.string().required(),
                    category: joi.string(),
                })
                .validateAsync({ ownerUserId, roomName, category });

            const result = await this.roomService.postRoom(roomName, category, ownerUserId);
            return res.status(200).json({ status: 200, success: true, result: reuslt });
        } catch (err) {
            console.log(err);
            return res
                .status(400)
                .json({ status: 400, success: false, message: '입력한 형식이 맞지 않습니다.' });
            throw err;
        }
    };

    getRoom = async (req, res, next) => {
        const category = req.query.category;
        console.log('쿼리스트링 테스트2', category);
        try {
            const getAllRoom = await this.roomService.getRoom(category);
            return res.status(200).json({ status: 200, success: true, result: getAllRoom });
        } catch (err) {
            console.log(err);
            throw err;
        }

        res.send('getRoom도착!');
        return console.log('happy');
    };

    deleteRoom = async (req, res, next) => {
        res.send('deleteRoom도착!');
        return console.log('happy');
    };
}

module.exports = RoomController;
