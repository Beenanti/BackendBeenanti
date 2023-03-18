'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const user = sequelize.define('user',{
    email: {
      type : DataTypes.STRING,
      primaryKey: true,
      allowNull : false
    },    
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nik: {
      type: DataTypes.STRING
    },
    nama: {
      type : DataTypes.STRING,
      allowNull : false
    },
    jenis_kelamin: {
      type : DataTypes.STRING,
    },
    alamat: {
      type : DataTypes.STRING,
    },
    tempat_lahir: {
      type : DataTypes.STRING,
    },
    tgl_lahir: {
      type : DataTypes.DATE,
    },
    no_hp: {
      type : DataTypes.STRING,
    },
    foto: {
      type : DataTypes.STRING,
    },
    pekerjaan: {
      type : DataTypes.STRING,
    },
    role: {
      type : DataTypes.STRING,
      allowNull : false
    },
    status_id: {
      type : DataTypes.STRING,
      allowNull : false
    },
  }, {
    tableName: 'user'
  });

  module.exports = user;