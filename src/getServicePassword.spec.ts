import { getServicePassword } from './getServicePassword'

const PASSWORD = 'hunter2'

test('Deterministically generates keys', async () => {
  const input = ['https://google.com', 'https://facebook.com', 'https://github.com']
  const expectation = ['cb0547e95f037d0d', 'a7fe917a9ecc30a6', 'c57f113f3af13140']
  const output = await Promise.all(input.map((site) => getServicePassword(PASSWORD, site)))

  expect(output).toEqual(expectation)
})
