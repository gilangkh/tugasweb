const {Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost/pwebb');

const dokument = sequelize.define('dokument', 
{
    id: {
        type:DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
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
    tableName: 'dokuemnts',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

module.exports = dokument