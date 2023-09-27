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

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Update Program State', () => {
  jest.setTimeout(60 * 1000)
  const lucra = new Lucra(connection)

  it('update program & staking state', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const programStateAcct = await getPubkeyForEnv(
      process.env['PROGRAM_STATE_ACCT']
    )
    const arbStateAcct = await getPubkeyForEnv(process.env['ARB_STATE_ACCT'])

    // Update program
    const update = lucra.updateState({
      settings: {
        min_deposit: BigInt(0),
        collateral_requirement: 150,
        loans_enabled: true,
        staking_enabled: true,
        arbitrage_enabled: true,
        peg_check_enabled: true,
        maximum_lucra_to_mint: BigInt('1000000000000'),
        daily_arb_limit: BigInt(110),
        maximum_outstanding_mata: BigInt(111),
        minimum_harvest_amount: BigInt(550000),
        reward_fee: 5500,
        lcp: 30,
      },
      daoAuthority: payerKP.publicKey,
      lucraStateAcct: programStateAcct,
      arbStateAcct: arbStateAcct,
    })

    const transaction = new Transaction().add(update)
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      payerKP,
    ])
    const transactionSuccess = await watchTransaction(connection, signature)
    console.log('txid:', signature)
    expect(transactionSuccess).toBeTruthy
  })
})
