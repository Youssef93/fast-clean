module.exports = {
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