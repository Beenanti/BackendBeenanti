'use strict';
const { Model } = require('sequelize');
const sequelize = require('../config/db');

// module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    nik: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    nama: {
      type : DataTypes.STRING,
      allowNull : false
    },    
    jenis_kelamin: {
      type : DataTypes.STRING,
      allowNull : false
    },    
    alamat: {
      type : DataTypes.STRING,
      allowNull : false
    },    
    tempat_lahir: {
      type : DataTypes.STRING,
      allowNull : false
    },    
    tgl_lahir: {
      type : DataTypes.DATE,
      allowNull : false
    },    
    email: {
      type : DataTypes.STRING,
      allowNull : false
    },    
    no_hp: {
      type : DataTypes.STRING,
      allowNull : false
    },    
    foto: {
      type : DataTypes.STRING,
      allowNull : false
    },    
    pekerjaan: {
      type : DataTypes.STRING,
      allowNull : false
    },    
    role: {
      type : DataTypes.STRING,
      allowNull : false
    },    
    status_id: {
      type : DataTypes.STRING,
      allowNull : false
    },    
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  });
  return User;
// };