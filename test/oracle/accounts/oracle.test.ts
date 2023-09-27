import { Connection, PublicKey } from "@solana/web3.js"
import { Oracle } from "../../../src"

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Oracle', () => {
  const oracle = new Oracle(connection)

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

  const oracleAccount = {
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

  it('decodes oracle account', async () => {
    const decoded = await oracle.getOracleAccount(
      oracle.config.oracles.SOL_MATA.account
    )

    expect(decoded.metadata.version).toStrictEqual(
      oracleAccount.metadata.version
    )
    expect(decoded.metadata.dataType).toStrictEqual(
      oracleAccount.metadata.dataType
    )
    expect(decoded.metadata.isInitialized).toStrictEqual(
      oracleAccount.metadata.isInitialized
    )
    expect(decoded.metadata.extraInfo).toStrictEqual(
      oracleAccount.metadata.extraInfo
    )
    expect(decoded.baseMint.toString()).toStrictEqual(
      oracleAccount.baseMint.toString()
    )
    expect(decoded.quoteMint.toString()).toStrictEqual(
      oracleAccount.quoteMint.toString()
    )

    for (let i = 0; i < 16; i++) {
      expect(decoded.priceSources[i]?.market.toString()).toStrictEqual(
        oracleAccount.priceSources[i]?.market.toString()
      )
      expect(decoded.priceSources[i]?.aggPrice.expo.toString()).toStrictEqual(
        oracleAccount.priceSources[i]?.aggPrice.expo.toString()
      )
      expect(decoded.priceSources[i]?.aggPrice.price.toString()).toStrictEqual(
        oracleAccount.priceSources[i]?.aggPrice.price.toString()
      )
      expect(decoded.priceSources[i]?.aggPrice.vol.toString()).toStrictEqual(
        oracleAccount.priceSources[i]?.aggPrice.vol.toString()
      )
      expect(decoded.priceSources[i]?.aggPrice.slot.toString()).toStrictEqual(
        oracleAccount.priceSources[i]?.aggPrice.slot.toString()
      )
      
      for (let j = 0; j < 25; i++) {
        expect(decoded.priceSources[i]?.prices[j]?.expo.toString()).toStrictEqual(
          oracleAccount.priceSources[i]?.prices[j]?.expo.toString()
        )
        expect(decoded.priceSources[i]?.prices[j]?.price.toString()).toStrictEqual(
          oracleAccount.priceSources[i]?.prices[j]?.price.toString()
        )
        expect(decoded.priceSources[i]?.prices[j]?.vol.toString()).toStrictEqual(
          oracleAccount.priceSources[i]?.prices[j]?.vol.toString()
        )
        expect(decoded.priceSources[i]?.prices[j]?.slot.toString()).toStrictEqual(
          oracleAccount.priceSources[i]?.prices[j]?.slot.toString()
        )
      }

      expect(decoded.priceSources[i]?.status.toString()).toStrictEqual(
        oracleAccount.priceSources[i]?.status.toString()
      )
      expect(decoded.priceSources[i]?.source.toString()).toStrictEqual(
        oracleAccount.priceSources[i]?.source.toString()
      )
      expect(decoded.priceSources[i]?.maxTolerance.toString()).toStrictEqual(
        oracleAccount.priceSources[i]?.maxTolerance.toString()
      )
      expect(decoded.priceSources[i]?.algorithm.toString()).toStrictEqual(
        oracleAccount.priceSources[i]?.algorithm.toString()
      )
    }

    expect(decoded.aggPrice.toString()).toStrictEqual(
      oracleAccount.aggPrice.toString()
    )
    expect(decoded.validSlot.toString()).toStrictEqual(
      oracleAccount.validSlot.toString()
    )
    expect(decoded.timestamp.toString()).toStrictEqual(
      oracleAccount.timestamp.toString()
    )
    expect(decoded.minPs.toString()).toStrictEqual(
      oracleAccount.minPs.toString()
    )
    expect(decoded.authority.toString()).toStrictEqual(
      oracleAccount.authority.toString()
    )
    expect(decoded.treasury.toString()).toStrictEqual(
      oracleAccount.treasury.toString()
    )
    expect(decoded.treasuryNonce.toString()).toStrictEqual(
      oracleAccount.treasuryNonce.toString()
    )
    expect(decoded.rewardMint.toString()).toStrictEqual(
      oracleAccount.rewardMint.toString()
    )
    expect(decoded.rewardMintNonce.toString()).toStrictEqual(
      oracleAccount.rewardMintNonce.toString()
    )
    expect(decoded.rewardBonus.toString()).toStrictEqual(
      oracleAccount.rewardBonus.toString()
    )
    expect(decoded.algorithm.toString()).toStrictEqual(
      oracleAccount.algorithm.toString()
    )
    expect(decoded.status.toString()).toStrictEqual(
      oracleAccount.status.toString()
    )
    expect(decoded.prevSlot.toString()).toStrictEqual(
      oracleAccount.prevSlot.toString()
    )
    expect(decoded.prevAggPrice.toString()).toStrictEqual(
      oracleAccount.prevAggPrice.toString()
    )
    expect(decoded.prevTimestamp.toString()).toStrictEqual(
      oracleAccount.prevTimestamp.toString()
    )
    expect(decoded.numPs.toString()).toStrictEqual(
      oracleAccount.numPs.toString()
    )
  })
})