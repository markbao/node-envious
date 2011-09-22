var envious = require('envious');

envious.development = 
{
  "mongodb_hostname": "dev.local",
  "site_url": "http://127.0.0.1/",
}

envious.production = 
{
  "mongodb_hostname": "masterdb.sterlingcooper.com",
  "site_url": "http://zombo.com/",
}

envious.default_env = "development";

var env = envious.apply();

// if you start your app with `NODE_ENV=proudction node app.js`
console.log(env.site_url); // => http://zombo.com/
