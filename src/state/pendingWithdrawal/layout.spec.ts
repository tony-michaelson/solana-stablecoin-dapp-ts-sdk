import { PublicKey } from '@solana/web3.js'
import {
  PendingWithdrawalAccountLayout,
  PendingWithdrawalStructure,
} from './layout'

describe('PendingWithdrawalLayout', () => {
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

  // onchain data: J36nAGdJ7sgH7D2xFe7d5gszW8XxfbWomPTzgGtZ9TEJ
  const encodedData = Buffer.from(
    new Uint8Array([
      0, 5, 1, 0, 0, 0, 0, 0, 183, 204, 215, 181, 156, 32, 63, 214, 127, 17,
      205, 22, 212, 235, 52, 147, 154, 99, 34, 105, 240, 192, 135, 219, 46, 80,
      123, 173, 47, 140, 138, 133, 232, 42, 59, 99, 0, 0, 0, 0, 233, 42, 59, 99,
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    ])
  )

  it('encodes a PendingAccount object properly', () => {
    const encoded = Buffer.alloc(PendingWithdrawalAccountLayout.span)
    PendingWithdrawalAccountLayout.encode(pendingAccount, encoded)
    expect(encoded).toStrictEqual(encodedData)
  })

  it('decodes a Uint8Array properly', () => {
    const decoded = PendingWithdrawalAccountLayout.decode(encodedData)

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
