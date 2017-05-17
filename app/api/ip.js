/**
 * Created by ccc on 5/16/17.
 */
import Router from 'koa-router'
import validator from 'validator'
import db from '../db'

const router = new Router()

router.get('/ip', async (ctx) => {
  ctx.body = {
    request: ctx.request,
    ip: ctx.ip,
  }
})

router.post('/ip', async (ctx) => {
  const ip = ctx.request.body.ip
  if (!validator.isIP(ip)) {
    ctx.throw(400, '')
  }

  const prefix = 'squid'
  const key = `${prefix}:${ip}`
  const ttl = 3600
  await db.setex(key, ttl, 1)

  ctx.body = {ip, ttl}

  ctx.status = 201
})


export default router.routes()
