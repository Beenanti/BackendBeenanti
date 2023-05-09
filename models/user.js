'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const user = sequelize.define('user',{
    email: {
      type : DataTypes.STRING(30),
      primaryKey: true,
      allowNull : false,
      validate: {
        isEmail: true
      }
    },    
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nik: {
      type: DataTypes.STRING(16),
      unique: true
    },
    nama: {
      type : DataTypes.STRING(30),
      allowNull : false
    },
    jenis_kelamin: {
      type : DataTypes.ENUM('laki-laki', 'perempuan'),
    },
    alamat: {
      type : DataTypes.STRING(255),
    },
    tempat_lahir: {
      type : DataTypes.STRING(30),
    },
    tgl_lahir: {
      type : DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    no_hp: {
      type : DataTypes.STRING(13),
      validate: {
        isNumeric: true
      }
    },
    foto: {
      type : DataTypes.STRING,
    },
    pekerjaan: {
      type : DataTypes.STRING(20),
    },
    role: {
      type : DataTypes.ENUM('admin_master', 'user_mobile', 'admin_panti'),
      allowNull : false
    },

    // foreign key
    status_id: {
      type : DataTypes.STRING(1),
      allowNull : false
    },
  }, {
    freezeTableName: true
  });

  module.exports = user;