'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Panti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Panti.init({
    id_panti: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    nik_pengelola: DataTypes.STRING,
    nama_panti: DataTypes.STRING,
    geom: DataTypes.GEOMETRY,
    jumlah_anak: DataTypes.INTEGER,
    jumlah_pengurus: DataTypes.INTEGER,
    nama_pimpinan: DataTypes.STRING,
    nohp: DataTypes.STRING,
    email: DataTypes.STRING,
    sosmed: DataTypes.STRING,
    id_jenis: DataTypes.STRING,
    status_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Panti',
    tableName: 'panti'
  });
  return Panti;
};