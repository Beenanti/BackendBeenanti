'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Status.init({
    id_status: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    nama_status:{
      type : DataTypes.STRING,
      allowNull : false
    } 
  }, {
    sequelize,
    modelName: 'Status',
    timestamps: false, // Menonaktifkan kolom createdAt dan updatedAt
    tableName: 'status'
  });
  return Status;
};