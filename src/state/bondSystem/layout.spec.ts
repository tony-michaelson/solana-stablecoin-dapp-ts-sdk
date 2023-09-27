import { PublicKey } from '@solana/web3.js'
import { BondSystemLayout, BondSystemStructure } from '.'

describe('BondSystemLayout', () => {
  const bondSystem: BondSystemStructure = {
    metadata: {
      version: 0,
      dataType: 2,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    authority: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
    poolState: new PublicKey('7hwQD5YnNtzubWETvRHoRk4sGSXb5FntJWUXw3QJuDKG'),
    commonMint: new PublicKey('So11111111111111111111111111111111111111112'),
    treasuryOracle: {
      some: new PublicKey('oSw5SJXdXx8RnZYCNPLBao2NGouoo9DcK43jFhTvrZc'),
    },
    padding0: [0, 0, 0],
    bondYield: 9,
    closed: false,
    vaultBumpSeed: 254,
    treasuryBumpSeed: 253,
    baseOracle: { none: [] },
    poolType: 1,
    paused: false,
    padding1: [0, 0, 0, 0, 0],
    quoteOracle: {
      some: new PublicKey('oDGkRKuiPyxKgsKgqYuTW1qxZ4bpdqogginPr5wgueS'),
    },
    padding2: [0, 0, 0, 0, 0, 0, 0],
    vaultMint: new PublicKey('EapkuuX8uwMSLfsbY8SA4166rAjotgYTQY521z3T31ti'),
    vault: new PublicKey('36vUWXAxr18PkTuCCfBZvGcZJNQRYXUV91HMjYfg1GGP'),
    treasuryMint: new PublicKey('D96AEwfFTJ7EJZJr8mtELyk2JykQZJMfxEM3CFN5CKVt'),
    treasury: new PublicKey('EgEb1sfTJ2PuiU1wFHmS5zA3nxxa9W6xRSkEUJQjTPR4'),
    padding3: [0, 0, 0, 0, 0],
    startOfEpoch: BigInt('1664383852'),
    timelock: BigInt('1'),
    epoch: BigInt('1'),
    totalAmountToDistribute: BigInt('1000000000000000'),
    maxAmountToDistributePerEpoch: BigInt('1000000000000000'),
    maxAllowedToDistributeAtOneTime: BigInt('1000000000000000'),
    estimatedAmountDistributed: BigInt('0'),
    estimatedAmountDistributedThisEpoch: BigInt('0'),
    totalAmountDistributed: BigInt('0'),
    padding4: Array.from(Array(256).keys()).map(() => 0),
  }

  // onchain data: 3uw2fnoTxpuBwKFUoDHSrig3xHL1Dp4ujATFLvuD4r6T
  const encodedData = Buffer.from(
    new Uint8Array([
      0, 2, 1, 0, 0, 0, 0, 0, 4, 239, 104, 212, 231, 140, 124, 88, 9, 18, 156,
      231, 76, 16, 190, 140, 86, 202, 248, 45, 181, 78, 193, 48, 7, 71, 69, 120,
      72, 15, 220, 81, 99, 162, 221, 70, 145, 41, 122, 166, 107, 169, 131, 152,
      166, 122, 52, 249, 167, 107, 179, 124, 108, 209, 88, 18, 169, 88, 8, 104,
      44, 208, 204, 227, 6, 155, 136, 87, 254, 171, 129, 132, 251, 104, 127, 99,
      70, 24, 192, 53, 218, 196, 57, 220, 26, 235, 59, 85, 152, 160, 240, 0, 0,
      0, 0, 1, 1, 11, 230, 9, 253, 100, 160, 184, 188, 193, 10, 89, 86, 250,
      125, 213, 42, 123, 46, 111, 87, 77, 78, 249, 238, 156, 117, 217, 44, 109,
      115, 74, 175, 0, 0, 0, 9, 0, 0, 0, 0, 254, 253, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 1, 11, 214, 151, 185, 193, 25, 219, 156, 219, 165, 1,
      227, 235, 92, 47, 23, 150, 13, 223, 0, 103, 30, 250, 135, 141, 63, 116,
      217, 147, 64, 108, 3, 0, 0, 0, 0, 0, 0, 0, 201, 210, 24, 139, 55, 106,
      217, 241, 85, 129, 126, 86, 246, 202, 112, 151, 128, 231, 202, 131, 182,
      48, 164, 246, 188, 49, 64, 2, 112, 141, 192, 39, 31, 59, 189, 209, 52, 54,
      133, 194, 136, 152, 155, 32, 84, 250, 11, 44, 203, 164, 166, 38, 22, 185,
      80, 227, 70, 5, 189, 46, 7, 1, 202, 136, 180, 94, 185, 38, 185, 229, 193,
      105, 198, 30, 159, 180, 160, 214, 218, 85, 25, 187, 32, 116, 203, 101,
      193, 97, 243, 158, 175, 179, 15, 85, 14, 43, 203, 52, 241, 161, 5, 29, 75,
      151, 18, 145, 225, 77, 102, 20, 145, 241, 100, 114, 56, 57, 243, 2, 125,
      69, 244, 92, 97, 252, 15, 93, 137, 91, 0, 0, 0, 0, 0, 108, 123, 52, 99, 0,
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 128, 198, 164,
      126, 141, 3, 0, 0, 128, 198, 164, 126, 141, 3, 0, 0, 128, 198, 164, 126,
      141, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
  )

  it('encodes a BondSystem object properly', () => {
    const encoded = Buffer.alloc(BondSystemLayout.span)
    BondSystemLayout.encode(bondSystem, encoded)
    expect(encoded).toStrictEqual(encodedData)
  })

  it('decodes a Uint8Array properly', () => {
    const decoded = BondSystemLayout.decode(encodedData)

    expect(decoded.metadata.version).toStrictEqual(0)
    expect(decoded.metadata.dataType).toStrictEqual(2)
    expect(decoded.metadata.isInitialized).toStrictEqual(true)
    expect(decoded.metadata.extraInfo).toStrictEqual([0, 0, 0, 0, 0])

    expect(decoded.authority.toString()).toStrictEqual(
      bondSystem.authority.toString()
    )
    expect(decoded.poolState.toString()).toStrictEqual(
      bondSystem.poolState.toString()
    )
    expect(decoded.commonMint.toString()).toStrictEqual(
      bondSystem.commonMint.toString()
    )
    expect(decoded.treasuryOracle.toString()).toStrictEqual(
      bondSystem.treasuryOracle.toString()
    )
    expect(decoded.bondYield).toStrictEqual(bondSystem.bondYield)
    expect(decoded.closed.toString()).toStrictEqual(
      bondSystem.closed.toString()
    )
    expect(decoded.padding0.toString()).toStrictEqual(
      bondSystem.padding0.toString()
    )
    expect(decoded.vaultBumpSeed.toString()).toStrictEqual(
      bondSystem.vaultBumpSeed.toString()
    )
    expect(decoded.treasuryBumpSeed.toString()).toStrictEqual(
      bondSystem.treasuryBumpSeed.toString()
    )
    expect(decoded.baseOracle.toString()).toStrictEqual(
      bondSystem.baseOracle.toString()
    )
    expect(decoded.poolType.toString()).toStrictEqual(
      bondSystem.poolType.toString()
    )
    expect(decoded.paused.toString()).toStrictEqual(
      bondSystem.paused.toString()
    )
    expect(decoded.padding1).toStrictEqual(bondSystem.padding1)
    expect(decoded.quoteOracle.toString()).toStrictEqual(
      bondSystem.quoteOracle.toString()
    )
    expect(decoded.padding2).toStrictEqual(bondSystem.padding2)
    expect(decoded.vaultMint.toString()).toStrictEqual(
      bondSystem.vaultMint.toString()
    )
    expect(decoded.vault.toString()).toStrictEqual(bondSystem.vault.toString())
    expect(decoded.treasuryMint.toString()).toStrictEqual(
      bondSystem.treasuryMint.toString()
    )
    expect(decoded.treasury.toString()).toStrictEqual(
      bondSystem.treasury.toString()
    )
    expect(decoded.padding3).toStrictEqual(bondSystem.padding3)
    expect(decoded.startOfEpoch.toString()).toStrictEqual(
      bondSystem.startOfEpoch.toString()
    )
    expect(decoded.timelock.toString()).toStrictEqual(
      bondSystem.timelock.toString()
    )
    expect(decoded.epoch.toString()).toStrictEqual(bondSystem.epoch.toString())
    expect(decoded.totalAmountToDistribute.toString()).toStrictEqual(
      bondSystem.totalAmountToDistribute.toString()
    )
    expect(decoded.maxAmountToDistributePerEpoch.toString()).toStrictEqual(
      bondSystem.maxAmountToDistributePerEpoch.toString()
    )
    expect(decoded.maxAllowedToDistributeAtOneTime.toString()).toStrictEqual(
      bondSystem.maxAllowedToDistributeAtOneTime.toString()
    )
    expect(decoded.estimatedAmountDistributed.toString()).toStrictEqual(
      bondSystem.estimatedAmountDistributed.toString()
    )
    expect(
      decoded.estimatedAmountDistributedThisEpoch.toString()
    ).toStrictEqual(bondSystem.estimatedAmountDistributedThisEpoch.toString())
    expect(decoded.totalAmountDistributed.toString()).toStrictEqual(
      bondSystem.totalAmountDistributed.toString()
    )
    expect(decoded.padding4).toStrictEqual(bondSystem.padding4)
  })
})
