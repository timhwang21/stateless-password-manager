import { getServicePasswordSeed } from './getServicePasswordSeed'

test('Hashes input', async () => {
  const expectation = 'fc6296fc60f157025af84bb8b1bd81b4245d795c1ce029b661fd0bae1eed4788'
  const output = getServicePasswordSeed('hashKey', 'entropy')

  expect(output).toEqual(expectation)
})
