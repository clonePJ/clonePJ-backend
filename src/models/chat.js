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
                unique: true,
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
            foreignKey: { name: 'userId', allowNull: false },
            targetKey: 'userId',
            onDelete: 'CASCADE',
        });
        Chat.belongsTo(models.Room, {
            foreignKey: { name: 'roomId', allowNull: false },
            targetKey: 'roomId',
            onDelete: 'CASCADE',
        });
    };
    return Chat;
};
