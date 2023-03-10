'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    
    static associate(models) {
      trip.belongsTo(models.transaction, {
        as: 'transaction',
        foreignKey: 'trip_id'
      })

      trip.belongsTo(models.country, {
        as: 'country',
        foreignKey: 'country_id'
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
    date_trip: DataTypes.DATE,
    price: DataTypes.INTEGER,
    quota: DataTypes.INTEGER,
    counter_quota: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    images: DataTypes.TEXT,
    country_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'trip',
  });
  return trip;
};