require('dotenv').config;
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization || ''.split(' ');
    try {
        jwt.verify(tokenValue, SECRET_KEY);
        return res.status(401).json({ result: false, message: '로그인 되어 있습니다.' });
    } catch (err) {
        next();
    }
};

// 사용자가 로그인 또는 회원가입 기능을 사용하려 합니다.
// 이 때 유저가 가진 토큰이 유효하다면 401 status를 반환해주어야 합니다.
// 하지만 토큰이 만료되었거나 존재하지 않는다면 요청대로 로그인 또는 회원가입을 진행합니다
