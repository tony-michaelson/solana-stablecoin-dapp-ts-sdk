import { PublicKey } from '@solana/web3.js'
import { StakeBalanceLayout, StakeBalanceStructure } from './layout'

describe('Stake Balance Layout', () => {
  const stakeBalance: StakeBalanceStructure = {
    metadata: {
      version: 0,
      dataType: 4,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    owner: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
    vaults: {
      stLucraVault: new PublicKey(
        '3oTzWqPeJwwZjnPtcQQSqJFgY9Tr3ZUCBzh43SaNe68M'
      ),
      depositVault: new PublicKey(
        '48V29aeeSs7nGRZ9kJgE6DnuBACbPjrTFRFKtEzupeco'
      ),
      stakeVault: new PublicKey('FsgJfz7iAj8Rkv52DVrEfwDXZ5odBYr1AUZN1BSptunt'),
      pendingVault: new PublicKey(
        'CTMdJGkHrbN1f4YbdKLhLGSnkqWN9KhXtSoGipZ3st6m'
      ),
    },
    lastStakeTimestamp: BigInt('1664819772'),
    allocatedJuiceReward: BigInt('0'),
    juiceRewardDistributed: BigInt('0'),
    rewardCursor: 12,
    stakingTimeframe: 0,
    signerBumpSeed: 254,
    padding: Array.from(Array(130).keys()).map(() => 0),
  }

  // onchain data: BLJfNj8QtPGFjPLaM3ysdVpjCbmEcq8HcEMg1BjauQuF
  const encodedData = Buffer.from(
    new Uint8Array([
      0, 4, 1, 0, 0, 0, 0, 0, 4, 239, 104, 212, 231, 140, 124, 88, 9, 18, 156,
      231, 76, 16, 190, 140, 86, 202, 248, 45, 181, 78, 193, 48, 7, 71, 69, 120,
      72, 15, 220, 81, 41, 158, 156, 80, 79, 247, 120, 252, 50, 229, 27, 244,
      61, 193, 200, 16, 184, 56, 198, 162, 117, 154, 33, 39, 165, 74, 58, 7, 72,
      127, 47, 86, 46, 125, 206, 251, 82, 55, 233, 185, 34, 225, 200, 167, 178,
      250, 151, 224, 178, 224, 57, 204, 236, 155, 81, 198, 252, 233, 78, 213,
      195, 24, 42, 72, 220, 255, 25, 112, 246, 28, 180, 124, 11, 205, 94, 125,
      226, 95, 50, 243, 78, 24, 81, 197, 108, 156, 200, 35, 29, 45, 249, 161,
      139, 243, 149, 189, 170, 48, 250, 154, 115, 71, 122, 20, 196, 109, 18, 30,
      23, 164, 97, 132, 54, 4, 196, 199, 193, 99, 132, 101, 61, 248, 36, 71, 75,
      241, 148, 170, 60, 34, 59, 99, 0, 0, 0, 0, 12, 0, 0, 0, 0, 254, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0,
    ])
  )

  it('encodes a StakingBalanceAccount object properly', () => {
    const encoded = Buffer.alloc(StakeBalanceLayout.span)
    StakeBalanceLayout.encode(stakeBalance, encoded)
    expect(encoded).toStrictEqual(encodedData)
  })

  it('decodes a Uint8Array properly', () => {
    const decoded = StakeBalanceLayout.decode(encodedData)

    expect(decoded.metadata.version).toStrictEqual(
      stakeBalance.metadata.version
    )
    expect(decoded.metadata.dataType).toStrictEqual(
      stakeBalance.metadata.dataType
    )
    expect(decoded.metadata.isInitialized).toStrictEqual(
      stakeBalance.metadata.isInitialized
    )
    expect(decoded.metadata.extraInfo).toStrictEqual(
      stakeBalance.metadata.extraInfo
    )

    expect(decoded.owner.toString()).toStrictEqual(
      stakeBalance.owner.toString()
    )

    expect(decoded.vaults.stLucraVault.toString()).toStrictEqual(
      stakeBalance.vaults.stLucraVault.toString()
    )
    expect(decoded.vaults.pendingVault.toString()).toStrictEqual(
      stakeBalance.vaults.pendingVault.toString()
    )
    expect(decoded.vaults.depositVault.toString()).toStrictEqual(
      stakeBalance.vaults.depositVault.toString()
    )
    expect(decoded.vaults.stakeVault.toString()).toStrictEqual(
      stakeBalance.vaults.stakeVault.toString()
    )

    expect(decoded.lastStakeTimestamp.toString()).toStrictEqual(
      stakeBalance.lastStakeTimestamp.toString()
    )

    expect(decoded.rewardCursor).toStrictEqual(stakeBalance.rewardCursor)

    expect(decoded.stakingTimeframe).toStrictEqual(
      stakeBalance.stakingTimeframe
    )
    expect(decoded.signerBumpSeed).toStrictEqual(stakeBalance.signerBumpSeed)

    expect(decoded.padding).toStrictEqual(stakeBalance.padding)
  })
})
