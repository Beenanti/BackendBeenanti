'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('detail_admin_panti', [
      {
        id_panti: 'p01',
        nik: "1391118234726872"
      },
  ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('detail_admin_panti', null, {});
  }
};
