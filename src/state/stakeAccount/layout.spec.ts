import { PublicKey } from '@solana/web3.js'
import { StakeAccountLayout, StakeAccountStructure } from './layout'

describe('Staking Account Layout', () => {
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

  // onchain data: gMR2iBR9PfVHJarzGPLeK8QCKLXLfzphU5iAHPauuMF
  const encodedData = Buffer.from(
    new Uint8Array([
      0, 3, 1, 0, 0, 0, 0, 0, 4, 239, 104, 212, 231, 140, 124, 88, 9, 18, 156,
      231, 76, 16, 190, 140, 86, 202, 248, 45, 181, 78, 193, 48, 7, 71, 69, 120,
      72, 15, 220, 81, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
  )

  it('encodes a StakingAccount object properly', () => {
    const encoded = Buffer.alloc(StakeAccountLayout.span)
    StakeAccountLayout.encode(stakingStateAccount, encoded)
    expect(encoded).toStrictEqual(encodedData)
  })

  it('decodes a Uint8Array properly', () => {
    const decoded = StakeAccountLayout.decode(encodedData)

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

    expect(decoded.total.toString()).toStrictEqual('5')

    expect(decoded.lockedTotal.toString()).toStrictEqual('0')

    expect(decoded.padding).toStrictEqual(stakingStateAccount.padding)
  })
})
