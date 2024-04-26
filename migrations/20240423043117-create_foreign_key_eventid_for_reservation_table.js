'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Reservations', 'event_id', {
      type: Sequelize.UUID
    })

    await queryInterface.addConstraint('Reservations', {
      fields: ["event_id"],
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
    await queryInterface.removeColumn('Reservations', 'event_id')
  }
};
