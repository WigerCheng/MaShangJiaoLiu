module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    gender: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  });

  return User;
};
