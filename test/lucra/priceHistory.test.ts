import {
  Connection,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js'
import { createKeypairFromFile, watchTransaction } from '../lib'
import { Lucra } from '../../src/lucra'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Oracle Price History', () => {
  jest.setTimeout(120 * 1000)
  const lucra = new Lucra(connection)

  it('update price history', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])

    const updatePriceHistory = await lucra.updatePriceHistory({
      payer: payerKP.publicKey,
    })

    const transaction = new Transaction().add(
      ...updatePriceHistory.instructions
    )
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      payerKP,
    ])
    const transactionSuccess = await watchTransaction(connection, signature)
    console.log('txid:', signature)
    expect(transactionSuccess).toBeTruthy
  })
})
