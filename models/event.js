'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    location: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    quota: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    requirements: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    date: { 
      type: DataTypes.DATE,
      allowNull: false
    },
    imageUrl: { 
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};