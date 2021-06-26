module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tag', {
    tagId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  });

  return Tag;
};
