/**
 * Created by ccc on 6/15/17.
 */

import compose from 'koa-compose';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import cors from 'kcors';
import handleError from './handleErrors';

export default function middleware() {
  return compose([
    helmet(),
    logger(),
    cors(),
    bodyParser(),
    handleError(),
  ]);
}
