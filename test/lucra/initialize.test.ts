import {
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js'
import {
  createKeypairFromFile,
  createTokenMint,
  watchTransaction,
} from '../lib'
import { Lucra } from '../../src/lucra'
import {
  LUCRA_DEVNET_CONFIG,
  MARINADE_DEVNET_CONFIG,
} from '../../src/constants'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Initialize', () => {
  jest.setTimeout(220 * 1000)
  const lucra = new Lucra(connection, LUCRA_DEVNET_CONFIG)

  it('transfer mints, create accounts, initialize program', async () => {
    const creatorKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])

    // Create Mints
    const lucraMint = await createTokenMint(
      connection,
      creatorKP,
      Keypair.generate(),
      creatorKP.publicKey,
      9
    )
    const stLucraMint = await createTokenMint(
      connection,
      creatorKP,
      Keypair.generate(),
      creatorKP.publicKey,
      9
    )

    // Initialize program
    const initialize = await lucra.initialize({
      creatorAuthority: creatorKP.publicKey,
      payer: creatorKP.publicKey,
      marinadeState: MARINADE_DEVNET_CONFIG.stateAccount,
      settings: {
        min_deposit: BigInt(777555),
        collateral_requirement: 202,
        epoch: BigInt(203),
        loans_enabled: true,
        staking_enabled: true,
        arbitrage_enabled: true,
        peg_check_enabled: true,
        maximum_lucra_to_mint: BigInt(204),
        daily_arb_limit: BigInt(205),
        maximum_outstanding_mata: BigInt(206),
        lcp: 20,
      },
      lucraMint,
      stLucraMint,
    })

    // -- TRANSACTION 1 -- //
    const transaction = new Transaction().add(
      ...initialize.transaction1.instructions
    )
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      creatorKP,
      ...initialize.transaction1.signers,
    ])
    const transactionSuccess = await watchTransaction(connection, signature)
    console.log('txid 1:', signature)
    expect(transactionSuccess).toBeTruthy

    // -- TRANSACTION 2 -- //
    const transaction2 = new Transaction().add(
      ...initialize.transaction2.instructions
    )
    const signature2 = await sendAndConfirmTransaction(
      connection,
      transaction2,
      [creatorKP, ...initialize.transaction2.signers]
    )
    const transactionSuccess2 = await watchTransaction(connection, signature2)
    console.log('txid 2:', signature2)
    expect(transactionSuccess2).toBeTruthy

    // -- TRANSACTION 3 -- //
    const transaction3 = new Transaction().add(
      ...initialize.transaction3.instructions
    )
    const signature3 = await sendAndConfirmTransaction(
      connection,
      transaction3,
      [creatorKP, ...initialize.transaction3.signers]
    )
    const transactionSuccess3 = await watchTransaction(connection, signature3)
    console.log('txid 3:', signature3)
    expect(transactionSuccess3).toBeTruthy

    // -- TRANSACTION 4 -- //
    console.log(process.env['PAYER_KEYFILE'])
    const transaction4 = new Transaction().add(
      ...initialize.transaction4.instructions
    )
    const signature4 = await sendAndConfirmTransaction(
      connection,
      transaction4,
      [creatorKP, ...initialize.transaction4.signers]
    )
    const transactionSuccess4 = await watchTransaction(connection, signature4)
    console.log('txid 4:', signature4)
    expect(transactionSuccess4).toBeTruthy
  })
})
