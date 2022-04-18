'use strict';

const { describe } = require('mocha');
const { expect } = require('chai');

const input = require('./input');
const withoutNullValidation = require('./withoutnull-validation');
const withNullValidation = require('./withnull-validation');
const withEmptyArraysValidation = require('./with-empty-arrays');
const withEmptyObjectsValidation = require('./with-empty-objects');
const withEmptyStringsValidation = require('./with-empty-strings');
const withNanValidation = require('./with-nan-cleaner');

const cleaner = require('../index');

describe('Cleaning', () => {
  it('should test the object without the null cleaner', () => {
    const cleanedObj = cleaner.clean(input);
    expect(cleanedObj).to.deep.equal(withoutNullValidation);
  });

  it('should test the object with the null cleaner', () => {
    const cleanedObj = cleaner.clean(input, { nullCleaner: true });
    expect(cleanedObj).to.deep.equal(withNullValidation);
  });

  it('should test the object with the null cleaner & emptyArrayCleaner', () => {
    const cleanedObj = cleaner.clean(input, { nullCleaner: true, emptyArraysCleaner: false });
    expect(cleanedObj).to.deep.equal(withEmptyArraysValidation);
  });

  it('should test the object with the null cleaner & emptyObjectsCleaner', () => {
    const cleanedObj = cleaner.clean(input, { nullCleaner: true, emptyObjectsCleaner: false });
    expect(cleanedObj).to.deep.equal(withEmptyObjectsValidation);
  });

  it('should test the object without the null cleaner & emptyObjectsCleaner, emptyArrayCleaner & emptyStringsCleaner', () => {
    const cleanedObj = cleaner.clean(input, { nullCleaner: false, emptyObjectsCleaner: false, emptyArraysCleaner: false, emptyStringsCleaner: false });
    expect(cleanedObj).to.deep.equal(withEmptyStringsValidation);
  });

  it('should test the object with the null cleaner & nanCleaner', () => {
    const cleanedObj = cleaner.clean(input, { nullCleaner: true, nanCleaner: false });
    expect(cleanedObj).to.deep.equal(withNanValidation);
  });
});