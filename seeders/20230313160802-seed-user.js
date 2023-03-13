import { faker } from '@faker-js/faker/locale/id_ID';

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        nama: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('user', users);
  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('user', null, {});
  }
};
