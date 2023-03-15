'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const point = Sequelize.fn('GeomFromText', 'POINT(-0.915414 100.460680)'); //-0.9154147192685002, 100.46068063856397
  
    await queryInterface.bulkInsert('panti', [
      {
        id_panti: "p01",
        nama_panti: "Liga Dakwah",
        alamat: "By Pazz",
        geom: point,
        jumlah_anak: 120,
        jumlah_pengurus: 10,
        nama_pimpinan: "Yunizar AR",
        nohp: "089765431726",
        email: "yunizar@email.com",
        sosmed: "@ligadakwah",
        id_jenis: "1",
        status_id: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ], {});
    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('panti', null, {});
  }
};
