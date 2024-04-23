'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dummyReservation = {
      id: uuidv4(),
      address: 'Jl. Kebajikan',
      age: 36,
      weight: 50,
      bloodType: 'B+',
      UserId: '62923da7-7308-42db-bfbf-60413690c953',
      EventId: '274a49a1-ad15-4823-aa5c-7204ba9d62f1',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await queryInterface.bulkInsert('Reservations', [dummyReservation], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reservations', null, {});
  }
};
