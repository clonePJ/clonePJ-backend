'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Room.init(
        {
            roomId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            category: DataTypes.STRING,
            lastChat: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Room',
        },
    );
    Room.associate = function (models) {
        Room.hasMany(models.Chat, {
            foreignKey: 'roomId',
            sourceKey: 'roomId',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        Room.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'ownerUserId',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    };
    return Room;
};
