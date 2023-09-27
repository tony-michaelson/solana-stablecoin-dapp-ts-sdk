import {
  Connection,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js'
import { createKeypairFromFile, watchTransaction } from '../lib'
import { Lucra } from '../../src/lucra'
import { getAssociatedTokenAddress, transfer } from '@solana/spl-token'
import { LUCRA_CONFIG, MARINADE_CONFIG } from '../../src/constants'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Transfer Funds', () => {
  jest.setTimeout(120 * 1000)
  const lucra = new Lucra(connection)

  it('transfer funds', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const daoKP = await createKeypairFromFile(process.env['DAO_KEYFILE'])
    const msolAtaAddress = await getAssociatedTokenAddress(
      MARINADE_CONFIG.msolMint,
      payerKP.publicKey
    )

    const transfer = lucra.transferFunds({
      daoAuthority: daoKP.publicKey,
      toAccount: msolAtaAddress,
      lamports: BigInt(1),
    })

    const transaction = new Transaction().add(transfer)
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      payerKP,
    ])
    const transactionSuccess = await watchTransaction(connection, signature)
    console.log('txid:', signature)
    expect(transactionSuccess).toBeTruthy
  })

  it('transfer funds back', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const msolAtaAddress = await getAssociatedTokenAddress(
      MARINADE_CONFIG.msolMint,
      payerKP.publicKey
    )

    const signature = await transfer(
      connection,
      payerKP,
      msolAtaAddress,
      LUCRA_CONFIG.account.msolVault.address,
      payerKP,
      BigInt(1)
    )

    const transactionSuccess = await watchTransaction(connection, signature)
    console.log('txid:', signature)
    expect(transactionSuccess).toBeTruthy
  })
})
