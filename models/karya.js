'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const karya = sequelize.define('karya',{

    id_karya: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
    nama_karya: {
        allowNull: false,
        type: DataTypes.STRING
    },
    nama_anak: {
        allowNull: false,
        type: DataTypes.STRING
    },
    link_karya: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    id_panti: {
        allowNull: false,
        type: DataTypes.STRING
    },

}, {
    freezeTableName: true
});

module.exports = karya;