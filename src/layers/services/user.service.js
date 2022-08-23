const UserRepository = require('../repositories/user.repository');

//require module

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const userId_pattern = /^[a-z|A-Z|0-9]+$/;
const postUserSchema = Joi.object({
    userId: Joi.string().min(3).pattern(new RegExp(userId_pattern)).required(),
    password: Joi.string().min(4).required(),
});

//Class Service
class UserService {
    userRepository = new UserRepository();

    //회원가입
    signup = async (email, nickname, password, birth) => {
        const existEmail = await this.userRepository.checkEmailDup(email);
        if (existEmail) throw Error('이미 가입된 이메일입니다.');

        const encryptedPW = await bcrypt.hashSync(password, 10);
        await this.userRepository.createUser(email, nickname, encryptedPW, birth);

        return;
    };

    //로그인
    signin = async (email, password) => {
        const userInfo = await this.userRepository.checkEmailDup(email);
        if (userInfo) {
            const isSame = bcrypt.compareSync(password, userInfo.password);
            if (isSame) {
                const payload = {
                    nickname: userInfo.nickname,
                    userId: userInfo.userId,
                };
                const token = jwt.sign(payload, SECRET_KEY);
                return token;
            } else throw Error('이메일 또는 비밀번호가 일치하지 않습니다.');
        } else throw Error('이메일 또는 비밀번호가 일치하지 않습니다.');
    };

    //회원탈퇴
    quit = async (userId, password) => {
        const userInfo = await this.userRepository.checkUserDup(userId);
        if (!userInfo) throw Error('존재하지 않는 유저의 접근');

        const isSame = bcrypt.compareSync(password, userInfo.password);
        if (!isSame) throw Error('비밀번호가 일치하지 않습니다.');

        const deleteResult = await this.userRepository.quitUser(userId, password);
        if (deleteResult == 0) throw Error('알 수 없는 에러');

        return;
    };
}

module.exports = UserService;
