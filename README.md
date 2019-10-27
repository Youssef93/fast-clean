## Fast-Cleaner
Fast cleaner is an npm module designed to clean javascript objects from unwanted values like `undefined`, `NaN`, `{}`(empty objects) .. etc.

What makes this module **different**. Check out our [comparison](#what-makes-this-module-unique)

## Content
- [Fast-Cleaner](#fast-cleaner)
- [Content](#content)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Example](#example)
  - [Options](#options)
  - [Values cleaned by default are](#values-cleaned-by-default-are)
  - [What makes this module unique](#what-makes-this-module-unique)

### Installation
```
npm i --save fast-clean
```
### Usage
```
const  cleanedObj  =  cleaner.clean(objectToClean, options);
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

### Options
Options is an object that allows you to choose what filters you want to add to the module. Currently we have the `nullCleaner` only. We will proceed to add different filters step by step carefully because we want to keep what is [unique](#what-makes-this-module-unique) about our module.

 - `nullCleaner` : remove null values (defaults to `false`)
 In the previous [example](#example), if we set the `nullCleaner` to `true` in the options. This would be the output.
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

### Values cleaned by default are
- undefined
- '' (empty strings)
- NaN
- {} (empty objects)
- [] (empty arrays)

### What makes this module unique
- It's an extremely lightweight library
- Absolutely no dependencies
- Extremely fast compared to other modules with the same functionalities. 
     ![enter image description here](https://github.com/Youssef93/js-object-cleaning-performance-compare/blob/master/performance.jpg?raw=true)
     You can check how the comparison was made [here](https://github.com/Youssef93/js-object-cleaning-performance-compare)
