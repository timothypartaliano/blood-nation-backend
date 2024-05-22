'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const event1 = {
      id: uuidv4(),
      name: 'Donor Darah Cengkareng',
      location: 'RSUD Cengkareng',
      quota: Math.floor(Math.random() * 100) + 1,
      requirements: 'Berumur diatas 35 tahun',
      date: new Date(Date.now() + (Math.floor(Math.random() * 100) + 1) * 24 * 60 * 60 * 1000),
      image_url: "https://source.unsplash.com/featured/?hospital",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const event2 = {
      id: uuidv4(),
      name: 'Donor Darah Kembangan',
      location: 'RSUD Kembangan',
      quota: Math.floor(Math.random() * 100) + 1,
      requirements: 'Berumur diatas 25 tahun',
      date: new Date(Date.now() + (Math.floor(Math.random() * 100) + 1) * 24 * 60 * 60 * 1000),
      image_url: "https://source.unsplash.com/featured/?hospital",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const event3 = {
      id: uuidv4(),
      name: 'Donor Darah Kalideres',
      location: 'RSUD Kalideres',
      quota: Math.floor(Math.random() * 100) + 1,
      requirements: 'Berumur diatas 40 tahun',
      date: new Date(Date.now() + (Math.floor(Math.random() * 100) + 1) * 24 * 60 * 60 * 1000),
      image_url: "https://source.unsplash.com/featured/?hospital",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const event4 = {
      id: uuidv4(),
      name: 'Donor Darah Taman Sari',
      location: 'RSUD Taman Sari',
      quota: Math.floor(Math.random() * 100) + 1,
      requirements: 'Berumur diatas 30 tahun',
      date: new Date(Date.now() + (Math.floor(Math.random() * 100) + 1) * 24 * 60 * 60 * 1000),
      image_url: "https://source.unsplash.com/featured/?hospital",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const event5 = {
      id: uuidv4(),
      name: 'Donor Darah Cendana',
      location: 'RSUD Cendana',
      quota: Math.floor(Math.random() * 100) + 1,
      requirements: 'Berumur diatas 35 tahun',
      date: new Date(Date.now() + (Math.floor(Math.random() * 100) + 1) * 24 * 60 * 60 * 1000),
      image_url: "https://source.unsplash.com/featured/?hospital",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const event6 = {
      id: uuidv4(),
      name: 'Donor Darah Dharmais',
      location: 'RSUD Dharmais',
      quota: Math.floor(Math.random() * 100) + 1,
      requirements: 'Berumur diatas 45 tahun',
      date: new Date(Date.now() + (Math.floor(Math.random() * 100) + 1) * 24 * 60 * 60 * 1000),
      image_url: "https://source.unsplash.com/featured/?hospital",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const event7 = {
      id: uuidv4(),
      name: 'Donor Darah Petamburan',
      location: 'RSUD Petamburan',
      quota: Math.floor(Math.random() * 100) + 1,
      requirements: 'Berumur diatas 25 tahun',
      date: new Date(Date.now() + (Math.floor(Math.random() * 100) + 1) * 24 * 60 * 60 * 1000),
      image_url: "https://source.unsplash.com/featured/?hospital",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const event8 = {
      id: uuidv4(),
      name: 'Donor Darah Kedoya',
      location: 'RSUD Kedoya',
      quota: Math.floor(Math.random() * 100) + 1,
      requirements: 'Berumur diatas 30 tahun',
      date: new Date(Date.now() + (Math.floor(Math.random() * 100) + 1) * 24 * 60 * 60 * 1000),
      image_url: "https://source.unsplash.com/featured/?hospital",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const event9 = {
      id: uuidv4(),
      name: 'Donor Darah Manuela',
      location: 'RSUD Manuela',
      quota: Math.floor(Math.random() * 100) + 1,
      requirements: 'Berumur diatas 20 tahun',
      date: new Date(Date.now() + (Math.floor(Math.random() * 100) + 1) * 24 * 60 * 60 * 1000),
      image_url: "https://source.unsplash.com/featured/?hospital",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const event10 = {
      id: uuidv4(),
      name: 'Donor Darah Medika',
      location: 'RSUD Medika',
      quota: Math.floor(Math.random() * 100) + 1,
      requirements: 'Berumur diatas 25 tahun',
      date: new Date(Date.now() + (Math.floor(Math.random() * 100) + 1) * 24 * 60 * 60 * 1000),
      image_url: "https://source.unsplash.com/featured/?hospital",
      created_at: new Date(),
      updated_at: new Date(),
    };

    await queryInterface.bulkInsert('Events', [event1, event2, event3, event4, event5, event6, event7, event8, event9, event10], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
