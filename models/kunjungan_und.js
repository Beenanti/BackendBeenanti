'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const kunjungan_und = sequelize.define('kunjungan_und',{

    id_und: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
    nama_und: {
        allowNull: false,
        type: DataTypes.STRING
    },
    tanggal: {
        allowNull: false,
        type: DataTypes.DATEONLY
    },
    waktu: {
        allowNull: false,
        type: DataTypes.TIME
    },
    durasi: {
        allowNull: false,
        type: DataTypes.STRING
    },
    detail: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    berkas: {
        allowNull: false,
        type: DataTypes.STRING
    },

    // foreign key
    id_panti: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING
    },
    status_id: {
        allowNull: false,
        type: DataTypes.STRING
    },

}, {
    freezeTableName: true
});

module.exports = kunjungan_und;