import { getKeys } from './getKeys'

const USERNAME = 'timhwang21'
const PASSWORD = 'hunter2'

test('Generates authentication key and signing key', async () => {
  const expectation = {
    authKey: '682b97fdfb36c4f5',
    hashKey: 'f70afa238c37aa4a',
  }
  const output = await getKeys(USERNAME, PASSWORD)

  expect(output).toEqual(expectation)
})
