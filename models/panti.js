'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const panti = sequelize.define('panti',{

    id_panti: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(3)
    },
    nama_panti: {
      type : DataTypes.STRING(50),
      allowNull: false
    },
    alamat: {
      type :  DataTypes.STRING,
      allowNull: false
    },
    geom: {
      type :  DataTypes.GEOMETRY,
      allowNull: false
    },   
    jumlah_anak: {
      type :  DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min : 1
      }
    },
    jumlah_pengurus: {
      type : DataTypes.INTEGER,
      validate: {
        min : 1
      }
    } ,
    nama_pimpinan: {
      type :  DataTypes.STRING(30),
      allowNull: false
    },   
    nohp: {
      type : DataTypes.STRING(13),
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },    
    email: {
      type : DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },    
    sosmed: {
      type :  DataTypes.STRING(20),
    },
    
    // foreign key
    id_jenis: {
      type : DataTypes.STRING(1),
      allowNull: false
    },
    status_id: {
      type :  DataTypes.STRING(1),
      allowNull: false
    } 
  }, {
    freezeTableName: true
  });

module.exports = panti;