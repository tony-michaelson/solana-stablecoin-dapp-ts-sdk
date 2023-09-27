import { Connection, PublicKey } from '@solana/web3.js'
import { Lucra } from '../../../src/lucra'
import { StakeBalanceStructure } from '../../../src/state/stakeBalance'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Stake Balance', () => {
  const lucra = new Lucra(connection)
  const stakeAccount: StakeBalanceStructure = {
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
    rewardCursor: 12,
    stakingTimeframe: 0,
    signerBumpSeed: 254,
    padding: Array.from(Array(130).keys()).map(() => 0),
  }

  it('decodes data from Stake Balance onchain', async () => {
    const stakeBalanceKey = new PublicKey(
      'BLJfNj8QtPGFjPLaM3ysdVpjCbmEcq8HcEMg1BjauQuF'
    )
    const decoded = await lucra.getStakeBalance(stakeBalanceKey)

    expect(decoded.metadata.version).toStrictEqual(
      stakeAccount.metadata.version
    )
    expect(decoded.metadata.dataType).toStrictEqual(
      stakeAccount.metadata.dataType
    )
    expect(decoded.metadata.isInitialized).toStrictEqual(
      stakeAccount.metadata.isInitialized
    )
    expect(decoded.metadata.extraInfo).toStrictEqual(
      stakeAccount.metadata.extraInfo
    )

    expect(decoded.owner.toString()).toStrictEqual(
      stakeAccount.owner.toString()
    )

    expect(decoded.vaults.stLucraVault.toString()).toStrictEqual(
      stakeAccount.vaults.stLucraVault.toString()
    )
    expect(decoded.vaults.pendingVault.toString()).toStrictEqual(
      stakeAccount.vaults.pendingVault.toString()
    )
    expect(decoded.vaults.depositVault.toString()).toStrictEqual(
      stakeAccount.vaults.depositVault.toString()
    )
    expect(decoded.vaults.stakeVault.toString()).toStrictEqual(
      stakeAccount.vaults.stakeVault.toString()
    )

    expect(decoded.lastStakeTimestamp.toString()).toStrictEqual(
      stakeAccount.lastStakeTimestamp.toString()
    )

    expect(decoded.rewardCursor).toStrictEqual(stakeAccount.rewardCursor)

    expect(decoded.stakingTimeframe).toStrictEqual(
      stakeAccount.stakingTimeframe
    )
    expect(decoded.signerBumpSeed).toStrictEqual(stakeAccount.signerBumpSeed)

    expect(decoded.padding).toStrictEqual(stakeAccount.padding)
  })
})
