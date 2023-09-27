import {
  Connection,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js'
import { createKeypairFromFile, watchTransaction } from '../lib'
import { Lucra } from '../../src/lucra'
import { LUCRA_CONFIG } from '../../src'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Oracle Price', () => {
  jest.setTimeout(120 * 1000)
  const lucra = new Lucra(connection)

  it('update SOL_USDC price', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])

    const createOracleInst = await lucra.updatePrice({
      payer: payerKP.publicKey,
      oracle: LUCRA_CONFIG.oracle.SOL_USDC,
    })

    const transaction = new Transaction().add(...createOracleInst.instructions)
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      payerKP,
    ])
    const transactionSuccess = await watchTransaction(connection, signature)
    console.log('txid:', signature)
    expect(transactionSuccess).toBeTruthy
  })
})
