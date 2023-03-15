'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const status = sequelize.define('status',{
    id_status: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    nama_status:{
      type : DataTypes.STRING,
      allowNull : false
    } 
  }, {
    timestamps: false, // Menonaktifkan kolom createdAt dan updatedAt
    tableName: 'status'
  });

  module.exports = status