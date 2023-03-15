'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const point = Sequelize.fn('GeomFromText', 'POINT(-0.915414 100.460680)'); //-0.9154147192685002, 100.46068063856397
  
    await queryInterface.bulkInsert('galeri', [
      {
        id_gambar: "sdkjfhsdukfh2f3",
        id_panti: "p01",
        url_gambar: "/sdfsdjk/asf",
        deskripsi: "By Pazz",
      },
  ], {});
    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('galeri', null, {});
  }
};
