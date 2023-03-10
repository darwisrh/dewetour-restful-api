'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    
    static associate(models) {
      country.hasMany(models.trip, {
        as: 'trips',
        foreignKey: 'country_id'
      })
    }
  }
  country.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'country',
  });
  return country;
};