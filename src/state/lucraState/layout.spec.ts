import { PublicKey } from '@solana/web3.js'
import { StateLayout, StateStructure } from './layout'

describe('LucraStateAccountLayout', () => {
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
    totalOutstandingMata: BigInt(26665884),
    maximumOutstandingMata: BigInt(100000000000000000),
    minimumHarvestAmount: BigInt(550000),
    totalSolCollateral: BigInt(2000000000),
    collateralRequirement: 300,
    rewardFee: 5500,
    loansEnabled: true,
    stakingEnabled: true,
    arbitrageEnabled: true,
    pegCheckEnabled: true,
    pegBroken: false,
    lcp: 0,
    padding2: Array.from(Array(252).keys()).map(() => 0),
  }

  // onchain data: 4ZjuUhp8wmwh17171v28ZsrPS3jD9pVLMwm7LGCVadA4
  const encodedData = Buffer.from(
    new Uint8Array([
      0, 1, 1, 0, 0, 0, 0, 0, 52, 246, 40, 197, 182, 75, 91, 81, 196, 63, 153,
      106, 46, 208, 58, 243, 173, 26, 44, 72, 162, 60, 116, 153, 160, 138, 172,
      152, 188, 133, 33, 37, 10, 20, 187, 236, 139, 114, 85, 141, 47, 89, 173,
      130, 95, 17, 124, 222, 62, 203, 204, 206, 49, 138, 52, 244, 139, 65, 201,
      2, 29, 102, 154, 86, 189, 39, 29, 149, 7, 99, 17, 3, 6, 46, 242, 130, 81,
      138, 151, 154, 101, 125, 125, 8, 85, 109, 111, 156, 242, 244, 106, 240, 9,
      132, 211, 225, 104, 218, 141, 219, 50, 250, 141, 67, 9, 8, 106, 75, 102,
      15, 187, 76, 151, 96, 51, 114, 72, 218, 69, 225, 97, 67, 28, 53, 85, 126,
      219, 178, 255, 180, 94, 185, 38, 185, 229, 193, 105, 198, 30, 159, 180,
      160, 214, 218, 85, 25, 187, 32, 116, 203, 101, 193, 97, 243, 158, 175,
      179, 15, 85, 14, 43, 255, 189, 1, 170, 34, 143, 190, 232, 249, 253, 161,
      69, 14, 123, 82, 172, 217, 179, 54, 8, 81, 36, 170, 233, 242, 170, 140,
      136, 4, 171, 103, 207, 161, 253, 116, 156, 226, 240, 182, 129, 62, 8, 105,
      252, 97, 143, 82, 143, 99, 251, 14, 225, 37, 254, 113, 83, 163, 253, 227,
      18, 49, 250, 8, 156, 163, 48, 255, 54, 118, 93, 255, 52, 204, 98, 183,
      189, 203, 70, 185, 74, 211, 239, 248, 121, 216, 167, 84, 56, 73, 113, 112,
      219, 219, 251, 98, 121, 237, 142, 181, 254, 138, 108, 6, 164, 193, 122,
      68, 25, 71, 120, 39, 143, 29, 146, 154, 69, 196, 176, 104, 199, 118, 190,
      128, 9, 242, 23, 53, 150, 239, 139, 238, 212, 255, 0, 0, 1, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 156, 227, 150, 1, 0, 0, 0, 0, 0, 0, 138, 93,
      120, 69, 99, 1, 112, 100, 8, 0, 0, 0, 0, 0, 0, 148, 53, 119, 0, 0, 0, 0,
      44, 1, 0, 0, 124, 21, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
  )

  it('encodes a StateAccount object properly', () => {
    const encoded = Buffer.alloc(StateLayout.span)
    StateLayout.encode(lucraStateAccount, encoded)

    console.dir(encoded.toJSON(), { maxArrayLength: null })

    expect(encoded).toStrictEqual(encodedData)
  })

  it('decodes a Uint8Array properly', () => {
    const decoded = StateLayout.decode(encodedData)

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
