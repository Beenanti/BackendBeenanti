'use strict';

const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const detail_admin_panti = sequelize.define('detail_admin_panti',{
    id_panti: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(3)
    },
    email:{
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(16)
    }
  }, {
    timestamps: false, // Menonaktifkan kolom createdAt dan updatedAt
    freezeTableName: true
  });

  module.exports = detail_admin_panti;