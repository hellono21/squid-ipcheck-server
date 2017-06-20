/**
 * Created by ccc on 6/16/17.
 */

import mongoose from 'mongoose';
import Redis from 'ioredis'
import configs from '../configs';
import Client from './models/client';
import User from './models/user';

const { redis, localClient, adminUser} = configs;

const redisdb = new Redis({port: redis.port, host: redis.host });

export function connectRedis() {
  return redisdb;
}

export function connectDatabase(uri) {
  mongoose.Promise = global.Promise;
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(uri);
  });
}

export async function registerLocalClient() {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const client = await Client.findOne({ id: localClient.id });
        if (!client) {
          await Client.create({
            name: localClient.name,
            id: localClient.id,
            secret: localClient.secret,
            trusted: true,
          });
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    })();
  });
}

export async function registerAdminUser() {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const user = await User.findOne({ email: adminUser.email });
        if (!user) {
          await User.create({
            name: adminUser.name,
            email: adminUser.email,
            password: adminUser.password,
            confirm_password: adminUser.password,
            admin: true,
          });
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    })();
  });
}



