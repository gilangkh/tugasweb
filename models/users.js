const {Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost/pwebb');

const User = sequelize.define('User', 
{
    id: {
        type:DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sign_img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, 
{
    tableName: 'users',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

module.exports = User