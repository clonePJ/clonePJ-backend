'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Chat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Chat.init(
        {
            chatId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            content: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Chat',
        },
    );
    Chat.associate = function (models) {
        Chat.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        Chat.belongsTo(models.Room, {
            foreignKey: 'roomId',
            targetKey: 'roomId',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    };
    return Chat;
};
