import Koa from "koa";
import { AsyncLocalStorage } from "async_hooks";

import { KeyFormat } from "crypto";
import { Logger } from "tslog";

import {AppDataSource} from "./configs/database"

require('dotenv').config()

const applyApiMiddleware = require('./api');

const app = new Koa();

const asyncLocalStorage: AsyncLocalStorage<{ requestId: string }> =
  new AsyncLocalStorage();

  const logger: Logger = new Logger({
    name: "Server",
    requestId: (): string => {
      return asyncLocalStorage.getStore()?.requestId as string;
    },
  });
  export { logger };

const HomeRoutes = require('./routes/home.router');
const bodyParser = require('koa-bodyparser');

const log: Logger = new Logger({ name: "nodejs-koa", type: "json" });

app.use(bodyParser());

app.use(HomeRoutes.routes())
  .use(HomeRoutes.allowedMethods());

applyApiMiddleware(app);

logger.silly(`${process.env.PORT}`);

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        logger.info("database initialized.")

    })
    .catch((error) => console.log(error))

app.use(async (ctx: Koa.Context , next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    logger.info(`${ctx.method} ${ctx.url} - ${rt}`);
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
