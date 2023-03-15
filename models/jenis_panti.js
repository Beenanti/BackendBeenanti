'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const jenis_panti = sequelize.define('jenis_panti',{

    id_jenis: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(1)
    },
    nama_jenis:{
      type : DataTypes.STRING(20),
      allowNull: false
    } 
  }, {
    timestamps: false, // Menonaktifkan kolom createdAt dan updatedAt
    tableName: 'jenis_panti'
  });

  module.exports = jenis_panti;