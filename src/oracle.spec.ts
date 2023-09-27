import { Connection } from '@solana/web3.js'
import { Oracle } from './oracle'
import { ORACLE_MAINNET_CONFIG } from './constants'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Oracle', () => {
  const oracle = new Oracle(connection)
  it('object is constructed properly', () => {
    expect(oracle.config.programId).toStrictEqual(ORACLE_MAINNET_CONFIG.programId)
  })
})
