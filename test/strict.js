var assert = require('assert'),
    envious = require('../lib/envious');

console.log('envious / test: strict operation');
console.log('run this file with: NODE_ENV=asdf node strict.js');

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

console.log('== running tests')

console.log('test -- passing strict = true to apply should throw an error since we gave it a bogus environment');
assert.throws(function() { envious.apply({strict: true}); });

console.log('test -- not passing the strict option to apply should not throw an error even since we gave it a bogus environment, since it will fall back to the default');
assert.doesNotThrow(function() { envious.apply(); });

console.log('== all tests passed successfully');
