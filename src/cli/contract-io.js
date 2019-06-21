import nearley from 'nearley'
import grammar from './grammar/grammar.js'
import readline from 'readline'
import Debug from 'debug'

const debug = Debug('mazzeltov:contract-io')

class ContractIO {
  constructor (contractClient) {
    debug('constructed contract IO with contractClient: %o', contractClient)
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'Mazz> '
    })
    this.contractClient = contractClient
  }

  run () {
    this.rl.prompt()

    this.rl.on('line', (line) => {
      try {
        const res = new nearley.Parser(nearley.Grammar.fromCompiled(grammar)).feed(line)
        if (res.results.length) {
          this.contractClient[res.results[0].name](...res.results[0].args).then(res => {
            console.log(res)
            this.rl.prompt()
          }).catch(e => {
            console.log(e)
            this.rl.prompt()
          })
        } else {
          console.log(`Incomplete statement: "${line}"`)
          this.rl.prompt()
        }
      } catch (e) {
        console.log(e)
        this.rl.prompt()
      }
    }).on('close', () => {
      console.log('peace bro')
      process.exit(0)
    })
  }
}

export default ContractIO
