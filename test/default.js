var assert = require('assert'),
    envious = require('../lib/envious');

console.log('envious / test: testing defaults');
console.log('run this file with: node default.js');

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

console.log('test -- apply() should not throw an error since the default, the development set, exists');
assert.doesNotThrow(function() { envious.apply() });

console.log('test -- variable site_url should match that of the default set');
assert.equal(env.site_url, 'http://127.0.0.1/');

console.log('test -- variable site_url should not match that of the production set');
assert.notEqual(env.site_url, 'http://zombo.com/');

// now we set default env to something else
envious.default_env = "notdevelopment";

console.log('test -- apply() should throw an error since the default set, notdevelopment, does not exist');
assert.throws(function() { envious.apply() });

console.log('== all tests passed successfully');
