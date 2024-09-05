const test = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/for-testing').reverse

test('reverse of a', () => {
  const result = reverse('a')

  assert.equal(result, 'a')
})

test('reverse of finzyphinzy', () => {
  const result = reverse('finzyphinzy')

  assert.equal(result, 'yznihpyznif')
})

test('reverse of saippuakauppias', () => {
  const result = reverse('saippuakauppias')

  assert.strictEqual(result, 'saippuakauppias')
})
