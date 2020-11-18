import { createHash } from 'crypto'

/**
 * Creates the seed used to generate service passwords by hashing the per-user
 * entropy retrieved from the server using the hash key derived from the user's
 * password.
 */
export const getServicePasswordSeed = (hashKey: string, entropy: string): string =>
  createHash('sha256').update(hashKey.concat(entropy)).digest('hex')
