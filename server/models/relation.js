const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost/dokumen');
const User = require('./users');
const Document = require('./dokuments')
const Signature = require('./signature')



Signature.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Signature, { foreignKey: 'user_id' });

Signature.belongsTo(Document, { foreignKey: 'document_id' });
Document.hasMany(Signature, { foreignKey: 'document_id' });
console.log(Signature === sequelize.models.Signature);
module.exports = Signature ;
