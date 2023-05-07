const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost/dokumen');
const User = require('../models/users')
const Dokument = require('../models/dokuments')

const Signature = sequelize.define('Signature', {
  user_id: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    allowNull: false,
    references: {
        model: User,
        key: 'user_id'
      }
  },
  document_id: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    allowNull: false,
    references: {
        model: Dokument,
        key: 'document_id'
      }
  },
  jabatan: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  signed_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
  }
},
{
    tableName: 'signature',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

// Definisikan hubungan antara model User, Document, dan Signature
User.hasMany(Signature, { foreignKey: 'user_id' });
Dokument.hasMany(Signature, { foreignKey: 'document_id' });
// Sinkronisasi model dengan database

module.exports = { Signature};
