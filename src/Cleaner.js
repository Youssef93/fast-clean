'use strict';

class Cleaner {
  constructor(assertingFn) {
    this.assertingFn = assertingFn;
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
        if (mappedArr.length !== 0) filtered[key] = mappedArr;
      } else if (this._isObject(value)) {
        const subFiltered = this.clean(value);
        if (Object.keys(subFiltered).length !== 0) filtered[key] = subFiltered;
      } else {
        if (!this.assertingFn(value)) filtered[key] = value;
      }
    });
  
    return filtered;
  }

  _getFilteredArray (arr) {
    const filteredArr = [];
    arr.forEach(item => {
      const filteredItem = this.clean(item);
      if(this._isObject(filteredItem)) {
        if(Object.keys(filteredItem).length !== 0) filteredArr.push(filteredItem);
      }
      else if(Array.isArray(filteredItem)) {
        if (filteredItem.length !== 0) filteredArr.push(filteredItem);
      }
      else if(!this.assertingFn(filteredItem)) filteredArr.push(filteredItem);
    });
  
    return filteredArr;
  }

  _isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]"
  }
}

module.exports = Cleaner;