const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const Result = require('./util/result');
const { jwt } = require('./util/token');

const db = require('./sequelize');
db.sequelize
    // .sync({ force: true })
    // .sync({ alter: true })
    .sync()
    .then(() => console.log('数据库加载完成'));

const app = new Koa();
const router = new Router();

app.use(logger());

// 错误处理
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = Result.Fail(401, "未登录");
        } else {
            throw err;
        }
    })
});

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

const userRouter = require('./routers/users');
const topicRouter = require('./routers/topics');
const tagRouter = require('./routers/tags');
const commentRouter = require('./routers/comments');

router.post('/login', userRouter.login);
router.post('/users', userRouter.addUser);
router.get('/topics', topicRouter.getTopicList);
router.get('/tags', tagRouter.getTagList);
router.get('/topics/:id', topicRouter.getTopic);
router.get('/users/:id', userRouter.getUser);
router.get('/comments/:topicId', commentRouter.getCommentlist);

app.use(jwt);
// 以下接口需要登录
router.get('/users', userRouter.getUserList);
router.put('/users/:id', userRouter.updateUser);

router.post('/comments', commentRouter.addComment);
router.delete('/comments/:id', commentRouter.deleteComment);

router.post('/tags', tagRouter.addTag);
router.put('/tags/:id', tagRouter.updateTag);

router.post('/topics', topicRouter.addTopic);
router.put('/topics/:id', topicRouter.updateTopic);
router.delete('/topics/:id', topicRouter.deleteTopic);

module.exports = app;