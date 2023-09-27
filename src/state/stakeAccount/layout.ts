import { seq, struct, u8 } from '@solana/buffer-layout'
import { publicKey, u64 } from '@solana/buffer-layout-utils'
import { StakeAccount } from '.'
import { MetaDataLayout } from '../common'

export type StakeAccountStructure = Omit<StakeAccount, 'account'>

export const StakeAccountLayout = struct<StakeAccountStructure>([
  MetaDataLayout('metadata'),
  publicKey('owner'),
  u64('total'),
  u64('lockedTotal'),
  seq(u8(), 128, 'padding'),
])
