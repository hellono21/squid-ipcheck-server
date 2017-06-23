/**
 * Created by ccc on 6/16/17.
 */

import oauth2orize from 'oauth2orize-koa';
import bcrypt from 'bcrypt-as-promised'

import User from '../../db/models/user';
import AccessToken from '../../db/models/access-token';

const server = oauth2orize.createServer();

server.serializeClient(client => client._id);
server.deserializeClient(async id => await Client.findById(id));

server.exchange(
  oauth2orize.exchange.password('password',
    async (client, email, password) => {
      if (!client.trusted) return false;

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) return false;

      try {
        await bcrypt.compare(password, user.hashed_password);
      } catch (err) {
        console.log(err);
        return false;
      }

      await AccessToken.findOneAndRemove({ user: user._id });
      const accessToken = await AccessToken.create({
        user: user._id,
        client: client._id,
      });

      return accessToken;
    }
  )
);

export default server;
