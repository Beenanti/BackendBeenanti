'use strict';
const {
  Model
} = require('sequelize');
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
    nama_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
    timestamps: false, // Menonaktifkan kolom createdAt dan updatedAt
    tableName: 'status'
  });
  return Status;
};