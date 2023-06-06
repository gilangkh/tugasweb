const {Sequelize, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost/dokumen');

const Document = sequelize.define('Document', {
  document_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
   user_id: {
    type: DataTypes.UUID,
    allowNull :false
    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
 
},

{
    
        "tableName" : "documents",
        timestamps : true, 
        createdAt :'created_at',
        updatedAt :'updated_at'

});

module.exports = Document;

