import { Connection, PublicKey } from '@solana/web3.js'
import { Lucra } from '../../../src/lucra'
import { StakeAccountStructure } from '../../../src/state/stakeAccount'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('stakingAcount', () => {
  const lucra = new Lucra(connection)

  const stakingStateAccount: StakeAccountStructure = {
    metadata: {
      version: 0,
      dataType: 3,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    owner: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
    total: BigInt(5),
    lockedTotal: BigInt(0),
    padding: Array.from(Array(128).keys()).map(() => 0),
  }

  it('decodes data from Staking Account onchain', async () => {
    const stakingAccountOwner = new PublicKey(
      'LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'
    )
    const decoded = await lucra.getStakeAccount(stakingAccountOwner)

    expect(decoded.metadata.version).toStrictEqual(
      stakingStateAccount.metadata.version
    )
    expect(decoded.metadata.dataType).toStrictEqual(
      stakingStateAccount.metadata.dataType
    )
    expect(decoded.metadata.isInitialized).toStrictEqual(
      stakingStateAccount.metadata.isInitialized
    )
    expect(decoded.metadata.extraInfo).toStrictEqual(
      stakingStateAccount.metadata.extraInfo
    )

    expect(decoded.owner.toString()).toStrictEqual(
      stakingStateAccount.owner.toString()
    )

    expect(decoded.total.toString()).toMatch(/\d+/)

    expect(decoded.lockedTotal.toString()).toMatch(/\d+/)

    expect(decoded.padding).toStrictEqual(stakingStateAccount.padding)
  })
})
