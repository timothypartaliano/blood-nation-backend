'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dummyReservation = {
      id: uuidv4(),
      address: 'Jl. Haji Hanafi',
      age: 35,
      weight: 60,
      blood_type: 'A+',
      created_at: new Date(),
      updated_at: new Date()
    };

    await queryInterface.bulkInsert('Reservations', [dummyReservation], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reservations', null, {});
  }
};
