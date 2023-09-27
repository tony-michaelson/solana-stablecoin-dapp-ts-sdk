import { Keypair, PublicKey } from '@solana/web3.js'
import { LUCRA_MAINNET_CONFIG } from '../constants'
import {
  generateRewardAccountKP,
  generateRewardAccountPkList,
  generateSeeds,
  generateStakeAccountKP,
} from './common'

describe('Common.ts', () => {
  it('generateSeeds(seedAccount, seedKey, seedText)', () => {
    const account = Keypair.generate()
    const seedKey = Keypair.generate()
    const seedText = 'seedText'
    const seeds = generateSeeds(
      [account.publicKey, seedKey.publicKey],
      seedText
    )

    const expected = [
      account.publicKey.toBuffer(),
      seedKey.publicKey.toBuffer(),
      Buffer.from(seedText),
    ]

    expect(seeds).toStrictEqual(expected)
  })

  it('generateSeeds(seedAccount, undefined, seedText)', () => {
    const account = Keypair.generate()
    const seedText = 'seedText'
    const seeds = generateSeeds([account.publicKey], seedText)

    const expected = [account.publicKey.toBuffer(), Buffer.from(seedText)]

    expect(seeds).toStrictEqual(expected)
  })

  it('generateSeeds(seedAccount, seedKey)', () => {
    const account = Keypair.generate()
    const seedKey = Keypair.generate()
    const seeds = generateSeeds([account.publicKey, seedKey.publicKey])

    const expected = [
      account.publicKey.toBuffer(),
      seedKey.publicKey.toBuffer(),
    ]

    expect(seeds).toStrictEqual(expected)
  })

  it('generateSeeds(seedAccount)', () => {
    const account = Keypair.generate()
    const seeds = generateSeeds([account.publicKey])

    const expected = [account.publicKey.toBuffer()]

    expect(seeds).toStrictEqual(expected)
  })

  it('generateRewardAccountKP(config, 0)', async () => {
    const seeds = generateSeeds([LUCRA_MAINNET_CONFIG.account.stake], 'reward0')
    const [seedKey] = await PublicKey.findProgramAddress(
      seeds,
      LUCRA_MAINNET_CONFIG.programId
    )
    const expected = Keypair.fromSeed(seedKey.toBytes())

    const rewardAccountKP = await generateRewardAccountKP(
      LUCRA_MAINNET_CONFIG,
      0
    )

    expect(rewardAccountKP.publicKey.toString()).toStrictEqual(
      expected.publicKey.toString()
    )
  })

  it('generateRewardAccountKP(config, 0) is always the same output', async () => {
    const expected = await generateRewardAccountKP(LUCRA_MAINNET_CONFIG, 0)
    for (let i = 0; i < 100; i++) {
      const rewardAccountKP = await generateRewardAccountKP(
        LUCRA_MAINNET_CONFIG,
        0
      )

      expect(rewardAccountKP.publicKey.toString()).toStrictEqual(
        expected.publicKey.toString()
      )
    }
  })

  it('generateRewardAccountKP produces different keys for different cursors', async () => {
    const account1 = await generateRewardAccountKP(LUCRA_MAINNET_CONFIG, 0)
    const account2 = await generateRewardAccountKP(LUCRA_MAINNET_CONFIG, 1)

    expect(account1.publicKey.toString()).not.toStrictEqual(
      account2.publicKey.toString()
    )
  })

  it('generateRewardAccountPkList(config, 0, 111) is deterministic', async () => {
    const start = 0
    const end = 111
    const expected = []
    for (let i = start; i <= end; i++) {
      const a = await generateRewardAccountKP(LUCRA_MAINNET_CONFIG, i)
      expected.push(a.publicKey)
    }

    const accounts = await generateRewardAccountPkList(
      LUCRA_MAINNET_CONFIG,
      start,
      end
    )

    expect(accounts).toStrictEqual(expected)
    expect(accounts.length).toStrictEqual(112)
  })

  it('generateRewardAccountPkList(config, 122, 222) matches big range', async () => {
    const start = 122
    const end = 222
    const expected = []
    for (let i = start; i <= end; i++) {
      const a = await generateRewardAccountKP(LUCRA_MAINNET_CONFIG, i)
      expected.push(a.publicKey)
    }

    const accounts = await generateRewardAccountPkList(
      LUCRA_MAINNET_CONFIG,
      start,
      end
    )

    expect(accounts).toStrictEqual(expected)
    expect(accounts.length).toStrictEqual(101)
  })

  it('generateStakeAccountKP produces same keys for same wallets', async () => {
    const wallet = Keypair.generate().publicKey
    const [account1] = await generateStakeAccountKP(
      LUCRA_MAINNET_CONFIG,
      wallet
    )
    const [account2] = await generateStakeAccountKP(
      LUCRA_MAINNET_CONFIG,
      wallet
    )

    expect(account1.publicKey.toString()).toStrictEqual(
      account2.publicKey.toString()
    )
  })

  it('generateStakeAccountKP produces different keys for diffirent wallets', async () => {
    const wallet1 = Keypair.generate().publicKey
    const wallet2 = Keypair.generate().publicKey

    const [account1] = await generateStakeAccountKP(
      LUCRA_MAINNET_CONFIG,
      wallet1
    )
    const [account2] = await generateStakeAccountKP(
      LUCRA_MAINNET_CONFIG,
      wallet2
    )

    expect(account1.publicKey.toString()).not.toStrictEqual(
      account2.publicKey.toString()
    )
  })
})
