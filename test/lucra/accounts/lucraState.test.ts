import { Connection, PublicKey } from '@solana/web3.js'
import { Lucra } from '../../../src/lucra'
import { StateStructure } from '../../../src/state/lucraState'
import { logObjectWithBigints } from '../../lib'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Lucra State', () => {
  const lucra = new Lucra(connection)
  const lucraStateAccount: StateStructure = {
    metadata: {
      version: 0,
      dataType: 1,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    key: new PublicKey('4ZjuUhp8wmwh17171v28ZsrPS3jD9pVLMwm7LGCVadA4'),
    stakingState: new PublicKey('gMR2iBR9PfVHJarzGPLeK8QCKLXLfzphU5iAHPauuMF'),
    arbState: new PublicKey('DjNedom14ZujT9FMuM15K4wGv65JqSBgRZPTu5LHZqrg'),
    mataMint: {
      address: new PublicKey('84Jh5LVD6R7oCES6tunvsYiBcrN1unTFXmHXjrGBaE7T'),
      seed: 255,
    },
    lucraMint: {
      address: new PublicKey('D96AEwfFTJ7EJZJr8mtELyk2JykQZJMfxEM3CFN5CKVt'),
      seed: 255,
    },
    rewardMint: {
      address: new PublicKey('DioXZzWHkgAwRnuYZsrroHuzP9mos9oxeo4jgg8M8JZ6'),
      seed: 253,
    },
    msolVault: {
      address: new PublicKey('8rD3ZVuTuzoKssxwScJGDtztL1Mu7jzz4XTyhuwwhna3'),
      seed: 255,
    },
    rewardsVault: {
      address: new PublicKey('4fbhcWC8R2MzJiCZa2ySSDWDVEFCV4vZtLcYnxqDu4rG'),
      seed: 254,
    },
    linusBlanket: {
      address: new PublicKey('AKLoTXnwfKeN1VprWYt7zfKsEmdNJ8CT5y5YGbAxbJvF'),
      seed: 255,
    },
    padding1: [0, 0],
    epoch: BigInt(1),
    minDeposit: BigInt(1),
    totalOutstandingMata: BigInt(0),
    maximumOutstandingMata: BigInt(100000000000000000),
    minimumHarvestAmount: BigInt(550000),
    totalSolCollateral: BigInt(0),
    collateralRequirement: 300,
    rewardFee: 5500,
    loansEnabled: true,
    stakingEnabled: true,
    arbitrageEnabled: true,
    pegBroken: false,
    padding2: Array.from(Array(252).keys()).map(() => 0),
  }

  it('decodes data from State Account onchain', async () => {
    const stateAccountKey = new PublicKey(
      '4ZjuUhp8wmwh17171v28ZsrPS3jD9pVLMwm7LGCVadA4'
    )
    const decoded = await lucra.getStateAccount(stateAccountKey)
    logObjectWithBigints(decoded)

    expect(decoded.metadata.version).toStrictEqual(
      lucraStateAccount.metadata.version
    )
    expect(decoded.metadata.dataType).toStrictEqual(
      lucraStateAccount.metadata.dataType
    )
    expect(decoded.metadata.isInitialized).toStrictEqual(
      lucraStateAccount.metadata.isInitialized
    )
    expect(decoded.metadata.extraInfo).toStrictEqual(
      lucraStateAccount.metadata.extraInfo
    )

    expect(decoded.key.toString()).toStrictEqual(
      lucraStateAccount.key.toString()
    )
    expect(decoded.stakingState.toString()).toStrictEqual(
      lucraStateAccount.stakingState.toString()
    )

    expect(decoded.mataMint.address.toString()).toStrictEqual(
      lucraStateAccount.mataMint.address.toString()
    )
    expect(decoded.lucraMint.address.toString()).toStrictEqual(
      lucraStateAccount.lucraMint.address.toString()
    )
    expect(decoded.rewardMint.address.toString()).toStrictEqual(
      lucraStateAccount.rewardMint.address.toString()
    )

    expect(decoded.msolVault.address.toString()).toStrictEqual(
      lucraStateAccount.msolVault.address.toString()
    )
    expect(decoded.msolVault.seed).toStrictEqual(
      lucraStateAccount.msolVault.seed
    )
    expect(decoded.rewardsVault.address.toString()).toStrictEqual(
      lucraStateAccount.rewardsVault.address.toString()
    )
    expect(decoded.rewardsVault.seed).toStrictEqual(
      lucraStateAccount.rewardsVault.seed
    )
    expect(decoded.linusBlanket.address.toString()).toStrictEqual(
      lucraStateAccount.linusBlanket.address.toString()
    )
    expect(decoded.linusBlanket.seed).toStrictEqual(
      lucraStateAccount.linusBlanket.seed
    )

    expect(decoded.loansEnabled).toStrictEqual(lucraStateAccount.loansEnabled)
    expect(decoded.stakingEnabled).toStrictEqual(
      lucraStateAccount.stakingEnabled
    )
    expect(decoded.arbitrageEnabled).toStrictEqual(
      lucraStateAccount.arbitrageEnabled
    )

    expect(decoded.collateralRequirement).toStrictEqual(
      lucraStateAccount.collateralRequirement
    )

    expect(decoded.minDeposit).toStrictEqual(lucraStateAccount.minDeposit)
    expect(decoded.maximumOutstandingMata.toString()).toStrictEqual(
      lucraStateAccount.maximumOutstandingMata.toString()
    )
    expect(decoded.totalSolCollateral.toString()).toMatch(new RegExp(/\d+/))
    expect(decoded.totalOutstandingMata.toString()).toMatch(new RegExp(/\d+/))

    expect(decoded.epoch.toString()).toStrictEqual(
      lucraStateAccount.epoch.toString()
    )
  })
})
