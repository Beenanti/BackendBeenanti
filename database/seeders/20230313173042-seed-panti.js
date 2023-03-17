'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const point = Sequelize.fn('GeomFromText', 'POINT(-0.915414 100.460680)'); //-0.9154147192685002, 100.46068063856397
  
    await queryInterface.bulkInsert('panti', [
      {
        id_panti: "p01",
        nama_panti: "panti pertama",
        alamat: "By Pazz",
        geom: Sequelize.fn('GeomFromText', 'POINT(-0.915414 100.460680)'),
        jumlah_anak: 120,
        jumlah_pengurus: 10,
        nama_pimpinan: "beliau",
        nohp: "089765431726",
        email: "beliau@email.com",
        sosmed: "@pantipertama",
        id_jenis: "1",
        status_id: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_panti: "p02",
        nama_panti: "panti kedua",
        alamat: "kuranjji",
        geom: Sequelize.fn('GeomFromText', 'POINT(-0.919066 100.353863)'),
        jumlah_anak: 120,
        jumlah_pengurus: 10,
        nama_pimpinan: "beliau juga",
        nohp: "089765431726",
        email: "beliau_juga@email.com",
        sosmed: "@pantikedua",
        id_jenis: "2",
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
