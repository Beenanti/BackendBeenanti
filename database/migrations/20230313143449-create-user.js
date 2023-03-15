'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      nik: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(16)
      },
      nama: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      jenis_kelamin: {
        type: Sequelize.STRING(9),
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING(),
        allowNull: false
      },
      tempat_lahir: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      tgl_lahir: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      no_hp: {
        type: Sequelize.STRING(13),
        allowNull: false
      },
      foto: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      pekerjaan: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      role: {
        type: Sequelize.STRING(20),
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

    // Menambahkan relasi antara tabel user dan status
    await queryInterface.addConstraint('user', {
      type: 'foreign key',
      name: 'user_statusId_fk',
      fields: ['status_id'],
      references: {
        table: 'status',
        field: 'id_status'
      },
      onDelete: 'cascade'
    });
  },
  async down(queryInterface, Sequelize) {
    // Hapus relasi dan tabel user
    await queryInterface.removeConstraint('user', 'user_statusId_fk');
    await queryInterface.dropTable('User');
  }
};