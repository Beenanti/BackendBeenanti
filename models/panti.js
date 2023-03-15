'use strict';
const { Model } = require('sequelize');
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
    nik_pengelola: {
      type :  DataTypes.STRING,
      allowNull: false
    },
    nama_panti: {
      type : DataTypes.STRING,
      allowNull: false
    },
    geom: {
      type :  DataTypes.GEOMETRY,
      allowNull: false
    },   
    jumlah_anak: {
      type :  DataTypes.INTEGER,
      allowNull: false
    },
    jumlah_pengurus: {
      type : DataTypes.INTEGER,
    } ,
    nama_pimpinan: {
      type :  DataTypes.STRING,
      allowNull: false
    },   
    nohp: {
      type : DataTypes.STRING,
      allowNull: false
    },    
    email: {
      type : DataTypes.STRING,
      allowNull: false
    },    
    sosmed: {
      type :  DataTypes.STRING,
    },
    id_jenis: {
      type : DataTypes.STRING,
      allowNull: false
    },
    status_id: {
      type :  DataTypes.STRING,
      allowNull: false
    } 
   
  }, {
    sequelize,
    modelName: 'Panti',
    tableName: 'panti'
  });
  return Panti;
};