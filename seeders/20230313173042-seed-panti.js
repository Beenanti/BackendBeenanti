import { faker } from '@faker-js/faker/locale/id_ID';

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('panti', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('panti', null, {});
  }
};
