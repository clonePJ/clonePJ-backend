const { User } = require('../../models');
class UserRepository {
    checkEmailDup = async (email) => {
        return await User.findOne({ where: { email } });
    };
    createUser = async (email, nickname, password, birth) => {
        return await User.create({ email, nickname, password, birth });
    };
    checkUserDup = async (userId) => {
        const data = await User.findOne({ where: { userId }, raw: true });
        return data;
    };
    quitUser = async (userId) => {
        return await User.destroy({ where: { userId } });
    };
}
module.exports = UserRepository;
