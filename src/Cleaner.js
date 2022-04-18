'use strict';

class Cleaner {
  constructor(options) {
    this.options = options
  }

  clean(data) {
    if(!data) return data;
    
    if(Array.isArray(data)) return this._getFilteredArray(data);

    if(this._isObject(data)) return this._cleanObject(data);

    return data;
  }

  _cleanObject(object) {
    const keys = Object.keys(object);
    const filtered = {};
  
    keys.forEach(key => {
      const value = object[key];

      if (Array.isArray(value)) {
        const mappedArr = this._getFilteredArray(value);
        if (this._shouldReturnArray(mappedArr)) filtered[key] = mappedArr;
      } else if (this._isObject(value)) {
        const subFiltered = this.clean(value);
        if (this._shouldReturnObject(subFiltered)) filtered[key] = subFiltered;
      } else {
        if (!this._assert(value)) filtered[key] = value;
      }
    });
  
    return filtered;
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
      else if(!this._assert(filteredItem)) filteredArr.push(filteredItem);
    });
  
    return filteredArr;
  }

  _isObject (value) {
    return Object.prototype.toString.call(value) === "[object Object]"
  }

  _shouldReturnArray (arr) {
    return !this.options.emptyArraysCleaner || arr.length !== 0
  }

  _shouldReturnObject (object) {
    return !this.options.emptyObjectsCleaner || Object.keys(object).length !== 0
  }

  _assert (value) {
    if(value === null) return this.options.nullCleaner
  
    if(value === "") return this.options.emptyStringsCleaner
  
    if(Number.isNaN(value)) return this.options.nanCleaner

    if(value === undefined) return true
  
    return false
  }
}

module.exports = Cleaner;