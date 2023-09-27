import { AccountMeta, PublicKey, TransactionInstruction } from '@solana/web3.js'
import { StakeLayout } from './layouts'
import { LucraConfig, LucraInstruction } from '../../../types/lucra'
import { TOKEN_PROGRAM_ID } from '../../../constants'
import { buildInstruction } from '../../common'

export interface Stake {
  config: LucraConfig
  owner: PublicKey
  lucra: bigint
  stakeAccount: PublicKey
  stakeBalanceAccount: PublicKey
  depositVault: PublicKey
  stakeVault: PublicKey
  stakedLucraVault: PublicKey
}

export const stakeInstruction = async ({
  config,
  owner,
  lucra,
  stakeAccount,
  stakeBalanceAccount,
  depositVault,
  stakeVault,
  stakedLucraVault,
}: Stake): Promise<TransactionInstruction> => {
  // TODO; convert to createProgramAddress using bumpSeed stored in on-chain data
  const [authority] = await PublicKey.findProgramAddress(
    [owner.toBuffer(), config.account.state.toBuffer()],
    config.programId
  )

  const data = Buffer.alloc(StakeLayout.span)
  StakeLayout.encode(
    {
      instruction: LucraInstruction.Stake,
      lucra,
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
      pubkey: stakeAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: stakeBalanceAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: depositVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: stakeVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: owner,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.mint.stLucra.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: stakedLucraVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.stLucra.authority,
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
