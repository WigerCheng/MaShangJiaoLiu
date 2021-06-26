const app = require('./koa');

const port = 3000;

app.listen(port, () => {
  console.log(`Koa项目启动成功：http://localhost:${port}`);
});