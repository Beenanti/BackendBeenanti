'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const donasi = sequelize.define('donasi',{

    id_donasi: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(5)
    },
    nama_donasi: {
        type : DataTypes.STRING(30),
        allowNull: false
    },
    jumlah_donasi: {
        type : DataTypes.INTEGER(11),
        allowNull: false
    },
    alamat_donasi: {
        type : DataTypes.STRING,
        allowNull: false
    },
    bukti_tanda_terima: {
        type : DataTypes.STRING(30),
        allowNull: false
    },
    
    // foreign key
    id_panti: {
        type : DataTypes.STRING(3),
        allowNull: false
    },
    email_donatur: {
        type : DataTypes.STRING(30),
        allowNull: false
    },
    id_jenis_kebutuhan: {
        type : DataTypes.STRING(2),
        allowNull: false
    },
    id_satuan: {
        type : DataTypes.STRING(2),
        allowNull: false
    },
    id_status:{
        type : DataTypes.STRING(1),
        allowNull : false
    } 

}, {
    freezeTableName: true
});

module.exports = donasi;