'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('user', [
      { 
        email: "usermobile@email.com",
        password: "rahasia",
        nik: "1371118234723897",
        nama: "johndoe",
        jenis_kelamin: "laki-laki",
        alamat: "limau manis",
        tempat_lahir: "Padang",
        tgl_lahir: new Date('2023-2-12'),
        no_hp: "0812345678",
        foto: "foto???",
        pekerjaan: "Mahasiswa",
        role: "user_mobile",
        status_id: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        email: "adminmaster@email.com",
        password: "rahasia",
        nik: "1381118234724521",
        nama: "johnydoer",
        jenis_kelamin: "laki-laki",
        alamat: "jeruk manis",
        tempat_lahir: "Padang",
        tgl_lahir: new Date('2023-2-13'),
        no_hp: "0812345678",
        foto: "foto???",
        pekerjaan: "Mahasiswa",
        role: "admin_master",
        status_id: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        email: "adminpanti@email.com",
        password: "rahasia",
        nik: "1391118234726872",
        nama: "jonah doer",
        jenis_kelamin: "perempuan",
        alamat: "jeruk manis",
        tempat_lahir: "Padang",
        tgl_lahir: new Date('2023-2-14'),
        no_hp: "0812345678",
        foto: "foto???",
        pekerjaan: "Mahasiswa",
        role: "admin_panti",
        status_id: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('user', null, {});
  }
};
