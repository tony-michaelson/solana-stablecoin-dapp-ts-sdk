import {
  AccountMeta,
  Connection,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js'
import { ClaimRewardLayout } from './layouts'
import { LucraConfig, LucraInstruction } from '../../../types/lucra'
import { buildInstruction } from '../../common'
import { getAssociatedTokenAddress } from '@solana/spl-token'
import { MARINADE_MAINNET_CONFIG, TOKEN_PROGRAM_ID } from '../../../constants'

export interface ClaimReward {
  config: LucraConfig
  connection: Connection
  owner: PublicKey
  stakeBalanceAccount: PublicKey
  rewardAccount: PublicKey
  stakedLucraVault: PublicKey
  stakeVault: PublicKey
}

export const claimRewardInstruction = async ({
  config,
  owner,
  stakeBalanceAccount,
  rewardAccount,
  stakedLucraVault,
  stakeVault,
}: ClaimReward): Promise<TransactionInstruction> => {
  const lucraAtaAddress = await getAssociatedTokenAddress(
    config.mint.lucra.address,
    owner
  )

  const msolAtaAddress = await getAssociatedTokenAddress(
    MARINADE_MAINNET_CONFIG.msolMint,
    owner
  )

  const data = Buffer.alloc(ClaimRewardLayout.span)
  ClaimRewardLayout.encode(
    {
      instruction: LucraInstruction.ClaimReward,
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
      pubkey: config.account.stake,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: stakeBalanceAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: rewardAccount,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: stakedLucraVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: stakeVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: lucraAtaAddress,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.rewardsVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: msolAtaAddress,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.rewardsVault.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.mint.lucra.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.lucra.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.treasury.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.treasury.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  ]

  return buildInstruction({ config, keys, data })
}
