'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('galeri', {
      id_gambar: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      id_panti: {
        type: Sequelize.STRING(10),
        references: {
            model: 'panti',
            key: 'id_panti'
          },
          allowNull: false
      },
      url_gambar: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deskripsi: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });

    // Menambahkan relasi antara tabel galeri dan panti
    await queryInterface.addConstraint('galeri', {
      type: 'foreign key',
      name: 'galeri_idPanti_fk',
      fields: ['id_panti'],
      references: {
        table: 'panti',
        field: 'id_panti'
      },
      onDelete: 'cascade'
    });

  },
  async down(queryInterface, Sequelize) {
    // Hapus relasi dan tabel panti
    await queryInterface.removeConstraint('galeri', 'galeri_idPanti_fk');
    await queryInterface.dropTable('galeri');
  }
};