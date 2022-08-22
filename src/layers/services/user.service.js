const UserRepository = require('../repositories/user.repository')

//require module

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Class Service
class UserService {
  userRepository = new UserRepository();

  //중복확인 이메일

  checkEmailDup = async (email) => {
    const result = await this.userRepository.checkEmailDup(email);

    if (result === null) return true;
    if (result.email === email) throw error(false);

    throw Error('알 수 없는 오류');

  };
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
    const encryptedPW = await bcrpyt.hashsync(password, 10);

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

    await this.userRepository.quit(email, password);

  }
}






module.exports = UserService;

