import { PublicKey } from '@solana/web3.js'
import { OracleV2AccountLayout, OracleV2Structure } from './layout'

describe('OracleAccountV2', () => {
  const price = {
    slot: BigInt(0),
    expo: 6,
    price: BigInt(100),
    vol: BigInt(100),
  }
  const prices = [
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price,
    price, 
  ]
  const priceSource = {
    market: new PublicKey(''),
    aggPrice: {
      slot: BigInt(0),
      expo: 6,
      price: BigInt(100),
      vol: BigInt(100),
    },
    prices,
    status: 1,
    source: 1,
    maxTolerance: 5,
    algorithm: 1,
  }
  const priceSources = [
    priceSource,
    priceSource,
    priceSource,
    priceSource,
    priceSource,
    priceSource,
    priceSource,
    priceSource,
    priceSource,
    priceSource,
    priceSource,
    priceSource,
    priceSource,
    priceSource,
    priceSource,
    priceSource,
  ]

  const oracleAccountV2: OracleV2Structure = {
    metadata: {
      version: 0,
      dataType: 1,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    baseMint: new PublicKey(''),
    quoteMint: new PublicKey(''),
    expo: 6,
    priceSources,
    aggPrice: BigInt('40001659'),
    validSlot: BigInt('1615174130'),
    timestamp: BigInt('3301502'),
    minPs: 1,
    authority: new PublicKey(''),
    treasury: new PublicKey(''),
    treasuryNonce: 255,
    rewardMint: new PublicKey(''),
    rewardMintNonce: 254,
    rewardBonus: 10,
    algorithm: 1,
    status: 1,
    prevSlot: BigInt('165174129'),
    prevAggPrice: BigInt('40001659'),
    prevTimestamp: BigInt('3301501'),
    numPs: 2,
  }

  const encodedData = Buffer.from(
    new Uint8Array([

    ])
  )

  it('encodes an OracleAccountV2 object properly', () => {
    const encoded = Buffer.alloc(OracleV2AccountLayout.span)
    OracleV2AccountLayout.encode(oracleAccountV2, encoded)
    expect(encoded).toStrictEqual(encodedData)
  })

  it('decodes a Uint8Array properly', () => {
    const decoded = OracleV2AccountLayout.decode(encodedData)

    expect(decoded.metadata.version).toStrictEqual(
      oracleAccountV2.metadata.version
    )
    expect(decoded.metadata.dataType).toStrictEqual(
      oracleAccountV2.metadata.dataType
    )
    expect(decoded.metadata.isInitialized).toStrictEqual(
      oracleAccountV2.metadata.isInitialized
    )
    expect(decoded.metadata.extraInfo).toStrictEqual(
      oracleAccountV2.metadata.extraInfo
    )
    expect(decoded.baseMint.toString()).toStrictEqual(
      oracleAccountV2.baseMint.toString()
    )
    expect(decoded.quoteMint.toString()).toStrictEqual(
      oracleAccountV2.quoteMint.toString()
    )

    for (let i = 0; i < 16; i++) {
      expect(decoded.priceSources[i]?.market.toString()).toStrictEqual(
        oracleAccountV2.priceSources[i]?.market.toString()
      )
      expect(decoded.priceSources[i]?.aggPrice.expo.toString()).toStrictEqual(
        oracleAccountV2.priceSources[i]?.aggPrice.expo.toString()
      )
      expect(decoded.priceSources[i]?.aggPrice.price.toString()).toStrictEqual(
        oracleAccountV2.priceSources[i]?.aggPrice.price.toString()
      )
      expect(decoded.priceSources[i]?.aggPrice.vol.toString()).toStrictEqual(
        oracleAccountV2.priceSources[i]?.aggPrice.vol.toString()
      )
      expect(decoded.priceSources[i]?.aggPrice.slot.toString()).toStrictEqual(
        oracleAccountV2.priceSources[i]?.aggPrice.slot.toString()
      )
      
      for (let j = 0; j < 25; i++) {
        expect(decoded.priceSources[i]?.prices[j]?.expo.toString()).toStrictEqual(
          oracleAccountV2.priceSources[i]?.prices[j]?.expo.toString()
        )
        expect(decoded.priceSources[i]?.prices[j]?.price.toString()).toStrictEqual(
          oracleAccountV2.priceSources[i]?.prices[j]?.price.toString()
        )
        expect(decoded.priceSources[i]?.prices[j]?.vol.toString()).toStrictEqual(
          oracleAccountV2.priceSources[i]?.prices[j]?.vol.toString()
        )
        expect(decoded.priceSources[i]?.prices[j]?.slot.toString()).toStrictEqual(
          oracleAccountV2.priceSources[i]?.prices[j]?.slot.toString()
        )
      }

      expect(decoded.priceSources[i]?.status.toString()).toStrictEqual(
        oracleAccountV2.priceSources[i]?.status.toString()
      )
      expect(decoded.priceSources[i]?.source.toString()).toStrictEqual(
        oracleAccountV2.priceSources[i]?.source.toString()
      )
      expect(decoded.priceSources[i]?.maxTolerance.toString()).toStrictEqual(
        oracleAccountV2.priceSources[i]?.maxTolerance.toString()
      )
      expect(decoded.priceSources[i]?.algorithm.toString()).toStrictEqual(
        oracleAccountV2.priceSources[i]?.algorithm.toString()
      )
    }

    expect(decoded.aggPrice.toString()).toStrictEqual(
      oracleAccountV2.aggPrice.toString()
    )
    expect(decoded.validSlot.toString()).toStrictEqual(
      oracleAccountV2.validSlot.toString()
    )
    expect(decoded.timestamp.toString()).toStrictEqual(
      oracleAccountV2.timestamp.toString()
    )
    expect(decoded.minPs.toString()).toStrictEqual(
      oracleAccountV2.minPs.toString()
    )
    expect(decoded.authority.toString()).toStrictEqual(
      oracleAccountV2.authority.toString()
    )
    expect(decoded.treasury.toString()).toStrictEqual(
      oracleAccountV2.treasury.toString()
    )
    expect(decoded.treasuryNonce.toString()).toStrictEqual(
      oracleAccountV2.treasuryNonce.toString()
    )
    expect(decoded.rewardMint.toString()).toStrictEqual(
      oracleAccountV2.rewardMint.toString()
    )
    expect(decoded.rewardMintNonce.toString()).toStrictEqual(
      oracleAccountV2.rewardMintNonce.toString()
    )
    expect(decoded.rewardBonus.toString()).toStrictEqual(
      oracleAccountV2.rewardBonus.toString()
    )
    expect(decoded.algorithm.toString()).toStrictEqual(
      oracleAccountV2.algorithm.toString()
    )
    expect(decoded.status.toString()).toStrictEqual(
      oracleAccountV2.status.toString()
    )
    expect(decoded.prevSlot.toString()).toStrictEqual(
      oracleAccountV2.prevSlot.toString()
    )
    expect(decoded.prevAggPrice.toString()).toStrictEqual(
      oracleAccountV2.prevAggPrice.toString()
    )
    expect(decoded.prevTimestamp.toString()).toStrictEqual(
      oracleAccountV2.prevTimestamp.toString()
    )
    expect(decoded.numPs.toString()).toStrictEqual(
      oracleAccountV2.numPs.toString()
    )
  })
})