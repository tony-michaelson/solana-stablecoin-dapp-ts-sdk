import { Connection, PublicKey, TransactionInstruction } from '@solana/web3.js'
import { CloseLoanLayout } from './layouts'
import { buildInstruction, createATAInst } from '../common'
import { LucraConfig, LucraInstruction } from '../../types/lucra'
import {
  MARINADE_MAINNET_CONFIG,
  TOKEN_PROGRAM_ID,
  SYSTEM_PROGRAM_ID,
} from '../../constants'
import { getAssociatedTokenAddress } from '@solana/spl-token'

export interface CloseLoan {
  config: LucraConfig
  connection: Connection
  payer: PublicKey
  loanAccount: PublicKey
  unstakeMsol: boolean
  stakeAccount?: PublicKey
}

export const closeLoanInstruction = async ({
  config,
  connection,
  payer,
  loanAccount,
  unstakeMsol,
  stakeAccount,
}: CloseLoan): Promise<TransactionInstruction> => {
  console.log('unstakeMsol:', unstakeMsol)
  const mataAtaAddress = await getAssociatedTokenAddress(
    config.mint.mata.address,
    payer,
    false
  )

  const msolAtaInstruction = await createATAInst(
    connection,
    payer,
    MARINADE_MAINNET_CONFIG.msolMint
  )

  const data = Buffer.alloc(CloseLoanLayout.span)
  CloseLoanLayout.encode(
    {
      instruction: LucraInstruction.CloseOutMataLoan,
      unstake_msol: unstakeMsol,
    },
    data
  )

  const keys = [
    {
      pubkey: config.account.state,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.stateAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: loanAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: payer,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: msolAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.mata.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: mataAtaAddress,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.msolVault.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.msolVault.address,
      isSigner: false,
      isWritable: true,
    },
  ]

  if (stakeAccount) {
    keys.push({
      pubkey: stakeAccount,
      isSigner: false,
      isWritable: true,
    })
  }

  keys.push(
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.solLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolTreasury,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: SYSTEM_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.programId,
      isSigner: false,
      isWritable: false,
    }
  )

  return buildInstruction({ config, keys, data })
}
