import { Connection, PublicKey } from '@solana/web3.js'
import { Lucra } from '../../../src/lucra'
import { StakingStateStructure } from '../../../src/state/staking'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('stakingState', () => {
  const lucra = new Lucra(connection)

  const stakingStateAccount: StakingStateStructure = {
    metadata: {
      version: 0,
      dataType: 8,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    key: new PublicKey('gMR2iBR9PfVHJarzGPLeK8QCKLXLfzphU5iAHPauuMF'),
    currentRewardPubkey: new PublicKey(
      'CjJQnv8sYWYPVVK63Mf9boxkGAnx288mKDsShNwFnojY'
    ),
    totalAmountToDistribute: BigInt(200000000000000000),
    amountToDistributePerEpoch: BigInt(961538461538461),
    lastReward: BigInt(500),
    lastDropTimestamp: BigInt(1664479552),
    rewardCursor: 11,
    treasury: {
      address: new PublicKey('ALfye4fVcc84fTDriJBCSReBj8TBQLjFF2byLC3WoiKp'),
      seed: 255,
    },
    stakeMint: {
      address: new PublicKey('HpvH7uh31SGPdZS5vQXXprWcH3oXpUAWn84FHhYvQQzA'),
      seed: 253,
    },
    padding: Array.from(Array(258).keys()).map(() => 0),
  }

  it('decodes data from Staking State Account onchain', async () => {
    const stakingStateAccountKey = new PublicKey(
      'gMR2iBR9PfVHJarzGPLeK8QCKLXLfzphU5iAHPauuMF'
    )
    const decoded = await lucra.getStakingStateAccount(stakingStateAccountKey)

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

    expect(decoded.key.toString()).toStrictEqual(
      stakingStateAccount.key.toString()
    )
    expect(decoded.totalAmountToDistribute.toString()).toStrictEqual(
      stakingStateAccount.totalAmountToDistribute.toString()
    )
    expect(decoded.amountToDistributePerEpoch.toString()).toStrictEqual(
      stakingStateAccount.amountToDistributePerEpoch.toString()
    )
    expect(parseInt(decoded.lastReward.toString())).toBeGreaterThan(0)
    expect(parseInt(decoded.lastDropTimestamp.toString())).toBeGreaterThan(0)
    expect(parseInt(decoded.rewardCursor.toString())).toBeGreaterThan(0)

    expect(decoded.treasury.address.toString()).toStrictEqual(
      stakingStateAccount.treasury.address.toString()
    )
    expect(decoded.treasury.seed).toStrictEqual(
      stakingStateAccount.treasury.seed
    )
    expect(decoded.stakeMint.address.toString()).toStrictEqual(
      stakingStateAccount.stakeMint.address.toString()
    )
    expect(decoded.stakeMint.seed).toStrictEqual(
      stakingStateAccount.stakeMint.seed
    )
    expect(decoded.treasury.toString()).toStrictEqual(
      stakingStateAccount.treasury.toString()
    )

    expect(decoded.padding).toStrictEqual(stakingStateAccount.padding)
  })
})
