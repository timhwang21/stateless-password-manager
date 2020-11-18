# (Mostly) Stateless Password Manager

POC implementation of an stateless KDF-based password manager.

Traditional password managers allow users to generate unique passwords for services. Access to the password manager is controlled by a single master password.

This password manager skips the manual password generation step using key derivation to deterministically generate a service password from the master password and a unique service identifier (e.g. the name or URL). **This allows for a deterministic, stateless password manager:** with just the master password and the service name, the service password can be retrieved. The only information stored server-side is a series of random bytes.

Note that the server aspect is needed. A serverless approach has critical downsides, a full list of which is presented [here](https://tonyarcieri.com/4-fatal-flaws-in-deterministic-password-managers).

## Open questions

- Some sort of persisted list of service names is needed for usability. How can this be done in the most portable and secure way possible? An easy answer is an encrypted JSON file, where the values are a salt. The salt can simply be the password rotation count.
- The master password must have sufficient entropy for this scheme to be secure. This should be enforced.
- How to allow password rotation? One way to implement it would be to use a rotation index that is stored server side. The easiest way would be to make a map of service name to rotation index, which would allow for per-service rotation, but ideally the server is agnostic of what services are used. This also hurts portability.

## Implementation

1. User provides a password of sufficient entropy.
2. A authentication key and hash key is generated from the password via key derivation (Scrypt, PBKDF2, HKDF).
3. The authentication key (and username) are used to register on the server. The server generates a random byte buffer.
4. On authentication, the byte buffer is sent to the client.
5. The byte buffer is hashed, and the resulting payload is combined with a plaintext service name string to generate passwords deterministically.

## Security

The only information sent over the wire is the authentication key (client -> server) and the random byte buffer (server -> client).

- The user password leaking compromises everything, but this can be ameliorated by adding multifactor authentication to step 4 above. Similarly, the service password seed leaking compromises everything, but this is always generated on-demand on the client and is never sent to the server or shown to the user.
- The authentication key or random byte entropy leaking does not compromise passwords, because passwords require both the hash key and the entropy. The authentication key leaking also does not compromise the user password due to usage of KDF.
- Similarly, the hash key leaking does not allow attackers to gain access to the random byte entropy.
