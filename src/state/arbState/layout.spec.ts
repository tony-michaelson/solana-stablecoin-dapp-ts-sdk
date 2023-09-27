import { PublicKey } from '@solana/web3.js'
import { LUCRA_MAINNET_CONFIG } from '../../constants'
import { ArbStateLayout, ArbStateStructure } from './layout'

describe('ArbStateLayout', () => {
  const arbStateAccount: ArbStateStructure = {
    metadata: {
      version: 0,
      dataType: 12,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    key: new PublicKey('DjNedom14ZujT9FMuM15K4wGv65JqSBgRZPTu5LHZqrg'),
    arbFund: {
      address: new PublicKey('5BQBMkUvii2toVNpi9D6xaqe1JSKDFMVCLrcu6rhLRCB'),
      seed: 255,
    },
    wsolHoldingVault: {
      address: new PublicKey('39WG7KWyLRTeoWBnJWNKJreC2DPs7ET5uFCYYdx3kuBw'),
      seed: 255,
    },
    mataHoldingVault: {
      address: new PublicKey('9H4xYZ6sP7crdXqELYR3CwdAEh6uJnZaktkPdPdgBxJa'),
      seed: 253,
    },
    lucraHoldingVault: {
      address: new PublicKey('Eng4CG1m24q5NgRXhRsPifrNn1Wd7udv7DWoa9HLB1LT'),
      seed: 251,
    },
    padding: [0, 0, 0, 0],
    maxAmountOfLucraToMint: BigInt('1000000000000000000'),
    buyingLucra: false,
    padding2: [0, 0, 0, 0, 0, 0, 0],
    rollingLimits: [
      { date: BigInt('1664236800'), limit: BigInt('10000') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
      { date: BigInt('0'), limit: BigInt('0') },
    ],
    aggLimit: BigInt('10000'),
    dailyLimit: BigInt('10000'),
    startOfDayTimestamp: BigInt('1664236800'),
    state: 0,
    padding3: Array.from(Array(256).keys()).map(() => 0),
  }

  const encodedData = Buffer.from(
    new Uint8Array([
      0, 12, 1, 0, 0, 0, 0, 0, 189, 39, 29, 149, 7, 99, 17, 3, 6, 46, 242, 130,
      81, 138, 151, 154, 101, 125, 125, 8, 85, 109, 111, 156, 242, 244, 106,
      240, 9, 132, 211, 225, 62, 24, 195, 143, 26, 74, 149, 189, 128, 50, 164,
      112, 170, 40, 92, 236, 240, 203, 214, 25, 71, 110, 18, 139, 222, 56, 154,
      243, 6, 126, 127, 64, 255, 31, 229, 26, 243, 114, 120, 137, 172, 246, 51,
      73, 90, 183, 242, 131, 135, 57, 156, 116, 46, 206, 220, 75, 91, 228, 134,
      241, 179, 50, 205, 45, 130, 255, 122, 251, 67, 103, 18, 21, 46, 83, 55,
      77, 163, 16, 242, 100, 110, 33, 165, 156, 243, 46, 104, 100, 239, 41, 94,
      179, 94, 233, 155, 216, 79, 183, 253, 204, 219, 57, 229, 167, 236, 45, 62,
      249, 14, 171, 253, 98, 91, 164, 30, 61, 43, 111, 144, 194, 94, 45, 185,
      188, 153, 107, 236, 190, 53, 88, 168, 251, 0, 0, 0, 0, 0, 0, 100, 167,
      179, 182, 224, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 61, 50, 99, 0, 0, 0, 0, 16,
      39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 39,
      0, 0, 0, 0, 0, 0, 16, 39, 0, 0, 0, 0, 0, 0, 0, 61, 50, 99, 0, 0, 0, 0, 0,
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
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
  )

  it('encodes a ArbStateAccount object properly', () => {
    const encoded = Buffer.alloc(LUCRA_MAINNET_CONFIG.accountSize.program.arb)
    ArbStateLayout.encode(arbStateAccount, encoded)
    expect(encoded).toStrictEqual(encodedData)
  })

  it('decodes a Uint8Array properly', () => {
    const decoded = ArbStateLayout.decode(encodedData)

    expect(decoded.metadata.version).toStrictEqual(
      arbStateAccount.metadata.version
    )
    expect(decoded.metadata.dataType).toStrictEqual(
      arbStateAccount.metadata.dataType
    )
    expect(decoded.metadata.isInitialized).toStrictEqual(
      arbStateAccount.metadata.isInitialized
    )
    expect(decoded.metadata.extraInfo).toStrictEqual(
      arbStateAccount.metadata.extraInfo
    )

    expect(decoded.key.toString()).toStrictEqual(arbStateAccount.key.toString())

    expect(decoded.arbFund.address.toString()).toStrictEqual(
      arbStateAccount.arbFund.address.toString()
    )
    expect(decoded.arbFund.seed).toStrictEqual(arbStateAccount.arbFund.seed)

    expect(decoded.wsolHoldingVault.address.toString()).toStrictEqual(
      arbStateAccount.wsolHoldingVault.address.toString()
    )
    expect(decoded.wsolHoldingVault.seed).toStrictEqual(
      arbStateAccount.wsolHoldingVault.seed
    )

    expect(decoded.mataHoldingVault.address.toString()).toStrictEqual(
      arbStateAccount.mataHoldingVault.address.toString()
    )
    expect(decoded.mataHoldingVault.seed).toStrictEqual(
      arbStateAccount.mataHoldingVault.seed
    )

    expect(decoded.lucraHoldingVault.address.toString()).toStrictEqual(
      arbStateAccount.lucraHoldingVault.address.toString()
    )
    expect(decoded.lucraHoldingVault.seed).toStrictEqual(
      arbStateAccount.lucraHoldingVault.seed
    )

    expect(decoded.padding).toStrictEqual(arbStateAccount.padding)

    expect(decoded.maxAmountOfLucraToMint.toString()).toStrictEqual(
      arbStateAccount.maxAmountOfLucraToMint.toString()
    )

    expect(decoded.buyingLucra.toString()).toStrictEqual(
      arbStateAccount.buyingLucra.toString()
    )

    expect(decoded.padding2).toStrictEqual(arbStateAccount.padding2)

    expect(decoded.rollingLimits[0]?.date).toStrictEqual(
      arbStateAccount.rollingLimits[0]?.date
    )
    expect(decoded.rollingLimits[0]?.limit).toStrictEqual(
      arbStateAccount.rollingLimits[0]?.limit
    )

    expect(decoded.aggLimit).toStrictEqual(arbStateAccount.aggLimit)

    expect(decoded.dailyLimit).toStrictEqual(arbStateAccount.dailyLimit)

    expect(decoded.startOfDayTimestamp).toStrictEqual(
      arbStateAccount.startOfDayTimestamp
    )

    expect(decoded.aggLimit).toStrictEqual(arbStateAccount.aggLimit)
    expect(decoded.dailyLimit).toStrictEqual(arbStateAccount.dailyLimit)
    expect(decoded.startOfDayTimestamp).toStrictEqual(
      arbStateAccount.startOfDayTimestamp
    )
    expect(decoded.state).toStrictEqual(arbStateAccount.state)

    expect(decoded.padding3).toStrictEqual(arbStateAccount.padding3)
  })
})
