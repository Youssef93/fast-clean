'use strict';

const { describe } = require('mocha');
const { expect } = require('chai');

const input = require('./input');
const withoutNullValidation = require('./withoutnull-validation');
const withNullValidation = require('./withnull-validation');

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

});