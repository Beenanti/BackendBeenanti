'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
    nama: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    alamat: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    tgl_lahir: DataTypes.DATE,
    email: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    foto: DataTypes.STRING,
    pekerjaan: DataTypes.STRING,
    role: DataTypes.STRING,
    status_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  });
  return User;
};