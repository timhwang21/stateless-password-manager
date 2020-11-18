import { deriveKey } from './deriveKey'

/**
 * Takes the hashed password derivation seed and a service name and returns a
 * deterministically generated password.
 */
export const getServicePassword = async (passwordSeed: string, serviceName: string): Promise<string> =>
  await deriveKey(passwordSeed, serviceName)
