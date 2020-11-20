import { deriveKey } from './utils/deriveKey'

interface Keys {
  authKey: string
  hashKey: string
}

/**
 * Derives two keys from the user's password via KDF. This increases security by
 * limiting the extent of damage if a key is leaked.
 *
 * Specifically, we use this to derive keys from a user's hashed password and
 * never use the hashed password directly. Thus, if one derived key is
 * compromised, other keys are not affected.
 *
 * The username is used as a salt.
 */
export const getKeys = async (username: string, password: string): Promise<Keys> => {
  const [authKey, hashKey] = await Promise.all([
    deriveKey(password, username.concat('authKey')),
    deriveKey(password, username.concat('hashKey')),
  ])

  return { authKey, hashKey }
}
