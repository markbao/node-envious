var assert = require('assert'),
    envious = require('../lib/envious');

console.log('envious / test: normal operation');
console.log('run this file with: NODE_ENV=production node normal.js');

envious.development = 
{
    "mongodb_hostname": "dev.local",
    "site_url": "http://127.0.0.1/",
    "session_secret": "ssssshhhhh",
    "smtp": {
        "server": "localhost",
        "email": "noreply@sterlingcooper.com"
    }
}

envious.production = 
{
    "mongodb_hostname": "masterdb.sterlingcooper.com",
    "site_url": "http://zombo.com/",
    "smtp": {
        "server": "smtp.sterlingcooper.com",
    }
}

envious.default_env = "development";

var env = envious.apply();

console.log('== running tests')

console.log('test -- variable site_url should match that of the production set');
assert.equal(env.site_url, 'http://zombo.com/');

console.log('test -- variable mongodb_hostname should match that of the production set');
assert.equal(env.mongodb_hostname, 'masterdb.sterlingcooper.com');

console.log('test -- variable site_url should not match that of the development set');
assert.notEqual(env.site_url, 'http://127.0.0.1/');

console.log('test -- variable session_secret should be that of the default set');
assert.equal(env.session_secret, 'ssssshhhhh');

console.log('test -- variable smtp.email should be that of the default set');
assert.equal(env.smtp.email, 'noreply@sterlingcooper.com');

console.log('test -- missing properties that are defined in default env should throw when strictProperties is true');
assert.throws(function() { envious.apply({strictProperties: true}); });

console.log('== all tests passed successfully');
