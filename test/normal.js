var assert = require('assert'),
    envious = require('../lib/envious');

console.log('envious / test: normal operation');
console.log('run this file with: NODE_ENV=production node normal.js');

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

console.log('== running tests')

console.log('test -- variable site_url should match that of the production set');
assert.equal(env.site_url, 'http://zombo.com/');

console.log('test -- variable mongodb_hostname should match that of the production set');
assert.equal(env.mongodb_hostname, 'masterdb.sterlingcooper.com');

console.log('test -- variable site_url should not match that of the development set');
assert.notEqual(env.site_url, 'http://127.0.0.1/');

console.log('== all tests passed successfully');
