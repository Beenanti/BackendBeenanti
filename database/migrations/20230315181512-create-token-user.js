'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('token_user', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      user: {
        type: Sequelize.STRING(30),
        references: {
            model: 'user',
            key: 'email'
          },
          allowNull: false
      },
      remember_token: {
        type: Sequelize.STRING,
        unique: true
      },
      ip_address: {
        type: Sequelize.STRING(20)
      },
      waktu_login: {
        type: Sequelize.DATE()
      },
    });

    // Menambahkan relasi antara tabel token_user dan user
    await queryInterface.addConstraint('token_user', {
      type: 'foreign key',
      name: 'tokenUser_user_fk',
      fields: ['user'],
      references: {
        table: 'user',
        field: 'email'
      },
      onDelete: 'cascade'
    });

  },
  async down(queryInterface, Sequelize) {
    // Hapus relasi dan tabel token
    await queryInterface.removeConstraint('token_user', 'tokenUser_user_fk');
    await queryInterface.dropTable('token_user');
  }
};