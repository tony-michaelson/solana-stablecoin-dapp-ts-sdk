import { PublicKey } from '@solana/web3.js'
import { I80F48 } from '../../utils/fixednum'
import { BondAccountLayout, BondStructure } from './'

describe('BondAccountLayout', () => {
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

  // EYhMBqrEYwpBD23dGkUg9h8Aokbjs7rDz1VjRgVaRRRB
  const encodedData = Buffer.from(
    new Uint8Array([
      0, 1, 1, 0, 0, 0, 0, 0, 4, 239, 104, 212, 231, 140, 124, 88, 9, 18, 156,
      231, 76, 16, 190, 140, 86, 202, 248, 45, 181, 78, 193, 48, 7, 71, 69, 120,
      72, 15, 220, 81, 197, 145, 207, 245, 158, 167, 186, 163, 68, 10, 216, 130,
      78, 54, 192, 56, 70, 107, 189, 97, 91, 253, 120, 35, 145, 67, 225, 202,
      62, 251, 161, 252, 137, 252, 17, 105, 172, 234, 88, 68, 230, 195, 92, 249,
      229, 31, 255, 250, 52, 237, 106, 255, 13, 229, 146, 242, 74, 74, 116, 240,
      127, 151, 28, 37, 232, 3, 0, 0, 0, 0, 0, 0, 33, 171, 168, 75, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 174, 107, 105, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 115, 63, 63, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 139, 52,
      99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
  )

  it('encodes a BondAccount object properly', () => {
    const encoded = Buffer.alloc(BondAccountLayout.span)
    BondAccountLayout.encode(bondAccount, encoded)
    expect(encoded).toStrictEqual(encodedData)
  })

  it('decodes a Uint8Array properly', () => {
    const decoded = BondAccountLayout.decode(encodedData)
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
