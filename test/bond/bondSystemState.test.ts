import { Connection, PublicKey } from '@solana/web3.js'
import { Bond } from '../../src/bond'
import { BondSystemStructure } from '../../src/state/bondSystem'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('bondSystemState', () => {
  const bondProgram = new Bond(connection)
  const bondSystem: BondSystemStructure = {
    metadata: {
      version: 0,
      dataType: 2,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    authority: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
    poolState: new PublicKey('7hwQD5YnNtzubWETvRHoRk4sGSXb5FntJWUXw3QJuDKG'),
    commonMint: new PublicKey('So11111111111111111111111111111111111111112'),
    treasuryOracle: {
      some: new PublicKey('oSw5SJXdXx8RnZYCNPLBao2NGouoo9DcK43jFhTvrZc'),
    },
    bondYield: 150994944,
    closed: false,
    padding0: [0, 0, 0],
    vaultBumpSeed: 254,
    treasuryBumpSeed: 253,
    baseOracle: { none: [] },
    poolType: 1,
    paused: false,
    padding1: [0, 0, 0, 0, 0],
    quoteOracle: {
      some: new PublicKey('oDGkRKuiPyxKgsKgqYuTW1qxZ4bpdqogginPr5wgueS'),
    },
    padding2: [0, 0, 0, 0, 0, 0, 0],
    vaultMint: new PublicKey('EapkuuX8uwMSLfsbY8SA4166rAjotgYTQY521z3T31ti'),
    vault: new PublicKey('36vUWXAxr18PkTuCCfBZvGcZJNQRYXUV91HMjYfg1GGP'),
    treasuryMint: new PublicKey('D96AEwfFTJ7EJZJr8mtELyk2JykQZJMfxEM3CFN5CKVt'),
    treasury: new PublicKey('EgEb1sfTJ2PuiU1wFHmS5zA3nxxa9W6xRSkEUJQjTPR4'),
    padding3: [0, 0, 0, 0, 0],
    startOfEpoch: BigInt('1664383852'),
    timelock: BigInt('1'),
    epoch: BigInt('1'),
    totalAmountToDistribute: BigInt('1000000000000000'),
    maxAmountToDistributePerEpoch: BigInt('1000000000000000'),
    maxAllowedToDistributeAtOneTime: BigInt('1000000000000000'),
    estimatedAmountDistributed: BigInt('0'),
    estimatedAmountDistributedThisEpoch: BigInt('0'),
    totalAmountDistributed: BigInt('0'),
    padding4: Array.from(Array(256).keys()).map(() => 0),
  }

  it('decodes data from Bond System Account onchain', async () => {
    const bondSystemAccount = new PublicKey(
      '3uw2fnoTxpuBwKFUoDHSrig3xHL1Dp4ujATFLvuD4r6T'
    )
    const decoded = await bondProgram.getBondSystemAccount(bondSystemAccount)

    expect(decoded.metadata.version).toStrictEqual(0)
    expect(decoded.metadata.dataType).toStrictEqual(2)
    expect(decoded.metadata.isInitialized).toStrictEqual(true)
    expect(decoded.metadata.extraInfo).toStrictEqual([0, 0, 0, 0, 0])

    expect(decoded.authority.toString()).toStrictEqual(
      bondSystem.authority.toString()
    )
    expect(decoded.poolState.toString()).toStrictEqual(
      bondSystem.poolState.toString()
    )
    expect(decoded.commonMint.toString()).toStrictEqual(
      bondSystem.commonMint.toString()
    )
    expect(decoded.treasuryOracle.toString()).toStrictEqual(
      bondSystem.treasuryOracle.toString()
    )
    expect(decoded.bondYield.toString()).toStrictEqual(
      bondSystem.bondYield.toString()
    )
    expect(decoded.closed.toString()).toStrictEqual(
      bondSystem.closed.toString()
    )
    expect(decoded.padding0.toString()).toStrictEqual(
      bondSystem.padding0.toString()
    )
    expect(decoded.vaultBumpSeed.toString()).toStrictEqual(
      bondSystem.vaultBumpSeed.toString()
    )
    expect(decoded.treasuryBumpSeed.toString()).toStrictEqual(
      bondSystem.treasuryBumpSeed.toString()
    )
    expect(decoded.baseOracle.toString()).toStrictEqual(
      bondSystem.baseOracle.toString()
    )
    expect(decoded.poolType.toString()).toStrictEqual(
      bondSystem.poolType.toString()
    )
    expect(decoded.paused.toString()).toStrictEqual(
      bondSystem.paused.toString()
    )
    expect(decoded.padding1).toStrictEqual(bondSystem.padding1)
    expect(decoded.quoteOracle.toString()).toStrictEqual(
      bondSystem.quoteOracle.toString()
    )
    expect(decoded.padding2).toStrictEqual(bondSystem.padding2)
    expect(decoded.vaultMint.toString()).toStrictEqual(
      bondSystem.vaultMint.toString()
    )
    expect(decoded.vault.toString()).toStrictEqual(bondSystem.vault.toString())
    expect(decoded.treasuryMint.toString()).toStrictEqual(
      bondSystem.treasuryMint.toString()
    )
    expect(decoded.treasury.toString()).toStrictEqual(
      bondSystem.treasury.toString()
    )
    expect(decoded.padding3).toStrictEqual(bondSystem.padding3)
    expect(decoded.startOfEpoch.toString()).toStrictEqual(
      bondSystem.startOfEpoch.toString()
    )
    expect(decoded.timelock.toString()).toStrictEqual(
      bondSystem.timelock.toString()
    )
    expect(decoded.epoch.toString()).toStrictEqual(bondSystem.epoch.toString())
    expect(decoded.totalAmountToDistribute.toString()).toStrictEqual(
      bondSystem.totalAmountToDistribute.toString()
    )
    expect(decoded.maxAmountToDistributePerEpoch.toString()).toStrictEqual(
      bondSystem.maxAmountToDistributePerEpoch.toString()
    )
    expect(decoded.maxAllowedToDistributeAtOneTime.toString()).toStrictEqual(
      bondSystem.maxAllowedToDistributeAtOneTime.toString()
    )
    expect(decoded.estimatedAmountDistributed.toString()).toStrictEqual(
      bondSystem.estimatedAmountDistributed.toString()
    )
    expect(
      decoded.estimatedAmountDistributedThisEpoch.toString()
    ).toStrictEqual(bondSystem.estimatedAmountDistributedThisEpoch.toString())
    expect(decoded.totalAmountDistributed.toString()).toStrictEqual(
      bondSystem.totalAmountDistributed.toString()
    )
    expect(decoded.padding4).toStrictEqual(bondSystem.padding4)
  })
})
