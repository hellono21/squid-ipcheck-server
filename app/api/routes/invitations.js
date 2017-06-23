/**
 * Created by ccc on 6/19/17.
 */

import mongoose from 'mongoose';
import Invitation from '../../db/models/invitation';
import { sendInvitation } from '../../utils';

const isValidId = mongoose.Types.ObjectId.isValid;

export default (router) => {
  router
    .get('/invitations',  async ctx => ctx.body = await Invitation.find({}))
    .post('/invitations', async ctx => {
      await Invitation.findOneAndRemove({ email: ctx.request.body.email, });
      const invitation = await Invitation.create({
        email: ctx.request.body.email,
      });

      await sendInvitation(invitation.email, invitation.token);

      ctx.body = invitation;
      ctx.status = 201;
    })
    .get('/invitations/:id', async ctx => {
      let invitation;
      if (isValidId(ctx.params.id)) {
        invitation = await Invitation.findById(ctx.params.id);
      } else {
        invitation = await Invitation.findOne({ token: ctx.params.id })
      }
      if (invitation) ctx.body = invitation;
    })
    .put('/invitations/:id/send', async ctx => {
      const invitation = await Invitation.findById(ctx.params.id);
      if (invitation) {
        await sendInvitation(invitation.email, invitation.token);
        ctx.status = 202;
      }
    })
    .delete('/invitations/:id', async ctx => {
      const invitation = await Invitation.findByIdAndRemove(ctx.params.id);
      if (invitation) ctx.status = 204;
    })
  ;
}

