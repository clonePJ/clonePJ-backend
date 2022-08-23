const { User } = require('../../models')
class UserRepository {



  checkEmailDup = async (email) => {
    return await User.findOne({ where: { email } });
  }
  checkNicknameDup = async (nickname) => {
    return await User.findOne({ where: { nickname } });
  }
  createUser = async (email, nickname, password, birth) => {
    await User.create({ email, nickname, password, birth });
    return;
  }
  checkUserDup = async (email) => {
    const data = await Users.findOne({ where: { email }, raw: true });
    return data;

  }
  quitUser = async (userId) => {
    await User.destroy({ where: { userId } });
  }


}
module.exports = UserRepository;