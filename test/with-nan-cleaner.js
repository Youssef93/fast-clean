module.exports = {
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