const Koa = require('koa');
import {AppDataSource} from "./configs/database"
require('dotenv').config()

const HomeRoutes = require('./routes/home.router');
const bodyParser = require('koa-bodyparser');

const app = new Koa()

app.use(bodyParser());

app.use(HomeRoutes.routes())
  .use(HomeRoutes.allowedMethods());

// logger


// dotenv.config();
console.log(`${process.env.PORT}`);

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        console.log("database initialized.")
    })
    .catch((error) => console.log(error))

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
