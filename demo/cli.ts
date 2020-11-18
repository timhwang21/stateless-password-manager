import readline from 'readline'

import { authenticate, getKeys, getServicePassword, getServicePasswordSeed } from '../src'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

class App {
  private username: string | undefined
  private passwordSeed: string | undefined
  private args: Set<string> = new Set(process.argv.slice(2))

  public run(): void {
    if (this.username == null) {
      this.getUsername()
    } else if (this.passwordSeed == null) {
      this.getPassword()
    } else {
      this.generatePassword()
    }
  }

  private getUsername(): void {
    rl.question('Enter your username: ', (resp) => {
      this.username = resp

      this.run()
    })
  }

  private getPassword(): void {
    rl.question('Enter password: ', async (resp) => {
      if (this.username == null) {
        throw new Error('Username not provided.')
      }

      const { authKey, hashKey } = await getKeys(this.username, resp)
      const entropy = await authenticate(this.username, authKey)
      this.passwordSeed = getServicePasswordSeed(hashKey, entropy)

      this.run()
    })
  }

  private generatePassword(): void {
    rl.question(`Enter service name${this.loop ? ' (Ctrl-C to exit)' : ''}: `, async (resp) => {
      if (this.passwordSeed == null) {
        throw new Error('Password seed not provided.')
      }

      const password = await getServicePassword(this.passwordSeed, resp)
      console.log(password)

      this.loop ? this.run() : rl.close()
    })
  }

  private get loop(): boolean {
    return this.args.has('--loop') || this.args.has('-l')
  }
}

new App().run()
