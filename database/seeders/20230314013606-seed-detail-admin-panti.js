'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('detail_admin_panti', [
      {
        id_panti: 'p01',
        email: "adminpanti@email.com"
      },
  ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('detail_admin_panti', null, {});
  }
};
