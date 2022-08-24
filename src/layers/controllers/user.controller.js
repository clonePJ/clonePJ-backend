const UserService = require('../services/user.service');

class UserController {
    userService = new UserService();

    //회원가입
    signup = async (req, res, next) => {
        const { email, nickname, password, birth } = req.body;

        // 필수 입력 값 중 하나라도 undefined라면 result:false
        if (!email || !nickname || !password || !birth)
            return res.status(400).json({ result: false, message: '입력값이 비어 있습니다.' });

        const pwExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        const emailExp =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

        // 정규식으로 테스트 했을 때 false라면 result:false
        if (!emailExp.test(email))
            return res.status(400).json({
                result: false,
                message: '이메일이 정규식과 일치하지 않습니다.',
            });
        else if (!pwExp.test(password))
            return res.status(400).json({
                result: false,
                message: '비밀번호가 정규식과 일치하지 않습니다.',
            });

        try {
            // Service에서 throw Error("message") || return
            await this.userService.signup(email, nickname, password, birth);
            return res.status(201).json({ result: true });
        } catch (err) {
            return res.status(400).json({ result: false, message: err.message });
        }
    };

    //로그인
    signin = async (req, res, next) => {
        const { email, password } = req.body;
        //콘스트 gettoken부터
        try {
            const getToken = await this.userService.signin(email, password);
            return res.status(200).json({ result: true, token: getToken });
        } catch (err) {
            return res.status(400).json({ result: false, message: err.message });
        }
    };

    //회원탈퇴
    quit = async (req, res, next) => {
        const { password } = req.body;
        const { userId } = res.locals;
        try {
            await this.userService.quit(userId, password);
            return res.status(200).json({ result: true });
        } catch (err) {
            return res.status(400).json({ result: false, message: err.message });
        }
    };
}
module.exports = UserController;
