// Copyright 2011 Mark Bao
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function envious () {

  // apply the environment
  // [param] strict: usually, giving an invalid environment name
  //                 would fall back to default. make true to
  //                 throw an error for an invalid env instead.
  this.apply = function(options) {
    if (!options) options = {}

    if (this.default_env && !this[this.default_env]) {
      // default not found
      throw new Error('envious: no configuration found for default environment `' + this.default_env + '`');
    }

    var envName = process.env.NODE_ENV;
    if (this[envName]) {
      // environment matched
      var env = deepDefaults({}, this[envName]);
      if (this.default_env) {
        if (options.strictProperties) {
          deepPropertyCompare(env, this[this.default_env], envName, this.default_env);
        } else {
          env = deepDefaults(env, this[this.default_env]);
        }
      }
      return env;
    } else {
      // no environment matched
      if (envName && options.strict) {
        // env defined, but not matched
        throw new Error('envious: couldn\'t find environment `'+ envName +'`');
      } else {
        // env is undefined/empty
        if (!this.default_env) {
          throw new Error('envious: no default environment found');
        } else if (this.default_env && this[this.default_env]) {
          // return default
          return deepDefaults({}, this[this.default_env]);
        }
      }
    }
  }
}

function deepDefaults(obj) {
  Array.prototype.slice.call(arguments, 1).forEach(function(source) {
    for (var prop in source) {
      if (typeof obj[prop] === 'undefined') {
        obj[prop] = source[prop];
      } else if (typeof obj[prop] === 'object'
          && typeof source[prop] === 'object') {
        obj[prop] = deepDefaults(obj[prop], source[prop]);
      }
    }
  });
  return obj;
}


function deepPropertyCompare(env1, env2, env1Name, env2Name, propContext) {
  if (!propContext)
    propContext = "";
  for (var prop in env2) {
    if (typeof env1[prop] === 'undefined') {
      throw new Error('envious: environment `'+ env1Name +'` missing property `'+ propContext + prop + '` defined in `' + env2Name + '`');
    } else if (typeof env1[prop] === 'object'
        && typeof env2[prop] === 'object') {
      deepPropertyCompare(env1[prop], env2[prop], env1Name, env2Name, propContext + prop + '.');
    }
  }
}

module.exports = new envious();
