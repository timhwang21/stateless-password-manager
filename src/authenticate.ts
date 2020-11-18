const STUB_RAW_PAYLOAD = 'c0d732b6344c28082a5746b1016a6e54'

/**
 * This is a stub. All authentication, 2FA, etc., should go here.
 * Returns the user's raw payload.
 */
export const authenticate = (_username: string, _password: string): Promise<string> => Promise.resolve(STUB_RAW_PAYLOAD)
