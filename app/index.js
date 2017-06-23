/**
 * Created by ccc on 6/15/17.
 */

import configs from './configs';
import app from './app';
import { connectDatabase, registerLocalClient, registerAdminUser, } from './db';

const port = configs.server.port;
const { mongo } = configs;

(async () => {
  try {
    const uri = `mongodb://${mongo.host}:${mongo.port}/squid-ipcheck`
    const info = await connectDatabase(uri);
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
  }

  try {
    await registerLocalClient();
    await registerAdminUser();

    await app.listen(port);
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.error(error);
  }
})();
