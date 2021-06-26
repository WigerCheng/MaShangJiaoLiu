const { User } = require('../sequelize');
const Result = require('../util/result');
const { sign, secret } = require('../util/token');

async function addUser(ctx) {
    let user = ctx.request.body;
    let existUser = await User.findOne({
        where: {
            username: user.username
        }
    });
    if (existUser !== null) {
        ctx.body = Result.Fail(201, "账户已存在");
    } else {
        let insertuser = await User.create(user);
        ctx.body = Result.Success(insertuser);
    }
}

async function getUser(ctx) {
    try {
        let uid = ctx.params.id;
        let user = await User.findByPk(uid);
        if (user === null) {
            ctx.body = Result.Fail(201, "找不到用户");
        } else {
            ctx.body = Result.Success(user);
        }
    } catch (e) {
        console.error(e);
        ctx.body = Result.Fail(201, "找不到用户");
    }
}

async function login(ctx) {
    let user = ctx.request.body;
    let username = user.username;
    let password = user.password;
    let existUser = await User.findOne({
        where: {
            username: username
        }
    });
    if (existUser === null) {
        ctx.body = Result.Fail(201, "账户不存在");
    } else {
        if (existUser.password !== password) {
            ctx.body = Result.Fail(202, "密码错误");
        } else {
            let userId = existUser.userId;
            let token = sign({ userId }, secret, { expiresIn: '1h' });
            ctx.body = Result.Success({
                token: token,
                user: existUser
            });
        }
    }
}

async function getUserList(ctx) {
    let currentPage = ctx.query.page || 1;
    let size = ctx.query.size || 10;
    let offset = (currentPage - 1) * size;
    let { count, rows } = await User.findAndCountAll({
        offset: offset,
        limit: size
    })
    let result = {};
    result.list = rows;
    result.total = count;
    ctx.body = Result.Success(result);
}

async function updateUser(ctx) {
    let uid = ctx.params.id;
    let user = ctx.request.body;
    let updateUser = await User.update(user, {
        where: {
            userId: uid
        }
    });
    ctx.body = Result.Success(updateUser);
}

module.exports = {
    addUser,
    getUser,
    updateUser,
    getUserList,
    login
}