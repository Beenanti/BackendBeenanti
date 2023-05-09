'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const satuan = sequelize.define('satuan',{

    id_satuan: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(2)
    },
    nama_satuan: {
        type : DataTypes.STRING(20),
        allowNull: false
    }

}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = satuan;