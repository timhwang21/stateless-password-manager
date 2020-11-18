import { BinaryLike, scrypt } from 'crypto'

/**
 * Promisified wrapper for scrypt with tuned parameters.
 */
export const deriveKey = async (password: BinaryLike, salt: BinaryLike): Promise<string> =>
  new Promise((res, rej) => {
    scrypt(
      password,
      salt,
      8, // key length
      (err, derivedKey) => {
        if (err) {
          rej(err)
        } else {
          res(derivedKey.toString('hex'))
        }
      },
    )
  })
