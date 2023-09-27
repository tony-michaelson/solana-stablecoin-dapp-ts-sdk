import { Connection, PublicKey } from '@solana/web3.js'
import { Bond } from '../../src/bond'
import { BondStructure } from '../../src/state/bond'
import { I80F48 } from '../../src/utils/fixednum'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Mata Loan Account', () => {
  const bondProgram = new Bond(connection)
  const bondAccount: BondStructure = {
    metadata: {
      version: 0,
      dataType: 1,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    owner: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
    bondSystem: new PublicKey('EJEGsW6UQifARhPiPGGi2uRpou3fsF89faXGzdzMTkeX'),
    lpTokenMint: new PublicKey('AHdnXA9HvGLkH5gBCFbyMEjC8SR67Nwkd3gY37jrHZ6t'),
    lpTokenAmount: BigInt(1000),
    totalValue: I80F48.fromString('0.0000045096195471217'),
    suppliedValue: I80F48.fromString('0.00000413726564119088'),
    bondYield: I80F48.fromString('0.00000037235390593082'),
    timestamp: BigInt('1664387940'),
    exercised: false,
    padding: Array.from(Array(135).keys()).map(() => 0),
  }

  it('decodes data from Bond Account onchain', async () => {
    const bondAccountKey = new PublicKey(
      'EYhMBqrEYwpBD23dGkUg9h8Aokbjs7rDz1VjRgVaRRRB'
    )
    const decoded = await bondProgram.getBondAccount(bondAccountKey)

    expect(decoded.metadata.version).toStrictEqual(bondAccount.metadata.version)
    expect(decoded.metadata.dataType).toStrictEqual(
      bondAccount.metadata.dataType
    )
    expect(decoded.metadata.isInitialized).toStrictEqual(
      bondAccount.metadata.isInitialized
    )
    expect(decoded.metadata.extraInfo).toStrictEqual(
      bondAccount.metadata.extraInfo
    )

    expect(decoded.owner.toString()).toStrictEqual(bondAccount.owner.toString())
    expect(decoded.bondSystem.toString()).toStrictEqual(
      bondAccount.bondSystem.toString()
    )
    expect(decoded.lpTokenMint.toString()).toStrictEqual(
      bondAccount.lpTokenMint.toString()
    )
    expect(decoded.lpTokenAmount.toString()).toStrictEqual(
      bondAccount.lpTokenAmount.toString()
    )
    expect(decoded.totalValue.toString()).toStrictEqual(
      bondAccount.totalValue.toString()
    )
    expect(decoded.suppliedValue.toString()).toStrictEqual(
      bondAccount.suppliedValue.toString()
    )
    expect(decoded.bondYield.toString()).toStrictEqual(
      bondAccount.bondYield.toString()
    )
    expect(decoded.timestamp.toString()).toStrictEqual(
      bondAccount.timestamp.toString()
    )
    expect(decoded.exercised.toString()).toStrictEqual(
      bondAccount.exercised.toString()
    )

    expect(decoded.padding).toStrictEqual(bondAccount.padding)
  })
})
