'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const relawan = sequelize.define('relawan',{

    id_relawan: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
    bidang: {
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
    berkas: {
        allowNull: false,
        type: DataTypes.STRING
    },
    detail: {
        allowNull: false,
        type: DataTypes.TEXT
    },

    // foreign key
    id_panti: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email_relawan: {
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

module.exports = relawan;