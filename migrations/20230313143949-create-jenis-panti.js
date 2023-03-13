'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jenis_panti', {
      id_jenis: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(1)
      },
      nama_jenis: {
        type: Sequelize.STRING(20)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jenis_panti');
  }
};