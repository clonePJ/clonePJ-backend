const jwt = require('jsonwebtoken');
require('dotenv').config

module.exports = (req, res, next) => {
  console.log(req.headers)
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = (authorization || ''.split(''))
  //return res.send('rejectMiddleware')
  next();

}





// 사용자가 로그인 또는 회원가입 기능을 사용하려 합니다.
// 이 때 유저가 가진 토큰이 유효하다면 401 status를 반환해주어야 합니다.
// 하지만 토큰이 만료되었거나 존재하지 않는다면 요청대로 로그인 또는 회원가입을 진행합니다