/**
 * Created by ccc on 6/16/17.
 */

import server from '../auth/oauth2';
import { isClientAuthenticated, isBearerAuthenticated } from '../auth';

export default (router) => {
  router
    .post('/token',
      isClientAuthenticated(),
      server.token(),
      server.errorHandler(),
    )
    .get('/token',
      isBearerAuthenticated(),
      async (ctx) => {
        const accessToken = await AccessToken.findOne({
          user: ctx.state.user._id,
        });

        if (accessToken) {
          ctx.body = {
            access_token: accessToken,
            token_type: 'Bearer',
          };
        }
      }
    )
    .delete('/token',
      isBearerAuthenticated(),
      async (ctx) => {
        await AccessToken.findOneAndRemove({ user: ctx.state.user._id });
        ctx.status = 204;
      }
    )
  ;
}
