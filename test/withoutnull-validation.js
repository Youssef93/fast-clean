module.exports = {
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