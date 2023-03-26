'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const galeri = sequelize.define('galeri',{
    id_gambar: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    id_panti: {
      allowNull: false,
      type: DataTypes.STRING(3)
    },
    url_gambar:{
      allowNull: false,
      type: DataTypes.STRING
    },
    deskripsi:{
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false, // Menonaktifkan kolom createdAt dan updatedAt
    tableName: 'galeri'
  });

  module.exports = galeri;