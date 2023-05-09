'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const kebutuhan_panti = sequelize.define('kebutuhan_panti',{

    id_kebutuhan: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(2)
    },
    id_panti: {
        allowNull: false,
        type: DataTypes.STRING(3)
    },
    nama_kebutuhan: {
        allowNull: false,
        type: DataTypes.STRING(50)
    },
    id_jenis_kebutuhan: {
        type : DataTypes.STRING(2),
        allowNull: false
    },
    id_satuan: {
        type : DataTypes.STRING(2),
        allowNull: false
    },
    jumlah_kebutuhan: {
        type : DataTypes.INTEGER(11),
        allowNull: false
    },

}, {
    freezeTableName: true
});

module.exports = kebutuhan_panti;