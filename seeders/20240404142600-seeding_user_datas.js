'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dummyUser = {
      id: uuidv4(),
      username: 'jimmy_doe',
      email: 'jimmy@gmail.com',
      password: 'password123',
      phoneNumber: '081375820583',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await queryInterface.bulkInsert('Users', [dummyUser], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
