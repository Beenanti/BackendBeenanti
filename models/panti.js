'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const panti = sequelize.define('panti',{

    id_panti: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    nama_panti: {
      type : DataTypes.STRING,
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
      allowNull: false
    },
    jumlah_pengurus: {
      type : DataTypes.INTEGER,
    } ,
    nama_pimpinan: {
      type :  DataTypes.STRING,
      allowNull: false
    },   
    nohp: {
      type : DataTypes.STRING,
      allowNull: false
    },    
    email: {
      type : DataTypes.STRING,
      allowNull: false
    },    
    sosmed: {
      type :  DataTypes.STRING,
    },
    id_jenis: {
      type : DataTypes.STRING,
      allowNull: false
    },
    status_id: {
      type :  DataTypes.STRING,
      allowNull: false
    } 
  }, {
    tableName: 'panti'
  });

module.exports = panti;