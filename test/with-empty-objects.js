module.exports = {
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