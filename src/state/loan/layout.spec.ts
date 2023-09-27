import { PublicKey } from '@solana/web3.js'
import { LoanLayout, LoanStructure } from './layout'

describe('StakingStateLayout', () => {
  const loanAccount: LoanStructure = {
    metadata: {
      version: 0,
      dataType: 2,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    owner: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
    solCollateralAmount: BigInt(2000000000),
    stakingCollateralAmount: BigInt(0),
    marketPrice: BigInt(39),
    loanAmount: BigInt(13332942),
    penaltyHarvested: BigInt(0),
    penaltyToHarvest: BigInt(0),
    loanMint: new PublicKey('84Jh5LVD6R7oCES6tunvsYiBcrN1unTFXmHXjrGBaE7T'),
    creationDate: BigInt(1664479962),
    lastDayPenaltyWasChecked: BigInt(1664479962),
    collateralRate: 3,
    loanType: 0,
    repaid: false,
    padding: Array.from(Array(126).keys()).map(() => 0),
  }

  // onchain data: 3adZ2fPQ7MnACpgWmb8RXWSivDwy7WGs2NRLyz5Bkj4U
  const encodedData = Buffer.from(
    new Uint8Array([
      0, 2, 1, 0, 0, 0, 0, 0, 4, 239, 104, 212, 231, 140, 124, 88, 9, 18, 156,
      231, 76, 16, 190, 140, 86, 202, 248, 45, 181, 78, 193, 48, 7, 71, 69, 120,
      72, 15, 220, 81, 0, 148, 53, 119, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39,
      0, 0, 0, 0, 0, 0, 0, 206, 113, 203, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 104, 218, 141, 219, 50, 250, 141, 67, 9, 8, 106,
      75, 102, 15, 187, 76, 151, 96, 51, 114, 72, 218, 69, 225, 97, 67, 28, 53,
      85, 126, 219, 178, 218, 242, 53, 99, 0, 0, 0, 0, 218, 242, 53, 99, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
    ])
  )

  it('encodes a Loan Account object properly', () => {
    const encoded = Buffer.alloc(LoanLayout.span)
    LoanLayout.encode(loanAccount, encoded)
    expect(encoded).toStrictEqual(encodedData)
  })

  it('decodes a Uint8Array properly', () => {
    const decoded = LoanLayout.decode(encodedData)

    expect(decoded.metadata.version).toStrictEqual(loanAccount.metadata.version)
    expect(decoded.metadata.dataType).toStrictEqual(
      loanAccount.metadata.dataType
    )
    expect(decoded.metadata.isInitialized).toStrictEqual(
      loanAccount.metadata.isInitialized
    )
    expect(decoded.metadata.extraInfo).toStrictEqual(
      loanAccount.metadata.extraInfo
    )

    expect(decoded.owner.toString()).toStrictEqual(loanAccount.owner.toString())

    expect(decoded.solCollateralAmount.toString()).toStrictEqual(
      loanAccount.solCollateralAmount.toString()
    )
    expect(decoded.stakingCollateralAmount.toString()).toStrictEqual(
      loanAccount.stakingCollateralAmount.toString()
    )
    expect(decoded.marketPrice.toString()).toStrictEqual(
      loanAccount.marketPrice.toString()
    )
    expect(decoded.loanAmount.toString()).toStrictEqual(
      loanAccount.loanAmount.toString()
    )
    expect(decoded.penaltyHarvested.toString()).toStrictEqual(
      loanAccount.penaltyHarvested.toString()
    )
    expect(decoded.penaltyToHarvest.toString()).toStrictEqual(
      loanAccount.penaltyToHarvest.toString()
    )
    expect(decoded.loanMint.toString()).toStrictEqual(
      loanAccount.loanMint.toString()
    )
    expect(decoded.creationDate.toString()).toStrictEqual(
      loanAccount.creationDate.toString()
    )
    expect(decoded.lastDayPenaltyWasChecked.toString()).toStrictEqual(
      loanAccount.lastDayPenaltyWasChecked.toString()
    )
    expect(decoded.loanType.toString()).toStrictEqual(
      loanAccount.loanType.toString()
    )
    expect(decoded.repaid.toString()).toStrictEqual(
      loanAccount.repaid.toString()
    )

    expect(decoded.padding).toStrictEqual(loanAccount.padding)
  })
})
