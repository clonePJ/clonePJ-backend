const { User } = require('../../models')
class UserRepository {
  checkEmailDup = async (email) => {
    return await User.findOnd({ where: { email } });
  }
  checkNicknameDup = async (nickname) => {
    return await User.findOne({ where: { nickname } });
  }
  createUser = async (email, nickname, password) => {
    await User.create({ email, nickname, password });
  }
  checkUserDup = async (email) => {
    const data = await Users.findOne({ where: { email }, raw: true });
    return data;

  }
  quitUser = async (userId) => {
    await Users.destroy({ where: { userId } });
  }


}
module.exports = UserRepository;