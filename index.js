'use strict';

const Cleaner = require('./src/Cleaner');

const baseAssertion = function(value) {
  return  Number.isNaN(value) || value === undefined || value === "";
}

const getAssertingFn = function(options) {
  let assertingFn = baseAssertion;

  if(!options) return assertingFn;

  if (options.nullCleaner) {
    assertingFn = function(value) {
      if (value === null) {
        return true;
      }
      return baseAssertion(value);
    };
  }

  return assertingFn;
}

module.exports = {
  clean: function(object, options) {
    const cleaner = new Cleaner(getAssertingFn(options));
    return cleaner.clean(object);
  }
}