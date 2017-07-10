/**
 * Created by ccc on 6/15/17.
 */

const configs = {
  environment: process.env.NODE_ENV || 'development',
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    hostName: process.env.HOSTNAME || 'http://localhost:8000',
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    prefix: 'squid',
  },
  mongo: {
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017,
    name: process.env.MONGO_DB_NAME || 'squid-ipcheck',
    development: 'mongodb://localhost/squid-ipcheck',
  },
  localClient: {
    name: 'local',
    id: 'local',
    secret: 'local-ipcheck',
  },

  adminUser: {
    name: 'admin',
    email: process.env.ADMIN_EMAIL || 'jk9903@126.com',
    password: process.env.ADMIN_PASS || 'adminadmin',
  },
  oauth: {
    github: {
      clientId: '926661ecc398a84ec49d',
      clientSecret: 'c19f164a69ca9c8858fa52695a6f4a9f613b5288',
    }
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
};

export default Object.freeze(configs);
