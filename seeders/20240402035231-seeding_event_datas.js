'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dummyEvents = Array.from({ length: 10 }).map((_, index) => {
      const randomDays = Math.floor(Math.random() * 100) + 1;
      const randomDate = new Date(Date.now() + randomDays * 24 * 60 * 60 * 1000);
      return {
        id: uuidv4(),
        lokasi: `Location ${index + 1}`,
        kuotaPeserta: Math.floor(Math.random() * 100) + 1,
        persyaratan: `Requirements for Event ${index + 1}`,
        tanggal: randomDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Events', dummyEvents, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
