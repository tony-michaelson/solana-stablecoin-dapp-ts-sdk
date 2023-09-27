import {
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js'
import {
  createKeypairFromFile,
  getPubkeyForEnv,
  waitFor,
  waitForTransaction,
  watchTransaction,
} from '../lib'
import { Bond } from '../../src/bond'
import { LUCRA_CONFIG } from '../../src/constants'
import {
  BondSystemSettings,
  PoolType,
  BondSystem,
  BondTestSignatures,
} from '../../src/types/bond'
import { transfer } from '@solana/spl-token'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('orcaBondSystem', () => {
  jest.setTimeout(300 * 1000)
  const bondProgram = new Bond(connection)
  const bondSystemAcctKP = Keypair.generate()
  const lpTokenVaultKP = Keypair.generate()
  const treasuryKP = Keypair.generate()
  const treasuryMint = LUCRA_CONFIG.mint.lucra.address
  const bondAcctKP = Keypair.generate()

  const orcaTokenAccount = getPubkeyForEnv(process.env['ORCA_LP_TOKEN_ACCOUNT'])
  const lucraAccount = getPubkeyForEnv(process.env['LUCRA_ATA'])
  const lucraBondTrsySource = getPubkeyForEnv(
    process.env['BOND_TREASURY_LUCRA_SOURCE_ACCOUNT']
  )
  const altLucraATA = getPubkeyForEnv(process.env['ALT_LUCRA_ATA'])
  const lpMint = getPubkeyForEnv(process.env['LP_MINT'])
  const baseMint = getPubkeyForEnv(process.env['BASE_MINT'])
  const quoteMint = getPubkeyForEnv(process.env['QUOTE_MINT'])
  const poolStateAccount = getPubkeyForEnv(process.env['POOL_STATE_ACCOUNT'])
  const baseVault = getPubkeyForEnv(process.env['BASE_VAULT'])
  const quoteVault = getPubkeyForEnv(process.env['QUOTE_VAULT'])

  const treasuryOracle = LUCRA_CONFIG.oracle.LUCRA_SOL.account
  const baseOracle = LUCRA_CONFIG.oracle.LUCRA_SOL.account

  const bondSystem: BondSystem = {
    account: bondSystemAcctKP.publicKey,
    name: '',
    provider: 'ORCA',
    treasury: treasuryKP.publicKey,
    treasuryMint: treasuryMint,
    treasuryNonce: 0,
    treasuryOracle: treasuryOracle,
    vault: lpTokenVaultKP.publicKey,
    vaultNonce: 0,
    baseMint: baseMint,
    quoteMint: quoteMint,
    lpInfo: {
      account: poolStateAccount,
      baseOracle: baseOracle,
      quoteOracle: baseOracle,
      baseVault: baseVault,
      quoteVault: quoteVault,
      lpMint: lpMint,
    },
  }

  const signatures: BondTestSignatures = {
    create: undefined,
    start: undefined,
    buy: undefined,
    transfer: undefined,
    exercise: undefined,
    toggle: undefined,
    close: undefined,
  }

  it('create orca bond system', async () => {
    const creatorKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])

    const settings: BondSystemSettings = {
      pool_type: PoolType.SplTokenSwap,
      authority: creatorKP.publicKey,
      bond_yield: 9,
      timeclock: BigInt(1),
      epoch: BigInt(1),
      total_amount_to_distribute: BigInt(10000),
      max_amount_to_distribute_per_epoch: BigInt(1000),
      max_allowed_to_distribute_at_one_time: BigInt(150),
    }

    const createBondSystem = await bondProgram.createBondSystem({
      bondSystemAcctKP,
      lpTokenVaultKP,
      treasuryKP,
      treasuryMint,
      lpMint,
      baseMint,
      quoteMint,
      poolStateAccount,
      treasuryOracle,
      baseOracle,
      quoteOracle: baseOracle,
      settings,
      payer: creatorKP.publicKey,
    })

    if (
      createBondSystem.pdas[0] &&
      createBondSystem.pdas[1] &&
      createBondSystem.pdas[0].name === 'vault' &&
      createBondSystem.pdas[1].name === 'treasury'
    ) {
      bondSystem.vaultNonce = createBondSystem.pdas[0].bumpSeed
      bondSystem.treasuryNonce = createBondSystem.pdas[1].bumpSeed
    } else {
      throw 'Vault & Treasury Nonces Cannot Be Identified'
    }

    const transaction = new Transaction().add(...createBondSystem.instructions)

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      creatorKP,
      ...createBondSystem.signers,
    ])

    const success = await watchTransaction(connection, signature)
    signatures.create = signature
    expect(success).toBeTruthy
  })

  it('start bond system', async () => {
    const creatorKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    waitForTransaction(signatures.create)

    const startBondSystem = bondProgram.startBondSystem({
      authority: creatorKP.publicKey,
      bondSystemAcct: bondSystemAcctKP.publicKey,
    })

    const transaction = new Transaction().add(...startBondSystem.instructions)

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      creatorKP,
      ...startBondSystem.signers,
    ])

    const success = await watchTransaction(connection, signature)
    signatures.start = signature
    expect(success).toBeTruthy
  })

  it('buy bond', async () => {
    const creatorKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    waitForTransaction(signatures.start)
    waitFor(5 * 1000)

    await transfer(
      connection,
      creatorKP,
      lucraBondTrsySource,
      treasuryKP.publicKey,
      creatorKP,
      1000
    )

    const buyBond = await bondProgram.buyBond(
      'CUSTOM',
      {
        lpTokenAmount: BigInt(1),
        tokenAccount: orcaTokenAccount,
        owner: creatorKP.publicKey,
        payer: creatorKP.publicKey,
        bondAcctKP,
      },
      bondSystem
    )

    const transaction = new Transaction().add(...buyBond.instructions)

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      creatorKP,
      ...buyBond.signers,
    ])

    const success = await watchTransaction(connection, signature)
    signatures.buy = signature
    expect(success).toBeTruthy
  })

  it('transfer bond', async () => {
    const creatorKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const altCreatorKP = await createKeypairFromFile(
      process.env['ALT_PAYER_KEYFILE']
    )
    waitForTransaction(signatures.buy)
    waitFor(5 * 1000)

    const transferBond = await bondProgram.transferBond({
      bond: bondAcctKP.publicKey,
      newOwner: altCreatorKP.publicKey,
      oldOwner: creatorKP.publicKey,
    })

    const transaction = new Transaction().add(...transferBond.instructions)

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      creatorKP,
      ...transferBond.signers,
    ])

    const success = await watchTransaction(connection, signature)
    signatures.transfer = signature
    expect(success).toBeTruthy
  })

  it('exercise bond', async () => {
    const altCreatorKP = await createKeypairFromFile(
      process.env['ALT_PAYER_KEYFILE']
    )
    waitForTransaction(signatures.transfer)
    waitFor(5 * 1000)

    const exerciseBond = await bondProgram.exerciseBond(
      'CUSTOM',
      {
        bond: bondAcctKP.publicKey,
        tokenAccount: altLucraATA,
      },
      bondSystem
    )

    const transaction = new Transaction().add(...exerciseBond.instructions)

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      altCreatorKP,
      ...exerciseBond.signers,
    ])

    const success = await watchTransaction(connection, signature)
    signatures.exercise = signature
    expect(success).toBeTruthy
  })

  it('toggle bond system', async () => {
    const creatorKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    waitForTransaction(signatures.exercise)
    waitFor(5 * 1000)

    const toggleBond = await bondProgram.toggleBondSystem(
      'CUSTOM',
      {
        authority: creatorKP.publicKey,
      },
      bondSystem
    )

    const transaction = new Transaction().add(...toggleBond.instructions)

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      creatorKP,
      ...toggleBond.signers,
    ])

    const success = await watchTransaction(connection, signature)
    signatures.toggle = signature
    expect(success).toBeTruthy
  })

  it('close bond system', async () => {
    const creatorKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    waitForTransaction(signatures.toggle)
    waitFor(5 * 1000)

    const closeBondSystem = await bondProgram.closeBondSystem(
      'CUSTOM',
      {
        bondSystemAuthority: creatorKP.publicKey,
        solReceiveAccount: creatorKP.publicKey,
        treasuryReceiveAccount: lucraAccount,
        vaultReceiveAccount: orcaTokenAccount,
      },
      bondSystem
    )

    const transaction = new Transaction().add(...closeBondSystem.instructions)

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      creatorKP,
      ...closeBondSystem.signers,
    ])

    const success = await watchTransaction(connection, signature)
    signatures.close = signature
    expect(success).toBeTruthy

    console.dir(signatures, { maxArrayLength: null })
  })
})
