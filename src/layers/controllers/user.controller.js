const UserService = require('../services/user.service');

class UserController {
    userService = new UserService();

    //회원가입
    signup = async (req, res, next) => {
        const { email, nickname, password, birth } = req.body;
        if (!email || !nickname || !password || !birth)
            res.status(400).json({ result: false, message: '입력값이 비어 있습니다.' });
        try {
            await this.userService.signup(email, nickname, password, birth);
            res.status(201).json({ result: true });
        } catch (err) {
            res.status(400).json({ result: false, message: err.message });
        }
    };

    //로그인
    signin = async (req, res, next) => {
        const { email, password } = req.body;
        //콘스트 gettoken부터
        try {
            const getToken = await this.userService.signin(email, password);
            res.status(200).json({ result: true, token: getToken });
        } catch (err) {
            res.status(400).json({ result: false, message: err.message });
        }
    };

    //회원탈퇴
    quit = async (req, res, next) => {
        const { password } = req.body;
        const { userId } = res.locals;
        try {
            await this.userService.quit(userId, password);
            res.status(200).json({ result: true });
        } catch (err) {
            res.status(400).json({ result: false, message: err.message });
        }
    };
}
module.exports = UserController;
