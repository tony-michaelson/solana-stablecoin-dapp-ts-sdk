import { Connection, PublicKey } from '@solana/web3.js'
import { Lucra } from '../../../src/lucra'
import { StakeBalance } from '../../../src/state/stakeBalance'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

const stakeBalance: StakeBalance = {
  account: new PublicKey('24mU3L3LUDUPSVyE9ey9bPkoPkABHrrogHzmjCLiyhmR'),
  metadata: {
    version: 0,
    dataType: 4,
    isInitialized: true,
    extraInfo: [0, 0, 0, 0, 0],
  },
  owner: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
  vaults: {
    stLucraVault: new PublicKey('373bXsoUs8t3m4GwjgmVMFqbtbxhTFn97bdVud3BaUWt'),
    depositVault: new PublicKey('CgN3W5fG1Qb2skBpgmDBi2evDAfFCUP6fCL4Qve48X8E'),
    stakeVault: new PublicKey('CLYhzY1q23daDur2VHzTMiaNm4svze5gx5jHK1zAXSyf'),
    pendingVault: new PublicKey('7E25b2cEA275GVyETvnvwMA6iQ3ATwp6HmFy6PkNEJ25'),
  },

  lastStakeTimestamp: BigInt(1664477011),
  rewardCursor: 1,
  stakingTimeframe: 0,
  signerBumpSeed: 254,
  padding: Array.from(Array(130).keys()).map(() => 0),
}

describe('Get Stake Accounts', () => {
  jest.setTimeout(45 * 1000)
  const lucra = new Lucra(connection)

  it('List stake accounts owned by LNGDS', async () => {
    const owner = new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN')
    const accounts = await lucra.getStakeBalances(owner)
    const sorted = accounts
      .filter((e) => e.lastStakeTimestamp > 0)
      .sort((a, b) => (a.lastStakeTimestamp > b.lastStakeTimestamp ? 1 : -1))

    expect(sorted.length).toBeGreaterThan(0)
    if (sorted[1]) {
      const account = sorted[1]

      expect(account.metadata.version).toStrictEqual(
        stakeBalance.metadata.version
      )
      expect(account.metadata.dataType).toStrictEqual(
        stakeBalance.metadata.dataType
      )
      expect(account.metadata.isInitialized).toStrictEqual(
        stakeBalance.metadata.isInitialized
      )
      expect(account.metadata.extraInfo).toStrictEqual(
        stakeBalance.metadata.extraInfo
      )

      expect(account.owner.toString()).toStrictEqual(
        stakeBalance.owner.toString()
      )

      expect(account.vaults.stLucraVault.toString()).toStrictEqual(
        stakeBalance.vaults.stLucraVault.toString()
      )
      expect(account.vaults.pendingVault.toString()).toStrictEqual(
        stakeBalance.vaults.pendingVault.toString()
      )
      expect(account.vaults.depositVault.toString()).toStrictEqual(
        stakeBalance.vaults.depositVault.toString()
      )
      expect(account.vaults.stakeVault.toString()).toStrictEqual(
        stakeBalance.vaults.stakeVault.toString()
      )

      expect(account.lastStakeTimestamp.toString()).toStrictEqual(
        stakeBalance.lastStakeTimestamp.toString()
      )
      expect(account.rewardCursor).toStrictEqual(stakeBalance.rewardCursor)

      expect(account.stakingTimeframe).toStrictEqual(
        stakeBalance.stakingTimeframe
      )
      expect(account.signerBumpSeed).toStrictEqual(stakeBalance.signerBumpSeed)

      expect(account.padding).toStrictEqual(stakeBalance.padding)
    }
  })

  it('List stake accounts with balances owned by LNGDS', async () => {
    const owner = new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN')
    const accounts = await lucra.getStakeBalancesAndVaults(owner)
    const sorted = accounts
      .filter((e) => e.lastStakeTimestamp > 0)
      .sort((a, b) => (a.lastStakeTimestamp > b.lastStakeTimestamp ? 1 : -1))

    expect(sorted.length).toBeGreaterThan(0)
    if (sorted[1]) {
      const account = sorted[1]
      expect(account.balance.stLucraVault.amount).toStrictEqual('1')
      expect(account.balance.depositVault.amount).toStrictEqual('0')
      expect(account.balance.pendingVault.amount).toStrictEqual('0')
      expect(account.balance.stakeVault.amount).toStrictEqual('1')
    }
  })
})
