const { Users } = require('../models')
class UserRepository {
  checkEmailDup = async (email) => {
    return await Users.findOnd({ where: { email } });
  }
  checkNicknameDup = async (nickname) => {
    return await Users.findOne({ where: { nickname } });
  }
  createUser = async (email, nickname, password) => {
    await Users.create({ email, nickname, password });
  }
  checkUserDup = async (email) => {
    const data = await Users.findOne({ where: { email }, raw: true });
    return data;

  }
  quitUser = async (email, password) => {
    await Users.destroy({ where: { password } });
  }


}
module.exports = UserRepository;