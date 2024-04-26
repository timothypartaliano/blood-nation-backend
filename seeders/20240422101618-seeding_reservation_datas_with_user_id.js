'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dummyReservation = {
      id: uuidv4(),
      address: 'Jl. Nusantara',
      age: 27,
      weight: 45,
      blood_type: 'A-',
      user_id: 'aac4a64c-2a7f-47c7-8238-6d242c610081',
      created_at: new Date(),
      updated_at: new Date()
    };

    await queryInterface.bulkInsert('Reservations', [dummyReservation], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reservations', null, {});
  }
};
