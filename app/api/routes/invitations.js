/**
 * Created by ccc on 6/19/17.
 */

import Invitation from '../../db/models/invitation';
import { sendInvitation } from '../../utils';

export default (router) => {
  router
    .get('/invitations',  async ctx => ctx.body = await Invitation.find({}))
    .post('/invitations', async ctx => {
      ctx.body = await Invitation.create({
        email: ctx.request.body.email,
      });
      ctx.status = 201;
    })
    .get('/invitations/:id', async ctx => {
      const invitation = await Invitation.findById(ctx.params.id);
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

