import { u8, struct, u32, seq } from '@solana/buffer-layout'
import { publicKey, u64 } from '@solana/buffer-layout-utils'
import { StakingStateAccount } from '.'
import { AddressWithSeedLayout, MetaDataLayout } from '../common'

export type StakingStateStructure = Omit<StakingStateAccount, 'account'>

export const StakingStateLayout = struct<StakingStateStructure>([
  MetaDataLayout('metadata'),
  publicKey('key'),
  publicKey('currentRewardPubkey'),
  u64('totalAmountToDistribute'),
  u64('amountToDistributePerEpoch'),
  u64('lastReward'),
  u64('lastDropTimestamp'),
  u32('rewardCursor'),
  AddressWithSeedLayout('treasury'),
  AddressWithSeedLayout('stakeMint'),
  seq(u8(), 258, 'padding'),
])
