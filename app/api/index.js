/**
 * Created by ccc on 6/16/17.
 */


import compose from 'koa-compose';
import Router from 'koa-router';
import importDir from 'import-dir';
import auth from './auth';

const routes = importDir('./routes');
const prefix = '/api';

export default function api() {
  const router = new Router({ prefix });

  Object.keys(routes).forEach(name => routes[name](router));

  return compose([
    auth(),
    router.routes(),
    router.allowedMethods(),
  ]);
}
