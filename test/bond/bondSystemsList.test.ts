import { Connection } from '@solana/web3.js'
import { Bond } from '../../src/bond'
import { BOND_SYSTEMS } from '../../src/constants'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('bondSystemAccountList', () => {
  const bondProgram = new Bond(connection)

  it('List bond systems', async () => {
    const accounts = await bondProgram.getBondSystems()

    expect(accounts.LUCRA_SOL_ORCA.account).toStrictEqual(
      BOND_SYSTEMS['LUCRA_SOL_ORCA'].account
    )
    expect(accounts.SOL_MATA_RAYDIUM.account).toStrictEqual(
      BOND_SYSTEMS['SOL_MATA_RAYDIUM'].account
    )
  })
})
