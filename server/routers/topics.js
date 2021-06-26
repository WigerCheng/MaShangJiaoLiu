const { Topic, User, Tag } = require('../sequelize');
const Result = require('../util/result');
const { getUserId } = require('../util/token');

async function getTopicList(ctx) {
    let currentPage = ctx.query.page || 1;
    let size = ctx.query.size || 15;
    let offset = (currentPage - 1) * size;
    let { count, rows } = await Topic.findAndCountAll({
        include: [
            User, Tag
        ],
        order: [['topicId', 'DESC']],
        offset: offset,
        limit: size
    });
    let result = {};
    result.list = rows;
    result.total = count;
    ctx.body = Result.Success(result);
};

async function addTopic(ctx) {
    const topic = ctx.request.body;
    topic.userCreatorId = getUserId(ctx);
    const insertTopic = await Topic.create(topic);
    ctx.body = Result.Success(insertTopic);
}

async function getTopic(ctx) {
    try {
        let topicId = ctx.params.id;
        let topic = await Topic.findByPk(topicId, {
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
                { model: Tag }
            ]
        });
        if (topic === null) {
            ctx.body = Result.Fail(201, "找不到Topic");
        } else {
            ctx.body = Result.Success(topic);
        }
    } catch (e) {
        console.error(e);
        ctx.body = Result.Fail(201, "找不到Topic");
    }
}

async function deleteTopic(ctx) {
    let topicId = ctx.params.id;
    let deleteTopic = await Topic.destroy({
        where: {
            topicId: topicId
        }
    });
    ctx.body = Result.Success(deleteTopic);
}

async function updateTopic(ctx) {
    let topicId = ctx.params.id;
    let topic = ctx.request.body;
    let updateTopic = await Topic.update({
        title: topic.title,
        content: topic.content,
        ownTagId: topic.tagId
    }, {
        where: {
            topicId: topicId
        }
    });
    ctx.body = Result.Success(updateTopic);
}

module.exports = {
    getTopicList,
    addTopic,
    getTopic,
    deleteTopic,
    updateTopic
}