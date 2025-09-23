'use strict';

const Cleaner = require('./src/Cleaner');

function createKeysSet(optionsToRead) {
  const keys = optionsToRead.hasOwnProperty('cleanKeys') ? optionsToRead.cleanKeys : [];
  const set = new Set(keys);
  return set;
}

function createSkipKeysSet(optionsToRead) {
  const keys = optionsToRead.hasOwnProperty('skipKeys') ? optionsToRead.skipKeys : [];
  const set = new Set(keys);
  return set;
}

const getDefaultOptions = (options) => {
  const optionsToRead = options || {}

  const defaultedOptions = {
    nullCleaner: optionsToRead.hasOwnProperty('nullCleaner') ? optionsToRead.nullCleaner : false,
    emptyArraysCleaner: optionsToRead.hasOwnProperty('emptyArraysCleaner') ? optionsToRead.emptyArraysCleaner : true,
    emptyObjectsCleaner: optionsToRead.hasOwnProperty('emptyObjectsCleaner') ? optionsToRead.emptyObjectsCleaner : true,
    emptyStringsCleaner: optionsToRead.hasOwnProperty('emptyStringsCleaner') ? optionsToRead.emptyStringsCleaner : true,
    nanCleaner: optionsToRead.hasOwnProperty('nanCleaner') ? optionsToRead.nanCleaner : true,
    cleanInPlace: optionsToRead.hasOwnProperty('cleanInPlace') ? optionsToRead.cleanInPlace : false,
    cleanKeys: createKeysSet(optionsToRead),
    skipKeys: createSkipKeysSet(optionsToRead),
  }

  return defaultedOptions
}

module.exports = {
  clean: function(object, options) {
    const defaultedOptions = getDefaultOptions(options)
    const cleaner = new Cleaner(defaultedOptions);
    return cleaner.clean(object);
  }
}