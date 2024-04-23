'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Reservations', 'EventId', {
      type: Sequelize.UUID
    })

    await queryInterface.addConstraint('Reservations', {
      fields: ["EventId"],
      type: "foreign key",
      name: "event_fk",
      references: {
        table: "Events",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Reservations', 'event_fk')
    await queryInterface.removeColumn('Reservations', 'EventId')
  }
};
