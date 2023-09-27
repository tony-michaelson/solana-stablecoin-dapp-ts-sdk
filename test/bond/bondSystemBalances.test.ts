import { Connection } from '@solana/web3.js'
import { Bond } from '../../src/bond'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('bondSystemBalances', () => {
  const bondProgram = new Bond(connection)

  it('Test Balance for a Bond System', async () => {
    const bondSystemBalance = await bondProgram.getBondSystemBalances()

    expect(
      bondSystemBalance['LUCRA_SOL_ORCA'].treasury.uiAmount
    ).toBeGreaterThan(0)
    expect(bondSystemBalance['LUCRA_SOL_ORCA'].vault.uiAmount).toBeGreaterThan(
      0
    )
    expect(
      bondSystemBalance['LUCRA_SOL_ORCA'].lp.base.uiAmount
    ).toBeGreaterThan(0)
    expect(
      bondSystemBalance['LUCRA_SOL_ORCA'].lp.quote.uiAmount
    ).toBeGreaterThan(0)
    expect(
      bondSystemBalance['LUCRA_SOL_ORCA'].lp.lpMintSupply.uiAmount
    ).toBeGreaterThan(0)
  })
})
