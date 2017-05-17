/**
 * Created by ccc on 5/16/17.
 */

import Koa from 'koa'
import logger from 'koa-logger'
import cors from 'kcors'
import bodyParser from 'koa-bodyparser';
import routes from './api'


const app = new Koa()
app.use(logger())
  .use(cors())
  .use(bodyParser())
  .use(routes)

export default app
