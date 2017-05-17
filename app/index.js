/**
 * Created by ccc on 5/16/17.
 */

import app from './app'

const port = process.env.PORT || 4000;

(async() => {
  try {
    await app.listen(port)
    console.info(`server started at port: ${port}`)
  } catch (err){
    console.log(err)
  }
})();
