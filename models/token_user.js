'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const token_user = sequelize.define('token_user',{
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID
    },
    user:{
      type : DataTypes.STRING(30),
      allowNull : false
    },
    remember_token: {
      type : DataTypes.STRING,
      unique: true
    },
    ip_address: {
      type: DataTypes.STRING(20),
    },
    waktu_login: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    } 
  
  }, {
    timestamps: false, // Menonaktifkan kolom createdAt dan updatedAt
    freezeTableName: true
  });

module.exports = token_user;