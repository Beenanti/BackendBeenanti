'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('panti', [
      {
        id_panti: "p01",
        nik_pengelola: null,
        nama_panti: "Liga Dakwah",
        geom: null,
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
