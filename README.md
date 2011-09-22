# envious: environment variables made easy, fun, and finally profitable

envious makes it absurdly easy for you to configure your environment, so you can have a central place to define credentials and whatnot.

## textbook example

put this in your pipe

```javascript
var envious = require('envious');

envious.development = 
{
    "mysql_hostname": "dev.local",
    "site_url": "http://127.0.0.1/",
}

envious.production = 
{
    "mysql_hostname": "masterdb.sterlingcooper.com",
    "site_url": "http://zombo.com/",
}

envious.default_env = "development";

var env = envious.apply();

console.log(env.site_url);
```

and smoke it

    NODE_ENV=production node app.js
