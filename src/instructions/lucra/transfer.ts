import { AccountMeta, PublicKey, TransactionInstruction } from '@solana/web3.js'
import { TransferLayout } from './layouts'
import { buildInstruction } from '../common'
import { LucraConfig, LucraInstruction } from '../../types/lucra'
import { TOKEN_PROGRAM_ID } from '../../constants'

export interface Transfer {
  config: LucraConfig
  daoAuthority: PublicKey
  toAccount: PublicKey
  lamports: bigint
}

export const transferInstruction = ({
  config,
  daoAuthority,
  toAccount,
  lamports,
}: Transfer): TransactionInstruction => {
  const data = Buffer.alloc(TransferLayout.span)
  TransferLayout.encode(
    {
      instruction: LucraInstruction.TransferFunds,
      lamports: lamports,
    },
    data
  )

  const keys: AccountMeta[] = [
    {
      pubkey: config.account.state,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: daoAuthority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.msolVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: toAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.msolVault.authority,
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
