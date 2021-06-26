const { Comment, User } = require('../sequelize');
const Result = require('../util/result');
const { getUserId } = require('../util/token');

async function addComment(ctx) {
    let comment = ctx.request.body;
    let uid = getUserId(ctx);
    comment.commentOwnerId = uid;
    let insertComment = await Comment.create(comment);
    ctx.body = Result.Success(insertComment);
};

async function getCommentlist(ctx) {
    let topicId = ctx.params.topicId;
    let currentPage = ctx.query.page || 1;
    let size = ctx.query.size || 10;
    let offset = (currentPage - 1) * size;
    let { count, rows } = await Comment.findAndCountAll({
        where: {
            'ownTopicId': topicId
        },
        offset: offset,
        limit: size,
        include: {
            model: User,
            attributes: {
                exclude: ['password']
            }
        }
    });
    let result = {};
    result.list = rows;
    result.total = count;
    ctx.body = Result.Success(result);
}

async function deleteComment(ctx) {
    let id = ctx.params.id;
    let deleteComment = await Comment.destroy({
        where: {
            commentId: id
        }
    });
    ctx.body = Result.Success(deleteComment);
}

module.exports = {
    addComment,
    getCommentlist,
    deleteComment
}