/**
 * Created by ccc on 6/19/17.
 */
import validator from 'validator';
import { connectRedis } from '../../db';
import configs from '../../configs';
import { isClientAuthenticated, isBearerAuthenticated, isAdmin } from '../auth';

const db = connectRedis();
const ttl = 3600*9;

export default (router) => {
  router
    .get('/ip', async ctx => {
      let ip = ctx.ip;
      if (ip.substr(0, 7) === '::ffff:') {
        ip = ip.substr(7);
      }
      ctx.body = {
        request: ctx.request,
        ip,
      };
    })
    .post('/ip', async ctx => {
      const ip = ctx.request.body.ip;
      if (!validator.isIP(ip)) {
        ctx.throw(400, 'invalid ip address');
      }

      const prefix = configs.redis.prefix;
      const key = `${prefix}:${ip}`;
      //const ttl = 3600
      await db.setex(key, ttl, 1)

      ctx.body = {ip, ttl}

      ctx.status = 201
    })
    .get('/whiteips',
      isBearerAuthenticated(),
      isAdmin(),
      async ctx => {
      const ips = await db.keys('squid*');

      ctx.body = ips.map((i) => { return {ip: i.substr(6)}; });
    })
    .post('/whiteips', async ctx => {
      const ip = ctx.request.body.ip;
      if (!validator.isIP(ip)) {
        ctx.throw(400, 'invalid ip address');
      }

      const prefix = configs.redis.prefix;
      const key = `${prefix}:${ip}`;
      //const ttl = 3600
      await db.setex(key, ttl, 1)

      ctx.body = {ip, ttl}

      ctx.status = 201
    })
  ;
}
