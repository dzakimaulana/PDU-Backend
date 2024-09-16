const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database');

const Volume = sequelize.define('Volume', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  volume: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'Volumes', // Ensure the table name stays plural
  timestamps: false,    // Disable automatic `createdAt` and `updatedAt` fields
});

module.exports = Volume;
