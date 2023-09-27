import { AccountMeta, PublicKey, TransactionInstruction } from '@solana/web3.js'
import { DepositStakeLayout } from './layouts'
import { LucraConfig, LucraInstruction } from '../../../types/lucra'
import { getAssociatedTokenAddress } from '@solana/spl-token'
import { TOKEN_PROGRAM_ID } from '../../../constants'
import { buildInstruction } from '../../common'

export interface DepositStake {
  config: LucraConfig
  owner: PublicKey
  lucra: bigint
  stakeBalanceAccount: PublicKey
  depositVault: PublicKey
}

export const depositStakeInstruction = async ({
  config,
  owner,
  lucra,
  stakeBalanceAccount,
  depositVault,
}: DepositStake): Promise<TransactionInstruction> => {
  const lucraAtaAddress = await getAssociatedTokenAddress(
    config.mint.lucra.address,
    owner
  )

  const data = Buffer.alloc(DepositStakeLayout.span)
  DepositStakeLayout.encode(
    {
      instruction: LucraInstruction.DepositStake,
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
      pubkey: stakeBalanceAccount,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: lucraAtaAddress,
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
