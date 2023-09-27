import { Connection, PublicKey } from '@solana/web3.js'
import { Bond } from './bond'
import { BOND_MAINNET_CONFIG, BOND_MAINNET_SYSTEMS } from './constants'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Bond', () => {
  const bond = new Bond(connection)
  it('object is constructed properly', () => {
    expect(bond.config.programId).toStrictEqual(BOND_MAINNET_CONFIG.programId)
  })

  it('getSystemNameByAccount()', () => {
    const system = BOND_MAINNET_SYSTEMS['SOL_MATA_RAYDIUM']
    const account = new PublicKey(system.account.toString())
    const systemName = bond.getSystemNameByAccount(account)
    expect(systemName).toStrictEqual('SOL_MATA_RAYDIUM')
  })
})
