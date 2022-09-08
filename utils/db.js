const { Sequelize, Model, DataTypes,QueryTypes, BelongsTo } = require('sequelize');
const { DATABASE_URL } = require('./config');

const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  });

  module.exports = {sequelize}
