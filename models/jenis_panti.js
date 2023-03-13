'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jenis_panti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  jenis_panti.init({
    id_jenis: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(1)
    },
    nama_jenis: DataTypes.STRING(20)
  }, {
    sequelize,
    modelName: 'jenis_panti',
    timestamps: false, // Menonaktifkan kolom createdAt dan updatedAt
    tableName: 'jenis_panti'
  });
  return jenis_panti;
};