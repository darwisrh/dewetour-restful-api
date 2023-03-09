'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    
    static associate(models) {
      trip.belongsTo(models.transaction, {
        as: 'transaction',
        foreignKey: 'tripId'
      })

      trip.belongsTo(models.country, {
        as: 'country',
        foreignKey: 'countryId'
      })
    }
  }
  trip.init({
    title: DataTypes.STRING,
    accomodation: DataTypes.STRING,
    transportation: DataTypes.STRING,
    eat: DataTypes.STRING,
    day: DataTypes.INTEGER,
    night: DataTypes.INTEGER,
    dateTrip: DataTypes.DATE,
    price: DataTypes.INTEGER,
    quota: DataTypes.INTEGER,
    counterQuota: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    images: DataTypes.TEXT,
    countryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'trip',
  });
  return trip;
};