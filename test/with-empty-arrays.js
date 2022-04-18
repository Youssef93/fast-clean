module.exports = {
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