'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Status', {
      id_status: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(1)
      },
      nama_status: {
        type: Sequelize.STRING(10)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Status');
  }
};