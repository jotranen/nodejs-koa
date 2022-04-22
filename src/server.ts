import Koa from 'koa'

require('dotenv').config()

const HomeRoutes = require('./routes/home.router');
const bodyParser = require('koa-bodyparser');

const app = new Koa()


app.use(bodyParser());

app.use(HomeRoutes.routes())
  .use(HomeRoutes.allowedMethods());

// logger


console.log(`${process.env.PORT}`);
// dotenv.config();
console.log(`${process.env.PORT}`);

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  });
  
  // x-response-time
  
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });
  
  // response
  
  app.use(async ctx => {
    ctx.body = 'Hello World';
  })

  app.listen(3000);
