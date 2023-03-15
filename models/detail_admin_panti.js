'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_admin_panti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  detail_admin_panti.init({
    id_panti: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(3)
    },
    nik:{
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(16)
    }
  }, {
    sequelize,
    modelName: 'detail_admin_panti',
    timestamps: false, // Menonaktifkan kolom createdAt dan updatedAt
    tableName: 'detail_admin_panti'
  });
  return detail_admin_panti;
};