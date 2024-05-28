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
      image_url: "https://asset.kompas.com/crops/mOKFrYHlSTM6SEt4aD9PIXZnJE0=/0x5:593x400/750x500/data/photo/2020/03/16/5e6ee88f78835.jpg",
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
      image_url: "https://awsimages.detik.net.id/community/media/visual/2022/03/19/alamat-rumah-sakit-jakarta-selatan_169.jpeg?w=1200",
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
      image_url: "https://cdn.antaranews.com/cache/800x533/2022/06/21/FOTO-Advent.png",
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
      image_url: "https://www.uii.ac.id/wp-content/uploads/2020/03/desain-rumah-sakit-uii.jpg",
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
      image_url: "https://kedokteran.ubaya.ac.id/wp-content/uploads/sites/13/2021/06/x5jkeutnjmxdyyjcxdqy.jpg",
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
      image_url: "https://www.rumah123.com/seo-cms/assets/Rumah_Sakit_Advent_5ce2d4599a/Rumah_Sakit_Advent_5ce2d4599a.jpg",
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
      image_url: "https://news.unair.ac.id/wp-content/uploads/2021/01/PicsArt_01-20-02.17.19-scaled.jpg",
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
      image_url: "https://img.bandung.go.id/images/news/2023/03/06/header/167807592766-jokowi-resmikan-rumah-sakit-mayapada-kota-bandung-tambah-akses-layanan-kesehatan.jpeg",
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
      image_url: "https://rs-hamori.co.id/web_new_cms/uploads/1675763721rs-hamori-company.jpg",
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
      image_url: "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/06/30/WhatsApp-Image-2023-06-30-at-131725-3915413899.jpeg",
      created_at: new Date(),
      updated_at: new Date(),
    };

    await queryInterface.bulkInsert('Events', [event1, event2, event3, event4, event5, event6, event7, event8, event9, event10], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
