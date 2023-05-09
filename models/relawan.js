'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const relawan = sequelize.define('relawan',{

    id_relawan: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(3)
    },
    bidang: {
        allowNull: false,
        type: DataTypes.STRING(20)
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
    berkas: {
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    detail: {
        allowNull: false,
        type: DataTypes.TEXT
    },

    // foreign key
    id_panti: {
        allowNull: false,
        type: DataTypes.STRING(3)
    },
    email_relawan: {
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

module.exports = relawan;