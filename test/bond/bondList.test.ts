import { Connection, PublicKey } from '@solana/web3.js'
import { Bond } from '../../src/bond'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('bondAccountList', () => {
  const bondProgram = new Bond(connection)

  it('List bonds owned by LNGDS', async () => {
    const owner = new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN')
    const accounts = await bondProgram.getBonds(owner)
    const sorted = accounts.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))

    expect(sorted.length).toBeGreaterThan(0)
    if (sorted[0]) {
      expect(sorted[0].account.toString()).toStrictEqual(
        'DFbNm1GCYAiwup2kAEksSRFF6xXpmDHCS58jem2Hdrr7'
      )
      expect(sorted[0].lpTokenMint.toString()).toStrictEqual(
        'So11111111111111111111111111111111111111112'
      )
      expect(sorted[0].bondYield.toString()).toStrictEqual(
        '0.00000005913716805139'
      )
      expect(sorted[0].timestamp.toString()).toStrictEqual('0')
    }
  })
})
