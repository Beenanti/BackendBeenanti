'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_admin_panti', {
      id_panti: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(3),
        references: {
          model: 'panti',
          key: 'id_panti'
        }
      },
      email: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(30),
        references: {
          model: 'user',
          key: 'email'
        }
      }
    });

    // Menambahkan relasi antara tabel detail admin panti dan panti
    await queryInterface.addConstraint('detail_admin_panti', {
      type: 'foreign key',
      name: 'detailAdminPanti_idPanti_fk',
      fields: ['id_panti'],
      references: {
        table: 'panti',
        field: 'id_panti'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    
    // Menambahkan relasi antara tabel detail admin panti dan user
    await queryInterface.addConstraint('detail_admin_panti', {
      type: 'foreign key',
      name: 'detailAdminPanti_email_fk',
      fields: ['email'],
      references: {
        table: 'user',
        field: 'email'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  async down(queryInterface, Sequelize) {
    // Hapus relasi dan tabel detail admin panti
    await queryInterface.removeConstraint('detail_admin_panti', 'detailAdminPanti_idPanti_fk');
    await queryInterface.removeConstraint('detail_admin_panti', 'detailAdminPanti_email_fk');
    await queryInterface.dropTable('detail_admin_panti');
  }
};