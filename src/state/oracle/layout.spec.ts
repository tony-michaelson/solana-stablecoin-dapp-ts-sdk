import { PublicKey } from '@solana/web3.js'
import { OracleAccountLayout, OracleStructure } from './layout'

describe('OracleAccount', () => {
  const oracleAccount: OracleStructure = {
    metadata: {
      version: 0,
      dataType: 10,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    market: new PublicKey('BArVofmZ7jg6EjEBXN3PCw7NHr7Mde7krkxk7CDm166X'),
    raydiumAmm: new PublicKey('7hwQD5YnNtzubWETvRHoRk4sGSXb5FntJWUXw3QJuDKG'),
    orcaPool: new PublicKey('BB9wHaAAKohNh6oNzuAmhUXCtNVru63Jy2urX6nWbGN5'),
    baseMint: new PublicKey('So11111111111111111111111111111111111111112'),
    quoteMint: new PublicKey('84Jh5LVD6R7oCES6tunvsYiBcrN1unTFXmHXjrGBaE7T'),
    prices: [
      {
        slot: BigInt('165174114'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174115'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174119'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174123'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174124'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174127'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174130'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174132'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174133'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174137'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174138'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174141'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174142'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174144'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174090'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174092'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174095'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174098'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174100'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174101'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174104'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174105'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174106'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174110'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
      {
        slot: BigInt('165174111'),
        price: BigInt('40001659'),
        vol: BigInt('9'),
        expo: 6,
        padding: 0,
      },
    ],
    aggPrice: BigInt('40001659'),
    lowestSlot: BigInt('165174130'),
    orcaVol: BigInt('0'),
    raydiumVol: BigInt('9'),
    expo: 6,
    valid: 1,
    oracleMarket: 4,
    padding: Array.from(Array(130).keys()).map(() => 0),
  }

  const encodedData = Buffer.from(
    new Uint8Array([
      0, 10, 1, 0, 0, 0, 0, 0, 151, 27, 16, 4, 64, 111, 117, 160, 75, 170, 163,
      30, 154, 220, 234, 189, 240, 145, 212, 15, 39, 64, 1, 178, 81, 65, 234,
      152, 210, 237, 77, 244, 99, 162, 221, 70, 145, 41, 122, 166, 107, 169,
      131, 152, 166, 122, 52, 249, 167, 107, 179, 124, 108, 209, 88, 18, 169,
      88, 8, 104, 44, 208, 204, 227, 151, 46, 200, 1, 200, 146, 128, 79, 35, 52,
      26, 10, 31, 66, 5, 128, 247, 240, 69, 85, 11, 244, 26, 171, 255, 100, 167,
      2, 82, 148, 82, 98, 6, 155, 136, 87, 254, 171, 129, 132, 251, 104, 127,
      99, 70, 24, 192, 53, 218, 196, 57, 220, 26, 235, 59, 85, 152, 160, 240, 0,
      0, 0, 0, 1, 104, 218, 141, 219, 50, 250, 141, 67, 9, 8, 106, 75, 102, 15,
      187, 76, 151, 96, 51, 114, 72, 218, 69, 225, 97, 67, 28, 53, 85, 126, 219,
      178, 98, 91, 216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0,
      0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 99, 91, 216, 9, 0, 0, 0, 0, 123, 96,
      98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 103,
      91, 216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0,
      0, 6, 0, 0, 0, 0, 0, 0, 0, 107, 91, 216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0,
      0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 108, 91, 216, 9,
      0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0,
      0, 0, 0, 0, 0, 111, 91, 216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9,
      0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 114, 91, 216, 9, 0, 0, 0, 0,
      123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0,
      0, 116, 91, 216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0,
      0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 117, 91, 216, 9, 0, 0, 0, 0, 123, 96, 98,
      2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 121, 91,
      216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6,
      0, 0, 0, 0, 0, 0, 0, 122, 91, 216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0,
      0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 125, 91, 216, 9, 0, 0,
      0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0,
      0, 0, 0, 126, 91, 216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0,
      0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 128, 91, 216, 9, 0, 0, 0, 0, 123,
      96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 74,
      91, 216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0,
      0, 6, 0, 0, 0, 0, 0, 0, 0, 76, 91, 216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0,
      0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 79, 91, 216, 9,
      0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0,
      0, 0, 0, 0, 0, 82, 91, 216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9,
      0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 84, 91, 216, 9, 0, 0, 0, 0,
      123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0,
      0, 85, 91, 216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0,
      0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 88, 91, 216, 9, 0, 0, 0, 0, 123, 96, 98,
      2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 89, 91,
      216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6,
      0, 0, 0, 0, 0, 0, 0, 90, 91, 216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0,
      0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 94, 91, 216, 9, 0, 0,
      0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0,
      0, 0, 0, 95, 91, 216, 9, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 9, 0, 0,
      0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 123, 96, 98, 2, 0, 0, 0, 0, 114,
      91, 216, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6,
      0, 0, 0, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
  )

  it('encodes an OracleAccount object properly', () => {
    const encoded = Buffer.alloc(OracleAccountLayout.span)
    OracleAccountLayout.encode(oracleAccount, encoded)
    expect(encoded).toStrictEqual(encodedData)
  })

  it('decodes a Uint8Array properly', () => {
    const decoded = OracleAccountLayout.decode(encodedData)

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
    expect(decoded.market.toString()).toStrictEqual(
      oracleAccount.market.toString()
    )
    expect(decoded.raydiumAmm.toString()).toStrictEqual(
      oracleAccount.raydiumAmm.toString()
    )
    expect(decoded.orcaPool.toString()).toStrictEqual(
      oracleAccount.orcaPool.toString()
    )
    expect(decoded.baseMint.toString()).toStrictEqual(
      oracleAccount.baseMint.toString()
    )
    expect(decoded.quoteMint.toString()).toStrictEqual(
      oracleAccount.quoteMint.toString()
    )

    for (let i = 0; i < 20; i++) {
      expect(decoded.prices[i]?.slot.toString()).toStrictEqual(
        oracleAccount.prices[i]?.slot.toString()
      )
      expect(decoded.prices[i]?.price.toString()).toStrictEqual(
        oracleAccount.prices[i]?.price.toString()
      )
      expect(decoded.prices[i]?.vol.toString()).toStrictEqual(
        oracleAccount.prices[i]?.vol.toString()
      )
      expect(decoded.prices[i]?.expo.toString()).toStrictEqual(
        oracleAccount.prices[i]?.expo.toString()
      )
      expect(decoded.prices[i]?.padding.toString()).toStrictEqual(
        oracleAccount.prices[i]?.padding.toString()
      )
    }

    expect(decoded.prices.length).toStrictEqual(25)

    expect(decoded.aggPrice.toString()).toStrictEqual(
      oracleAccount.aggPrice.toString()
    )
    expect(decoded.lowestSlot.toString()).toStrictEqual(
      oracleAccount.lowestSlot.toString()
    )
    expect(decoded.orcaVol.toString()).toStrictEqual(
      oracleAccount.orcaVol.toString()
    )
    expect(decoded.raydiumVol.toString()).toStrictEqual(
      oracleAccount.raydiumVol.toString()
    )

    expect(decoded.expo.toString()).toStrictEqual(oracleAccount.expo.toString())
    expect(decoded.valid.toString()).toStrictEqual(
      oracleAccount.valid.toString()
    )
    expect(decoded.oracleMarket.toString()).toStrictEqual(
      oracleAccount.oracleMarket.toString()
    )

    expect(decoded.padding).toStrictEqual(oracleAccount.padding)
  })
})
