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

  it('create price history', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const priceHistoryAccountKP = await createKeypairFromFile(
      process.env['PRICE_HISTORY_KEYFILE']
    )

    const createPriceHistory = await lucra.createPriceHistory({
      creatorAuthority: payerKP.publicKey,
      priceHistoryAccountKP,
    })

    const transaction = new Transaction().add(
      ...createPriceHistory.instructions
    )
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      payerKP,
      ...createPriceHistory.signers,
    ])
    const transactionSuccess = await watchTransaction(connection, signature)
    console.log('txid:', signature)
    expect(transactionSuccess).toBeTruthy
  })
})
