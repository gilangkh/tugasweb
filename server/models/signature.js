const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost/dokumen');

const User = require('./users'); // Import model User
const Document = require('./dokuments'); // Import model Document


const Signature = sequelize.define('Signature', {
  user_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    references:{
      model :User,
      key :'user_id'
    }
  
  },
  document_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    references:{
      model : Document,
      key : 'document_id'
    }
  },
  jabatan: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  signed_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
   
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  
  },
}, {
  tableName: 'signature',
  timestamps: false,
},
{
  
    "tableName" : "signature",
    timestamps : true, 
    createdAt :'created_at',
    updatedAt :'updated_at'

});

module.exports = Signature;
