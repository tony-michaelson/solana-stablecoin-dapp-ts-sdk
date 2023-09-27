import { Connection, PublicKey } from '@solana/web3.js'
import { Lucra } from '../../../src/lucra'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Get Stake Accounts', () => {
  jest.setTimeout(45 * 1000)
  const lucra = new Lucra(connection)
  const stakeBalance = new PublicKey(
    'DNUmopJovw52nxkzgdTsZjpSbt6Rv9TwvbfHSfdSfRvc'
  )

  it('Get PendingWithdrawalAccount List for StakeAccount', async () => {
    const pendingAccounts = await lucra.getPendingWithdrawalAccounts(
      stakeBalance
    )

    expect(pendingAccounts.length).toBeGreaterThan(0)
    if (pendingAccounts[0]) {
      expect(pendingAccounts[0].stakeBalance.toString()).toStrictEqual(
        stakeBalance.toString()
      )
    }
  })
})
