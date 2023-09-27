import { Connection, PublicKey } from '@solana/web3.js'
import { Lucra } from '../../../src'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Price History', () => {
  const lucra = new Lucra(connection)
  const priceHistory = {
    account: new PublicKey('pKSaSRdHkvAHMEV9twvP4NrMtpqzGSSMmZ3WVkrH9hP'),
    metadata: {
      version: 0,
      dataType: 14,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    prices: [
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
      {
        solPrice: BigInt(0),
        lucraPrice: BigInt(0),
        date: BigInt(0),
        solDecimals: 0,
        lucraDecimals: 0,
        padding: [0, 0, 0, 0, 0, 0],
      },
    ],
    intervalStart: BigInt(1664312280),
    lastUpdateTimestamp: BigInt(0),
    updateCounter: 0,
    padding: Array.from(Array(132).keys()).map(() => 0),
  }

  it('decodes price history account properly', async () => {
    const decoded = await lucra.getPriceHistoryAccount(
      lucra.config.account.priceHistory
    )

    expect(decoded.metadata.version).toStrictEqual(
      priceHistory.metadata.version
    )
    expect(decoded.metadata.dataType).toStrictEqual(
      priceHistory.metadata.dataType
    )
    expect(decoded.metadata.isInitialized).toStrictEqual(
      priceHistory.metadata.isInitialized
    )
    expect(decoded.metadata.extraInfo).toStrictEqual(
      priceHistory.metadata.extraInfo
    )

    expect(decoded.account.toString()).toStrictEqual(
      priceHistory.account.toString()
    )

    expect(decoded.prices[0]?.date.toString()).toMatch(/\d+/)
    expect(decoded.prices[0]?.lucraDecimals.toString()).toMatch(/\d+/)
    expect(decoded.prices[0]?.lucraPrice.toString()).toMatch(/\d+/)
    expect(decoded.prices[0]?.solDecimals.toString()).toMatch(/\d+/)
    expect(decoded.prices[0]?.solPrice.toString()).toMatch(/\d+/)
    expect(decoded.prices[0]?.padding).toStrictEqual([0, 0, 0, 0, 0, 0])

    expect(decoded.intervalStart.toString()).toStrictEqual(
      priceHistory.intervalStart.toString()
    )
    expect(decoded.lastUpdateTimestamp.toString()).toStrictEqual(
      priceHistory.lastUpdateTimestamp.toString()
    )
    expect(decoded.updateCounter.toString()).toStrictEqual(
      priceHistory.updateCounter.toString()
    )

    expect(decoded.padding).toStrictEqual(priceHistory.padding)
  })
})
