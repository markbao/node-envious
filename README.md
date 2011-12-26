# envious: environment variables made easy, fun, and finally profitable

envious makes it absurdly easy for you to configure your environment, so you can have a central place to define credentials and whatnot.

## install

    npm install envious

## textbook example

put this in your pipe

```javascript
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

console.log(env.site_url);
```

and smoke it

    NODE_ENV=production node app.js

## options

### `strict`: strict environment checking

    var env = envious.apply({strict: true});

When strict is on, it will throw an error if the environment does not exist. normally, it would simply fall back to the default.

### `strictProperties`: if the current environment is missing properties that the default environment has, throw an error.

    var env = envious.apply({strictProperties: true});

By default, properties not defined in the current environment will be copied from the default environment.

## tests

you have to run the tests a certain way.

- *normal.js*: tests normal function. `NODE_ENV=production node normal.js`
- *default.js*: tests the default environment feature. `node default.js`
- *strict.js*: tests strict mode. `NODE_ENV=bogus node strict.js`
