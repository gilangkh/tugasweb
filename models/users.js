const {Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize('mysql://root@localhost/dokumen');
const jwt = require('jsonwebtoken');
const Signature = require('./signature.js')
const User = sequelize.define('User', 
{
    user_id: {
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

User.beforeCreate(async (user) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  });

  const generateToken = (user) => {
    const secretKey = 'rahasia'; // Replace with your own secret key
    const expiresIn = '1h'; // Token expiration time
  
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        password: user.password
      },
      secretKey,
      { expiresIn }
    );
  
    return token;
  };
  
  // Login endpoint
  const login = async (req, res) => {
  
  
    try {
      const { email, password } = req.body;
      // Find user by email
      const user = await User.findOne({ where: { email:email } });
  
      // Check if user exists
      if (!user) {
        return res.status(401).json({ message: 'Invalid email ' });
      }
  
      // Compare password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
   
      }
  
      // Generate JWT token
      const token = generateToken(user);
  
      // Send token in response
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  module.exports = { User, login };