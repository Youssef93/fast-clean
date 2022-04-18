module.exports = {
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