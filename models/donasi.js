'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const donasi = sequelize.define('donasi',{

    id_donasi: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
    nama_donasi: {
        type : DataTypes.STRING,
        allowNull: false
    },
    jumlah_donasi: {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    alamat_donasi: {
        type : DataTypes.STRING,
        allowNull: false
    },
    bukti_tanda_terima: {
        type : DataTypes.STRING,
        allowNull: false
    },
    
    // foreign key
    id_panti: {
        type : DataTypes.STRING,
        allowNull: false
    },
    email_donatur: {
        type : DataTypes.STRING,
        allowNull: false
    },
    id_jenis_kebutuhan: {
        type : DataTypes.STRING,
        allowNull: false
    },
    id_satuan: {
        type : DataTypes.STRING,
        allowNull: false
    },

}, {
    freezeTableName: true
});

module.exports = donasi;