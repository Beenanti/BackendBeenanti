'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('jenis_panti', [
      {
        id_jenis: '1',
        nama_jenis: "jenis pertama"
      },
      {
        id_jenis: '2',
        nama_jenis: "jenis kedua"
      },
      {
        id_jenis: '3',
        nama_jenis: "jenis ketiga"
      },
  ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('jenis_panti', null, {});

  }
};
