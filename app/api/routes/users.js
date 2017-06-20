/**
 * Created by ccc on 6/16/17.
 */


import mongoose from 'mongoose';
import User from '../../db/models/user';
import Invitation from '../../db/models/invitation';
import { isBearerAuthenticated } from '../auth';

const isValidId = mongoose.Types.ObjectId.isValid;

function hasAuthorized(){
  return async (ctx, next) => {
    console.log(ctx.state.user);
    if ((ctx.state.user._id.equals(ctx.params.id)) || ctx.state.user.admin) {
      await next();
    } else {
      ctx.throw('Unauthorized user!', 401);
    }
  };
}
export default (router) => {
  router
    .get('/users', async ctx => ctx.body = await User.find({}))
    .post('/users/:token', async ctx => {
      const invitation = await Invitation.findOneAndRemove({token: ctx.params.token});
      if (invitation) {
        ctx.body = await User.create({
          name: ctx.request.body.name,
          email: invitation.email,
          password: ctx.request.body.password,
          confirm_password: ctx.request.body.confirm_password,
        });
        ctx.status = 201;
      }
    })
    .get('/users/:id', async ctx => {
      let user;
      if (isValidId(ctx.params.id)) {
        user = await User.findById(ctx.params.id);
      } else {
        user = await User.findOne({ email: ctx.params.id.toLowerCase() })
      }
      if (user) ctx.body = user;
    })
    .put('/users/:id',
      isBearerAuthenticated(),
      hasAuthorized(),
      async ctx => {
        const user = await User.findByIdAndUpdate(ctx.params.id, {
          name: ctx.request.body.name,
        }, {
          new: true,
          runValidators: true,
        });
        if (user) ctx.body = user;
      }
    )
    .delete('/users/:id',
      isBearerAuthenticated(),
      hasAuthorized(),
      async ctx => {
        const user = await User.findByIdAndRemove(ctx.params.id);
        if (user) ctx.status = 204;
      }
    );
  ;
}
