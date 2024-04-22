'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Reservations', 'UserId', {
      type: Sequelize.UUID
    })

    await queryInterface.addConstraint('Reservations', {
      fields: ["UserId"],
      type: "foreign key",
      name: "user_fk",
      references: {
        table: "Users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Reservations', 'user_fk')
    await queryInterface.removeColumn('Reservations', 'UserId')
  }
};
