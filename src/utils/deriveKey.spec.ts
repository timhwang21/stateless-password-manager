import { deriveKey } from './deriveKey'

test('Deterministically generates keys', async () => {
  const expectation = '745731af4484f323'
  const output = await deriveKey('password', 'salt')

  expect(output).toEqual(expectation)
})
