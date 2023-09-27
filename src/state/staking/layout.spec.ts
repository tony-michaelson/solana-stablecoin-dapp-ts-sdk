import { PublicKey } from '@solana/web3.js'
import { StakingStateLayout, StakingStateStructure } from './layout'

describe('StakingStateLayout', () => {
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

  const encodedData = Buffer.from(
    new Uint8Array([
      0, 8, 1, 0, 0, 0, 0, 0, 10, 20, 187, 236, 139, 114, 85, 141, 47, 89, 173,
      130, 95, 17, 124, 222, 62, 203, 204, 206, 49, 138, 52, 244, 139, 65, 201,
      2, 29, 102, 154, 86, 174, 70, 162, 205, 125, 193, 162, 191, 200, 164, 2,
      170, 5, 183, 209, 193, 100, 17, 175, 49, 163, 219, 244, 171, 193, 203,
      199, 70, 50, 30, 90, 3, 0, 0, 20, 187, 240, 138, 198, 2, 157, 24, 112,
      158, 131, 106, 3, 0, 244, 1, 0, 0, 0, 0, 0, 0, 64, 241, 53, 99, 0, 0, 0,
      0, 11, 0, 0, 0, 138, 195, 73, 226, 223, 5, 54, 28, 207, 237, 233, 197,
      141, 205, 33, 46, 72, 142, 187, 94, 88, 8, 45, 89, 190, 158, 117, 158,
      155, 142, 4, 135, 255, 250, 1, 135, 198, 243, 165, 227, 159, 224, 122,
      115, 163, 72, 69, 136, 126, 185, 94, 141, 165, 141, 116, 15, 223, 119,
      119, 168, 109, 180, 127, 25, 119, 253, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
  )

  it('encodes a StakingStateAccount object properly', () => {
    const encoded = Buffer.alloc(StakingStateLayout.span)
    StakingStateLayout.encode(stakingStateAccount, encoded)

    // console.dir(JSON.parse(JSON.stringify(encodedData)), {
    //   maxArrayLength: null,
    // })
    expect(encoded).toStrictEqual(encodedData)
  })

  it('decodes a Uint8Array properly', () => {
    const decoded = StakingStateLayout.decode(encodedData)

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
    expect(decoded.lastReward.toString()).toStrictEqual(
      stakingStateAccount.lastReward.toString()
    )
    expect(decoded.lastDropTimestamp.toString()).toStrictEqual(
      stakingStateAccount.lastDropTimestamp.toString()
    )
    expect(decoded.rewardCursor).toStrictEqual(stakingStateAccount.rewardCursor)

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
