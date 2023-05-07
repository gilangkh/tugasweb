const { Sequelize, DataTypes } = require('sequelize');
const User= require('./users');
const Dokument = require('./dokuments');
const Signature = require('./signature');

User.hasMany(Signature,{
    foreignKey:'user_id',
    as : 'Signature'
});
Dokument.hasMany(Signature,{
    foreignKey:'document_id',
    as: 'Signature'
});