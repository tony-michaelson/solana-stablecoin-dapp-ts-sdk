import { u8, struct, seq, u32 } from '@solana/buffer-layout'
import { u64 } from '@solana/buffer-layout-utils'
import { PriceHistoryAccount } from '.'
import { MetaDataLayout, PriceHistoryLayout } from '../common'

export type PriceHistoryStructure = Omit<PriceHistoryAccount, 'account'>

export const PriceHistoryAccountLayout = struct<PriceHistoryStructure>([
  MetaDataLayout('metadata'),
  seq(PriceHistoryLayout('price'), 30, 'prices'),
  u64('intervalStart'),
  u64('lastUpdateTimestamp'),
  u32('updateCounter'),
  seq(u8(), 132, 'padding'),
])
