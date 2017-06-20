/**
 * Created by ccc on 6/19/17.
 */

import configs from '../../configs';

const { oauth } = configs;

export const github = {
  clientId: oauth.github.clientId,
  clientSecret: oauth.github.clientSecret,
  route: '/auth/facebook',
  callbackRoute: '/auth/facebook/callback',
};
