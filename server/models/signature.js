const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost/dokumen');
const User = require('./users')
const Dokument = require('./dokuments');
const Relation = require('./relation');


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
    sequelize,
    tableName: 'signature',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    indexes:[{
        unique:true,
        fields: ['user_id','document_id'],
        name :'signature_pk'
    }]
});


// Definisikan hubungan antara model User, Document, dan Signature
// Signature.belongsTo(User, {
//     foreignKey: 'user_id',
//     as: 'User'
// });

// Signature.belongsTo(Dokument, {
//     foreignKey: 'document_id',
//     as: 'Dokument'
// });
// // Sinkronisasi model dengan database

module.exports = Signature;
