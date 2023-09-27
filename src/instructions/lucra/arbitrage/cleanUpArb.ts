import { AccountMeta, Connection, PublicKey } from '@solana/web3.js'
import { buildInstruction, createATAInst, createNonATAInst } from '../../common'
import { LucraConfig, LucraInstruction } from '../../../types/lucra'
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Instructions, Signers } from '../../../types/common'
import { CleanUpArbLayout } from '../layouts'
import {
  MARINADE_MAINNET_CONFIG,
  SOL_FEES_ACCOUNT,
  SYSTEM_PROGRAM_ID,
} from '../../../constants'

export interface CleanUpArb {
  config: LucraConfig
  connection: Connection
  payer: PublicKey
}

export const cleanUpArbInstruction = async ({
  config,
  connection,
  payer,
}: CleanUpArb): Promise<Instructions & Signers> => {
  const wsolAtaInstruction = await createATAInst(connection, payer, NATIVE_MINT)
  const msolAtaInstruction = await createATAInst(
    connection,
    payer,
    MARINADE_MAINNET_CONFIG.msolMint
  )
  const tempWsolInstruction = await createNonATAInst(
    connection,
    payer,
    NATIVE_MINT
  )

  const oracleRewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const data = Buffer.alloc(CleanUpArbLayout.span)
  CleanUpArbLayout.encode(
    {
      instruction: LucraInstruction.CleanUpArb,
    },
    data
  )

  const keys: AccountMeta[] = [
    {
      pubkey: config.account.state,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.arb,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.arbCoffer.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.wsolHoldingVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.wsolHoldingVault.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.mint.oracleReward.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.oracleReward.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: payer,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: wsolAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: msolAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: oracleRewardsAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: tempWsolInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.stateAccount,
      isSigner: false,
      isWritable: true,
    },
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
      pubkey: MARINADE_MAINNET_CONFIG.programId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  ]

  return {
    instructions: [
      ...msolAtaInstruction.instructions,
      ...wsolAtaInstruction.instructions,
      ...tempWsolInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [...tempWsolInstruction.signers],
  }
}
