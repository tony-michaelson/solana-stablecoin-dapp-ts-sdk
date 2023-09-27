import { u8, struct, u32, seq } from '@solana/buffer-layout'
import { publicKey, u64, bool } from '@solana/buffer-layout-utils'
import { RewardAccount } from '.'
import { MetaDataLayout } from '../common'

export type RewardStructure = Omit<RewardAccount, 'account'>

export const RewardAccountLayout = struct<RewardStructure>([
  MetaDataLayout('metadata'),
  publicKey('previousReward'),
  u64('poolTokenSupply'),
  u64('total'),
  u64('startTimestamp'),
  u32('rewardCursor'),
  bool('juiceSqueezed'),
  seq(u8(), 131, 'padding'),
])
