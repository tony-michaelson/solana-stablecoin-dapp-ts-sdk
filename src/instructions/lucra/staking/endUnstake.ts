import { AccountMeta, PublicKey, TransactionInstruction } from '@solana/web3.js'
import { EndUnstakeLayout } from './layouts'
import { LucraConfig, LucraInstruction } from '../../../types/lucra'
import { TOKEN_PROGRAM_ID } from '../../../constants'
import { buildInstruction } from '../../common'

export interface EndUnstake {
  config: LucraConfig
  owner: PublicKey
  stakeBalanceAccount: PublicKey
  pendingWithdrawal: PublicKey
  pendingVault: PublicKey
  depositVault: PublicKey
}

export const endUnstakeInstruction = async ({
  config,
  owner,
  stakeBalanceAccount,
  pendingWithdrawal,
  pendingVault,
  depositVault,
}: EndUnstake): Promise<TransactionInstruction> => {
  // TODO; convert to createProgramAddress using bumpSeed stored in on-chain data
  const [authority] = await PublicKey.findProgramAddress(
    [owner.toBuffer(), config.account.state.toBuffer()],
    config.programId
  )

  const data = Buffer.alloc(EndUnstakeLayout.span)
  EndUnstakeLayout.encode(
    {
      instruction: LucraInstruction.EndUnstake,
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
      pubkey: pendingWithdrawal,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: stakeBalanceAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: pendingVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: depositVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: owner,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: owner,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  ]

  return buildInstruction({ config, keys, data })
}
