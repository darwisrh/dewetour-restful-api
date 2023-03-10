'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    
    static associate(models) {
      transaction.belongsTo(models.user, {
        as: 'user',
        foreignKey: 'user_id'
      })

      transaction.hasMany(models.trip, {
        as: 'trips',
        foreignKey: 'trip_id'
      })
    }
  }
  transaction.init({
    counter_qty: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING,
    attachment: DataTypes.STRING,
    trip_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};