'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const jenis_kebutuhan = sequelize.define('jenis_kebutuhan',{

    id_jenis_kebutuhan: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(2)
    },
    nama_jenis_kebutuhan: {
        type : DataTypes.STRING(30),
        allowNull: false
    }

}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = jenis_kebutuhan;