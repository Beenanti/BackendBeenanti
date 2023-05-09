'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const kunjungan_und = sequelize.define('kunjungan_und',{

    id_und: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(3)
    },
    nama_und: {
        allowNull: false,
        type: DataTypes.STRING(30)
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
        type: DataTypes.STRING(10)
    },
    detail: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    berkas: {
        allowNull: false,
        type: DataTypes.STRING(30)
    },

    // foreign key
    id_panti: {
        allowNull: false,
        type: DataTypes.STRING(3)
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    status_id: {
        allowNull: false,
        type: DataTypes.STRING(1)
    },

}, {
    freezeTableName: true
});

module.exports = kunjungan_und;