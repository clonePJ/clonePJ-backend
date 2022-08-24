const UserRepository = require('../repositories/user.repository');

//require module

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

//Class Service
class UserService {
    userRepository = new UserRepository();

    //회원가입
    signup = async (email, nickname, password, birth) => {
        // DB에 입력받은 email로 findOne({where:{email}}) 결과가 반환
        const existEmail = await this.userRepository.checkEmailDup(email);
        if (existEmail) throw Error('이미 가입된 이메일입니다.');

        // 비밀번호 암호화
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
                const token = jwt.sign(payload, SECRET_KEY, {
                    algorithm: process.env.TOKEN_OPTION_ALGORITHM,
                    expiresIn: process.env.TOKEN_OPTION_EXPIRESIN,
                });
                return token;
            } else throw Error('비밀번호가 일치하지 않습니다.');
        } else throw Error('존재하지 않는 이메일입니다.');
    };

    //회원탈퇴
    quit = async (userId, password) => {
        // 탈퇴 또는 존재하지 않는 유저의 userId를 담은 토큰으로 접근
        const userInfo = await this.userRepository.checkUserDup(userId);
        if (!userInfo) throw Error('존재하지 않는 유저의 접근');

        // password 복호화
        const isSame = bcrypt.compareSync(password, userInfo.password);
        if (!isSame) throw Error('비밀번호가 일치하지 않습니다.');

        const deleteResult = await this.userRepository.quitUser(userId, password);
        if (deleteResult == 0) throw Error('알 수 없는 에러');

        return;
    };
}

module.exports = UserService;
