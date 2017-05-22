/**
 * Created by ccc on 5/16/17.
 */

import Redis from 'ioredis'

const host = process.env.DBHOST || '127.0.0.1';
const port = process.env.DBPORT || 6379;

const redis = new Redis({port, host})

export default redis
