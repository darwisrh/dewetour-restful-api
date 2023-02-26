'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    
    static associate(models) {
      image.hasOne(models.trip, {
        as: 'trip',
        foreignKey: 'imageId'
      })
    }
  }
  image.init({
    image: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'image',
  });
  return image;
};