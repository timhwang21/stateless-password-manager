import { generateEntropy } from './generateEntropy'

test('should return a buffer with length 32', () => {
  const entropy = generateEntropy()

  // 16 bytes to chars
  expect(entropy).toHaveLength(16 * 2)
})
