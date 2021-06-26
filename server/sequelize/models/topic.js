const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('topic', {
    topicId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publishTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  }, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  });

  return Topic;
};
