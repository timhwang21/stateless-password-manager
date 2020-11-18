import { randomBytes } from 'crypto'

const SECRET_KEY_SIZE_BYTES = 16

/**
 * Generates a random entropy that will be stored on the server. When hashed by
 * the user's hash key, will produce the payload used to generate service
 * passwords.
 *
 * This is a POC, but in a real implementation, this will be executed on the
 * server upon user registration and will be persisted.
 */
export const generateEntropy = (): string => randomBytes(SECRET_KEY_SIZE_BYTES).toString('hex')
