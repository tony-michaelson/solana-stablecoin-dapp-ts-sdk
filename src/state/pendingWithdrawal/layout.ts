import { struct } from '@solana/buffer-layout'
import { u64, publicKey } from '@solana/buffer-layout-utils'
import { PendingWithdrawalAccount } from '.'
import { MetaDataLayout } from '../common'

export type PendingWithdrawalStructure = Omit<
PendingWithdrawalAccount,
'account'
>

export const PendingWithdrawalAccountLayout =
  struct<PendingWithdrawalStructure>([
    MetaDataLayout('metadata'),
    publicKey('stakeBalance'),
    u64('startTimestamp'),
    u64('endTimestamp'),
    u64('lucra'),
  ])
