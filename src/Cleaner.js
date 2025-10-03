'use strict';

class Cleaner {
  constructor(options) {
    this.options = options;
    this._hop = Object.prototype.hasOwnProperty;
  }

  clean(data) {
    if(data == null) return data;
    if(typeof data !== 'object') return data;

    if(Array.isArray(data)) return this._cleanArray(data);

    if(!this._isPlainObject(data)) return data;

    return this.options.cleanInPlace
      ? this._cleanObjectInPlace(data)
      : this._cleanObject(data);
  }

  _cleanArray(arr) {
    return this.options.cleanInPlace
      ? this._getFilteredArrayInPlace(arr)
      : this._getFilteredArray(arr);
  }

  // Note: `for...in` iterates both own and inherited enumerable properties.
  // For plain objects (created via `{}` or `new Object`), there are no enumerable prototype props,
  // so this check will almost always be true.
  // However, we keep the `hasOwnProperty` guard defensively to skip keys that may come
  // from unexpected prototypes (e.g. `Object.create(null)` or custom prototype chains).
  _cleanObjectInPlace(object) {
    for (const key in object) {
      if(!this._hop.call(object, key)) continue;

      const value = object[key];

      if(Array.isArray(value)) {
        const mappedArr = this._cleanArray(value);
        if(this._shouldReturnArray(mappedArr, key)) object[key] = mappedArr;
        else delete object[key];

      } else if(this._isPlainObject(value)) {
        const subFiltered = this.clean(value);
        if(this._shouldReturnObject(subFiltered, key)) object[key] = subFiltered;
        else delete object[key];

      } else {
        if(this._shouldRemoveValue(value, key)) delete object[key];
      }
    }

    return object;
  }

  _cleanObject(object) {
    const filtered = {};

    for (const key in object) {
      if(!this._hop.call(object, key)) continue;

      const value = object[key];

      if(Array.isArray(value)) {
        const mappedArr = this._cleanArray(value);
        if(this._shouldReturnArray(mappedArr, key)) filtered[key] = mappedArr;

      } else if(this._isPlainObject(value)) {
        const subFiltered = this.clean(value);
        if(this._shouldReturnObject(subFiltered, key)) filtered[key] = subFiltered;

      } else {
        if(!this._shouldRemoveValue(value, key)) filtered[key] = value;
      }
    }

    return filtered;
  }

  _getFilteredArrayInPlace(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const filteredItem = this.clean(arr[i]);

      if(Array.isArray(filteredItem)) {
        if(this._shouldReturnArray(filteredItem)) arr[i] = filteredItem;
        else arr.splice(i, 1);

      } else if(this._isPlainObject(filteredItem)) {
        if(this._shouldReturnObject(filteredItem)) arr[i] = filteredItem;
        else arr.splice(i, 1);

      } else {
        if(this._shouldRemoveValue(filteredItem)) arr.splice(i, 1);
      }
    }
    return arr;
  }

  _getFilteredArray(arr) {
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      const filteredItem = this.clean(arr[i]);

      if(Array.isArray(filteredItem)) {
        if(this._shouldReturnArray(filteredItem)) out.push(filteredItem);

      } else if(this._isPlainObject(filteredItem)) {
        if(this._shouldReturnObject(filteredItem)) out.push(filteredItem);

      } else if(!this._shouldRemoveValue(filteredItem)) {
        out.push(filteredItem);
      }
    }
    return out;
  }

  _isUserOverride(key) {
    // Early exit when no key or not present in either Set
    if(!key) return undefined;
    const { cleanKeys, skipKeys } = this.options;
    const inClean = cleanKeys.has(key);
    const inSkip = skipKeys.has(key);
    if(!inClean && !inSkip) return undefined;
    // Higher priority to cleaning: if listed to clean => return false (i.e., do NOT skip)
    if(inClean) return false;
    if(inSkip) return true;
  }

  // Backward-compatible object test:
  // - Includes: {} and class instances (new MyClass())
  // - Excludes: null, arrays, Date/Map/Set/RegExp, etc.
  _isPlainObject(value) {
    // cheap guards first to avoid the toString call on obvious non-objects
    if(value == null || typeof value !== 'object' || Array.isArray(value)) return false;
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  _isObjectNotEmpty(obj) {
    // Cheap emptiness check without Object.keys allocation
    for (const k in obj) {
      if(this._hop.call(obj, k)) return true;
    }
    return false;
  }

  _shouldReturnArray(arr, key) {
    const userOverride = this._isUserOverride(key);
    if(userOverride !== undefined) return userOverride;
    // If not cleaning empty arrays, always keep; else require non-empty
    return !this.options.emptyArraysCleaner || arr.length !== 0;
  }

  _shouldReturnObject(object, key) {
    const userOverride = this._isUserOverride(key);
    if(userOverride !== undefined) return userOverride;
    // Avoid Object.keys(object).length allocation
    return !this.options.emptyObjectsCleaner || this._isObjectNotEmpty(object);
  }

  _shouldRemoveValue(value, key) {
    const userOverride = this._isUserOverride(key);
    if(userOverride !== undefined) return !userOverride;

    if(value === undefined) return true;
    if(value === null) return !!this.options.nullCleaner;
    if(value === '') return !!this.options.emptyStringsCleaner;
    if(Number.isNaN(value)) return !!this.options.nanCleaner;

    return false;
  }
}

module.exports = Cleaner;
