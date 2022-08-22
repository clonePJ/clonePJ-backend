const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
module.exports = (req, res, next) => {
  if (!req.headers.authorization) return res.send('로그인 좀..');
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = (authorization || '').split('');
  if (tokenType !== 'Bearer') return res.send('로그인 좀..');
  try {
    const userInfo = jwt.verify(tokenValue, SECRET_KEY);
    res.locals.userId = userInfo.userId;
    res.locals.nickname = userInfo.nickname;
    res.locals.birth = userInfo.birth;
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(419).json({ message: '토큰이 만료되었습니다.' });
    if (err.name === 'jsonwebtokenError')
      return res.status(401).json({ message: '토큰이 유효하지 않습니다.' })
  } //에러의 status 구분
  next();
}