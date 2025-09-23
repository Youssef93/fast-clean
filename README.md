# Fast-Cleaner

**Fast-Cleaner** is a lightweight, dependency-free npm module that helps you clean JavaScript objects by removing unwanted values such as `undefined`, `NaN`, empty objects `{}`, empty arrays `[]`, and more.

It’s designed to be **fast, memory-efficient, and flexible** with full support for cleaning deeply nested objects and arrays.

👉 Check out [what makes this module unique](#what-makes-this-module-unique).

## New in v1.5+
Version 1.5+ supports 2 new options. `cleanKeys` & `skipKeys`
Checkout the [options](#options) for more info.

##  New in v1.3+
Starting from version **1.3+**, Fast-Cleaner supports **in-place cleaning**.  
This allows you to clean objects without creating new copies, reducing memory usage for large objects.

- Enable it by setting `cleanInPlace: true`.
- By default, this is turned **off** for backward compatibility.

## 📚 Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [TypeScript Usage](#typescript-usage)
- [Example](#example)
- [Options](#options)
- [Additional Examples](#additional-examples)
- [Default Cleaned Values](#default-cleaned-values)
- [What Makes This Module Unique](#what-makes-this-module-unique)

<h2 id="installation">💾 Installation</h2>

```bash
npm install --save fast-clean
```
<h2 id="usage">🛠 Usage</h2>

```js
const cleanedObj = cleaner.clean(objectToClean, options);
```

<h3 id="typescript-usage">TypeScript Usage</h3>

```ts
const cleanedObject = cleaner.clean<YourType>(objectToClean, options);
```

If you don’t provide a type, it defaults to `any`.

<h2 id="example">📝 Example</h2>

```js
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
        { x: true, y: NaN },
        { y: NaN },
        { z: [null, true], subChild: [{ a: true }, {}] }
      ]}
    ],
    secondArr: [{ a: { b: undefined } }],
    nestedArr1: [[null, true, false], [undefined, undefined]],
    nestedArr2: [[null], [undefined, undefined]],
  }
};

const cleanedObj = cleaner.clean(obj, { nullCleaner: true });
```

**Output**

```js
{
  a: 'value',
  falseValue: false,
  zero: 0,
  b: {
    a: 'another value',
    arr: [
      { d: 'value' },
      { a: [
        { x: true },
        { z: [true], subChild: [{ a: true }] }
      ]}
    ],
    nestedArr1: [[true, false]],
  }
}
```

<h2 id="options">⚙️ Options</h2>

Pass an `options` object to configure the cleaning behavior.


| Option                | Type       | Default | Description |
|------------------------|------------|---------|-------------|
| `nullCleaner`          | `boolean`  | `false` | Remove `null` values. |
| `emptyArraysCleaner`   | `boolean`  | `true`  | Remove empty arrays `[]`. |
| `emptyObjectsCleaner`  | `boolean`  | `true`  | Remove empty objects `{}`. |
| `emptyStringsCleaner`  | `boolean`  | `true`  | Remove empty strings `''`. |
| `nanCleaner`           | `boolean`  | `true`  | Remove `NaN`. |
| `cleanInPlace`         | `boolean`  | `false` | Mutate the original object instead of creating a new one. |
| `cleanKeys`            | `string[]` | `[]`    | Always clean these keys, even if their values are normally valid. |
| `skipKeys`             | `string[]` | `[]`    | Never clean these keys, even if their values are normally removed. |

> ⚖️ **Precedence rule**: If a key exists in both `cleanKeys` and `skipKeys`, **`cleanKeys` takes priority** (the key will be cleaned).

<h2 id="additional-examples">🔍 Additional Examples</h2>

### With `nullCleaner = false`

```js
{
  a: 'value',
  isNull: null, // <<< Remained
  falseValue: false,
  zero: 0,
  b: {
    a: 'another value',
    arr: [
      { c: null }, // <<< Remained
      { d: 'value' },
      { a: [
        { x: true },
        {
          z: [null, true], // <<< Kept first null
          subChild: [{ a: true }]
        }
      ]}
    ],

    nestedArr1: [[null, true, false]], // <<< Kept first null
    nestedArr2: [[null]], // <<< Remained
  }
}
```

### With `nullCleaner = true` & `emptyArraysCleaner = false`

```js
{
  a: 'value',
  emptyArray: [], // <<< Remained
  falseValue: false,
  zero: 0,
  b: {
    a: 'another value',
    arr: [
      { d: 'value' },
      {
        a: [
          { x: true },
          {
            z: [true],
            subChild: [{ a: true }]
          }
        ]
      }
    ],
    secondArr: [], // <<< Remained
    nestedArr1: [[true, false], []], // <<< Kept last element
    nestedArr2: [[], []] // <<< Remained
  }
}
```
### With `nullCleaner = true` & `emptyObjectsCleaner = false`

```js
{
  a: 'value',
  emptyObject: {}, // <<< Remained
  falseValue: false,
  zero: 0,
  b: {
    a: 'another value',
    arr: [
      {},
      { d: 'value' },
      {
        a: [
          {x: true},
          {}, // <<< Remained
          {
            z: [true],
            subChild: [
              {a: true},
              {} // <<< Remained
            ]
          }
        ]
      }
    ],
    secondArr: [{
      a: {} // <<< Remained
    }],
    nestedArr1: [[true, false]]
  }
}
```

### With both `cleanKeys = ['a']` and `skipKeys = ['isUndefined']`

```js
{
  isNull: null,
  falseValue: false,
  zero: 0,
  isUndefined: undefined, //<<< Remained
  b: {
    arr: [
      { c: null },
      { d: 'value' },
    ],
    nestedArr1: [[null, true, false]],
    nestedArr2: [[null]],
  }
  // All 'a' attributes are removed
}
```
<h2 id="default-cleaned-values">🧹 Default Cleaned Values</h2>

By default, Fast-Cleaner removes:

-   `undefined`
-   `''` (empty strings)
-   `NaN`
-   `{}` (empty objects)
-   `[]` (empty arrays)

<h2 id="what-makes-this-module-unique">🌟 What Makes This Module Unique</h2>

-   ⚡ **Extremely lightweight** and **fast**.
-   🛠 **No dependencies**.
-   🔄 Supports **in-place cleaning** for better memory efficiency.
-   🧩 Handles deeply nested structures with ease.
    

![Performance Benchmark](https://github.com/Youssef93/js-object-cleaning-performance-compare/blob/master/performance.jpg?raw=true)

👉 See how benchmarks were run [here](https://github.com/Youssef93/js-object-cleaning-performance-compare).
