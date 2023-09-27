import { Connection, PublicKey } from '@solana/web3.js'
import { Lucra } from '../../../src/lucra'
import { ArbStateStructure } from '../../../src/state/arbState'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('arbState', () => {
  const lucra = new Lucra(connection)

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
      { date: BigInt('0'), limit: BigInt('0') },
    ],
    aggLimit: BigInt('10000'),
    dailyLimit: BigInt('10000'),
    startOfDayTimestamp: BigInt('1664236800'),
    state: 0,
    padding3: Array.from(Array(256).keys()).map(() => 0),
  }

  it('decodes data from Arb State Account onchain', async () => {
    const arbStateAccountKey = new PublicKey(
      'DjNedom14ZujT9FMuM15K4wGv65JqSBgRZPTu5LHZqrg'
    )
    const decoded = await lucra.getArbStateAccount(arbStateAccountKey)

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

    expect(decoded.aggLimit).toStrictEqual(arbStateAccount.aggLimit)

    expect(decoded.dailyLimit).toStrictEqual(arbStateAccount.dailyLimit)

    expect(decoded.startOfDayTimestamp).toStrictEqual(
      arbStateAccount.startOfDayTimestamp
    )

    expect(decoded.state).toStrictEqual(arbStateAccount.state)

    expect(decoded.padding3).toStrictEqual(arbStateAccount.padding3)
  })
})
