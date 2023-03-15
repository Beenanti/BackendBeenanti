'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('panti', {
      id_panti: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(3)
      },
      nama_panti: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      geom: {
        type: Sequelize.GEOMETRY,
        allowNull: false
      },
      jumlah_anak: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      jumlah_pengurus: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nama_pimpinan: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      nohp: {
        type: Sequelize.STRING(13),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      sosmed: {
        type: Sequelize.STRING(20)
      },
      id_jenis: {
        type: Sequelize.STRING(1),
        references: {
          model: 'jenis_panti',
          key: 'id_jenis'
        },
        allowNull: false
      },
      status_id: {
        type: Sequelize.STRING(1),
        references: {
          model: 'status',
          key: 'id_status'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Menambahkan relasi antara tabel panti dan jenis panti
    await queryInterface.addConstraint('panti', {
      type: 'foreign key',
      name: 'panti_idJenis_fk',
      fields: ['id_jenis'],
      references: {
        table: 'jenis_panti',
        field: 'id_jenis'
      },
      onDelete: 'cascade'
    });

    // Menambahkan relasi antara tabel panti dan status
    await queryInterface.addConstraint('panti', {
      type: 'foreign key',
      name: 'panti_statusId_fk',
      fields: ['status_id'],
      references: {
        table: 'status',
        field: 'id_status'
      },
      onDelete: 'cascade'
    });

  },
  async down(queryInterface, Sequelize) {
    // Hapus relasi dan tabel panti
    await queryInterface.removeConstraint('panti', 'panti_idJenis_fk');
    await queryInterface.removeConstraint('panti', 'panti_statusId_fk');
    await queryInterface.dropTable('Panti');
  }
};