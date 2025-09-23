'use strict';

class Cleaner {
  constructor(options) {
    this.options = options
  }

  clean(data) {
    if(!data) return data;
    
    if(Array.isArray(data)) return this._cleanArray(data);

    if(this._isObject(data)) return this.options.cleanInPlace? this._cleanObjectInPlace(data) : this._cleanObject(data);

    return data;
  }

  _cleanArray(arr) {
    return this.options.cleanInPlace ? this._getFilteredArrayInPlace(arr) : this._getFilteredArray(arr)
  }

  _cleanObjectInPlace(object) {
    Object.keys(object).forEach((key) => {
      const value = object[key];

      if (Array.isArray(value)) {
        const mappedArr = this._cleanArray(value);
        if(this._shouldReturnArray(mappedArr, key)) object[key] = mappedArr;
        else delete object[key];
      } else if (this._isObject(value)) {
        const subFiltered = this.clean(value);
        if(this._shouldReturnObject(subFiltered, key)) object[key] = subFiltered;
        else delete object[key];
      } else {
        if (this._shouldRemoveValue(value, key)) delete object[key]
      }
    })

    return object
  }

  _cleanObject(object) {
    const filtered = {};
  
    Object.keys(object).forEach(key => {
      const value = object[key];

      if (Array.isArray(value)) {
        const mappedArr = this._cleanArray(value);
        if (this._shouldReturnArray(mappedArr, key)) filtered[key] = mappedArr;
      } else if (this._isObject(value)) {
        const subFiltered = this.clean(value);
        if (this._shouldReturnObject(subFiltered, key)) filtered[key] = subFiltered;
      } else {
        if (!this._shouldRemoveValue(value, key)) filtered[key] = value;
      }
    });
  
    return filtered;
  }

  _getFilteredArrayInPlace (arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const item = arr[i];
      const filteredItem = this.clean(item);

      if(this._isObject(filteredItem)) {
        if(this._shouldReturnObject(filteredItem)) arr[i] = filteredItem
        else arr.splice(i , 1);
      }
      else if(Array.isArray(filteredItem)) {
        if (this._shouldReturnArray(filteredItem)) arr[i] = filteredItem
        else arr.splice(i, 1);
      }
      else if(this._shouldRemoveValue(filteredItem)) arr.splice(i, 1);
    }

    return arr;
  }

  _getFilteredArray (arr) {
    const filteredArr = [];
    arr.forEach(item => {
      const filteredItem = this.clean(item);
      if(this._isObject(filteredItem)) {
        if(this._shouldReturnObject(filteredItem)) filteredArr.push(filteredItem);
      }
      else if(Array.isArray(filteredItem)) {
        if (this._shouldReturnArray(filteredItem)) filteredArr.push(filteredItem);
      }
      else if(!this._shouldRemoveValue(filteredItem)) filteredArr.push(filteredItem);
    });
  
    return filteredArr;
  }

  _isUserOverride(key) {
    if(!key || (!this.options.cleanKeys.has(key) && !this.options.skipKeys.has(key))) return undefined;
    // higher priority to cleaning
    if(this.options.cleanKeys.has(key)) return false;
    if(this.options.skipKeys.has(key)) return true;
  }

  _isObject (value) {
    return Object.prototype.toString.call(value) === "[object Object]"
  }

  _shouldReturnArray (arr, key) {
    const userOverride = this._isUserOverride(key);
    if(userOverride !== undefined) return userOverride;
    return !this.options.emptyArraysCleaner || arr.length !== 0
  }

  _shouldReturnObject (object, key) {
    const userOverride = this._isUserOverride(key);
    if(userOverride !== undefined) return userOverride;
    return !this.options.emptyObjectsCleaner || Object.keys(object).length !== 0
  }

  _shouldRemoveValue (value, key) {
    const userOverride = this._isUserOverride(key);
    if(userOverride !== undefined) return !userOverride;

    if(value === null) return this.options.nullCleaner
  
    if(value === "") return this.options.emptyStringsCleaner
  
    if(Number.isNaN(value)) return this.options.nanCleaner

    if(value === undefined) return true
  
    return false
  }
}

module.exports = Cleaner;