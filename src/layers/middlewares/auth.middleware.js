const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(400).json({ result: false, message: '로그인하지 않았습니다.' });

    const [tokenType, tokenValue] = (authorization || '').split(' ');
    if (tokenType !== 'Bearer')
        return res.status(400).json({ result: false, message: '토큰이 유효하지 않습니다.' });

    try {
        const userInfo = jwt.verify(tokenValue, SECRET_KEY);
        res.locals.userId = userInfo.userId;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError')
            return res.status(419).json({ message: '토큰이 만료되었습니다.' });
        if (err.name === 'jsonwebtokenError')
            return res.status(401).json({ message: '토큰이 유효하지 않습니다.' });
    } //에러의 status 구분
};
