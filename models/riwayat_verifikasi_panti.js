'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const riwayat_verifikasi_panti = sequelize.define('riwayat_verifikasi_panti',{

    id_riwayat: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID
    },
    id_panti: {
        allowNull: false,
        type: DataTypes.STRING(3)
    },
    status_id: {
        allowNull: false,
        type: DataTypes.STRING(1)
    },
    aksi: {
        allowNull: false,
        type: DataTypes.ENUM('tambah', 'edit')
    },
    data: {
        allowNull: false,
        type: DataTypes.JSON
    },

}, {
    freezeTableName: true,
    createdAt: 'waktu',
    updatedAt: false
});

module.exports = riwayat_verifikasi_panti;