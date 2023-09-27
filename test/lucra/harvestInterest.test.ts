import {
  Connection,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js'
import {
  createKeypairFromFile,
  getPubkeyForEnv,
  watchTransaction,
} from '../lib'
import { Lucra } from '../../src/lucra'
import { PROGRAM_IDS } from '../../src'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Harvest Interest', () => {
  jest.setTimeout(120 * 1000)
  const lucra = new Lucra(connection)

  it('harvest interest from a loan', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const loanAccount = await getPubkeyForEnv(process.env['LOAN_ACCOUNT'])

    const harvestInterestInst = await lucra.harvestInterest({
      payer: payerKP.publicKey,
      loanAccount,
      tokenSwapProgramID: PROGRAM_IDS['devnet'].orca,
    })

    const transaction = new Transaction().add(
      ...harvestInterestInst.instructions
    )
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      payerKP,
      ...harvestInterestInst.signers,
    ])
    const transactionSuccess = await watchTransaction(connection, signature)
    console.log('txid:', signature)
    expect(transactionSuccess).toBeTruthy
  })
})
