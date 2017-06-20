/**
 * Created by ccc on 6/15/17.
 */

import Koa from 'koa';
import middleware from './middleware';
import api from './api';

const app = new Koa();

app.use(middleware());
app.use(api());

export default app;
