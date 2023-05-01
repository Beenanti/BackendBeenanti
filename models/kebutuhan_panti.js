'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const kebutuhan_panti = sequelize.define('kebutuhan_panti',{

    id_kebutuhan: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
    id_panti: {
        allowNull: false,
        type: DataTypes.STRING
    },
    nama_kebutuhan: {
        allowNull: false,
        type: DataTypes.STRING
    },
    id_jenis_kebutuhan: {
        type : DataTypes.STRING,
        allowNull: false
    },
    id_satuan: {
        type : DataTypes.STRING,
        allowNull: false
    },
    jumlah_kebutuhan: {
        type : DataTypes.INTEGER,
        allowNull: false
    },

}, {
    freezeTableName: true
});

module.exports = kebutuhan_panti;