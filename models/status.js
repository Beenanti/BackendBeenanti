'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const status = sequelize.define('status',{
    id_status: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(1)
    },
    nama_status:{
      type : DataTypes.STRING(10),
      allowNull : false
    } 
  }, {
    timestamps: false, // Menonaktifkan kolom createdAt dan updatedAt
    freezeTableName: true
  });

  module.exports = status;