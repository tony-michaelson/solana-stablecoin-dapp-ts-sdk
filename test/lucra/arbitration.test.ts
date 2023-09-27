import {
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js'
import { createKeypairFromFile, watchTransaction } from '../lib'
import { Lucra } from '../../src/lucra'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Arbitration', () => {
  jest.setTimeout(120 * 1000)
  const lucra = new Lucra(connection)
  const pendingFundsKP = Keypair.generate()
  let currentSlot = 0
  let claimFundsAtSlot = 0

  it('burn MATA for LUCRA', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])

    const arbStables = await lucra.arbStables({
      payer: payerKP.publicKey,
      lamports: BigInt(100),
      pendingFundsKP,
    })

    const transaction = new Transaction().add(...arbStables.instructions)
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      payerKP,
      ...arbStables.signers,
    ])
    const transactionSuccess = await watchTransaction(connection, signature)
    console.log('txid:', signature)
    currentSlot = await connection.getSlot()
    claimFundsAtSlot = currentSlot + 1
    expect(transactionSuccess).toBeTruthy
  })

  it('claims funds', async () => {
    // wait 1 slot
    while (currentSlot < claimFundsAtSlot) {
      await new Promise((f) => setTimeout(f, 1000))
      currentSlot = await connection.getSlot()
    }
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])

    const claimFundsInst = await lucra.claimFunds(
      {
        payer: payerKP.publicKey,
        pendingFundsAcct: pendingFundsKP.publicKey,
      },
      'lucra'
    )

    const transaction = new Transaction().add(...claimFundsInst.instructions)
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      payerKP,
    ])
    const transactionSuccess = await watchTransaction(connection, signature)
    console.log('txid:', signature)
    expect(transactionSuccess).toBeTruthy
  })

  it('burn LUCRA for MATA', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])

    const arbStables = await lucra.arbLucra({
      payer: payerKP.publicKey,
      lamports: BigInt(100),
      pendingFundsKP,
    })

    const transaction = new Transaction().add(...arbStables.instructions)
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      payerKP,
      ...arbStables.signers,
    ])
    const transactionSuccess = await watchTransaction(connection, signature)
    console.log('txid:', signature)
    currentSlot = await connection.getSlot()
    claimFundsAtSlot = currentSlot + 1
    expect(transactionSuccess).toBeTruthy
  })

  it('claims funds', async () => {
    // wait 1 slot
    while (currentSlot < claimFundsAtSlot) {
      await new Promise((f) => setTimeout(f, 1000))
      currentSlot = await connection.getSlot()
    }
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])

    const claimFundsInst = await lucra.claimFunds(
      {
        payer: payerKP.publicKey,
        pendingFundsAcct: pendingFundsKP.publicKey,
      },
      'mata'
    )

    const transaction = new Transaction().add(...claimFundsInst.instructions)
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      payerKP,
    ])
    const transactionSuccess = await watchTransaction(connection, signature)
    console.log('txid:', signature)
    expect(transactionSuccess).toBeTruthy
  })
})
