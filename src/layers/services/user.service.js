const UserRepository = require('../repositories/user.repository')

//require module

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

const userId_pattern = /^[a-z|A-Z|0-9]+$/;
const postUserSchema = Joi.object({
  userId: Joi.string()
    .min(3)
    .pattern(new RegExp(userId_pattern))
    .required(),
  password: Joi.string().min(4).required(),

})

//Class Service
class UserService {
  userRepository = new UserRepository();


  //중복확인 닉네임

  checkNicknameDup = async (nickname) => {
    const result = await this.userRepository.checkNicknameDup(nickname);

    if (result === null) return true;
    if (result.nickname === nickname) throw error(false);

    throw Error('알 수 없는 오류')
  };

  //회원가입 
  signup = async (email, nickname, password, birth) => {
    if (!email || !nickname || !password) throw error(false);
    const encryptedPW = await bcrypt.hashSync(password, 10);

    await this.userRepository.createUser(email, nickname, password, birth);
  };
  signin = async (email, password) => {
    const userInfo = await this.userRepository.checkUserDup(email);

    if (userInfo) {
      const SECRET_KEY = process.env.SECRET_KEY;
      const isSame = bcrypt.compareSync(password, userInfo.password);

      if (isSame) {
        const payload = {
          nickname: userInfo.nickname,
          userId: userInfo.userId,

          // 기한 정하기
        };
        const token = jwt.sign(payload, SECRET_KEY);
        return token;
      } else throw Error(false);
    } else throw Error(false);
  };
  //회원탈퇴
  quit = async (email, password) => {
    if (!email || !password) throw error(false);
    throw Error('정보가 일치하지 않습니다.')

    await this.userRepository.quitUser(email, password);

  }
}






module.exports = UserService;

