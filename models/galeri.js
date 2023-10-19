'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const galeri = sequelize.define('galeri',{
    id_gambar: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    id_panti: {
      allowNull: false,
      type: DataTypes.STRING(3)
    },
    nama:{
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    url_gambar:{
      allowNull: false,
      type: DataTypes.STRING
    },
    deskripsi:{
      type: DataTypes.STRING
    },
    username:{
      allowNull: false,
      type: DataTypes.STRING(30),
    }
  }, {
    freezeTableName: true
  });

  module.exports = galeri;