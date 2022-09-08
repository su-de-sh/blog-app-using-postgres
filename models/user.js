
const { Sequelize, Model, DataTypes,QueryTypes, BelongsTo } = require('sequelize')
const {sequelize} = require( "../utils/db")

class User extends Model {}
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.TEXT,
    allowNull:false
    
  },
name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user'
})

module.exports = User