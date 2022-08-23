const { RoboMaker } = require('aws-sdk');
const express = require('express');
const { number } = require('joi');
const joi = require('joi');

const RoomService = require('../services/room.service');

class RoomController {
    roomService;

    constructor() {
        this.roomService = new RoomService();
    }

    postRoom = async (req, res, next) => {
        const ownerUserId = res.locals.userId;
        const { roomName, content, category } = req.body;
        try {
            await joi
                .object({
                    ownerUserId: joi.number().required(),
                    roomName: joi.string().required(),
                    content: joi.string(),
                    category: joi.string(),
                })
                .validateAsync({ ownerUserId, roomName, content, category });

            const result = await this.roomService.postRoom(
                ownerUserId,
                roomName,
                content,
                category,
            );
            return res.status(201).json({ status: 200, success: true, result: result });
        } catch (err) {
            return res
                .status(400)
                .json({ status: 400, success: false, message: '입력한 형식이 맞지 않습니다.' });
        }
    };

    getRoom = async (req, res, next) => {
        const { category } = req.query;
        if (category === '') {
            const getAllRoom = await this.roomService.getRoom();
            return res.status(200).json({ status: 200, success: true, result: getAllRoom });
        } else {
            const getCategoryRoom = await this.roomService.getCategoryRoom(category);
            return res.status(200).json({ status: 200, success: true, result: getCategoryRoom });
        }
    };

    deleteRoom = async (req, res) => {
        const ownerUserId = res.locals.userId;
        const { roomId } = req.params;

        const result = await this.roomService.deleteRoom(roomId, ownerUserId);
        if (result === 1) return res.status(200).json({ result: {} });
        else {
            return res.status(400).json({ result: result });
        }
    };
}

module.exports = RoomController;
