/**
 * Created by ccc on 6/16/17.
 */

import passport from 'koa-passport';
import compose from 'koa-compose';
import importDir from 'import-dir';
import User from '../../db/models/user';

const strategies = importDir('./strategies');

Object.keys(strategies).forEach(name => {
  passport.use(name, strategies[name]);
});

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => {
  (async () => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  })();
});

export default function auth() {
  return compose([
    passport.initialize(),
    passport.session(),
  ]);
}

export function isClientAuthenticated() {
  return passport.authenticate('client-basic', { session: false });
}

export function isBearerAuthenticated() {
  return passport.authenticate('bearer', { session: false });
}

export function BearerAuthenticate() {
  return passport.authenticate('bearer', { session: false }, (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  });
}

export function isAdmin() {
  return async (ctx, next) => {
    if (!ctx.state.user.admin) {
      ctx.throw('Forbidden', 403);
    }
    await next();
  };
}




