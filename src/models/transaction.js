'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    
    static associate(models) {
      transaction.belongsTo(models.user, {
        as: 'user',
        foreignKey: 'userId'
      })

      transaction.hasMany(models.trip, {
        as: 'trips',
        foreignKey: 'tripId'
      })
    }
  }
  transaction.init({
    counterQty: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING,
    attachment: DataTypes.STRING,
    tripId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};