import { Connection, PublicKey } from '@solana/web3.js'
import { Lucra } from '../../../src'
import { OraclePrice } from '../../../src/state/common'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

function generatePricesList(): OraclePrice[] {
  const prices: OraclePrice[] = []
  for (let i = 0; i < 25; i++) {
    prices.push({
      slot: BigInt('0'),
      price: BigInt('0'),
      vol: BigInt('9'),
      expo: 6,
      padding: 0,
    })
  }
  return prices
}

describe('Oracle', () => {
  const lucra = new Lucra(connection)

  const prices: OraclePrice[] = generatePricesList()

  const oracleAccount = {
    account: new PublicKey('oDGkRKuiPyxKgsKgqYuTW1qxZ4bpdqogginPr5wgueS'),
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
    prices,
    aggPrice: BigInt('40001659'),
    lowestSlot: BigInt('165174130'),
    orcaVol: BigInt('0'),
    raydiumVol: BigInt('9'),
    expo: 6,
    valid: 1,
    oracleMarket: 4,
    padding: Array.from(Array(130).keys()).map(() => 0),
  }

  it('decodes oracle account', async () => {
    const decoded = await lucra.getOracleAccount(
      lucra.config.oracle.SOL_MATA.account
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

    expect(decoded.account.toString()).toStrictEqual(
      oracleAccount.account.toString()
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

    expect(decoded.prices[0]?.slot.toString()).toMatch(/\d+/)
    expect(decoded.prices[0]?.price.toString()).toMatch(/\d+/)
    expect(decoded.prices[0]?.vol.toString()).toStrictEqual('9')
    expect(decoded.prices[0]?.expo.toString()).toStrictEqual('6')
    expect(decoded.prices[0]?.padding.toString()).toStrictEqual('0')

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
