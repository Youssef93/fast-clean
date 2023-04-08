'use strict';

const withoutNullValidation = require('./withoutnull-validation');
const withNullValidation = require('./withnull-validation');
const withEmptyArraysValidation = require('./with-empty-arrays');
const withEmptyObjectsValidation = require('./with-empty-objects');
const withEmptyStringsValidation = require('./with-empty-strings');
const withNanValidation = require('./with-nan-cleaner');

const cleaner = require('../index');

describe('Cleaning', () => {
  let input;

  beforeEach(() => {
    jest.resetModules();
    input = require('./input.js');
  });

  describe('Without Mutation', () => {
    it('should test the object without the null cleaner', () => {
      const cleanedObj = cleaner.clean(input);
      expect(cleanedObj).toStrictEqual(withoutNullValidation);
      expect(input).not.toStrictEqual(cleanedObj);
    });
  
    it('should test the object with the null cleaner', () => {
      const cleanedObj = cleaner.clean(input, { nullCleaner: true });
      expect(cleanedObj).toStrictEqual(withNullValidation);
      expect(input).not.toStrictEqual(cleanedObj);
    });
  
    it('should test the object with the null cleaner & emptyArrayCleaner', () => {
      const cleanedObj = cleaner.clean(input, { nullCleaner: true, emptyArraysCleaner: false });
      expect(cleanedObj).toStrictEqual(withEmptyArraysValidation);
      expect(input).not.toStrictEqual(cleanedObj);
    });
  
    it('should test the object with the null cleaner & emptyObjectsCleaner', () => {
      const cleanedObj = cleaner.clean(input, { nullCleaner: true, emptyObjectsCleaner: false });
      expect(cleanedObj).toStrictEqual(withEmptyObjectsValidation);
      expect(input).not.toStrictEqual(cleanedObj);
    });
  
    it('should test the object without the null cleaner & emptyObjectsCleaner, emptyArrayCleaner & emptyStringsCleaner', () => {
      const cleanedObj = cleaner.clean(input, { nullCleaner: false, emptyObjectsCleaner: false, emptyArraysCleaner: false, emptyStringsCleaner: false });
      expect(cleanedObj).toStrictEqual(withEmptyStringsValidation);
      expect(input).not.toStrictEqual(cleanedObj);
    });
  
    it('should test the object with the null cleaner & nanCleaner', () => {
      const cleanedObj = cleaner.clean(input, { nullCleaner: true, nanCleaner: false });
      expect(cleanedObj).toStrictEqual(withNanValidation);
      expect(input).not.toStrictEqual(cleanedObj);
    });
  });

  describe('With Mutation (clean in place)', () => {
    it('should test the object without the null cleaner', () => {
      const cleanedObj = cleaner.clean(input, { cleanInPlace: true });
      expect(cleanedObj).toStrictEqual(withoutNullValidation);
      expect(input).toStrictEqual(cleanedObj);
    });
  
    it('should test the object with the null cleaner', () => {
      const cleanedObj = cleaner.clean(input, { nullCleaner: true, cleanInPlace: true });
      expect(cleanedObj).toStrictEqual(withNullValidation);
      expect(input).toStrictEqual(cleanedObj);
    });
  
    it('should test the object with the null cleaner & emptyArrayCleaner', () => {
      const cleanedObj = cleaner.clean(input, { nullCleaner: true, emptyArraysCleaner: false, cleanInPlace: true });
      expect(cleanedObj).toStrictEqual(withEmptyArraysValidation);
      expect(input).toStrictEqual(cleanedObj);
    });
  
    it('should test the object with the null cleaner & emptyObjectsCleaner', () => {
      const cleanedObj = cleaner.clean(input, { nullCleaner: true, emptyObjectsCleaner: false, cleanInPlace: true });
      expect(cleanedObj).toStrictEqual(withEmptyObjectsValidation);
      expect(input).toStrictEqual(cleanedObj);
    });
  
    it('should test the object without the null cleaner & emptyObjectsCleaner, emptyArrayCleaner & emptyStringsCleaner', () => {
      const cleanedObj = cleaner.clean(input, { nullCleaner: false, emptyObjectsCleaner: false, emptyArraysCleaner: false, emptyStringsCleaner: false, cleanInPlace: true });
      expect(cleanedObj).toStrictEqual(withEmptyStringsValidation);
      expect(input).toStrictEqual(cleanedObj);
    });
  
    it('should test the object with the null cleaner & nanCleaner', () => {
      const cleanedObj = cleaner.clean(input, { nullCleaner: true, nanCleaner: false, cleanInPlace: true });
      expect(cleanedObj).toStrictEqual(withNanValidation);
      expect(input).toStrictEqual(cleanedObj);
    });
  });
});