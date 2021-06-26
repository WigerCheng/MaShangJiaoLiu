const Sequelize = require('sequelize');
const UserModel = require('./models/user.js');
const TopicModel = require('./models/topic.js');
const CommentModel = require('./models/comment.js');
const TagModel = require('./models/tag.js');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './app.db'
});

const User = UserModel(sequelize, Sequelize);
const Topic = TopicModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);

User.hasMany(Topic, {
  foreignKey: 'userCreatorId'
});

Topic.belongsTo(User, {
  foreignKey: 'userCreatorId'
});

User.hasMany(Comment, {
  foreignKey: 'commentOwnerId'
});

Comment.belongsTo(User, {
  foreignKey: 'commentOwnerId'
});

Tag.hasMany(Topic, {
  foreignKey: 'ownTagId'
});

Topic.belongsTo(Tag, {
  foreignKey: 'ownTagId'
});

Topic.hasMany(Comment, {
  foreignKey: 'ownTopicId'
})

Comment.belongsTo(Topic, {
  foreignKey: 'ownTopicId'
});

module.exports = {
  sequelize,
  Sequelize,
  User,
  Topic,
  Comment,
  Tag
}