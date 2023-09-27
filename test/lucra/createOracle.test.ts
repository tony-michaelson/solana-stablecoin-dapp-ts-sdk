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
import { OracleMarket } from '../../src/types/lucra'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Create an Oracle', () => {
  jest.setTimeout(120 * 1000)
  const lucra = new Lucra(connection)

  it('creates an oracle', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const oracleKP = await createKeypairFromFile(process.env['ORACLE_KEYFILE'])

    const serumMarket = await getPubkeyForEnv(process.env['SERUM_MARKET'])
    const raydiumAMM = await getPubkeyForEnv(process.env['RAYDIUM_AMM'])
    const orcaSwap = await getPubkeyForEnv(process.env['ORCA_SWAP'])
    const baseMint = await getPubkeyForEnv(process.env['BASE_MINT'])
    const quoteMint = await getPubkeyForEnv(process.env['QUOTE_MINT'])

    const createOracle = await lucra.createOracle({
      payer: payerKP.publicKey,
      oracleAccountKP: oracleKP,
      market: OracleMarket.SolUsdc,
      serumMarket,
      raydiumAMM,
      orcaSwap,
      baseMint,
      quoteMint,
    })

    const transaction = new Transaction().add(...createOracle.instructions)
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      payerKP,
      ...createOracle.signers,
    ])
    const transactionSuccess = await watchTransaction(connection, signature)
    console.log('txid:', signature)
    expect(transactionSuccess).toBeTruthy
  })
})
