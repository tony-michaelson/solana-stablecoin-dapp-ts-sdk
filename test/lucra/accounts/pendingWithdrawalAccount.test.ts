import { Connection, PublicKey } from '@solana/web3.js'
import { Lucra } from '../../../src/lucra'
import { PendingWithdrawalStructure } from '../../../src/state/pendingWithdrawal'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Stake Account', () => {
  const lucra = new Lucra(connection)
  const pendingAccount: PendingWithdrawalStructure = {
    metadata: {
      version: 0,
      dataType: 5,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    stakeBalance: new PublicKey('DNUmopJovw52nxkzgdTsZjpSbt6Rv9TwvbfHSfdSfRvc'),
    startTimestamp: BigInt(1664821992),
    endTimestamp: BigInt(1664821993),
    lucra: BigInt(1),
  }

  it('decodes data from Stake Account onchain', async () => {
    const pendingAccountKey = new PublicKey(
      '36h3DHa5hu4oxdjesu9RzxHhqFHXKfUzHg6ongh3XLfY'
    )
    const decoded = await lucra.getPendingWithdrawalAccount(pendingAccountKey)

    expect(decoded.metadata.version).toStrictEqual(
      pendingAccount.metadata.version
    )
    expect(decoded.metadata.dataType).toStrictEqual(
      pendingAccount.metadata.dataType
    )
    expect(decoded.metadata.isInitialized).toStrictEqual(
      pendingAccount.metadata.isInitialized
    )
    expect(decoded.metadata.extraInfo).toStrictEqual(
      pendingAccount.metadata.extraInfo
    )
    expect(decoded.account.toString()).toStrictEqual(
      pendingAccountKey.toString()
    )
    expect(decoded.stakeBalance.toString()).toStrictEqual(
      pendingAccount.stakeBalance.toString()
    )
    expect(decoded.startTimestamp.toString()).toStrictEqual(
      pendingAccount.startTimestamp.toString()
    )
    expect(decoded.endTimestamp.toString()).toStrictEqual(
      pendingAccount.endTimestamp.toString()
    )
    expect(decoded.lucra.toString()).toStrictEqual(
      pendingAccount.lucra.toString()
    )
  })
})
