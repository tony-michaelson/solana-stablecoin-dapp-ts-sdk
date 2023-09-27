import {
  AccountMeta,
  Connection,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js'
import { AddCollateralLayout } from './layouts'
import { buildInstruction, createATAInst } from '../common'
import { LucraConfig, LucraInstruction } from '../../types/lucra'
import {
  MARINADE_MAINNET_CONFIG,
  TOKEN_PROGRAM_ID,
  SOL_FEES_ACCOUNT,
  SYSTEM_PROGRAM_ID,
} from '../../constants'

export interface AddCollateral {
  config: LucraConfig
  connection: Connection
  payer: PublicKey
  lamports: bigint
  loanAccount: PublicKey
  stakeAccount?: PublicKey
}

export const addCollateralInstruction = async ({
  config,
  connection,
  payer,
  lamports,
  loanAccount,
  stakeAccount,
}: AddCollateral): Promise<TransactionInstruction[]> => {
  const msolAtaInstruction = await createATAInst(
    connection,
    payer,
    MARINADE_MAINNET_CONFIG.msolMint
  )

  const data = Buffer.alloc(AddCollateralLayout.span)
  AddCollateralLayout.encode(
    {
      instruction: LucraInstruction.AddCollateral,
      lamports,
    },
    data
  )

  const keys: AccountMeta[] = []

  keys.push(
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
      pubkey: config.account.msolVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: payer,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: msolAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    }
  )

  if (stakeAccount) {
    keys.push(
      {
        pubkey: stakeAccount,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: config.oracle.SOL_USDC.account,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: config.oracle.SOL_USDT.account,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: config.oracle.LUCRA_SOL.account,
        isSigner: false,
        isWritable: false,
      }
    )
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
      pubkey: MARINADE_MAINNET_CONFIG.msolLegAuthorityInfo,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.reservePDAInfo,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolMintAuth,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SOL_FEES_ACCOUNT,
      isSigner: false,
      isWritable: false,
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

  return [
    ...msolAtaInstruction.instructions,
    buildInstruction({ config, keys, data }),
  ]
}
