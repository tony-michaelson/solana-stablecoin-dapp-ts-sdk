import { Connection, PublicKey } from '@solana/web3.js'
import { Lucra } from '../../../src/lucra'
import { RewardStructure } from '../../../src/state/reward'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Reward Account', () => {
  const lucra = new Lucra(connection)
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

  it('decodes data from Reward Account onchain', async () => {
    const rewardAccountKey = new PublicKey(
      'CdEeyhuG727WdEA3uLSpP5KLvxwvsdLkxgLhZpxtk1MX'
    )
    const decoded = await lucra.getRewardAccount(rewardAccountKey)

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
