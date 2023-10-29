'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const karya = sequelize.define('karya',{

    id_karya: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(3)
    },
    nama_karya: {
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    nama_anak: {
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    link_karya: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    url_gambar:{
        allowNull: false,
        type: DataTypes.STRING
      },

    // foreign key
    id_panti: {
        allowNull: false,
        type: DataTypes.STRING(3)
    },

}, {
    freezeTableName: true
});

module.exports = karya;