const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  checkEmailDup = async (req, res, next) => {
    const { email } = req.body;
    try {
      const result = await this.userService.checkEmailDup(email);
      return res.status(200).json({ result });
    } catch (err) {
      return res.status(400).json({ result: err.message });

    }
  }
  //회원가입
  signup = async (req, res, next) => {
    const { email, nickname, password, birth } = req.body;
    try {
      await this.userService.signup(email, nickname, password, birth);
      res.status(201).json({ result: true });
    } catch (err) {
      res.status(400).json({ result: false });
    }
    checkEmailDup = async (email) => {
      const result = await this.userRepository.checkEmailDup(email);

      if (result === null) return true;
      if (result.email === email) throw error(false);

      throw Error('이미 가입된 이메일입니다.');
    };
  };
  //중복확인 이메일


  //로그인
  signin = async (req, res, next) => {

    const { email, password } = req.body;
    console.log(email, password)
    //콘스트 gettoken부터  
    try {

      const gettoken = await this.userService.signin(email, password);
      console.log(gettoken, "test");
      res.status(200).json({ result: true, token: gettoken });
    } catch (err) {
      res.status(400).json({ result: false });
    }

  };

  //회원탈퇴
  quit = async (req, res, next) => {
    const { userId, password } = req.body;
    try {
      await this.userService.quit(userId, password);
      return res.status(200).json({ result: true })
    } catch (err) {
      return res.status(400).json({});
    }
  };


}
module.exports = UserController