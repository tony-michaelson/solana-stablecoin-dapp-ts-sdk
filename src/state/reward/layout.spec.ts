import { PublicKey } from '@solana/web3.js'
import { RewardAccountLayout, RewardStructure } from './layout'

describe('StakingStateLayout', () => {
  const rewardAccount: RewardStructure = {
    metadata: {
      version: 0,
      dataType: 6,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    previousReward: new PublicKey(
      '9QvzWuXJBJHpfs67rLfMc96v3hFWsWHPZHbxbpMkxWEE'
    ),
    poolTokenSupply: BigInt(6),
    total: BigInt(500),
    startTimestamp: BigInt(1664479544),
    rewardCursor: 9,
    juiceSqueezed: true,
    padding: Array.from(Array(131).keys()).map(() => 0),
  }

  // onchain data: CdEeyhuG727WdEA3uLSpP5KLvxwvsdLkxgLhZpxtk1MX
  const encodedData = Buffer.from(
    new Uint8Array([
      0, 6, 1, 0, 0, 0, 0, 0, 124, 254, 231, 14, 230, 210, 118, 52, 213, 153,
      39, 33, 36, 238, 29, 181, 159, 213, 160, 209, 110, 112, 87, 57, 123, 70,
      120, 161, 133, 70, 214, 155, 6, 0, 0, 0, 0, 0, 0, 0, 244, 1, 0, 0, 0, 0,
      0, 0, 56, 241, 53, 99, 0, 0, 0, 0, 9, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
  )

  it('encodes a StakingStateAccount object properly', () => {
    const encoded = Buffer.alloc(RewardAccountLayout.span)
    RewardAccountLayout.encode(rewardAccount, encoded)
    expect(encoded).toStrictEqual(encodedData)
  })

  it('decodes a Uint8Array properly', () => {
    const decoded = RewardAccountLayout.decode(encodedData)

    expect(decoded.metadata.version).toStrictEqual(
      rewardAccount.metadata.version
    )
    expect(decoded.metadata.dataType).toStrictEqual(
      rewardAccount.metadata.dataType
    )
    expect(decoded.metadata.isInitialized).toStrictEqual(
      rewardAccount.metadata.isInitialized
    )
    expect(decoded.metadata.extraInfo).toStrictEqual(
      rewardAccount.metadata.extraInfo
    )

    expect(decoded.previousReward.toString()).toStrictEqual(
      rewardAccount.previousReward.toString()
    )
    expect(decoded.poolTokenSupply.toString()).toStrictEqual(
      rewardAccount.poolTokenSupply.toString()
    )
    expect(decoded.total.toString()).toStrictEqual(
      rewardAccount.total.toString()
    )
    expect(decoded.startTimestamp.toString()).toStrictEqual(
      rewardAccount.startTimestamp.toString()
    )

    expect(decoded.rewardCursor).toStrictEqual(rewardAccount.rewardCursor)
    expect(decoded.juiceSqueezed).toStrictEqual(rewardAccount.juiceSqueezed)

    expect(decoded.padding).toStrictEqual(rewardAccount.padding)
  })
})
