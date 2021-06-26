const { sign, verify } = require('jsonwebtoken');
const secret = "key-server";//密钥
const jwt = require('koa-jwt')({ secret });

function getUserId(ctx) {
    const token = ctx.request.header.authorization;
    let userId;
    verify(token, secret, (_, decode) => {
        userId = decode.userId;
    });
    return userId;
}

module.exports = {
    sign,
    verify,
    secret,
    jwt,
    getUserId
}