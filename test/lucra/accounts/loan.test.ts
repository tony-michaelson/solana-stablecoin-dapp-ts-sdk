import { Connection, PublicKey } from '@solana/web3.js'
import { Lucra } from '../../../src/lucra'
import { LoanStructure } from '../../../src/state/loan'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Mata Loan Account', () => {
  const lucra = new Lucra(connection)
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

  it('decodes data from Loan Account onchain', async () => {
    const loanAccountKey = new PublicKey(
      '3adZ2fPQ7MnACpgWmb8RXWSivDwy7WGs2NRLyz5Bkj4U'
    )
    const decoded = await lucra.getLoanAccount(loanAccountKey)

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
