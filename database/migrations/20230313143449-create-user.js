'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      email: {
        primaryKey: true,
        type: Sequelize.STRING(30),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(),
        allowNull: false
      },
      nik: {
        type: Sequelize.STRING(16)
      },
      nama: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      jenis_kelamin: {
        type: Sequelize.STRING(9),
      },
      alamat: {
        type: Sequelize.STRING(),
      },
      tempat_lahir: {
        type: Sequelize.STRING(30),
      },
      tgl_lahir: {
        type: Sequelize.DATEONLY,
      },
      no_hp: {
        type: Sequelize.STRING(13),
      },
      foto: {
        type: Sequelize.STRING(),
      },
      pekerjaan: {
        type: Sequelize.STRING(20),
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