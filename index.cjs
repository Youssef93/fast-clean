"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/Cleaner.js
var require_Cleaner = __commonJS({
  "src/Cleaner.js"(exports2, module2) {
    "use strict";
    var Cleaner2 = class {
      constructor(options) {
        var _a, _b;
        this.options = options;
        this._hop = Object.prototype.hasOwnProperty;
        this._hasOverrides = !!(((_a = options.cleanKeys) == null ? void 0 : _a.size) || ((_b = options.skipKeys) == null ? void 0 : _b.size));
      }
      clean(data) {
        if (data == null) return data;
        if (typeof data !== "object") return data;
        if (Array.isArray(data)) return this._cleanArray(data);
        if (!this._isPlainObject(data)) return data;
        return this.options.cleanInPlace ? this._cleanObjectInPlace(data) : this._cleanObject(data);
      }
      _cleanArray(arr) {
        return this.options.cleanInPlace ? this._getFilteredArrayInPlace(arr) : this._getFilteredArray(arr);
      }
      // Note: `for...in` iterates both own and inherited enumerable properties.
      // For plain objects (created via `{}` or `new Object`), there are no enumerable prototype props,
      // so this check will almost always be true.
      // However, we keep the `hasOwnProperty` guard defensively to skip keys that may come
      // from unexpected prototypes (e.g. `Object.create(null)` or custom prototype chains).
      _cleanObjectInPlace(object) {
        for (const key in object) {
          if (!this._hop.call(object, key)) continue;
          const value = object[key];
          if (Array.isArray(value)) {
            const mappedArr = this._getFilteredArrayInPlace(value);
            if (this._shouldReturnArray(mappedArr, key)) object[key] = mappedArr;
            else delete object[key];
          } else if (this._isPlainObject(value)) {
            const subFiltered = this._cleanObjectInPlace(value);
            if (this._shouldReturnObject(subFiltered, key)) object[key] = subFiltered;
            else delete object[key];
          } else {
            if (this._shouldRemoveValue(value, key)) delete object[key];
          }
        }
        return object;
      }
      _cleanObject(object) {
        const filtered = {};
        for (const key in object) {
          if (!this._hop.call(object, key)) continue;
          const value = object[key];
          if (Array.isArray(value)) {
            const mappedArr = this._getFilteredArray(value);
            if (this._shouldReturnArray(mappedArr, key)) filtered[key] = mappedArr;
          } else if (this._isPlainObject(value)) {
            const subFiltered = this._cleanObject(value);
            if (this._shouldReturnObject(subFiltered, key)) filtered[key] = subFiltered;
          } else {
            if (!this._shouldRemoveValue(value, key)) filtered[key] = value;
          }
        }
        return filtered;
      }
      _getFilteredArrayInPlace(arr) {
        let write = 0;
        for (let read = 0; read < arr.length; read++) {
          const item = arr[read];
          if (Array.isArray(item)) {
            const v = this._getFilteredArrayInPlace(item);
            if (this._shouldReturnArray(v)) arr[write++] = v;
          } else if (this._isPlainObject(item)) {
            const value = this.options.cleanInPlace ? this._cleanObjectInPlace(item) : this._cleanObject(item);
            if (this._shouldReturnObject(value)) arr[write++] = value;
          } else if (!this._shouldRemoveValue(item)) {
            arr[write++] = item;
          }
        }
        if (write !== arr.length) arr.length = write;
        return arr;
      }
      _getFilteredArray(arr) {
        const out = new Array(arr.length);
        let write = 0;
        for (let i = 0; i < arr.length; i++) {
          const item = arr[i];
          if (Array.isArray(item)) {
            const v = this._getFilteredArray(item);
            if (this._shouldReturnArray(v)) out[write++] = v;
          } else if (this._isPlainObject(item)) {
            const v = this.options.cleanInPlace ? this._cleanObjectInPlace(item) : this._cleanObject(item);
            if (this._shouldReturnObject(v)) out[write++] = v;
          } else if (!this._shouldRemoveValue(item)) {
            out[write++] = item;
          }
        }
        out.length = write;
        return out;
      }
      _isUserOverride(key) {
        if (!this._hasOverrides || key == null) return void 0;
        if (this.options.cleanKeys.has(key)) return false;
        if (this.options.skipKeys.has(key)) return true;
        return void 0;
      }
      // Backward-compatible object test:
      // - Includes: {} and class instances (new MyClass())
      // - Excludes: null, arrays, Date/Map/Set/RegExp, etc.
      _isPlainObject(value) {
        if (value == null || typeof value !== "object" || Array.isArray(value)) return false;
        return Object.prototype.toString.call(value) === "[object Object]";
      }
      _isObjectNotEmpty(obj) {
        for (const k in obj) {
          if (this._hop.call(obj, k)) return true;
        }
        return false;
      }
      _shouldReturnArray(arr, key) {
        const userOverride = this._isUserOverride(key);
        if (userOverride !== void 0) return userOverride;
        return !this.options.emptyArraysCleaner || arr.length !== 0;
      }
      _shouldReturnObject(object, key) {
        const userOverride = this._isUserOverride(key);
        if (userOverride !== void 0) return userOverride;
        return !this.options.emptyObjectsCleaner || this._isObjectNotEmpty(object);
      }
      _shouldRemoveValue(value, key) {
        const userOverride = this._isUserOverride(key);
        if (userOverride !== void 0) return !userOverride;
        if (value === void 0) return true;
        if (value === null) return !!this.options.nullCleaner;
        if (value === "") return !!this.options.emptyStringsCleaner;
        if (Number.isNaN(value)) return !!this.options.nanCleaner;
        return false;
      }
    };
    module2.exports = Cleaner2;
  }
});

// index.js
var Cleaner = require_Cleaner();
function createKeysSet(optionsToRead) {
  const keys = optionsToRead.hasOwnProperty("cleanKeys") ? optionsToRead.cleanKeys : [];
  const set = new Set(keys);
  return set;
}
function createSkipKeysSet(optionsToRead) {
  const keys = optionsToRead.hasOwnProperty("skipKeys") ? optionsToRead.skipKeys : [];
  const set = new Set(keys);
  return set;
}
var getDefaultOptions = (options) => {
  const optionsToRead = options || {};
  const defaultedOptions = {
    nullCleaner: optionsToRead.hasOwnProperty("nullCleaner") ? optionsToRead.nullCleaner : false,
    emptyArraysCleaner: optionsToRead.hasOwnProperty("emptyArraysCleaner") ? optionsToRead.emptyArraysCleaner : true,
    emptyObjectsCleaner: optionsToRead.hasOwnProperty("emptyObjectsCleaner") ? optionsToRead.emptyObjectsCleaner : true,
    emptyStringsCleaner: optionsToRead.hasOwnProperty("emptyStringsCleaner") ? optionsToRead.emptyStringsCleaner : true,
    nanCleaner: optionsToRead.hasOwnProperty("nanCleaner") ? optionsToRead.nanCleaner : true,
    cleanInPlace: optionsToRead.hasOwnProperty("cleanInPlace") ? optionsToRead.cleanInPlace : false,
    cleanKeys: createKeysSet(optionsToRead),
    skipKeys: createSkipKeysSet(optionsToRead)
  };
  return defaultedOptions;
};
module.exports = {
  clean: function(object, options) {
    const defaultedOptions = getDefaultOptions(options);
    const cleaner = new Cleaner(defaultedOptions);
    return cleaner.clean(object);
  }
};
