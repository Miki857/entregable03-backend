const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Director = sequelize.define('director', {
    firstname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

module.exports = Director;