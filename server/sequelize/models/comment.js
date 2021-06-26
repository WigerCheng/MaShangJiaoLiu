const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    commentContent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commentTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  }, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  });

  return Comment;
};
