import { PublicKey } from '@solana/web3.js'
import { BondInstructionLayout } from './layouts'
import { buildInstruction } from '../common'
import { BondConfig, BondInstruction, BondSystem } from '../../types/bond'
import { Instructions, Signers } from '../../types/common'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export interface ExerciseBondInstruction {
  config: BondConfig
  bondSystem: BondSystem
  bond: PublicKey
  tokenAccount: PublicKey
}

export const exerciseBondInstruction = async ({
  config,
  bondSystem,
  bond,
  tokenAccount,
}: ExerciseBondInstruction): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(BondInstructionLayout.span)
  BondInstructionLayout.encode(
    {
      instruction: BondInstruction.ExerciseBond,
    },
    data
  )

  const treasuryPDA = await PublicKey.createProgramAddress(
    [
      bondSystem.account.toBuffer(),
      Buffer.from(config.seed.treasury),
      Buffer.from([bondSystem.treasuryNonce]),
    ],
    config.programId
  )

  const keys = [
    { pubkey: bondSystem.account, isSigner: false, isWritable: true },
    { pubkey: bond, isSigner: false, isWritable: true },
    { pubkey: bondSystem.treasury, isSigner: false, isWritable: true },
    { pubkey: bondSystem.treasuryMint, isSigner: false, isWritable: false },
    { pubkey: tokenAccount, isSigner: false, isWritable: true },
    { pubkey: treasuryPDA, isSigner: false, isWritable: false },
    {
      pubkey: bondSystem.treasuryOracle,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
  ]

  return {
    instructions: [buildInstruction({ config, keys, data })],
    signers: [],
  }
}
