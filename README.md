
## Fast-Cleaner

Fast cleaner is an npm module designed to clean javascript objects from unwanted values like `undefined`, `NaN`, `{}`(empty objects) .. etc.

(now supports typescript)

What makes this module **different**. Check out our [comparison](#what-makes-this-module-unique)

## Update with version 1.3+

Version 1.3+ now supports cleaning objects in place. This means that the library can avoid creating new objects while cleaning. Instead it can mutate the object passed to it & clean it in place.

This will make the module not only efficient in speed, but in memory consumption as well.

While object mutation might not be a best practice in a lot of cases, in some it will be a better one if you are cleaning large objects & want to avoid huge memory consumption.

This is an **OPTIONAL** feature. You can simply use it by passing `cleanInPlace` = `true` in the options.

The feature is turned off by default for backwards compatibility.

All other options are supported whether you are cleaning in place or not.

## Content

- [Fast-Cleaner](#fast-cleaner)

- [Content](#content)

- [Installation](#installation)

- [Usage](#usage)

- [Example](#example)

- [Options](#options)

- [Additional Examples](#additional-examples)

- [Values cleaned by default are](#values-cleaned-by-default-are)

- [What makes this module unique](#what-makes-this-module-unique)

  

### Installation

```

npm i --save fast-clean

```

### Usage

```

const cleanedObj = cleaner.clean(objectToClean, options);

```

#### Example

```
const obj = {
  a: 'value',
  emptyString: '',
  emptyArray: [],
  emptyObject: {},
  isNull: null,
  falseValue: false,
  zero: 0,
  isUndefined: undefined,
  b: {
    a: 'another value',
    anotherEmptyString: '',
    arr: [
      { c: null },
      { d: 'value' },
      { a: [
        {
          x: true,
          y: NaN
        },
        {
          y: NaN
        },
        {
          z: [null, true],
          subChild: [
            {
              a: true
            },
            {
              
            }
          ]
        }
      ]}
    ],

    secondArr: [{
      a: {
        b: undefined
      }
    }],

    nestedArr1: [[null, true, false], [undefined, undefined]],
    nestedArr2: [[null], [undefined, undefined]],
  }
}

const cleanedObj = cleaner.clean(obj);
```

  

Output is

```
{
  a: 'value',
  falseValue: false,
  zero: 0,
  b: {
    a: 'another value',
    arr: [
      { d: 'value' },
      { a: [
        {
          x: true,
        },
        {
          z: [true],
          subChild: [
            {
              a: true
            }
          ]
        }
      ]}
    ],

    nestedArr1: [[true, false]],
  }
}

```

  

### Options

Options is an object that allows you to choose what filters you want to add to the module. Currently we have the `nullCleaner` only. We will proceed to add different filters step by step carefully because we want to keep what is [unique](#what-makes-this-module-unique) about our module.

- `nullCleaner` : remove null values (defaults to `false`)
- `emptyArraysCleaner` : removes empty arrays (defaults to `true`)
- `emptyObjectsCleaner` : removes empty objects (defaults to `true`)
- `emptyStringsCleaner` : removes empty strings (defaults to `true`)
- `nanCleaner` : removes NaN (defaults to `true`)
- `cleanInPlace` : whether the library should create a new object that is cleaned or mutate the object passed to it & clean in place. (defaults to `false`)

### Additional Examples
Based on the mentioned sample object above, here's the output with different options

With **nullCleaner** = `true`

```
{
  a: 'value',
  isNull: null,
  falseValue: false,
  zero: 0,
  b: {
    a: 'another value',
    arr: [
      { c: null },
      { d: 'value' },
      { a: [
        {
          x: true,
        },
        {
          z: [null, true],
          subChild: [
            {
              a: true
            }
          ]
        }
      ]}
    ],

    nestedArr1: [[null, true, false]],
    nestedArr2: [[null]],
  }
}

```

With **nullCleaner** = `true` & **emptyArrayCleaner** = `false`
```
{
  a: 'value',
  emptyArray: [],
  falseValue: false,
  zero: 0,
  b: {
    a: 'another value',
    arr: [
      { d: 'value' },
      {
        a: [
          {
            x: true
          },
          {
            z: [true],
            subChild: [
              {
                a: true
              }
            ]
          }
        ]
      }
    ],

    secondArr: [],
    nestedArr1: [[true, false], []],
    nestedArr2: [[], []]
  }
}

```

With **nullCleaner** = `true` & **emptyObjectsCleaner** = `false`
```
{
  a: 'value',
  emptyObject: {},
  falseValue: false,
  zero: 0,
  b: {
    a: 'another value',
    arr: [
      {},
      { d: 'value' },
      {
        a: [
          {
            x: true,
          },
          {
          },
          {
            z: [true],
            subChild: [
              {
                a: true
              },
              {
              }
            ]
          }
        ]
      }
    ],

    secondArr: [{
      a: {
      }
    }],

    nestedArr1: [[true, false]]
  }
}

```

With **nullCleaner** = `true` & **nanCleaner** = `false`
```
{
  a: 'value',
  falseValue: false,
  zero: 0,
  b: {
    a: 'another value',
    arr: [
      { d: 'value' },
      { a: [
        {
          x: true,
          y: NaN
        },
        {
          y: NaN
        },
        {
          z: [true],
          subChild: [
            {
              a: true
            }
          ]
        }
      ]}
    ],

    nestedArr1: [[true, false]]
  }
}

```

With **nullCleaner**, **emptyObjectsCleaner**, **emptyArrayCleaner** & **emptyStringsCleaner** all equal `false`
```
{
  a: 'value',
  emptyString: '',
  emptyArray: [],
  emptyObject: {},
  isNull: null,
  falseValue: false,
  zero: 0,
  b: {
    a: 'another value',
    anotherEmptyString: '',
    arr: [
      { c: null },
      { d: 'value' },
      {
        a: [
          {
            x: true
          },
          {
          },
          {
            z: [null, true],
            subChild: [
              {
                a: true
              },
              {

              }
            ]
          }
        ]
      }
    ],

    secondArr: [{
      a: {
      }
    }],

    nestedArr1: [[null, true, false], []],
    nestedArr2: [[null], []],
  }
}

```

### Values cleaned by default are

- undefined

- '' (empty strings)

- NaN

- {} (empty objects)

- [] (empty arrays)

  

### What makes this module unique

- It's an extremely lightweight library.

- Absolutely no dependencies.

- Extremely fast compared to other modules with the same functionalities.

- The ability to clean objects in place without creating new objects in memory.

![enter image description here](https://github.com/Youssef93/js-object-cleaning-performance-compare/blob/master/performance.jpg?raw=true)

You can check how the comparison was made [here](https://github.com/Youssef93/js-object-cleaning-performance-compare)