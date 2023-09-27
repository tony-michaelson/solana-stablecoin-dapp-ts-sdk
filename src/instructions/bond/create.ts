import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { BondSystemLayout } from './layouts'
import {
  buildInstruction,
  createProgramAccountInst,
  createTokenAccountInsts,
} from '../common'
import {
  BondConfig,
  BondInstruction,
  BondSystemSettings,
} from '../../types/bond'
import { Instructions, PDAList, Signers } from '../../types/common'

export interface CreateBondSysInstruction {
  config: BondConfig
  connection: Connection
  payer: PublicKey
  settings: BondSystemSettings
  poolStateAccount: PublicKey
  lpMint: PublicKey
  baseMint: PublicKey
  quoteMint: PublicKey
  treasuryMint: PublicKey
  bondSystemAcctKP: Keypair
  treasuryOracle: PublicKey
  baseOracle: PublicKey
  quoteOracle: PublicKey
  lpTokenVaultKP?: Keypair
  treasuryKP?: Keypair
}

export const createBondSysInstruction = async ({
  config,
  connection,
  payer,
  settings: s,
  poolStateAccount,
  lpMint,
  baseMint,
  quoteMint,
  treasuryMint,
  bondSystemAcctKP = new Keypair(),
  treasuryOracle,
  baseOracle,
  quoteOracle,
  lpTokenVaultKP = new Keypair(),
  treasuryKP = new Keypair(),
}: CreateBondSysInstruction): Promise<Instructions & Signers & PDAList> => {
  const data = Buffer.alloc(BondSystemLayout.span)
  BondSystemLayout.encode(
    {
      instruction: BondInstruction.CreateBondSystem,
      pool_type: s.pool_type,
      authority: s.authority,
      bond_yield: s.bond_yield,
      timeclock: s.timeclock,
      epoch: s.epoch,
      total_amount_to_distribute: s.total_amount_to_distribute,
      max_amount_to_distribute_per_epoch: s.max_amount_to_distribute_per_epoch,
      max_allowed_to_distribute_at_one_time:
        s.max_allowed_to_distribute_at_one_time,
    },
    data
  )

  const bondSystemAccount = await createProgramAccountInst(
    connection,
    bondSystemAcctKP,
    config.accountSize.bondSystem,
    payer,
    config.programId
  )

  const createVault = await createTokenAccountInsts(
    connection,
    payer,
    lpTokenVaultKP,
    'vault',
    lpMint,
    [bondSystemAcctKP.publicKey],
    config.programId,
    config.seed.vault
  )

  const createTreasury = await createTokenAccountInsts(
    connection,
    payer,
    treasuryKP,
    'treasury',
    treasuryMint,
    [bondSystemAcctKP.publicKey],
    config.programId,
    config.seed.treasury
  )

  const keys = [
    { pubkey: bondSystemAcctKP.publicKey, isSigner: true, isWritable: true },
    { pubkey: poolStateAccount, isSigner: false, isWritable: false },
    { pubkey: lpTokenVaultKP.publicKey, isSigner: false, isWritable: false },
    { pubkey: lpMint, isSigner: false, isWritable: false },
    { pubkey: treasuryKP.publicKey, isSigner: false, isWritable: false },
    { pubkey: treasuryMint, isSigner: false, isWritable: false },
    { pubkey: baseMint, isSigner: false, isWritable: false },
    { pubkey: quoteMint, isSigner: false, isWritable: false },
    { pubkey: treasuryOracle, isSigner: false, isWritable: false },
    { pubkey: baseOracle, isSigner: false, isWritable: false },
    { pubkey: quoteOracle, isSigner: false, isWritable: false },
  ]

  return {
    instructions: [
      ...bondSystemAccount.instructions,
      ...createVault.instructions,
      ...createTreasury.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [...bondSystemAccount.signers, lpTokenVaultKP, treasuryKP],
    pdas: [
      {
        name: createVault.name,
        pda: createVault.pda,
        bumpSeed: createVault.bumpSeed,
      },
      {
        name: createTreasury.name,
        pda: createTreasury.pda,
        bumpSeed: createTreasury.bumpSeed,
      },
    ],
  }
}
