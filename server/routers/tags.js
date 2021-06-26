const { Tag } = require('../sequelize');
const Result = require('../util/result');

async function getTagList(ctx) {
    let tags = await Tag.findAll();
    ctx.body = Result.Success(tags);
};

async function addTag(ctx) {
    let tagName = {
        tagName: ctx.request.body.tagName
    }
    const existTag = await Tag.findOne({
        where: tagName
    });
    if (existTag !== null) {
        ctx.body = Result.Fail(201, "Tag已存在");
    } else {
        let insertTag = await Tag.create(tagName);
        ctx.body = Result.Success(insertTag);
    }
};

async function updateTag(ctx) {
    let tagId = ctx.params.id;
    let tag = ctx.request.body;
    let updateTag = await Tag.update(tag, {
        where: {
            tagId: tagId
        }
    });
    ctx.body = Result.Success(updateTag);
}

module.exports = {
    getTagList,
    addTag,
    updateTag
}