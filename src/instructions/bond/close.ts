import { PublicKey } from '@solana/web3.js'
import { BondInstructionLayout } from './layouts'
import { buildInstruction } from '../common'
import { BondConfig, BondInstruction, BondSystem } from '../../types/bond'
import { Instructions, Signers } from '../../types/common'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export interface CloseBondSystemInstruction {
  config: BondConfig
  bondSystem: BondSystem
  bondSystemAuthority: PublicKey
  solReceiveAccount: PublicKey
  vaultReceiveAccount: PublicKey
  treasuryReceiveAccount: PublicKey
}

export const closeBondSystemInstruction = async ({
  config,
  bondSystem,
  bondSystemAuthority,
  solReceiveAccount,
  vaultReceiveAccount,
  treasuryReceiveAccount,
}: CloseBondSystemInstruction): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(BondInstructionLayout.span)
  BondInstructionLayout.encode(
    {
      instruction: BondInstruction.CloseBondSystem,
    },
    data
  )

  const vaultPDA = await PublicKey.createProgramAddress(
    [
      bondSystem.account.toBuffer(),
      Buffer.from(config.seed.vault),
      Buffer.from([bondSystem.vaultNonce]),
    ],
    config.programId
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
    { pubkey: bondSystemAuthority, isSigner: true, isWritable: false },
    { pubkey: bondSystem.vault, isSigner: false, isWritable: true },
    { pubkey: bondSystem.treasury, isSigner: false, isWritable: true },
    { pubkey: solReceiveAccount, isSigner: false, isWritable: true },
    { pubkey: vaultReceiveAccount, isSigner: false, isWritable: true },
    { pubkey: treasuryReceiveAccount, isSigner: false, isWritable: true },
    { pubkey: vaultPDA, isSigner: false, isWritable: false },
    { pubkey: treasuryPDA, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
  ]

  return {
    instructions: [buildInstruction({ config, keys, data })],
    signers: [],
  }
}
